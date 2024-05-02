<script>
export default {
  data() {
    return {
      articles: [],
    };
  },
  methods: {
    async getArticles() {

      // get articles      
      const response = await fetch(`http://localhost:3000/articles`, {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        }
      });

      const data = await response.json();
      //data into variable articles
      this.articles = data;
    }
  },
  mounted() {
    this.getArticles();
  }
}

</script>

<template>
  <div class="divcont">
    <aside class="articleLinks">
      <div class="sidebarcont">
        <ul>
          <li v-for="article in articles" :key="article._id">
            <router-link :to="{ name: 'singlearticle', params: { id: article._id } }">{{ article.title }}</router-link>
          </li>
        </ul>
      </div>
    </aside>
    <div class="cont">
      <h2 class="head">Artiklar</h2>

      <div class="showArticles">
        <h3 class="">Alla artiklar</h3>
        <!--articles here-->
        <div class="articles">
          <article v-for="article in articles" :key="article._id">
            <h4 class="">{{ article.title }}</h4>
            <img v-if="article.image" :src="'http://localhost:3000/uploads/' + article.image" alt="artikelbild"
              height="300" class="img">
            <p>{{ article.content.substring(0, 150) }}...</p>
            <router-link :to="{ name: 'singlearticle', params: { id: article._id } }">Läs vidare</router-link>
            <hr>
          </article>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
h1 {
  text-align: center;
  margin-top: 2%;
}
.cont {
  text-align: center;
  width: 59%;
  margin-top: 2%;
}
.divcont {
  display: flex;
}
.articleLinks {
  width: 20%;
  margin-top: 1px;
}
ul {
    padding: 8%;
    background: rgba(0, 0, 0, 0.78);
    list-style: none;
    width: 100%;
    box-shadow: 0px 1px 5px rgb(49, 7, 73);
}
li a {
    margin-left: 5px;
    margin-right: 5px;
    transition: color 0.2s;
    padding: 2%;
    color: rgb(170, 103, 233);
}
li a:hover {
    color: white;
}
.articles {
  margin-top: 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
article {
  width: 50%;
  margin-bottom: 4%;
}
.img {
  border: 1px solid rgb(49, 7, 73);
}
</style>
