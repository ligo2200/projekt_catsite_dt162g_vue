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
    <h1 class="font-medium text-2xl mt-10 mb-10">Välkommen till Catsite!</h1>
    <h2>- En webbplats för kattälskare där vi kan få skryta om våra pälsklingar för varandra!</h2>
    <Login @userLoggedin="onUserLoggedin" />
  <p class="mt-14">Inget konto?</p>
  <router-link to="/registration" class="underline mt-2 mb-36">Klicka här för att registrera ett nytt konto</router-link>

    
  </main>
</template>
