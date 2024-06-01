<template>
    <!--Form for adding new article-->
    <div class="articleform">
        <h3 class="">Lägg till artikel</h3>
        <span class="error">{{ message }}</span>
        <form @submit.prevent="addArticle()" class="">
            <div class="">


                <label for="addTitle" class="">Rubrik:</label><br>
                <input v-model="newArticle.title" type="text" id="addTitle" name="addTitle" class="">
                <br><span class="error">{{ message2 }}</span>

                <label for="addContent" class="">Innehåll:</label><br>
                <textarea v-model="newArticle.content" name="addContent" id="addContent" cols="30" rows="4" class=""></textarea>
                <br><span class="error">{{ message3 }}</span>
                

            </div>

            <p class="error">{{ message4 }}</p>
            <label for="image" class="">Bild (valfritt):</label><br>
            <input type="file" id="image" name="image" @change="addImage">
            <div v-if="file && file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/webp' && file.type !== 'image/avif'">
                Felaktigt bildformat! Måste vara jpg, png, webp eller avif.
            </div>
            <div v-if="file && file.size > 1048576">
                File size exceeds 1MB
            </div>


            <br><br>
            <input type="submit" value="Lägg till artikel" class="addButton">

        </form>
    </div>
</template>



<script>
export default {
    data() {
        return {
            file: null,
            newArticle: {     // object with properties
                title: "",
                content: "",
                image: null


            },
            message: "",
            message2: "",
            message3: "",
            message4: "",
        };
    },
    emits: ["articleAdded", "imageAdded"],
    methods: {
        //for checking inputfields
        checkInput() {

            if (!this.newArticle.title.length) {
                this.message2 = "Du har glömt att fylla i rubrik.";
                return false;
            }

            if (!this.newArticle.content.length) {
                this.message3 = "Du glömde fylla i innehåll.";
                return false;
            }

            return true;
        },
        addImage(e) {
            //
            const file = e.target.files[0];

            //if file exists
            if (file) {
                this.newArticle.image = file;

            } else {
                this.newArticle.image = null;
            }

            this.$emit("imageAdded");

        },
        async addArticle() {  //method for adding new article

            //clear form of messages
            this.message = "";
            this.message2 = "";
            this.message3 = "";
            this.message4 = "";

            if (this.checkInput()) { // check if written correctly in inputs

                //new FormData object to send to API (only if image is sent)

                let formData = new FormData();

                formData.append("title", this.newArticle.title);
                formData.append("content", this.newArticle.content);
                formData.append("image", this.newArticle.image);

                //get token from local storage
                const token = localStorage.getItem("token");

                // Post new values to API with fetch
                const response = await fetch("http://localhost:3000/articles", {
                    method: "POST",
                    headers: {
                        "Authorization": "Bearer " + token,
                    },
                    body: formData,
                });

                const data = await response.json();


                //reset form
                this.newArticle = {
                    title: "",
                    content: "",
                    image: null
                };

                this.$emit("articleAdded");

            } else {
                this.message = "Något gick fel, var god försök igen!";
            }
        }
    },
    name: "AddArticle"
}

</script>

<style scoped>
.articleform {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.articleform h2 {
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