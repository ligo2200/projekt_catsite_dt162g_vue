<script>
import { RouterLink } from 'vue-router';

export default {
    data() {
        return {
            isRegistered: false,
            newUser: {     // object with properties
                first_name: "",
                last_name: "",
                username: "",
                password: ""
            },
            message: "",
            message1: "",
            message2: "",
            message3: "",
            message4: "",
            message5: ""
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


            //variables with regex for checking password
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d{2,}).{8,}$/;

            if (this.newUser.first_name.length <= 2) { // check if written correctly in inputs
                this.message1 = "Kontrollera att du skrivit minst 2 tecken i fältet Förnamn.";
            }

            if (this.newUser.last_name.length <= 2) { // check if written correctly in inputs
                this.message2 = "Kontrollera att du skrivit minst 2 tecken i fältet Efternamn.";
            }

            if (this.newUser.username.length <= 2) {
                this.message3 = "Kontrollera att du skrivit in minst två tecken i fältet Användarnamn.";
            }

            if (!passwordRegex.test(this.newUser.password)) {
                this.message4 = "Kontrollera att lösenordet är minst 8 tecken långt. Kontrollera att du skrivit minst en stor bokstav, minst en liten bokstav samt minst två siffror i lösenordet.";
            }

            if (passwordRegex.test(this.newUser.password)) {

                let UserBody = {
                    first_name: this.newUser.first_name,
                    last_name: this.newUser.last_name,
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
                    username: "",
                    password: ""
                };

                console.log(data);

                if (response.ok) {
                    this.isRegistered = true;

                    //message if user registrered correctly
                    this.message5 = "Användare registrerad! Gå vidare till inloggningssidan för att logga in.";

                    this.$emit("userAdded");
                } else {
                    console.error("Något gick fel, försök igen!")
                }

                

            } else {
                console.error("Något gick fel, var god försök igen.");
                this.message = "Något gick fel, var god försök igen.";
            }
        }
    }
}

</script>

<template>
    <div class="cont">
        <h2>Registrering</h2>
        <!--Form for registration of new users-->
        <div class="cont1" v-if="isRegistered==false">
            <br>
            <span class="message">{{ message5 }}</span>
            <span class="error">{{ message }}</span>
            <form @submit.prevent="addUser()" class="flex flex-col items-center">

                <br>
                <label for="first_name">Förnamn:</label>
                <input v-model="newUser.first_name" type="text" id="first_name" name="first_name">
                <span class="error">{{ message1 }}</span><br><br>

                <label for="last_name">Efternamn:</label>
                <input v-model="newUser.last_name" type="text" id="last_name" name="last_name">
                <span class="error">{{ message2 }}</span><br><br>

                <label for="username">Användarnamn:</label>
                <input v-model="newUser.username" type="text" id="username" name="username">
                <span class="error">{{ message3 }}</span><br><br>

                <label for="password">Lösenord:</label>
                <input v-model="newUser.password" type="password" id="password" name="password">
                <span class="error">{{ message4 }}</span><br><br>
                <div class="submitbutton">
                    <input type="submit" value="Registrera" role="button" class="submitbtn">
                </div>


            </form>
        </div>
        <div class="cont2" v-else>
            <span class="message">Du har blivit registrerad!</span>
            <span class="message">Du kan nu logga in!</span>
            <router-link to="/" class="login"><button>Logga in</button></router-link>
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
    margin-bottom: 3%;
    text-align: center;
}

.cont1 {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 35%;
    border: 1px solid rgb(49, 7, 73);
    box-shadow: 0px 1px 5px rgb(49, 7, 73);
}

.login {
    margin-top: 2%;
}

.error {
    color: red;
    font-size: 1.1em;
    display: block;
}

.message {
    color: green;
    font-size: 1.1em;
    display: block;
    background-color: rgba(0, 128, 0, 0.1);
    padding: 5px 10px 5px 10px;
}

form {
    width: 80%;
    text-align: left;
}

form input {
    width: 100%;
    box-shadow: 1px 1px 1px rgb(95, 95, 95) inset;
}

.submitbutton {
    width: 30% !important;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.submitbtn {
    width: 30%;
    box-shadow: none;
}
.cont2 button {
    margin-top: 15%;
}
.cont2 {
    margin-bottom: 17%;
}
@media screen and (max-width: 650px) {
    .submitbtn {
    width: 100%;
   }
   .cont1 {
    width: 80%;
   }
  }
  
  @media screen and (min-width: 651px) and (max-width: 999px) {
    .submitbtn {
    width: 100%;
   }
   .cont1 {
    width: 60%;
   }
  }
  
  @media screen and (min-width: 1000px) and (max-width: 1400px) {
   .submitbtn {
    width: 100%;
   }
  }
  
  @media screen and (min-width: 1401px) and (max-width: 1800px) {
    .submitbtn {
    width: 40%;
   }
  }
</style>
