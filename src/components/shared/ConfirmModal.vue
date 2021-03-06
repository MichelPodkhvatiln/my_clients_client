<template>
  <MountingPortal mountTo="body" append>
    <modal
      name="confirm-modal"
      height="auto"
      @before-open="beforeOpen"
      @closed="closed"
    >
      <section class="confirm-modal">
        <header class="confirm-modal__header mb-2">
          <p class="title is-3 has-text-centered">
            {{ title }}
          </p>
        </header>

        <template v-if="text">
          <div class="confirm-modal__body mb-2">
            <p class="is-size-5 has-text-centered">
              {{ text }}
            </p>
          </div>
        </template>

        <footer class="confirm-modal__footer">
          <button v-if="onConfirm" class="button is-success" @click="onConfirm">
            Confirm
          </button>
          <button v-if="onCancel" class="button is-danger" @click="onCancel">
            Cancel
          </button>
        </footer>
      </section>
    </modal>
  </MountingPortal>
</template>

<script>
export default {
  name: "ConfirmModal",
  data() {
    return {
      title: undefined,
      text: undefined,
      onConfirm: undefined,
      onCancel: undefined
    };
  },
  methods: {
    beforeOpen({ params }) {
      this.title = params.title ?? "You are sure?";
      this.text = params.text;
      this.onConfirm = params.onConfirm;
      this.onCancel = params.onCancel;
    },
    closed() {
      this.onConfirm = undefined;
      this.onCancel = undefined;
    }
  }
};
</script>

<style scoped lang="scss">
.confirm-modal {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 10px 15px 60px 15px;
}

.confirm-modal__footer {
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 5px 10px;
  height: 60px;
  width: 100%;

  .button {
    width: 45%;
  }
}
</style>
