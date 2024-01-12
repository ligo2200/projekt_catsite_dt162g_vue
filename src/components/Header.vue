<script>
import { RouterLink } from 'vue-router';
import { useLoginStatusStore } from '@/stores/loginstatus.js';

export default {
    name: "Header",
    components: {
        RouterLink
    },
    data() {
        return {
            loginStatusStore: useLoginStatusStore()
        };
    },
    methods: {
        async logout() {

            try {

                //get token from local storage
                let token = localStorage.getItem("token");

                // if token exists
                if (token) {
                    // remove token and set loginStatusStore.isLoggedIn to false
                    localStorage.removeItem("token");
                    this.loginStatusStore.isLoggedIn = false;
                    this.$router.push("login");
                } else {
                    // Handle logout failure
                    console.error('Logout failed: Token not found');
                }

            } catch (error) {
                console.error('Logout failed:', error.message);
            }

        }
    },
    async created() {

        this.loginStatusStore.checkLoginStatus();
    }
}

</script>

<template>
    <header class="my-header">

        <!--if user is logged in-->
        <div v-if="loginStatusStore.isLoggedIn" class="loggedin-header">
            <div class="logotyp">
                <RouterLink to="/home"><img src="@/assets/images/logotyp_tass_100.svg"></RouterLink>
            </div>
            <div class="heading">
                <h1>Catsite</h1>
            </div>

            <nav>
                <ul>
                    <li>
                        <RouterLink to="/home">Hem</RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/login" @click="logout">Logga ut</RouterLink>
                    </li>
                </ul>
            </nav>
        </div>
        <!--if user is not logged in-->
        <div v-else class="loggedout-header">
            <div class="logotyp">
                <RouterLink to="/"><img src="@/assets/images/logotyp_tass_100.svg"></RouterLink>
            </div>
            <div class="heading">
                <h1>Catsite</h1>
            </div>
            <nav>
                <ul>
                    <li>
                        <RouterLink to="/about">Artiklar</RouterLink>
                        <RouterLink to="/about">Om</RouterLink>
                        <RouterLink to="/registration">Registrera</RouterLink>
                    </li>
                </ul>
            </nav>
        </div>


    </header>
</template>

<style scoped>
header {
    display: flex;
    background: rgba(0, 0, 0, 0.78);
    padding: 1%;
    box-shadow: 0px 1px 8px rgb(49, 7, 73);
}

.loggedout-header {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: end;
}

.heading h1 {
    margin-bottom: -4px;
    margin-left: 40%;
}

nav {
    padding: 1%;
}

li {
    list-style: none;
    margin-bottom: -45px;
}

li a {
    margin-left: 5px;
    margin-right: 5px;
    transition: background-color 0.4s;
    padding: 2%;
    color: rgb(170, 103, 233);
}

li a:hover {
    background-color: rgba(173, 30, 255, 0.4);
    color: white;
}
</style>

