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
            <li v-if="!isEditing" class="profile__list--item">
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
                          :class="inputFieldClasses('firstName')"
                          type="text"
                          v-model="editedDataForm.firstName"
                        />
                      </p>

                      <p
                        v-if="
                          !$v.editedDataForm.firstName.isNotUserFirstNameSameAs
                        "
                        class="help is-danger"
                      >
                        Имя не дожно совпадать с текущим
                      </p>
                      <p
                        v-else-if="$v.editedDataForm.firstName.$invalid"
                        class="help is-danger"
                      >
                        Имя не валидно
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
                          :class="inputFieldClasses('lastName')"
                          type="text"
                          v-model="editedDataForm.lastName"
                        />
                      </p>

                      <p
                        v-if="
                          !$v.editedDataForm.lastName.isNotUserLastNameSameAs
                        "
                        class="help is-danger"
                      >
                        Фамилия не дожна совпадать с текущей
                      </p>
                      <p
                        v-else-if="$v.editedDataForm.lastName.$invalid"
                        class="help is-danger"
                      >
                        Фамилия не валидна
                      </p>
                    </div>
                  </div>
                </div>
              </template>
            </li>
            <li class="profile__list--item">
              <template v-if="!isEditing">
                <span>Телефон:</span>
                <template v-if="userPhone.length">
                  {{ userPhone }}
                </template>
                <template v-else>
                  Не указан
                </template>
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
                          :class="inputFieldClasses('phone')"
                          :value="editedDataForm.phone"
                          @input="onPhoneInput"
                        />
                      </p>

                      <p
                        v-if="!$v.editedDataForm.phone.isNotUserPhoneSameAs"
                        class="help is-danger"
                      >
                        Телефон не должен совпадать с текущим
                      </p>
                      <p
                        v-else-if="$v.editedDataForm.phone.$invalid"
                        class="help is-danger"
                      >
                        Телефон не валидный
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
                          :class="inputFieldClasses('email')"
                          type="email"
                          v-model="editedDataForm.email"
                        />
                      </p>

                      <p
                        v-if="!$v.editedDataForm.email.isNotUserEmailSameAs"
                        class="help is-danger"
                      >
                        Email не должен совпадать с текущим
                      </p>
                      <p
                        v-else-if="$v.editedDataForm.email.$invalid"
                        class="help is-danger"
                      >
                        Email не валидный
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
            <li
              v-if="!isEditing"
              class="profile__list--item is-flex is-justify-content-flex-end"
            >
              <button
                class="button is-small is-info"
                @click="onChangePasswordClick"
              >
                Изменить пароль
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
              <button
                v-else
                class="button is-small is-success"
                :disabled="!canSaveChanges"
                @click="onSaveChanges"
              >
                Сохранить
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <MountingPortal mountTo="body" append>
      <modal name="user-change-password" height="auto">
        <section class="section">
          <div class="field">
            <label class="label">Новый пароль</label>
            <div class="control">
              <input
                class="input"
                v-model="passwordForm.password"
                type="password"
              />
            </div>
          </div>

          <div class="field">
            <label class="label">Повторите пароль</label>
            <div class="control">
              <input
                class="input"
                v-model="passwordForm.confirmPassword"
                type="password"
              />
            </div>
          </div>

          <footer
            class="is-flex is-justify-content-flex-end is-align-items-center"
          >
            <div class="buttons">
              <button
                class="button is-success"
                :disabled="!isCanSubmitPassword"
                @click="onSavePasswordClick"
              >
                Сохранить изменения
              </button>
              <button class="button is-danger" @click="onPasswordCancel">
                Отмена
              </button>
            </div>
          </footer>
        </section>
      </modal>
    </MountingPortal>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";

const isNotUserFirstNameSameAs = function(value) {
  return this.userFirstName !== value;
};

const isNotUserLastNameSameAs = function(value) {
  return this.userLastName !== value;
};

const isNotUserPhoneSameAs = function(value) {
  return this.userPhone !== value;
};

const isNotUserEmailSameAs = function(value) {
  return this.userEmail !== value;
};

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
      },
      passwordForm: {
        password: "",
        confirmPassword: ""
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
      return this.user.profile?.phone ?? "";
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
    },
    canSaveChanges() {
      const editedDataFormKeys = Object.keys(this.editedDataForm);

      for (const key in this.$v.editedDataForm) {
        if (!editedDataFormKeys.includes(key)) continue;

        const isInvalid = this.$v.editedDataForm[key].$invalid;

        if (isInvalid) continue;

        return true;
      }

      return false;
    },
    isCanSubmitPassword() {
      const isValidPassword = !this.$v.passwordForm.password.$invalid;
      const isValidConfirmPassword = !this.$v.passwordForm.confirmPassword
        .$invalid;

      return isValidPassword && isValidConfirmPassword;
    }
  },
  validations: {
    editedDataForm: {
      firstName: {
        required,
        isNotUserFirstNameSameAs
      },
      lastName: {
        required,
        isNotUserLastNameSameAs
      },
      phone: {
        required,
        isNotUserPhoneSameAs
      },
      email: {
        required,
        email,
        isNotUserEmailSameAs
      }
    },
    passwordForm: {
      password: {
        required,
        minLength: minLength(8)
      },
      confirmPassword: {
        sameAsPassword: sameAs("password")
      }
    }
  },
  methods: {
    ...mapActions("userModule", [
      "logOut",
      "updateProfile",
      "updateEmail",
      "updatePassword"
    ]),
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
    },
    inputFieldClasses(field) {
      const _isInvalidField = field => {
        if (field === "phone") return false;

        return this.$v.editedDataForm[field].$invalid;
      };

      const _isInvalidPhoneField = field => {
        if (field !== "phone") return false;

        return this.$v.editedDataForm[field].$invalid;
      };

      return {
        "is-danger": _isInvalidField(field),
        "is-invalid-phone": _isInvalidPhoneField(field)
      };
    },
    async onSaveChanges() {
      if (!this.canSaveChanges) return;

      try {
        const changedField = [];

        for (const key in this.editedDataForm) {
          if (!this.$v.editedDataForm[key].$invalid) {
            changedField.push(key);
          }
        }

        if (!changedField.length) return;

        const promises = [];

        changedField.forEach(field => {
          if (field === "email") {
            promises.push(
              this.updateEmail({
                userId: this.user.id,
                email: this.editedDataForm.email
              })
            );
            return;
          }

          promises.push(
            this.updateProfile({
              userId: this.user.id,
              field,
              value: this.editedDataForm[field]
            })
          );
        });

        await Promise.all(promises);
      } catch (err) {
        console.error(err);
      } finally {
        this.toggleEditingMode();
      }
    },
    onChangePasswordClick() {
      this.$set(this.passwordForm, "password", "");
      this.$set(this.passwordForm, "confirmPassword", "");

      this.$modal.show("user-change-password");
    },
    onPasswordCancel() {
      this.$modal.hide("user-change-password");
    },
    async onSavePasswordClick() {
      if (!this.isCanSubmitPassword) {
        return;
      }

      try {
        await this.updatePassword({
          userId: this.user.id,
          password: this.passwordForm.password
        });
      } catch (err) {
        console.error(err);
      } finally {
        this.$modal.hide("user-change-password");
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

.button {
  min-width: 170px;
}

.field-body {
  flex-grow: 4;
}

::v-deep {
  .vue-tel-input {
    min-height: 40px;
    border-color: #dbdbdb;
  }

  .vue-tel-input:focus-within {
    border-color: #3273dc;
    box-shadow: 0 0 0 0.125em #3273dc40;
  }

  .is-invalid-phone {
    &.vue-tel-input {
      border-color: #f14668;
    }

    &.vue-tel-input:focus-within {
      box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
        0 0 8px rgba(#f14668, 0.6);
      border-color: #f14668;
    }
  }
}
</style>
