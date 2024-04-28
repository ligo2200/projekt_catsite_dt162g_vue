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
    <div class="box">
      <h1>Välkommen till Catsite!</h1>
      <h2 class="">- En webbplats för kattälskare!</h2>
      <Login @userLoggedin="onUserLoggedin" />
      <p>Inget konto?</p>
      <router-link to="/registration" class="reg">Klicka här för att registrera ett nytt konto</router-link>
    </div>
  </main>
</template>

<style scoped>
main {
  text-align: center;
  background-image: url("@/assets/images/header_1920_white.jpg");
}
.box {
  padding-bottom: 2%;
}
.box h1 {
  padding: 2%;
  color: rgb(61, 61, 61);
}
.box h2 {
  margin-top: -2%;
  color: rgb(61, 61, 61);
}
.box a {
  padding: 2px 6px 2px 6px;
  font-weight: 600;
}
.box a:hover {
  background-color: rgba(138, 43, 226, 0.2);
}
p {
  color: black;
  margin-top: 1%;
  margin-bottom: -0.1%;
}
</style>
