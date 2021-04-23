<template>
  <div class="page-wrapper">
    <div class="container">
      <div class="columns pt-4">
        <div class="column is-8 is-offset-2">
          <h1
            class="title is-1 is-uppercase has-text-centered has-text-weight-bold"
          >
            Личный кабинет
          </h1>
        </div>
      </div>

      <div class="columns pt-4">
        <div class="column is-4 is-offset-2">
          <ul class="profile__list">
            <li class="profile__list--item">
              <template v-if="!isEditing">
                <span>Имя:</span> {{ userFirstName }}
              </template>
              <template v-else>
                <div class="field is-horizontal">
                  <div class="field-label is-normal">
                    <label class="label">Имя:</label>
                  </div>
                  <div class="field-body">
                    <div class="field">
                      <p class="control">
                        <input
                          class="input"
                          type="text"
                          :value="userFirstName"
                        />
                      </p>
                    </div>
                  </div>
                </div>
              </template>
            </li>
            <li class="profile__list--item">
              <template v-if="!isEditing">
                <span>Фамилия:</span> {{ userLastName }}
              </template>
              <template v-else>
                <div class="field is-horizontal">
                  <div class="field-label is-normal">
                    <label class="label">Фамилия:</label>
                  </div>
                  <div class="field-body">
                    <div class="field">
                      <p class="control">
                        <input
                          class="input"
                          type="text"
                          :value="userFirstName"
                        />
                      </p>
                    </div>
                  </div>
                </div>
              </template>
            </li>
            <li class="profile__list--item">
              <template v-if="!isEditing">
                <span>Телефон:</span> {{ userPhone }}
              </template>
              <template v-else>
                <div class="field is-horizontal">
                  <div class="field-label is-normal">
                    <label class="label">Телефон:</label>
                  </div>
                  <div class="field-body">
                    <div class="field">
                      <p class="control">
                        <vue-tel-input
                          :value="userPhone"
                          @input="onPhoneInput"
                        />
                      </p>
                    </div>
                  </div>
                </div>
              </template>
            </li>
            <li class="profile__list--item">
              <template v-if="!isEditing">
                <span>Email:</span> {{ userEmail }}
              </template>
              <template v-else>
                <div class="field is-horizontal">
                  <div class="field-label is-normal">
                    <label class="label">Email:</label>
                  </div>
                  <div class="field-body">
                    <div class="field">
                      <p class="control">
                        <input class="input" type="email" :value="userEmail" />
                      </p>
                    </div>
                  </div>
                </div>
              </template>
            </li>
            <li class="profile__list--item">
              <span>Роль:</span> {{ userRole }}
            </li>
          </ul>
        </div>

        <div class="column is-4">
          <ul class="profile__list">
            <li class="profile__list--item is-flex is-justify-content-flex-end">
              <button
                v-if="!isEditing"
                class="button is-small is-info"
                @click="toggleEditingMode"
              >
                Редактировать профиль
              </button>
              <button
                v-else
                class="button is-small is-danger"
                @click="toggleEditingMode"
              >
                Отмена
              </button>
            </li>
            <li class="profile__list--item is-flex is-justify-content-flex-end">
              <button class="button is-small is-danger" @click="onLogOutClick">
                Выход
              </button>
            </li>
            <li class="profile__list--item is-flex is-justify-content-flex-end">
              {{ editedData }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Profile",
  data() {
    return {
      isEditing: false,
      editedData: []
    };
  },
  computed: {
    ...mapGetters("userModule", ["user"]),
    userFirstName() {
      return this.user.profile.firstName;
    },
    userLastName() {
      return this.user.profile.lastName;
    },
    userPhone() {
      return this.user.profile?.phone ?? "Не указан";
    },
    userEmail() {
      return this.user.email;
    },
    userRole() {
      switch (this.user.role) {
        case "admin":
          return "Администратор";
        case "master":
          return "Мастер";
        default:
          return "Пользователь";
      }
    }
  },
  methods: {
    ...mapActions("userModule", ["logOut"]),
    toggleEditingMode() {
      this.editedData = [];
      this.isEditing = !this.isEditing;
    },
    onLogOutClick() {
      this.logOut();
    },
    onPhoneInput(_, phoneObject) {
      if (phoneObject.valid) {
        if (phoneObject.number === this.userPhone) {
          return;
        }

        const index = this.editedData.findIndex(
          editedFieldData => editedFieldData.field === "phone"
        );

        if (index !== -1) {
          this.editedData.splice(index, 1, {
            field: "phone",
            value: phoneObject.number
          });
          return;
        }

        this.editedData.push({
          field: "phone",
          value: phoneObject.number
        });
      } else {
        const index = this.editedData.findIndex(
          editedFieldData => editedFieldData.field === "phone"
        );

        if (index === -1) {
          return;
        }

        this.editedData.splice(index, 1);
      }
    }
  }
};
</script>

<style scoped lang="scss">
.profile__list {
}

.profile__list--item {
  &:not(:last-child) {
    margin-bottom: 15px;
  }

  span {
    font-weight: 700;
  }
}
</style>
