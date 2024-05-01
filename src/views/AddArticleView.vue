<script>
import AddArticle from '../components/AddArticle.vue';
import EditArticle from '../components/EditArticle.vue';

export default {
  data() {
      return {
          articles: [],
          specificArticle: [],
          showEditArticle: false,
          showAddArticle: false,
      }
  },
  components: {
      AddArticle,
      EditArticle,
  },
  methods: {
      async getArticle() {
          //get token from localstorage
          const token = localStorage.getItem("token");

          //if no token in localstorage
          if (!token) {
              console.log("ingen giltig token");
              return;
          }

          // get articles      
          const response = await fetch(`http://localhost:3000/articles`, {
              method: "GET",
              headers: {
                  "Authorization": `Bearer ${token}`,
                  "Accept": "application/json",
                  "Content-Type": "application/json"
              }
          });

          const data = await response.json();
          //data into variable articles
          this.articles = data;

          this.showAddArticle = true;
      },

      async deleteArticle(id) {
          //get token from localstorage
          const token = localStorage.getItem("token");

          //fetch api with id for deletion
          const response = await fetch("http://localhost:3000/articles/" + id, {
              method: "DELETE",
              headers: {
                  "Authorization": `Bearer ${token}`,
                  "Accept": "application/json",
                  "Content-Type": "application/json"
              }
          });

          //response in data
          const data = await response.json();

          //load article
          this.getArticle();
      },
      async editArticle(id) {

          //get userid from local storage
          const userId = localStorage.getItem("userId");

          //check if there is an id
          if (id && userId) {
              try {

                  //get token from localstorage
                  const token = localStorage.getItem("token");

                  //fetch api with id 
                  const response = await fetch(`http://localhost:3000/articles/${id}`, {
                      method: "GET",
                      headers: {
                          "Authorization": `Bearer ${token}`,
                          "Accept": "application/json",
                          "Content-Type": "application/json"
                      }
                  });

                  //response in data
                  const data = await response.json();

                  if (response.ok) {
                      //save data in variable
                      this.specificArticle = data;

                      //for showing component
                      this.showEditArticle = true;
                  } else {
                      console.error("kunde inte hämta artikel")
                  }


              } catch (error) {
                  console.error("Fel vid hämtning av artikeldata:", error);
              }
          } else {
              console.log('Något gick fel.');
          }
      },
      updateImage() { },
      //hiding component
      hideEditArticle() {
          this.showEditArticle = false;
      },
      updatedArticle() {
          this.getArticle();
      },
      //hide/show component
      toggleAddArticle() {
          this.showAddArticle = !this.showAddArticle;
      },
  },
  mounted() {
      this.getArticle();
  }
}
</script>

<template>
  <div class="">
      <h1 class="head">Artiklar</h1>

      <!--components for adding and updating articles here-->
      <div class="">
          <div :class="{ 'hide-element': !showAddArticle }" class="">
              <AddArticle v-show="showAddArticle" @articleAdded="getArticle()" @imageAdded="updateImage()" />
          </div>
          <div :class="{ 'hide-element': !showEditArticle }" class="">
              <EditArticle v-show="showEditArticle" :article="specificArticle" @updatedArticle="updatedArticle" @imageUpdated="updatedArticle()"
                  @hideEditArticle="hideEditArticle()" />
          </div>
          
      </div>

      <div class="showArticles">
          <h3 class="">Alla artiklar</h3>
          <!--articles here-->
          <div class="articles">
              <article v-for="article in articles" :key="article._id">
                  <h3 class="">{{ article.title }}</h3>
                  <img v-if="article.image" :src="'http://localhost:3000/uploads/' + article.image" alt="artikelbild">
                  <h4>Innehåll:</h4>
                  <p>{{ article.content }}</p>
                  <div>
                      <button @click="editArticle(article._id)">Ändra</button>
                      <button @click="deleteArticle(article._id)">Ta bort</button>
                  </div>
              </article>
          </div>
      </div>

  </div>
</template>

<style>
h1 {
    text-align: center;
    margin-top: 2%;
}
.hide-element {
  display: none;
}

.showArticles {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.articles {
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

.head {
  text-align: center;
  margin-top: 2%;
  margin-bottom: 2%;
}
</style>