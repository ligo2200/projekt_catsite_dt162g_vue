<template>
    <div class="">
        <h1 class="">Katter</h1>

        <!--components for adding and updating cat here-->
        <div class="">
            <div :class="{ 'hide-element': !showAddCat }" class="">
                <AddCat v-show="showAddCat" @catAdded="getCat()" @imageAdded="updateImage()" />
            </div>
            <div :class="{ 'hide-element': !showEditCat }" class="">
                <EditCat v-show="showEditCat" :cat="specificCat" @updatedCat="updatedCat" @imageUpdated="updatedCat()"
                    @hideEditCat="hideEditCat()" />
            </div>
            <button @click="toggleAddCat" class="">Lägg till katt</button>
        </div>

        <div class="">
            <h2 class="">Alla Katter</h2>
            <!--articles here with cats-->
            <div class="">
                <article v-for="cat in cats" :key="cat._id">
                    <h3 class="">{{ cat.name }}</h3>
                    <img v-if="cat.image" :src="cat.image" :alt="cat.name">
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

            //data from fetchAPi into cat[]
            this.cats = data;

            this.showAddCat = false;
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

            //load fish
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
            const today = new Date();
            const dateOfBirth = new Date(birthDate);
            let age = today.getFullYear() - dateOfBirth.getFullYear();
            const monthDiff = today.getMonth() - dateOfBirth.getMonth();
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dateOfBirth.getDate())) {
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

<style scoped>
.hide-element {
    display: none;
}
</style>