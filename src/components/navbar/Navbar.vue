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
            <custom-button text="SignIn" color="light" @click="onSignInClick" />
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
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
    onSignInClick() {
      console.log("click");
      this.$modal.show("sign-in-modal");
    }
  }
};
</script>
