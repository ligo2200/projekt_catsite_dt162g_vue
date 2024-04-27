<script>
import Sidebar from '../components/Sidebar.vue';

export default {
  components: {
    Sidebar
  },
  data() {
    return {
      userCats: [],
    }
  },
  methods: {
    async getUserCats() {
      //get token from localstorage
      const token = localStorage.getItem("token");

      //if no token in localstorage
      if (!token) {
        console.log("ingen giltig token");
        return;
      }

      // get userId from localstorage
      const userId = localStorage.getItem('userId');

      // if userId not in localstorage 
      if (!userId) {
        console.log("Användar-ID saknas i localStorage");
        return;
      }
      

      // get users cats      
      const response = await fetch(`http://localhost:3000/cats/${userId}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json",
          "Content-Type": "application/json"
        }
      });

      const data = await response.json();
      //data into variable userCats
      this.userCats = data;
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
    this.getUserCats();
  }
}

</script>

<template>
  <main>

    <Sidebar />

    <div class="cont-right">
      <h2>Hej och välkommen till din sida!</h2>
      <div class="latest">
        <h3>Dina katter</h3>
        <article v-for="userCat in userCats" :key="userCat._id">
          <h3 class="">{{ userCat.name }}</h3>
          <img v-if="userCat.image" :src="'http://localhost:3000/uploads/' + userCat.image" alt="bild på katt">
          <p>Ras: {{ userCat.breed }}</p>
          <p>Färg: {{ userCat.color }}</p>
          <p>Ålder: {{ calculateAge(userCat.birth) }} år</p>
          <p>Personlighet: {{ userCat.description }}</p>
          
        </article>
      </div>
    </div>

  </main>
</template>

<style scoped>
main {
  display: flex;
  margin-top: 2%;
}

aside {
  width: 20%;
}

.cont-right {
  width: 60%;
  text-align: center;
}
</style>