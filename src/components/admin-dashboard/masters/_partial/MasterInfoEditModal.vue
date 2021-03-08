<template>
  <MountingPortal mountTo="body" append>
    <modal name="master-edit-info" @before-open="beforeOpen">
      <section class="section">
        <div class="field">
          <label class="label">First name</label>
          <div class="control">
            <input class="input" v-model="form.firstName" type="text" />
          </div>
        </div>

        <div class="field">
          <label class="label">Last name</label>
          <div class="control">
            <input class="input" v-model="form.lastName" type="text" />
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
import { required } from "vuelidate/lib/validators";

export default {
  name: "MasterInfoEditModal",
  data() {
    return {
      form: {
        firstName: "",
        lastName: ""
      },
      masterId: null,
      onSave: undefined
    };
  },
  validations: {
    form: {
      firstName: {
        required
      },
      lastName: {
        required
      }
    }
  },
  computed: {
    isCanSubmit() {
      const isValidFirstName = !this.$v.form.firstName.$invalid;
      const isValidLastName = !this.$v.form.lastName.$invalid;

      return isValidFirstName && isValidLastName;
    }
  },
  methods: {
    beforeOpen({ params }) {
      this.form.firstName = params.firstName ?? "";
      this.form.lastName = params.lastName ?? "";
      this.masterId = params.masterId ?? null;
      this.onSave = params.onSave;
    },
    async onSaveClick() {
      if (!this.isCanSubmit) {
        return;
      }

      await this.onSave(this.masterId, this.form);
    },
    onCancel() {
      this.$modal.hide("master-edit-info");
    }
  }
};
</script>

<style scoped lang="scss"></style>
