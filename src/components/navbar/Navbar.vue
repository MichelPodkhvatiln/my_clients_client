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
        <router-link v-if="isAdmin" class="navbar-item" to="/admin">
          Admin Dashboard
        </router-link>
      </div>
      <div class="navbar-end">
        <div class="navbar-item">
          <template v-if="!isUserLogIn">
            <div class="buttons">
              <button class="button is-light" @click="onSignInClick">
                Sing In
              </button>
              <button class="button is-primary" @click="onSignUpClick">
                Sing Up
              </button>
            </div>
          </template>
          <template v-else>
            <button class="button is-light" @click="onLogOutClick">
              Log Out
            </button>
          </template>
        </div>
      </div>
    </div>

    <MountingPortal mountTo="body" append name="body">
      <modal name="auth-modal" height="auto" @closed="onModalClose">
        <auth-form :is-sign-in="isSignIn" :is-sign-up="isSignUp" />
      </modal>
    </MountingPortal>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import AuthForm from "@/components/forms/AuthForm.vue";

export default {
  name: "Navbar",
  components: {
    AuthForm,
  },
  data() {
    return {
      isSignIn: false,
      isSignUp: false,
      linkList: [
        {
          path: "/",
          title: "Home",
        },
        {
          path: "/about",
          title: "About",
        },
      ],
    };
  },
  computed: {
    ...mapGetters("userModule", ["isUserLogIn", "isAdmin"]),
  },
  methods: {
    ...mapActions("userModule", ["logOut"]),
    onModalClose() {
      this.isSignIn = false;
      this.isSignUp = false;
    },
    onSignInClick() {
      this.isSignIn = true;
      this.$modal.show("auth-modal");
    },
    onSignUpClick() {
      this.isSignUp = true;
      this.$modal.show("auth-modal");
    },
    onLogOutClick() {
      this.logOut();
    },
  },
};
</script>
