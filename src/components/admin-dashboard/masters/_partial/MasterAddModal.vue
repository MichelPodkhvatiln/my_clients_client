<template>
  <MountingPortal mountTo="body" append>
    <modal name="add-master" height="auto" @before-open="beforeOpen">
      <section class="add-master">
        <div class="field">
          <label class="label">Имя</label>
          <div class="control">
            <input
              class="input"
              v-model="form.firstName"
              type="text"
              placeholder="e.g. Alex"
            />
          </div>
        </div>
        <div class="field">
          <label class="label">Фамилия</label>
          <div class="control">
            <input
              class="input"
              v-model="form.lastName"
              type="text"
              placeholder="e.g. Alex"
            />
          </div>
        </div>
        <div class="field">
          <label class="label">Email</label>
          <div class="control">
            <input
              class="input"
              v-model="form.email"
              type="email"
              placeholder="e.g. alex@example.com"
            />
          </div>
        </div>
        <div class="field">
          <label class="label">Пароль</label>
          <div class="control">
            <input
              class="input"
              v-model="form.password"
              type="password"
              placeholder="********"
            />
          </div>
        </div>
        <div class="field">
          <label class="label">Повторите пароль</label>
          <div class="control">
            <input
              class="input"
              v-model="form.repeatPassword"
              type="password"
              placeholder="********"
            />
          </div>
        </div>
        <div class="field">
          <label class="label">Салон мастера</label>
          <div class="select is-fullwidth">
            <select @change="onChangeSalon">
              <option value="null" :selected="!form.salonId">
                None
              </option>
              <template v-if="salonInfoList.length">
                <option
                  v-for="salon in salonInfoList"
                  :key="salon.value"
                  :value="salon.value"
                >
                  {{ salon.title }}
                </option>
              </template>
            </select>
          </div>
        </div>
        <div class="buttons is-justify-content-flex-end">
          <button
            class="button is-success"
            :disabled="!canSubmit"
            @click="onAddMaster"
          >
            Добавить мастера
          </button>
          <button class="button is-danger" @click="onCancel">
            Отмена
          </button>
        </div>
      </section>
    </modal>
  </MountingPortal>
</template>

<script>
import { required, minLength, email, sameAs } from "vuelidate/lib/validators";
import { mapActions } from "vuex";

export default {
  name: "MasterAddModal",
  data() {
    return {
      form: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        repeatPassword: "",
        salonId: null
      },
      salonList: []
    };
  },
  validations: {
    form: {
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(8)
      },
      repeatPassword: {
        sameAsPassword: sameAs("password")
      },
      firstName: {
        required
      },
      lastName: {
        required
      }
    }
  },
  computed: {
    salonInfoList() {
      if (!this.salonList.length) {
        return [];
      }

      return this.salonList.map(service => {
        return {
          title: service.name,
          value: service._id
        };
      });
    },
    canSubmit() {
      const isValidFirstName = !this.$v.form.firstName.$invalid;
      const isValidLastName = !this.$v.form.lastName.$invalid;
      const isValidEmail = !this.$v.form.email.$invalid;
      const isValidPassword =
        !this.$v.form.password.$invalid &&
        !this.$v.form.repeatPassword.$invalid;

      return (
        isValidFirstName && isValidLastName && isValidEmail && isValidPassword
      );
    }
  },
  methods: {
    ...mapActions("salonModule", ["getSalonList"]),
    ...mapActions("mastersModule", ["createMaster"]),
    async beforeOpen() {
      this.form = {
        firstName: "",
        lastName: "",
        email: "",
        password: ""
      };
      this.salonId = null;

      try {
        this.salonList = await this.getSalonList(true);
      } catch (error) {
        console.error(error);
      }
    },
    onChangeSalon(evt) {
      this.form.salonId =
        evt.target.value === "null"
          ? JSON.parse(evt.target.value)
          : evt.target.value;
    },
    async onAddMaster() {
      try {
        const params = {
          firstName: this.form.firstName,
          lastName: this.form.lastName,
          email: this.form.email,
          password: this.form.password,
          salonId: this.form.salonId
        };

        await this.createMaster(params);
      } catch (error) {
        console.error(error);
      } finally {
        this.$modal.hide("add-master");
      }
    },
    onCancel() {
      this.$modal.hide("add-master");
    }
  }
};
</script>

<style scoped lang="scss">
.add-master {
  padding: 10px 15px;
}
</style>
