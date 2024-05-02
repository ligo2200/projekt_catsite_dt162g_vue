<script>
import Sidebar from '../components/Sidebar.vue';

export default {
  components: {
    Sidebar
  },
  data() {
    return {
      userCats: [],
      userArticles: []
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
    async getUserArticles() {
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
      const response = await fetch(`http://localhost:3000/articles/user/${userId}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json",
          "Content-Type": "application/json"
        }
      });

      const data = await response.json();
      //data into variable userCats
      this.userArticles = data;
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
  },
  mounted() {
    this.getUserCats();
    this.getUserArticles();
  }
}

</script>

<template>
  <div class="flex">
    <div class="sidebar">
      <Sidebar />
    </div>
    <main>
      <h2>Alla dina poster</h2>
      <div class="allposts">
        <div class="catposts">
          <h3>Katter</h3>
          <div class="flexcont catcont">
            <article v-for="userCat in userCats" :key="userCat._id" class="article catarticle">
              <h4 class="">{{ userCat.name }}</h4>
              <img v-if="userCat.image" :src="'http://localhost:3000/uploads/' + userCat.image" alt="bild på katt"
                height="300">
              <p>Ras: {{ userCat.breed }}</p>
              <p>Färg: {{ userCat.color }}</p>
              <p>Ålder: {{ calculateAge(userCat.birth) }} år</p>
              <p>Personlighet: {{ userCat.description }}</p>
            </article>
          </div>
        </div>
        <div class="articleposts">
          <h3>Artiklar</h3>
          <div class="flexcont">
            <article v-for="userArticle in userArticles" :key="userArticle._id" class="article">
              <h4 class="">{{ userArticle.title }}</h4>
              <img v-if="userArticle.image" :src="'http://localhost:3000/uploads/' + userArticle.image"
                alt="artikelbild" height="300">
              <p>{{ userArticle.content.substring(0, 50) }}...</p>
              <router-link :to="{ name: 'singlearticle', params: { id: userArticle._id } }">Läs mer</router-link>
            </article>
          </div>
        </div>

      </div>
    </main>
  </div>
</template>

<style scoped>
h2 {
  text-align: center;
  margin-top: 2%;
}

.catposts,
.articleposts {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 8%;
  flex-wrap: wrap;
}

.flexcont {
  display: flex;
  justify-content: center;
  width: 100%;
}

.article {
  margin: 0px 20px 0px 20px;
  border: 2px solid rgb(49, 7, 73);
  padding: 2%;
  border-radius: 10px;
  box-shadow: 1px 2px 6px rgb(49, 7, 73);
}

.sidebar {
  width: 30%;
  margin-top: 1px;
}
.flex {
  display: flex;
}
main {
  align-self: center;
  margin-top: 1%;
  border: 2px solid lime;
}
.allposts {
  margin-top: 5%;
}
img {
  border: 1px solid rgb(49, 7, 73);
}
</style>