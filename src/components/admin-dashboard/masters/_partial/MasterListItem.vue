<template>
  <div class="box master">
    <div class="master__avatar--wrapper has-background-primary">
      <avatar-icon class="master__avatar--icon" />
    </div>

    <div class="master__content--main">
      <p v-if="masterName" class="is-size-5 has-text-weight-semibold mb-2">
        {{ masterName }}
      </p>
      <p v-if="salonName" class="is-size-5 has-text-info">
        {{ salonName }}
      </p>
    </div>

    <div class="master__content--buttons">
      <div class="buttons">
        <button class="button is-link" @click="onEditClick">
          Edit
        </button>
        <button class="button is-danger">
          Remove
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import AvatarIcon from "@/components/icons/AvatarIcon.vue";

export default {
  name: "MasterListItem",
  props: {
    master: {
      type: Object,
      required: true
    }
  },
  components: {
    AvatarIcon
  },
  computed: {
    masterName() {
      if (!this.master) return "";

      const userInfo = this.master?.userInfo;

      if (!userInfo) {
        return "";
      }

      return `${userInfo.firstName} ${userInfo.lastName}`;
    },
    salonName() {
      if (!this.master) return "";

      const salonInfo = this.master?.salonInfo;

      if (!salonInfo) {
        return "";
      }

      return salonInfo.name;
    }
  },
  methods: {
    onEditClick() {
      if (!this.master) {
        return;
      }

      this.$router.push(`/admin/masters/${this.master.id}`);
    }
  }
};
</script>

<style scoped lang="scss">
.master {
  position: relative;
  padding: 10px 15px 10px 80px;
  min-height: 60px;

  &:hover {
    .master__content--buttons {
      opacity: 1;
    }
  }
}

.master__avatar--wrapper {
  position: absolute;
  top: 50%;
  left: 15px;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  overflow: hidden;
}

.master__avatar--icon {
  width: 40px;
  height: 40px;
  fill: #ffffff;
}

.master__content--main {
  line-height: 1;
}

.master__content--buttons {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  padding: 0 15px;
  height: 100%;
  opacity: 0;
  background-color: #ffffff;
  transition: opacity 0.15s ease-in;
}
</style>
