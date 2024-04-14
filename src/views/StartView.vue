<script>
import Login from '../components/Login.vue';

export default {
    components: {
        Login
    },
    methods: {
        onUserLoggedin() {
            this.$emit("userLoggedin");
        }
    }
}


</script>

<template>
  <main>
    <h1>Välkommen till Catsite!</h1>
    <h2 class="text-sm lg:text-base">- En webbplats för kattälskare!</h2>
    <Login @userLoggedin="onUserLoggedin" />
  <p>Inget konto?</p>
  <router-link to="/registration" class="reg">Klicka här för att registrera ett nytt konto</router-link>

  <img src="@/assets/images/header_1920.webp" alt="bild på liggande katt med blåa ögon.">
  </main>
</template>

<style scoped>
main {
  text-align: center;
  margin-top: 4%;
  margin-bottom: -0.4%;
}
p {
  margin-top: 1%;
  margin-bottom: -0.1%;
}
img {
  margin-top: 4%;
}
</style>
