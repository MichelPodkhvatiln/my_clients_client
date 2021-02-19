<template>
  <section class="auth-form__container">
    <header class="auth-form__header">
      <span class="auth-form__header--title">
        {{ formMainText }}
      </span>
    </header>
    <div class="auth-form__body">
      <template v-if="isSignUp">
        <div class="field">
          <label class="label">Username</label>
          <div class="control">
            <input
              class="input"
              v-model="form.username"
              type="text"
              placeholder="e.g. Alex"
            />
          </div>
        </div>
      </template>

      <div class="field">
        <label class="label">Email</label>
        <div class="control">
          <input
            class="input"
            v-model="form.email"
            type="email"
            placeholder="e.g. alex@example.com"
          />
        </div>
      </div>

      <div class="field">
        <label class="label">Password</label>
        <div class="control">
          <input
            class="input"
            v-model="form.password"
            type="password"
            placeholder="********"
          />
        </div>
      </div>
    </div>
    <footer class="auth-form__footer">
      <div class="buttons">
        <button class="button is-link" :disabled="!canSubmit" @click="onSubmit">
          {{ formMainText }}
        </button>
      </div>
    </footer>
  </section>
</template>

<script>
import { mapActions } from "vuex";
import { required, minLength, email } from "vuelidate/lib/validators";

export default {
  name: "AuthForm",
  props: {
    isSignIn: {
      type: Boolean,
      default: false,
    },
    isSignUp: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      form: {
        email: "",
        password: "",
        username: "",
      },
    };
  },
  validations: {
    form: {
      email: {
        required,
        email,
      },
      password: {
        required,
        minLength: minLength(8),
      },
      username: {
        required,
      },
    },
  },
  computed: {
    formMainText() {
      if (this.isSignIn) {
        return "Sign In";
      }

      if (this.isSignUp) {
        return "Sign Up";
      }

      return "";
    },
    canSubmit() {
      if (this.isSignIn) {
        return this.canStartSignIn;
      }

      if (this.isSignUp) {
        return this.canStartSignUp;
      }

      return false;
    },
    canStartSignIn() {
      const isValidEmail = !this.$v.form.email.$invalid;
      const isValidPassword = !this.$v.form.password.$invalid;

      return isValidEmail && isValidPassword;
    },
    canStartSignUp() {
      const isValidUsername = !this.$v.form.username.$invalid;
      const isValidEmail = !this.$v.form.email.$invalid;
      const isValidPassword = !this.$v.form.password.$invalid;

      return isValidUsername && isValidEmail && isValidPassword;
    },
  },
  methods: {
    ...mapActions("userModule", ["login"]),
    async onSubmit() {
      if (this.isSignIn) {
        const credentials = {
          email: this.form.email,
          password: this.form.password,
        };

        try {
          await this.login(credentials);
          this.$modal.hide("auth-modal");
        } catch (error) {
          console.error(error);
        }
      }

      // if (this.isSignUp) {
      //   const signUpData = {
      //     username: this.form.username,
      //     email: this.form.email,
      //     password: this.form.password,
      //   };
      //
      //   try {
      //     await this.signUp(signUpData);
      //     this.$modal.hide("auth-modal");
      //   } catch (error) {
      //     console.error(error);
      //   }
      // }
    },
  },
};
</script>

<style scoped lang="scss">
.auth-form__container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 15px 20px;
  width: 100%;
  height: 100%;
}

.auth-form__header {
  color: black;
  text-align: center;
}

.auth-form__header--title {
  font-size: 1.5rem;
}

.auth-form__body {
  margin-bottom: 20px;
}

.auth-form__footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>
