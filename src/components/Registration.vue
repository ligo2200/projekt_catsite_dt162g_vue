<template>
    <div class="flex flex-col items-center w-full">
        <h1 class="font-medium text-2xl mt-8">Registrering</h1>
        <!--Form for registration of new users-->
        <div class="flex flex-col items-center my-6 mb-16 bg-seaweedgreen w-full md:w-3/4 lg:w-2/5 rounded-lg">
            <span class="text-green-500 mb-6 mt-4">{{ message6 }}</span>
            <span class="error text-red-500 mb-6">{{ message }}</span>
            <form @submit.prevent="addUser()" class="flex flex-col items-center">

                <label for="first_name" class="-mb-4 text-white">Förnamn:</label><br>
                <input v-model="newUser.first_name" type="text" id="first_name" name="first_name"
                    class="text-black p-1 focus:ring-yellow-600 rounded-md -mb-4">
                <br><span class="error text-red-500 -mt-4">{{ message1 }}</span>

                <br><br>
                <label for="last_name" class="-mb-4 text-white">Efternamn:</label><br>
                <input v-model="newUser.last_name" type="text" id="last_name" name="last_name"
                    class="text-black p-1 focus:ring-yellow-600 rounded-md -mb-4">
                <br><span class="error text-red-500 -mt-4">{{ message2 }}</span>

                <br><br>
                <label for="email" class="-mb-4 text-white">E-postadress:</label><br>
                <input v-model="newUser.email" type="email" id="email" name="email"
                    class="text-black p-1 focus:ring-yellow-600 rounded-md -mb-4">
                <br><span class="error text-red-500 -mt-4">{{ message3 }}</span>

                <br><br>
                <label for="username" class="-mb-4 text-white">användarnamn:</label><br>
                <input v-model="newUser.username" type="username" id="username" name="username"
                    class="text-black p-1 focus:ring-yellow-600 rounded-md -mb-4">
                <br><span class="error text-red-500 -mt-4">{{ message4 }}</span>


                <br><br>
                <label for="password" class="-mb-4 text-white">Lösenord:</label><br>
                <input v-model="newUser.password" type="password" id="password" name="password"
                    class="text-black p-1 focus:ring-yellow-600 rounded-md -mb-4">
                <br><span class="error text-red-500 text-center -mt-4">{{ message5 }}</span>


                <br><br>
                <input type="submit" value="Registrera"
                    class="p-2 w-2/4 self-center text-yellow-500 font-medium mb-8 hover:bg-yellow-700 hover:bg-opacity-30 hover:text-yellow-300 border-2 border-yellow-500 border-opacity-50 rounded-lg">

            </form>
        </div>
        <router-link to="/login"
            class="bg-seaweedgreen text-white text-center font-semibold border-2 border-seaweedgreen p-2 rounded-md mb-10 w-36 lg:w-1/6 hover:bg-yellow-500 hover:bg-opacity-30 hover:text-seaweedgreen"><button>Logga
                in</button></router-link>
    </div>
</template>


<script>
import { RouterLink } from 'vue-router';

export default {
    data() {
        return {
            newUser: {     // object with properties
                first_name: "",
                last_name: "",
                email: "",
                username: "",
                password: ""
            },
            message: "",
            message1: "",
            message2: "",
            message3: "",
            message4: "",
            message5: "",
            message6: ""
        };
    },
    components: {
        RouterLink
    },
    emits: ["userAdded"],
    methods: {
        async addUser() {  //method for adding new users


            //clear messages
            this.message = "";
            this.message1 = "";
            this.message2 = "";
            this.message3 = "";
            this.message4 = "";
            this.message5 = "";



            //variables with regex for checking email and password
            const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d{2,}).{8,}$/;

            if (this.newUser.first_name.length <= 2) { // check if written correctly in inputs

                this.message1 = "Kontrollera att du skrivit minst 2 tecken i fältet Förnamn.";

            }

            if (this.newUser.last_name.length <= 2) { // check if written correctly in inputs

                this.message2 = "Kontrollera att du skrivit minst 2 tecken i fältet Efternamn.";

            }

            if (!emailRegex.test(this.newUser.email)) {

                this.message3 = "Kontrollera att du skrivit in din email korrekt.";

            }

            if (this.newUser.username.length <= 2) {
                this.message4 = "Kontrollera att du skrivit in minst två tecken i fältet Användarnamn.";
            }

            if (!passwordRegex.test(this.newUser.password)) {

                this.message5 = "Kontrollera att lösenordet är minst 8 tecken långt. Kontrollera att du skrivit minst en stor bokstav, minst en liten bokstav samt minst två siffror i lösenordet.";

            }


            if (this.newUser.name.length > 3 && emailRegex.test(this.newUser.email) && passwordRegex.test(this.newUser.password)) {

                let UserBody = {
                    first_name: this.newUser.first_name,
                    last_name: this.newUser.last_name,
                    email: this.newUser.email,
                    username: this.newUser.username,
                    password: this.newUser.password
                };
                // Post new values to API with fetch
                const response = await fetch("http://localhost:3000/users", {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(UserBody)
                });

                const data = await response.json();

                //reset form
                this.newUser = {
                    first_name: "",
                    last_name: "",
                    email: "",
                    username: "",
                    password: ""
                };

                //message if user registrered correctly
                this.message6 = "Användare registrerad! Gå vidare till inloggningssidan för att logga in.";

                this.$emit("userAdded");

            } else {
                this.message = "Något gick fel, var god försök igen.";
            }

        }
    }
}

</script>