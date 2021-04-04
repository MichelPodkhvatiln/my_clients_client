<template>
  <section class="p-4">
    <header class="mb-4">
      <p class="is-size-5 has-text-centered has-text-weight-semibold">
        {{ modeText.title }}
      </p>
    </header>
    <div class="mb-4">
      <div class="field">
        <label class="label">Название сервиса</label>
        <div class="control">
          <input class="input" v-model="form.name" type="text" />
        </div>
      </div>
      <div class="field">
        <label class="label">Цена</label>
        <div class="control">
          <input class="input" v-model="form.price" type="number" />
        </div>
      </div>
      <div class="field">
        <label class="label">Описание</label>
        <div class="control">
          <textarea class="textarea has-fixed-size" v-model="form.comment" />
        </div>
      </div>
    </div>
    <footer class="is-flex is-justify-content-flex-end">
      <div class="buttons">
        <button
          class="button is-success"
          :disabled="!canSubmit"
          @click="onSaveClick"
        >
          {{ modeText.submit }}
        </button>
        <button class="button is-danger" @click="onCancelClick">
          Отмена
        </button>
      </div>
    </footer>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { required, minValue } from "vuelidate/lib/validators";

export default {
  name: "ServiceForm",
  props: {
    mode: {
      required: true,
      validator: function(value) {
        return ["add", "edit"].indexOf(value) !== -1;
      }
    },
    serviceId: {
      type: String
    }
  },
  data() {
    return {
      form: {
        name: "",
        price: 0,
        comment: ""
      }
    };
  },
  beforeMount() {
    if (!this.serviceId) {
      return;
    }

    this.loadServiceData();
  },
  validations: {
    form: {
      name: {
        required
      },
      price: {
        required,
        minValue: minValue(1)
      }
    }
  },
  computed: {
    ...mapGetters("servicesModule", ["servicesList"]),
    isAddMode() {
      return this.mode === "add";
    },
    modeText() {
      return {
        title: this.isAddMode ? "Добвление сервиса" : "Редактирование сервиса",
        submit: this.isAddMode ? "Добавить" : "Сохранить изменения"
      };
    },
    canSubmit() {
      return this.isAddMode ? this.canAddService : this.canSaveChanges;
    },
    canAddService() {
      const isValidName = !this.$v.form.name.$invalid;
      const isValidPrice = !this.$v.form.price.$invalid;

      return isValidName && isValidPrice;
    },
    canSaveChanges() {
      const isValidData =
        !this.$v.form.name.$invalid && !this.$v.form.price.$invalid;

      if (!isValidData) {
        return false;
      }

      const serviceData = this.servicesList.find(
        service => service._id === this.serviceId
      );

      if (!serviceData) {
        return false;
      }

      const isChangedName = this.form.name !== serviceData.name;
      const isPriceName = Number(this.form.price) !== serviceData.price;
      const isChangedComment = this.form.comment !== serviceData.comment;

      return isChangedName || isPriceName || isChangedComment;
    }
  },
  methods: {
    ...mapActions("servicesModule", ["createNewService", "updateService"]),
    loadServiceData() {
      const serviceData = this.servicesList.find(
        service => service._id === this.serviceId
      );

      if (!serviceData) {
        return;
      }

      this.form.name = serviceData.name;
      this.form.price = serviceData.price;
      this.form.comment = serviceData?.comment ?? "";
    },
    async onSaveClick() {
      try {
        if (this.isAddMode) {
          await this.createNewService(this.form);
        } else {
          await this.updateService({ id: this.serviceId, formData: this.form });
        }

        this.$modal.hide("service-modal");
      } catch (error) {
        console.error(error);
      }
    },
    onCancelClick() {
      this.$modal.hide("service-modal");
    }
  }
};
</script>
