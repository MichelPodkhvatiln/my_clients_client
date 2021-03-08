<template>
  <MountingPortal mountTo="body" append>
    <modal
      name="master-change-password"
      height="auto"
      @before-open="beforeOpen"
    >
      <section class="section">
        <div class="field">
          <label class="label">New password</label>
          <div class="control">
            <input class="input" v-model="form.password" type="password" />
          </div>
        </div>

        <div class="field">
          <label class="label">Confirm password</label>
          <div class="control">
            <input
              class="input"
              v-model="form.confirmPassword"
              type="password"
            />
          </div>
        </div>

        <footer
          class="is-flex is-justify-content-flex-end is-align-items-center"
        >
          <div class="buttons">
            <button
              class="button is-success"
              :disabled="!isCanSubmit"
              @click="onSaveClick"
            >
              Save changes
            </button>
            <button class="button is-danger" @click="onCancel">
              Cancel
            </button>
          </div>
        </footer>
      </section>
    </modal>
  </MountingPortal>
</template>

<script>
import { required, sameAs, minLength } from "vuelidate/lib/validators";

export default {
  name: "MasterChangePasswordModal",
  data() {
    return {
      form: {
        password: "",
        confirmPassword: ""
      },
      masterId: null,
      onSave: undefined
    };
  },
  validations: {
    form: {
      password: {
        required,
        minLength: minLength(8)
      },
      confirmPassword: {
        sameAsPassword: sameAs("password")
      }
    }
  },
  computed: {
    isCanSubmit() {
      const isValidPassword = !this.$v.form.password.$invalid;
      const isValidConfirmPassword = !this.$v.form.confirmPassword.$invalid;

      return isValidPassword && isValidConfirmPassword;
    }
  },
  methods: {
    beforeOpen({ params }) {
      this.form = {
        password: "",
        confirmPassword: ""
      };
      this.masterId = params.masterId ?? null;
      this.onSave = params.onSave;
    },
    async onSaveClick() {
      if (!this.isCanSubmit) {
        return;
      }

      await this.onSave(this.masterId, { password: this.form.password });
    },
    onCancel() {
      this.$modal.hide("master-change-password");
    }
  }
};
</script>

<style scoped lang="scss"></style>
