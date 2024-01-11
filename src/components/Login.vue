<template>
    <div class="flex flex-col items-center w-full">
        <h1 class="font-medium text-2xl mt-4">Logga in</h1>
        <!--Form for log in users-->
        <div class="flex flex-col items-center my-6 mb-16 bg-seaweedgreen w-full md:w-3/4 lg:w-2/5 rounded-lg">
            <!--<p class="text-green-500 mb-6">{{ message }}</p>-->
            <span class="error text-red-500 mt-6">{{ message }}</span>
            <form @submit.prevent="loginUser()" class="flex flex-col items-center">

                <br><br>
                <label for="email" class="-mb-4 text-white">Användarnamn:</label><br>
                <input v-model="login.username" type="username" id="username" name="username"
                    class="text-black p-1 focus:ring-yellow-600 rounded-md">

                <br><br>
                <label for="password" class="-mb-4 text-white">Lösenord:</label><br>
                <input v-model="login.password" type="password" id="password" name="password"
                    class="text-black p-1 focus:ring-yellow-600 rounded-md">


                <br><br>
                <button type="submit" value="Logga in"
                    class="p-2 w-2/3 self-center text-yellow-500 font-medium mb-5 hover:bg-yellow-700 hover:bg-opacity-30 hover:text-yellow-300 border-2 border-yellow-500 border-opacity-50 rounded-lg">Logga
                    in</button>
            </form>
        </div>
    </div>
</template>


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