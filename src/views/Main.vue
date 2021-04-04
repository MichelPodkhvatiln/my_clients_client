<template>
  <div class="page-wrapper">
    <div class="container">
      <div class="columns pt-4">
        <div class="column is-8 is-offset-2">
          <h1
            class="title is-1 is-uppercase has-text-centered has-text-weight-bold"
          >
            Grizzly barbershop
          </h1>

          <figure class="main-page__image mb-4">
            <img
              src="images/grizzly_main.jpg"
              loading="lazy"
              alt="Salon logo"
            />
          </figure>
        </div>
      </div>
      <div class="columns">
        <div class="column is-3 is-offset-2">
          <figure class="main-page__image mb-4">
            <img src="images/main_small.jpg" loading="lazy" alt="Work image" />
          </figure>
        </div>
        <div class="column is-5">
          <span class="is-size-4">
            Сеть барбершопов “Grizzly” - первый масштабный проект в городе
            Запорожье, который работает с 2014 года и имеет 3 филиала. В Grizzly
            представлен весь спектр парикмахерских услуг, все мастера
            высококвалифицированные профессионалы своего дела.
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Main"
};
</script>

<style scoped lang="scss">
.main-page__image {
  width: 100%;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: center center;
    background-color: #b5b5b5;
  }
}
</style>
