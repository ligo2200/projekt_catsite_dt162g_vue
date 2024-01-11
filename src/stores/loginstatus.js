import { defineStore } from 'pinia';

export const useLoginStatusStore = defineStore('loginStatus', {
    state: () => ({
        isLoggedIn: false,
    }),
    actions: {
        checkLoginStatus() {

            const token = localStorage.getItem("token");

            if (token === null) {
                this.isLoggedIn = false;
            } else {
                this.isLoggedIn = true;
            }
        },
        login() {
            this.isLoggedIn = true;
        },
        logout() {
            this.isLoggedIn = false;
        }
    }
});
