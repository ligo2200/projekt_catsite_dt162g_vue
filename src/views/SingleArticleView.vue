<script>
export default {
    props: ['id'],
    data() {
        return {
            article: []
        };
    },
    mounted() {
        this.getArticle();
    },
    methods: {
        async getArticle() {
            const response = await fetch(`http://localhost:3000/articles/${this.id}`);
            const data = await response.json();
            this.article = data;
        },
        goBack() {
            this.$router.go(-1);
        }
    }
}
</script>

<template>
    <main>
        <div>
            <h2>{{ article.title }}</h2>
            <p>{{ article.content }}</p>
            <img v-if="article.image" :src="'http://localhost:3000/uploads/' + article.image" alt="artikelbild" height="400" class="img">
        </div>
        <button @click="goBack">Tillbaka</button>
    </main>
</template>

<style scoped>
main {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 2%;
    margin-bottom: 2%;
}
main div {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 3%;
}
main div p {
    width: 60%;
}
img {
  border: 1px solid rgb(49, 7, 73);
}
</style>