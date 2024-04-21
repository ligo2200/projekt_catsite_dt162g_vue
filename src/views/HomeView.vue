<script>
import Sidebar from '../components/Sidebar.vue';

export default {
    components: {
        Sidebar
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
