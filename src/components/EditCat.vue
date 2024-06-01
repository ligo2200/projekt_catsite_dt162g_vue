<template>

    <div class="catform">
        <span class="error">{{ message }}</span>
        <form @submit.prevent="updateCat" class="">
            <h3 class="">Ändra Katt</h3>
            <div class="">

                <label for="updateName" class="">Ändra namn:</label><br>
                <input v-model="cat.name" type="text" id="updateName" name="updateName" class="">
                <br><span class="error">{{ message2 }}</span>

                <label for="updateBirth" class="">Uppdatera ålder:</label><br>
                <input v-model="cat.birth" type="text" id="updateBirth" name="updateBirth" class="">
                <br><span class="error">{{ message4 }}</span>

                <label for="updateBreed" class="">Uppdatera ras:</label><br>
                <input v-model="cat.breed" type="text" id="updateBreed" name="updateBreed" class="">
                <br><span class="error">{{ message7 }}</span>

                <label for="updateColor" class="">Uppdatera färg:</label><br>
                <input v-model="cat.color" type="text" id="updateColor" name="updateColor" class="">
                <br><span class="error">{{ message5 }}</span>

                <label for="updateDescription" class="">Uppdatera personlighet:</label><br>
                <textarea v-model="cat.description" name="updateDescription" id="updateDescription" cols="30" rows="4"
                    class=""></textarea>
                <br><span class="error">{{ message3 }}</span>

            </div>

            <br><br>

            <label for="image" class="">Uppdatera bild (valfritt):</label><br>
            <input type="file" id="image" name="image" @change="updateImage" class=""><span v-if="cat.image">
                <p class="">Nuvarande bild:</p><img :src="'http://localhost:3000' + '/uploads/' + cat.image" alt="bild på katt" height="80">
            </span>


            <br><br>
            <div class="buttoncont">
                <input type="submit" value="Uppdatera Katt" @click="$emit('hideEditCat')" class="">
                <button type="button" @click="$emit('hideEditCat')">Avbryt</button>
            </div>
        </form>
    </div>
</template>

<style scoped>
.catform {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
}

.catform h3 {
    text-align: center;
}

form {
    width: 30%;
    box-shadow: 0px 1px 5px purple;
    padding: 3%;
}

label {
    margin-bottom: -5%;
    margin-top: 1%;
}

.error {
    color: red;
}

.buttoncont {
    display: flex;
    justify-content: space-between;
}
@media screen and (max-width: 650px) {
    form {
        width: 90%;
    }
}

@media screen and (min-width: 651px) and (max-width: 999px) {
    form {
        width: 65%;
    }
}

@media screen and (min-width: 1000px) and (max-width: 1400px) {
    form {
        width: 50%;
    }
}
</style>


<script>

export default {
    data() {
        return {
            message: "",
            message2: "",
            message3: "",
            message4: "",
            message5: "",
            message6: "",
            message7: "",
        }
    },
    props: {
        cat: Object,
    },
    name: "EditCat",
    emits: ["updatedCat", "imageUpdated"],
    methods: {
        checkInput() {

            if (!this.cat.name) {
                this.message2 = "Du har glömt att fylla i kattens namn.";
                return false;
            }

            if (!this.cat.breed) {
                this.message7 = "Du har glömt att fylla i ras."
            }

            if (!this.cat.description) {
                this.message3 = "Du har glömt att fylla i kattens personlighet.";
                return false;
            }

            if (this.cat.birth === null || this.cat.birth === "") {
                this.message4 = "Du har glömt att fylla i födelsedata. Endast siffror i formatet ååååmmdd.";
                return false;
            }

            if (!this.cat.color) {
                this.message5 = "Du har glömt att skriva in vilken färg din katt har!";
                return false;
            }

            return true;
        },
        updateImage(event) {
            
            const file = event.target.files[0];
            

            //if file exists
            if (file) {
                this.cat.image = file;
            } else {
                this.file.image = null;
            }

            this.$emit('imageUpdated')

        },
        async updateCat() {

            // Kolla id-format innan du skickar det till backend
            const isValidId = /^[0-9a-fA-F]{24}$/.test(this.cat._id);
            if (!isValidId) {
                console.error("Ogiltigt id-format");
                return; // Avbryt funktionen om id:t inte är i rätt format
            }

            //clear form
            this.message = "";
            this.message2 = "";
            this.message3 = "";
            this.message4 = "";
            this.message5 = "";
            this.message6 = "";
            this.message7 = "";

            //get token from localstorage
            const token = localStorage.getItem("token");

            //get id
            const id = this.cat._id;

            //if updateImage true
            if (this.checkInput()) {

                //if there is an image and inputfields have values, send formData
                let formData = new FormData();

                formData.append("name", this.cat.name);
                formData.append("breed", this.cat.breed);
                formData.append("birth", this.cat.birth);
                formData.append("color", this.cat.color);
                formData.append("description", this.cat.description);
                formData.append("image", this.cat.image);

                //fetch api with name
                const response = await fetch("http://localhost:3000/cats/" + id, {
                    method: "PATCH",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    },
                    body: formData
                });

                const data = await response.json();

                if (!response.ok) {
                    this.message = "Något gick fel, försök igen!"
                } else {
                    this.message6 = 'Ändringarna är utförda!';
                }

            }

            //this.getUpdatedCat();
            this.$emit('updatedCat');

        }
    }
}

</script>