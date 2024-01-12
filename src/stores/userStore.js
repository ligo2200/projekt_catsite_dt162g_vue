import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
  }),
  actions: {
    loginUser(user) {
      this.user = user;
    },
  },
  getters: {
    loggedInUser() {
      return this.user;
    },
  },
});