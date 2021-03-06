<template>
  <div class="box service" v-if="service">
    <div class="service__content--main">
      <p v-if="service.name" class="is-size-5 has-text-weight-semibold mr-1">
        {{ service.name }}
      </p>
      <p v-if="service.price" class="is-size-5 has-text-danger">
        {{ service.price }} ₴
      </p>
    </div>
    <div v-if="service.comment" class="service__content--comment">
      <p class="is-size-6 has-text-grey-dark">
        {{ service.comment }}
      </p>
    </div>

    <div class="service__content--buttons">
      <div class="buttons">
        <button class="button is-link" @click="onEditServiceClick">
          Edit
        </button>
        <button class="button is-danger" @click="onRemoveServiceClick">
          Remove
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "ServiceListItem",
  props: {
    service: {
      type: Object
    }
  },
  methods: {
    ...mapActions("servicesModule", ["removeService"]),
    onEditServiceClick() {
      this.$modal.show("service-modal", {
        mode: "edit",
        serviceId: this.service._id
      });
    },
    async onRemoveServiceClick() {
      if (!this.service._id) {
        return;
      }

      this.$modal.show("confirm-modal", {
        onConfirm: async () => {
          try {
            await this.removeService(this.service._id);
          } catch (error) {
            console.error(error);
          } finally {
            this.$modal.hide("confirm-modal");
          }
        },
        onCancel: () => {
          this.$modal.hide("confirm-modal");
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
.service {
  position: relative;

  &:hover {
    background-color: #f7faff;

    .service__content--buttons {
      opacity: 1;
    }
  }
}

.service__content--main {
  display: flex;
  align-items: center;
  line-height: 1;
}

.service__content--buttons {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  padding: 0 15px;
  height: 100%;
  opacity: 0;
  background-color: inherit;
  transition: opacity 0.15s ease-in;
}
</style>
