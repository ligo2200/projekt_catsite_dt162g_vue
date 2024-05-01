<script>

</script>

<template>
  <div class="">
      <h1 class="head">Artiklar</h1>

      <div class="showArticles">
          <h3 class="">Alla artiklar</h3>
          <!--articles here-->
          <div class="articles">
              <article v-for="article in articles" :key="article._id">
                  <h3 class="">{{ article.title }}</h3>
                  <img v-if="article.image" :src="'http://localhost:3000/uploads/' + article.image" alt="artikelbild">
                  <h4>Innehåll:</h4>
                  <p>{{ article.content }}</p>
              </article>
          </div>
      </div>

  </div>
</template>

<style scoped>
h1 {
    text-align: center;
    margin-top: 2%;
}
</style>
