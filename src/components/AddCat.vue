<template>
    <!--Form for adding new cat-->
    <div class="catform">
        <h3 class="">Lägg till Katt</h3>
        <span class="error">{{ message }}</span>
        <form @submit.prevent="addCat()" class="">
            <div class="">


                <label for="addName" class="">Namn:</label><br>
                <input v-model="newCat.name" type="text" id="addName" name="addName" class="">
                <br><span class="error">{{ message2 }}</span>

                <label for="addBreed" class="">Ras:</label><br>
                <input v-model="newCat.breed" type="text" id="addBreed" name="addBreed" class="">
                <br><span class="error">{{ message7 }}</span>

                <label for="addBirth" class="">Född (ååååmmdd):</label><br>
                <input v-model="newCat.birth" type="text" id="addBirth" name="addBirth" class="">
                <br><span class="error">{{ message4 }}</span>

                <label for="addColor" class="">Färg:</label><br>
                <input v-model="newCat.color" type="text" id="addColor" name="addColor" class="">
                <br><span class="error">{{ message5 }}</span>

                <label for="addDescription" class="">Personlighet:</label><br>
                <textarea v-model="newCat.description" name="addDescription" id="addDescription" cols="30" rows="4"
                    class=""></textarea>
                <br><span class="error">{{ message3 }}</span>

            </div>

            <p class="error">{{ message6 }}</p>
            <label for="image" class="">Bild (valfritt):</label><br>
            <input type="file" id="image" name="image" @change="addImage">
            <div v-if="file && file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/webp' && file.type !== 'image/avif'">
                Felaktigt bildformat! Måste vara jpg, png, webp eller avif.
            </div>
            <div v-if="file && file.size > 1048576">
                File size exceeds 1MB
            </div>


            <br><br>
            <input type="submit" value="Lägg till Katt" class="addButton">

        </form>
    </div>
</template>



<script>
export default {
    data() {
        return {
            file: null,
            newCat: {     // object with properties
                name: "",
                breed: "",
                birth: null,
                color: "",
                description: "",
                image: null


            },
            message: "",
            message2: "",
            message3: "",
            message4: "",
            message5: "",
            message6: "",
            message7: ""
        };
    },
    emits: ["catAdded", "imageAdded"],
    methods: {
        //for checking inputfields
        checkInput() {

            if (!this.newCat.name.length) {
                this.message2 = "Du har glömt att fylla i namn.";
                return false;
            }

            if (!this.newCat.breed.length) {
                this.message7 = "Du glömde fylla i ras.";
                return false;
            }

            if (!this.newCat.description.length) {
                this.message3 = "Du har glömt att beskriva kattens personlighet.";
                return false;
            }

            if (this.newCat.birth === null || this.newCat.birth === "") {
                this.message4 = "Du har glömt att fylla i födelseår. Endast siffror.";
                return false;
            }

            if (!this.newCat.color.length) {
                this.message5 = "Du har glömt att skriva in kattens färg.";
                return false;
            }

            return true;
        },
        addImage(e) {
            //
            const file = e.target.files[0];

            //if file exists
            if (file) {
                this.newCat.image = file;

            } else {
                this.newCat.image = null;
            }

            this.$emit("imageAdded");

        },
        async addCat() {  //method for adding new cat

            //clear form of messages
            this.message = "";
            this.message2 = "";
            this.message3 = "";
            this.message4 = "";
            this.message5 = "";
            this.message6 = "";
            this.message7 = "";

            if (this.checkInput()) { // check if written correctly in inputs

                //new FormData object to send to API (only if image is sent)

                let formData = new FormData();

                formData.append("name", this.newCat.name);
                formData.append("breed", this.newCat.breed);
                formData.append("birth", this.newCat.birth);
                formData.append("color", this.newCat.color);
                formData.append("description", this.newCat.description);
                formData.append("image", this.newCat.image);

                //get token from local storage
                const token = localStorage.getItem("token");

                // Post new values to API with fetch
                const response = await fetch("http://localhost:3000/cats", {
                    method: "POST",
                    headers: {
                        "Authorization": "Bearer " + token,
                    },
                    body: formData,
                });

                const data = await response.json();


                //reset form
                this.newCat = {
                    name: "",
                    breed: "",
                    birth: null,
                    color: "",
                    description: "",
                    image: null
                };

                this.$emit("catAdded");

            } else {
                this.message = "Något gick fel, var god försök igen!";
            }
        }
    },
    name: "AddCat"
}

</script>

<style scoped>
.catform {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.catform h2 {
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
</style>