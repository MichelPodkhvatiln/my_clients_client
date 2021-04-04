<template>
  <nav class="navbar is-dark app-navbar">
    <div class="navbar-menu">
      <div class="navbar-start">
        <router-link
          v-for="link in linkList"
          :key="link.path"
          class="navbar-item"
          :class="{ 'is-active': currentRoute === link.path }"
          :to="link.path"
        >
          {{ link.title }}
        </router-link>
        <router-link
          v-if="isAdmin"
          class="navbar-item"
          :class="{ 'is-active': isAdminPages }"
          to="/admin"
        >
          Кабинет администратора
        </router-link>
      </div>
      <div class="navbar-end">
        <template v-if="isUserLogIn">
          <div class="navbar-item">
            <span> Здравствуйте, {{ username }}! </span>
          </div>
        </template>

        <div class="navbar-item">
          <template v-if="!isUserLogIn">
            <div class="buttons">
              <button class="button is-light" @click="onSignInClick">
                Войти
              </button>
              <button class="button is-primary" @click="onSignUpClick">
                Регистрация
              </button>
            </div>
          </template>
          <template v-else>
            <button class="button is-light" @click="onLogOutClick">
              Выйти
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
    AuthForm
  },
  data() {
    return {
      isSignIn: false,
      isSignUp: false,
      linkList: [
        {
          path: "/",
          title: "Главная"
        },
        {
          path: "/contact",
          title: "Обратная связь"
        },
        {
          path: "/record",
          title: "Записаться"
        }
      ]
    };
  },
  computed: {
    ...mapGetters("userModule", ["username", "isUserLogIn", "isAdmin"]),
    currentRoute() {
      return this.$route.path;
    },
    isAdminPages() {
      return this.currentRoute.includes("admin");
    }
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
    }
  }
};
</script>

<style scoped lang="scss">
.app-navbar {
  box-shadow: 0 3px 4px 0 rgba(#000000, 0.2), 0 3px 3px -2px rgba(#000000, 0.14),
    0 1px 8px 0 rgba(#000000, 0.12);
}
</style>
