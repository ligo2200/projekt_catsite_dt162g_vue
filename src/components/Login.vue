<script>
import { useLoginStatusStore } from '@/stores/loginstatus.js';

export default {
    data() {
        return {
            login: {     // object with properties
                username: "",
                password: ""
            },
            message: ""
        };
    },
    computed: {
        loginStatus() {
            return useLoginStatusStore();
        },
    },
    emits: ["userLoggedin"],
    methods: {
        async loginUser() {  //method for logging in users

            //clear message
            this.message = "";

            //if nothing is sent from email and/or password input
            if (!this.login.username && !this.login.password) {

                this.message = "Något gick fel. Var god kontrollera att ditt användarnamn och lösenord stämmer.";

            } else {
                //if there is value in input fields
                let loginBody = {
                    username: this.login.username,
                    password: this.login.password
                };

                const response = await fetch("http://localhost:3000/users", {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    credentials: "include",
                    body: JSON.stringify(loginBody)
                });

                const data = await response.json();

                //use loginstatusStore from pinia
                const loginStatus = useLoginStatusStore();

                if (response.ok) {
                    //success, token saved in localStorage
                    localStorage.setItem("token", data.token);

                    this.$emit("userLoggedin");

                    loginStatus.login();
                    this.$router.push("/home");

                } else {

                    //message if log in failed
                    this.message = "Inloggningen misslyckades, var god försök igen."
                }

                //if login successful start automatic logout after 2 hours
                const logoutTimeout = setTimeout(() => {
                    const loginStatus = useLoginStatusStore();
                    loginStatus.logout();

                    //clear timeinterval when user logs out
                    clearTimeout(logoutTimeout);
                }, 60 * 60* 1000);
            }
        }
    }
}

</script>

<template>
    <div class="cont">
        <h3 class="">Logga in</h3>
        <!--Form for log in users-->
        <div class="cont1">
            <!--<p class="text-green-500 mb-6">{{ message }}</p>-->
            <span class="error text-red-500 mt-6">{{ message }}</span>
            <form @submit.prevent="loginUser()">

                <br>
                <label for="username">Användarnamn:</label>
                <input v-model="login.username" type="text" id="username" name="username">

                <label for="password">Lösenord:</label>
                <input v-model="login.password" type="password" id="password" name="password">
                
                <button type="submit" value="Logga in">Logga in</button>
            </form>
        </div>
    </div>
</template>

<style scoped>
.cont {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-top: 3%;
}
.cont1 {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 25%;
    border: 1px solid rgb(49, 7, 73);
    box-shadow: 0px 1px 5px rgb(49, 7, 73);
}
.error {
    color: red;
    font-size: 1.1rem;
}

</style>


