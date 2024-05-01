<template>

    <div class="articleform">
        <span class="error">{{ message }}</span>
        <form @submit.prevent="updateArticle" class="">
            <h3 class="">Ändra artikel</h3>
            <div class="">

                <label for="updateTitle" class="">Uppdatera rubrik:</label><br>
                <input v-model="article.title" type="text" id="updateTitle" name="updateTitle" class="">
                <br><span class="error">{{ message2 }}</span>


                <label for="updateContent" class="">Uppdatera innehåll:</label><br>
                <textarea v-model="article.content" name="updateContent" id="updateContent" cols="30" rows="4"
                    class=""></textarea>
                <br><span class="error">{{ message3 }}</span>

            </div>

            <br><br>

            <label for="image" class="">Uppdatera bild (valfritt):</label><br>
            <input type="file" id="image" name="image" @change="updateImage" class=""><span v-if="article.image">
                <p class="">Nuvarande bild:</p><img :src="'http://localhost:3000' + '/uploads/' + article.image" alt="artikelbild" height="80">
            </span>


            <br><br>
            <div class="buttoncont">
                <input type="submit" value="Uppdatera artikel" @click="$emit('hideEditArticle')" class="">
                <button type="button" @click="$emit('hideEditArticle')">Avbryt</button>
            </div>
        </form>
    </div>
</template>

<style scoped>
.articleform {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
}

.articleform h3 {
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
</style>


<script>

export default {
    data() {
        return {
            message: "",
            message2: "",
            message3: "",
        }
    },
    props: {
        article: Object,
    },
    name: "EditArticle",
    emits: ["updatedArticle", "imageUpdated"],
    methods: {
        checkInput() {

            if (!this.article.title) {
                this.message2 = "Du har glömt att fylla i artikelns rubrik.";
                return false;
            }

            if (!this.article.content) {
                this.message3 = "Du har glömt att fylla i innehåll."
            }

            return true;
        },
        updateImage(event) {
            
            const file = event.target.files[0];
            

            //if file exists
            if (file) {
                this.article.image = file;
            } else {
                this.file.image = null;
            }

            this.$emit('imageUpdated')

        },
        async updateArticle() {

            // Kolla id-format innan det skickas till backend
            const isValidId = /^[0-9a-fA-F]{24}$/.test(this.article._id);
            if (!isValidId) {
                console.error("Ogiltigt id-format");
                return; // Avbryt funktionen om id:t inte är i rätt format
            }

            //clear form
            this.message = "";
            this.message2 = "";
            this.message3 = "";

            //get token from localstorage
            const token = localStorage.getItem("token");

            //get id
            const id = this.article._id;

            //if updateImage true
            if (this.checkInput()) {

                //if there is an image and inputfields have values, send formData
                let formData = new FormData();

                formData.append("title", this.article.title);
                formData.append("content", this.article.content);
                formData.append("image", this.article.image);

                //fetch api
                const response = await fetch("http://localhost:3000/articles/" + id, {
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

            //this.getUpdatedArticle();
            this.$emit('updatedArticle');

        }
    }
}

</script>