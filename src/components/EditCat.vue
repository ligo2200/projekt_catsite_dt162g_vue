<template>
    <h1 class="">Ändra Katt</h1>
    <div class="">
        <span class="error">{{ message }}</span>
        <form @submit.prevent="updateCat" class="">
            <div class="">
                <div class="">

                    <label for="updateName" class="">Ändra namn:</label><br>
                    <input v-model="cat.name" type="text" id="updateName" name="updateName"
                        class="">
                        <br><span class="error">{{ message2 }}</span>
                    <br><br>

                    <label for="updateColor" class="">Uppdatera färg:</label><br>
                    <input v-model="cat.color" type="text" id="updateColor" name="updateColor"
                        class="">
                        <br><span class="error">{{ message5 }}</span>
                </div>

                <br><br>
                <div class="">
                    <label for="updateBirth" class="">Uppdatera ålder:</label><br>
                    <input v-model="cat.birth" type="text" id="updateBirth" name="updateBirth"
                        class="">
                        <br><span class="error">{{ message4 }}</span>
                    <br><br>
                    <label for="updateDescription" class="">Uppdatera personlighet:</label><br>
                    <textarea v-model="cat.description" name="updateDescription" id="updateDescription" cols="30" rows="4"
                        class=""></textarea>
                        <br><span class="error">{{ message3 }}</span>
                </div>
            </div>

            <br><br>

            <label for="updateImage" class="">Uppdatera bild (valfritt):</label><br>
            <input type="file" id="updateImage" name="updateImage" @change="updateImage" class=""><span
                v-if="fish.image">
                <p class="">Nuvarande bild:</p><img :src="cat.image" alt="bild på katt"
                    height="80" width="100">
            </span>


            <br><br>
            <input type="submit" value="Uppdatera Katt" @click="$emit('hideEditCat')"
                class="">
        </form>
    </div>
</template>
  
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
        }
    },
    props: {
        cat: Object,
    },
    name: "EditCat",
    emits: ["updatedCat", "imageUpdated"],
    methods: {
        checkInput() {

            if (!this.cat.name.length) {
                this.message2 = "Du har glömt att fylla i kattens namn.";
                return false;
            }

            if (!this.cat.description.length) {
                this.message3 = "Du har glömt att fylla i kattens personlighet.";
                return false;
            }

            if (this.cat.birth === null || this.cat.birth === "") {
                this.message4 = "Du har glömt att fylla i födelsedata. Endast siffror i formatet ååmmdd.";
                return false;
            }

            if (this.cat.color.length) {
                this.message5 = "Du har glömt att skriva in vilken färg din katt har!";
                return false;
            }

            return true;
        },
        updateImage(event) {
            //
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

            //clear form
            this.message = "";
            this.message2 = "";
            this.message3 = "";
            this.message4 = "";
            this.message5 = "";

            //get token from localstorage
            const token = localStorage.getItem("token");

            //get id
            const id = this.cat.id;

            //if updateImage true
            if (this.checkInput()) {

                //if there is an image and inputfields have values, send formData
                let formData = new FormData();

                formData.append("name", this.cat.name);
                formData.append("color", this.cat.color);
                formData.append("birth", this.cat.birth);
                formData.append("description", this.cat.description);
                formData.append("image", this.fish.image);

                //fetch api with id
                const response = await fetch("http://localhost:3000/cats" + id, {
                    method: "POST",
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
  