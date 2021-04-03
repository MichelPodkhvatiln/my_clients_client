<template>
  <MountingPortal mountTo="body" append>
    <modal name="master-edit-email" height="auto" @before-open="beforeOpen">
      <section class="section">
        <div class="field">
          <label class="label">Новый email</label>
          <div class="control">
            <input class="input" v-model="form.email" type="email" />
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
              Сохранить изменения
            </button>
            <button class="button is-danger" @click="onCancel">
              Отмена
            </button>
          </div>
        </footer>
      </section>
    </modal>
  </MountingPortal>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";

export default {
  name: "MasterEmailEditModal",
  data() {
    return {
      form: {
        email: ""
      },
      masterId: null,
      onSave: undefined
    };
  },
  validations: {
    form: {
      email: {
        required,
        email
      }
    }
  },
  computed: {
    isCanSubmit() {
      return !this.$v.form.email.$invalid;
    }
  },
  methods: {
    beforeOpen({ params }) {
      this.form.email = params.email ?? "";
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
      this.$modal.hide("master-edit-email");
    }
  }
};
</script>

<style scoped lang="scss"></style>
