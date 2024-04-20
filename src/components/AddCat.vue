<template>
    <!--Form for adding new cat-->
    <div class="">
        <h2 class="">Lägg till Katt</h2>
        <span class="error">{{ message }}</span>
        <form @submit.prevent="addCat()" class="">
            <div class="">
                <div class="">
                    
                    <label for="addName" class="">Namn:</label><br>
                    <input v-model="newCat.name" type="text" id="addName" name="addName" class="">
                    <br><span class="error">{{ message2 }}</span>
                    <br><br>
                    <label for="addBirth" class="">Född:</label><br>
                    <input v-model="newCat.birth" type="text" id="addBirth" name="addBirth" class="">
                    <br><span class="error">{{ message4 }}</span>
                    
                </div>

                <br><br>
                <div class="p-2">
                    
                    <label for="addColor" class="">Färg:</label><br>
                    <input v-model="newCat.color" type="text" id="addColor" name="addColor" class="">
                    <br><span class="error">{{ message5 }}</span>

                    <br><br>
            
                    <label for="addDescription" class="">Personlighet:</label><br>
                    <textarea v-model="newCat.description" name="addDescription" id="addDescription" cols="30" rows="4" class=""></textarea>
                    <br><span class="error">{{ message3 }}</span>
                </div>
            </div>

            <br><br>
            <!--<p class="error text-red-500 m-2">{{ message6 }}</p>
            <label for="addImage" class="-mb-4 text-white p-2">Bild (valfritt):</label><br>
            <input type="file" id="addImage" name="addImage" @change="addImage" class="text-white p-2">
            -->


            <br><br>
            <input type="submit" value="Lägg till Katt" class="">

        </form>
    </div>
</template>



<script>
export default {
    data() {
        return {
            newCat: {     // object with properties
                name: "",
                color: "",
                birth: null,
                description: ""
                
               
            },
            message: "",
            message2: "",
            message3: "",
            message4: "",
            message5: ""
        };
    },
    emits: ["catAdded", /*"imageAdded"*/],
    methods: {
        //for checking inputfields
        checkInput() {

            if (!this.newCat.name.length) {
                this.message2 = "Du har glömt att fylla i namn.";
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
        },/*
        addImage(e) {
            //
            const file = e.target.files[0];

            //if file exists
            if (file) {
                this.newFish.image = file;
            } else {
                this.newFish.image = null;
            }

            this.$emit("imageAdded");

        },*/
        async addCat() {  //method for adding new cat

            //clear form of messages
            this.message = "";
            this.message2 = "";
            this.message3 = "";
            this.message4 = "";
            this.message5 = "";
            
            if (this.checkInput()) { // check if written correctly in inputs

                //new FormData object to send to API (only if image is sent)
                /*
                let formData = new FormData();

                formData.append("name", this.newCat.name);
                formData.append("color", this.newCat.color);
                formData.append("birth", this.newCat.birth);
                formData.append("description", this.newCat.description);
                
                //formData.append("image", this.newCat.image);*/

                const newCatData = {
                    name: this.newCat.name,
                    color: this.newCat.color,
                    birth: this.newCat.birth,
                    description: this.newCat.description,
                };

                //get token from local storage
                const token = localStorage.getItem("token");

                // Post new values to API with fetch
                const response = await fetch("http://localhost:3000/cats", {
                    method: "POST",
                    headers: {
                        "Authorization": "Bearer " + token,
                        "Content-Type": "application/json",
                    },
                    body:JSON.stringify(newCatData),
                    //body: formData,
                });

                const data = await response.json();


                //reset form
                this.newCat = {
                    name: "",
                    color: "",
                    birth: null,
                    description: ""
                    //image: null
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

<style scoped></style>