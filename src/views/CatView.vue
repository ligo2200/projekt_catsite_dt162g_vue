<template>
    <div class="">
        <h1 class="cathead">Katter</h1>

        <!--components for adding and updating cat here-->
        <div class="">
            <div :class="{ 'hide-element': !showAddCat }" class="">
                <AddCat v-show="showAddCat" @catAdded="getCat()" @imageAdded="updateImage()" />
            </div>
            <div :class="{ 'hide-element': !showEditCat }" class="">
                <EditCat v-show="showEditCat" :cat="specificCat" @updatedCat="updatedCat" @imageUpdated="updatedCat()"
                    @hideEditCat="hideEditCat()" />
            </div>
            <!--<button @click="toggleAddCat" class="">Lägg till katt</button>-->
        </div>

        <div class="showCats">
            <h3 class="">Alla Katter</h3>
            <!--articles here with cats-->
            <div class="catsarticles">
                <article v-for="cat in cats" :key="cat._id">
                    <h3 class="">{{ cat.name }}</h3>
                    <img v-if="cat.image" :src="'http://localhost:3000/uploads/' + cat.image" alt="bild på katt">
                    <p>Ras: {{ cat.breed }}</p>
                    <p>Färg: {{ cat.color }}</p>
                    <p>Ålder: {{ calculateAge(cat.birth) }} år</p>
                    <p>Personlighet: {{ cat.description }}</p>
                    <div>
                        <button @click="editCat(cat._id)">Ändra</button>
                        <button @click="deleteCat(cat._id)">Ta bort</button>
                    </div>
                </article>
            </div>
        </div>

    </div>
</template>


<script>
import AddCat from '../components/AddCat.vue';
import EditCat from '../components/EditCat.vue';


export default {
    data() {
        return {
            cats: [],
            specificCat: [],
            showEditCat: false,
            showAddCat: false,
        }
    },
    components: {
        AddCat,
        EditCat
    },
    methods: {
        async getCat() {
            //get token from localstorage
            const token = localStorage.getItem("token");

            if (!token) {
                console.log("ingen giltig token");
                return;
            }

            //get all cats
            const response = await fetch("http://localhost:3000/cats", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            });

            const data = await response.json();

            //data from fetchAPi into cats[]
            this.cats = data;

            this.showAddCat = true;
        },

        async deleteCat(id) {
            //get token from localstorage
            const token = localStorage.getItem("token");

            //fetch api with id for deletion
            const response = await fetch("http://localhost:3000/cats" + id, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            });

            //response in data
            const data = await response.json();

            //load cat
            this.getCat();
        },
        async editCat(id) {

            //check if there is an id
            if (id) {
                //get token from localstorage
                const token = localStorage.getItem("token");

                //fetch api with id 
                const response = await fetch("http://localhost:3000/cats" + id, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    }
                });

                //response in data
                const data = await response.json();
                //save data in variable
                this.specificCat = data;

                //for showing component
                this.showEditCat = true;
            }
        },
        updateImage() { },
        //hiding component
        hideEditCat() {
            this.showEditCat = false;
        },
        updatedCat() {
            this.getCat();
        },
        //hide/show component
        toggleAddCat() {
            this.showAddCat = !this.showAddCat;
        },
        calculateAge(birthDate) {
            // calculate age based on birth

            //convert number to string
            if (typeof birthDate === 'number') {
                birthDate = birthDate.toString();
            } 

            // Extract year, month, and day from the birthDate string
            const year = parseInt(birthDate.substring(0, 4));
            const month = parseInt(birthDate.substring(4, 6)) - 1;
            const day = parseInt(birthDate.substring(6, 8));

            const today = new Date();

            const dateOfBirth = new Date(year, month, day);

            let age = today.getFullYear() - dateOfBirth.getFullYear();

            if (today.getMonth() < month || (today.getMonth() === month && today.getDate() < day)) {
                age--;
            }
            return age;
        }

    },
    mounted() {
        this.getCat();
        this.editCat();
    }
}
</script>

<style>
.hide-element {
    display: none;
}

.showCats {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.catsarticles {
    display: flex;
}
article img {
    max-height: 250px;
}
article {
    margin: 0px 15px 0px 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 5%;
}
article div button {
    margin: 0 5px 0 5px;
}
.cathead {
    text-align: center;
    margin-top: 2%;
    margin-bottom: 2%;
}
</style>