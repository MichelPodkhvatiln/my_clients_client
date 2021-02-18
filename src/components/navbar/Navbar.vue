<template>
  <nav class="navbar is-dark">
    <div class="navbar-menu">
      <div class="navbar-start">
        <router-link
          v-for="link in linkList"
          :key="link.path"
          class="navbar-item"
          :to="link.path"
        >
          {{ link.title }}
        </router-link>
      </div>
      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <button class="button is-light" @click="onSignInClick">
              Sing In
            </button>
            <button class="button is-primary" @click="onSignUpClick">
              Sing Up
            </button>
          </div>
        </div>
      </div>
    </div>

    <modal name="sign-in-modal" height="auto" @closed="onModalClose">
      <auth-form :is-sign-in="isSignIn" :is-sign-up="isSignUp" />
    </modal>
  </nav>
</template>

<script>
import AuthForm from "@/components/forms/AuthForm.vue";

export default {
  name: "Navbar",
  components: {
    AuthForm
  },
  data() {
    return {
      isSignIn: false,
      isSignUp: false,
      linkList: [
        {
          path: "/",
          title: "Home"
        },
        {
          path: "/about",
          title: "About"
        }
      ]
    };
  },
  methods: {
    onModalClose() {
      this.isSignIn = false;
      this.isSignUp = false;
    },
    onSignInClick() {
      this.isSignIn = true;
      this.$modal.show("sign-in-modal");
    },
    onSignUpClick() {
      this.isSignUp = true;
      this.$modal.show("sign-in-modal");
    }
  }
};
</script>
