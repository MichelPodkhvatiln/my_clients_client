<template>
  <modal
    name="master-modal"
    :minWidth="600"
    height="auto"
    :clickToClose="false"
    @before-open="beforeOpen"
  >
    <section class="master-form">
      <div class="tabs">
        <ul>
          <li
            :class="{ 'is-active': this.activeTab === 1 }"
            @click.prevent="changeActiveTab(1)"
          >
            <a>Profile</a>
          </li>
          <li
            :class="{ 'is-active': this.activeTab === 2 }"
            @click.prevent="changeActiveTab(2)"
          >
            <a>Salon</a>
          </li>
          <li
            :class="{ 'is-active': this.activeTab === 3 }"
            @click.prevent="changeActiveTab(3)"
          >
            <a>Services</a>
          </li>
        </ul>
      </div>

      <div class="block">
        <template v-if="activeTab === 1">
          <div class="field">
            <label class="label">First name</label>
            <div class="control">
              <input
                class="input"
                type="text"
                v-model="editedData.editableMasterInfo.firstName"
                placeholder="First name"
              />
            </div>
          </div>

          <div class="field">
            <label class="label">Last name</label>
            <div class="control">
              <input
                class="input"
                type="text"
                v-model="editedData.editableMasterInfo.lastName"
                placeholder="Last name"
              />
            </div>
          </div>

          <div class="field">
            <label class="label">Email</label>
            <div class="control">
              <input
                class="input"
                type="email"
                v-model="editedData.editableMasterInfo.email"
                placeholder="Email"
              />
            </div>
          </div>

          <div class="field">
            <label class="label">New password</label>
            <div class="control">
              <input
                class="input"
                type="password"
                v-model="editedData.editableMasterInfo.newPassword"
                placeholder="New password"
              />
            </div>
          </div>
        </template>

        <template v-if="activeTab === 2">
          <div class="field">
            <label class="label">Master salon</label>
            <div class="select">
              <select @change="onChangeSalon">
                <option value="null">None</option>
                <option
                  v-for="salon in salonsWithStatus"
                  :key="salon._id"
                  :value="salon._id"
                  :selected="salon.isSelected"
                >
                  {{ salon.name }}
                </option>
              </select>
            </div>
          </div>
          <div class="field">
            <span class="is-5">
              Days:
            </span>
            <br />

            <label class="checkbox">
              <input
                type="checkbox"
                v-model.number="editedData.masterDays"
                value="1"
              />
              Monday
            </label>
            <label class="checkbox">
              <input
                type="checkbox"
                v-model.number="editedData.masterDays"
                value="2"
              />
              Tuesday
            </label>
            <label class="checkbox">
              <input
                type="checkbox"
                v-model.number="editedData.masterDays"
                value="3"
              />
              Wednesday
            </label>
            <label class="checkbox">
              <input
                type="checkbox"
                v-model.number="editedData.masterDays"
                value="4"
              />
              Thursday
            </label>
            <label class="checkbox">
              <input
                type="checkbox"
                v-model.number="editedData.masterDays"
                value="5"
              />
              Friday
            </label>
            <label class="checkbox">
              <input
                type="checkbox"
                v-model.number="editedData.masterDays"
                value="6"
              />
              Saturday
            </label>
            <label class="checkbox">
              <input
                type="checkbox"
                v-model.number="editedData.masterDays"
                value="7"
              />
              Sunday
            </label>
          </div>
        </template>

        <template v-if="activeTab === 3">
          {{ editedData.masterDays }}
        </template>
      </div>

      <footer class="master-form__footer">
        <div class="buttons">
          <button class="button is-success">
            Save changes
          </button>
          <button class="button is-danger" @click="onCancelClick">
            Cancel
          </button>
        </div>
      </footer>
    </section>
  </modal>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "MasterModal",
  data() {
    return {
      initialData: {
        masterInfo: null,
        salonsInfo: null
      },
      editedData: {
        editableMasterInfo: {
          firstName: "",
          lastName: "",
          email: "",
          newPassword: ""
        },
        newSalonId: null,
        masterDays: []
      },
      activeTab: 1 //1, 2, 3
    };
  },
  computed: {
    salonsWithStatus() {
      if (!this.initialData.salonsInfo?.length) {
        return [];
      }

      const masterSalonId = this.initialData.masterInfo?.salon?._id;

      return this.initialData.salonsInfo.map(salon => {
        const isSelected = salon._id === masterSalonId;

        return {
          ...salon,
          isSelected
        };
      });
    }
  },
  methods: {
    ...mapActions("mastersModule", ["getMasterById"]),
    ...mapActions("salonModule", ["getSalonList"]),
    async beforeOpen(event) {
      const params = event.params;

      this.initialData = {
        masterInfo: null,
        salonsInfo: null
      };

      this.editedData = {
        editableMasterInfo: {
          firstName: "",
          lastName: "",
          email: "",
          newPassword: ""
        },
        newSalonId: null,
        masterDays: []
      };

      this.activeTab = 1;

      if (!params?.id) {
        event.cancel();
        return;
      }

      try {
        this.initialData.masterInfo = await this.getMasterById(params.id);
        this.initialData.salonsInfo = await this.getSalonList(true);

        //TODO make more clearly server response
        this.editedData.editableMasterInfo.firstName = this.initialData.masterInfo.user.profile.firstName;
        this.editedData.editableMasterInfo.lastName = this.initialData.masterInfo.user.profile.lastName;
        this.editedData.editableMasterInfo.email = this.initialData.masterInfo.user.email;
      } catch (error) {
        console.error(error);
      }
    },
    changeActiveTab(tabId) {
      this.activeTab = tabId;
    },
    onCancelClick() {
      this.$modal.hide("master-modal");
    },
    onChangeSalon(evt) {
      const value = evt.target.value;

      this.editedData.newSalonId = value;
    }
  }
};
</script>

<style scoped lang="scss">
.master-form {
  position: relative;
  padding-bottom: 60px;
  min-height: 400px;
}

.master-form__footer {
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 60px;
  padding: 10px 15px;
}

.block {
  padding: 10px 15px;
}

.select {
  width: 100%;

  select {
    width: 100%;
  }
}

.checkbox {
  &:not(:last-child) {
    margin-right: 10px;
  }
}
</style>
