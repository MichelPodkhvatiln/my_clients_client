<template>
  <section class="p-4">
    <header class="mb-4">
      <template v-if="isAddMode">
        <p class="is-size-5 has-text-centered has-text-weight-semibold">
          Добавление услуги
        </p>
      </template>
    </header>
    <div class="mb-4">
      <div class="field">
        <label class="label">Название</label>
        <div class="control">
          <input class="input" v-model="form.name" type="text" />
        </div>
      </div>
      <div class="field">
        <label class="label">Стоимость</label>
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
        <button class="button is-success" @click="onSaveClick">
          Сохранить
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
  computed: {
    ...mapGetters("servicesModule", ["servicesList"]),
    isAddMode() {
      return this.mode === "add";
    }
  },
  methods: {
    ...mapActions("servicesModule", ["createNewService"]),
    loadServiceData() {
      const serviceData = this.servicesList.find(
        service => service._id === this.serviceId
      );

      if (!serviceData) {
        return;
      }

      this.formData.name = serviceData.name;
      this.formData.price = serviceData.price;
      this.formData.comment = serviceData?.comment ?? "";
    },
    async onSaveClick() {
      try {
        if (this.isAddMode) {
          await this.createNewService(this.form);
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
