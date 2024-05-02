<script>
import Sidebar from '../components/Sidebar.vue';

export default {
  components: {
    Sidebar
  },
  data() {
    return {
      userCats: [],
      user: []
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
      const response = await fetch(`http://localhost:3000/cats/user/${userId}`, {
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
    },
    async getUser() {

      //get token from localstorage
      const token = localStorage.getItem("token");

      // get userId from localstorage
      const userId = localStorage.getItem('userId');

      // get user      
      const response = await fetch(`http://localhost:3000/users/${userId}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json",
          "Content-Type": "application/json"
        }
      });

      const data = await response.json();
      //data into variable user
      this.user = data;
    }
  },
  mounted() {
    this.getUserCats();
    this.getUser();
  }
}

</script>

<template>
  <main>

    <Sidebar />

    <div class="cont-right">
      <h2>Hej {{ user.first_name }} och välkommen till din sida!</h2>
      <div class="cats">
        <h3>Dina katter</h3>
        <div class="catarticles">
          <article v-for="userCat in userCats" :key="userCat._id">
            <h4 class="">{{ userCat.name }}</h4>
            <img v-if="userCat.image" :src="'http://localhost:3000/uploads/' + userCat.image" alt="bild på katt" class="img">
            <div class="info">
              <p>Ras: {{ userCat.breed }}</p>
              <p>Färg: {{ userCat.color }}</p>
              <p>Ålder: {{ calculateAge(userCat.birth) }} år</p>
              <p>Personlighet: {{ userCat.description }}</p>
            </div>
          </article>
        </div>
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
  width: 30%;
  margin-top: -37px;
}

.cont-right {
  width: 40%;
  text-align: center;
}

.catarticles {
  display: flex;
  justify-content: space-evenly;
}

.img {
  border: 1px solid rgb(49, 7, 73);
}
.info {
  text-align: left;
  margin-left: 10px;
}
article {
  border: 2px solid rgb(49, 7, 73);
  padding: 4%;
  background-color: rgba(49, 7, 73, 0.1);
  box-shadow: 1px 1px 2px rgb(49, 7, 73);
  margin: 1% 2% 4% 2%;
}
</style>