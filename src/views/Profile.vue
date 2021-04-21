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
              <span>Имя:</span> {{ userName }}
            </li>
            <li class="profile__list--item">
              <span>Телефон:</span> {{ userPhone }}
            </li>
            <li class="profile__list--item">
              <span>Email:</span> {{ userEmail }}
            </li>
            <li class="profile__list--item">
              <span>Роль:</span> {{ userRole }}
            </li>
          </ul>
        </div>

        <div class="column is-4">
          <ul class="profile__list">
            <li class="profile__list--item is-flex is-justify-content-flex-end">
              <button class="button is-small is-info">
                Изменить личные данные
              </button>
            </li>
            <li class="profile__list--item is-flex is-justify-content-flex-end">
              <button class="button is-small is-info">
                Изменить email
              </button>
            </li>
            <li class="profile__list--item is-flex is-justify-content-flex-end">
              <button class="button is-small is-info">
                Изменить пароль
              </button>
            </li>
            <li class="profile__list--item is-flex is-justify-content-flex-end">
              <button class="button is-small is-danger" @click="onLogOutClick">
                Выход
              </button>
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
  computed: {
    ...mapGetters("userModule", ["user"]),
    userName() {
      return `${this.user.profile.firstName} ${this.user.profile.lastName}`;
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
    onLogOutClick() {
      this.logOut();
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
