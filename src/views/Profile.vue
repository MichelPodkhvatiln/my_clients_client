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
              <span>Роль:</span> {{ userRole }}
            </li>
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
                          v-model="editedDataForm.firstName"
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
                          v-model="editedDataForm.lastName"
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
                          :value="editedDataForm.phone"
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
                        <input
                          class="input"
                          type="email"
                          v-model="editedDataForm.email"
                        />
                      </p>
                    </div>
                  </div>
                </div>
              </template>
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
              <button
                v-if="!isEditing"
                class="button is-small is-danger"
                @click="onLogOutClick"
              >
                Выход
              </button>
              <button v-else class="button is-small is-success">
                Сохранить
              </button>
            </li>
            <li class="profile__list--item is-flex is-justify-content-flex-end">
              {{ editedDataForm }}
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
      editedDataForm: {
        firstName: "",
        lastName: "",
        phone: "",
        email: ""
      }
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
      this.isEditing = !this.isEditing;

      if (this.isEditing) {
        this.$set(this.editedDataForm, "firstName", this.userFirstName);
        this.$set(this.editedDataForm, "lastName", this.userLastName);
        this.$set(this.editedDataForm, "phone", this.userPhone);
        this.$set(this.editedDataForm, "email", this.userEmail);
        return;
      }

      for (const key in this.editedDataForm) {
        this.$set(this.editedDataForm, key, "");
      }
    },
    onLogOutClick() {
      this.logOut();
    },
    onPhoneInput(_, phoneObject) {
      if (phoneObject.valid) {
        this.$set(this.editedDataForm, "phone", phoneObject.number);
        return;
      }

      this.$set(this.editedDataForm, "phone", "");
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

.button {
  min-width: 170px;
}

.field-body {
  flex-grow: 4;
}
</style>
