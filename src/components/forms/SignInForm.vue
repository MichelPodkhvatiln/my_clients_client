<template>
  <div class="form-container">
    <div class="from-header">
      <span class="from-header__title">
        Sign In
      </span>
    </div>
    <div class="form-body">
      <div class="field">
        <label class="label">Email</label>
        <div class="control">
          <input
            class="input"
            type="email"
            placeholder="e.g. alex@example.com"
          />
        </div>
      </div>

      <div class="field">
        <label class="label">Password</label>
        <div class="control">
          <input class="input" type="password" placeholder="********" />
        </div>
      </div>
    </div>
    <div class="form-footer">
      <div class="buttons">
        <button class="button is-primary">Sign in</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SignInForm"
};
</script>

<style scoped lang="scss">
.form-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 15px 20px;
  width: 100%;
  height: 100%;
}
.from-header {
  text-align: center;
}

.from-header__title {
  font-size: 1.5rem;
}

.form-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.form-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.field {
  width: 100%;
}
</style>
