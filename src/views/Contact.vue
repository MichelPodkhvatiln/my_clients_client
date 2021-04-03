<template>
  <div class="page__wrapper">
    <div class="container">
      <div class="columns pt-4 is-flex is-flex-direction-column">
        <div class="column is-8 is-offset-2">
          <h1
            class="title is-1 is-uppercase has-text-centered has-text-weight-bold"
          >
            Grizzly barbershop
          </h1>
        </div>
        <div class="column is-12 is-flex is-flex-direction-column">
          <span class="title is-size-3">
            Наши контакты:
          </span>
          <span class="is-size-4 ml-6">
            <strong>Телефон:</strong>
            <a class="custom-link" href="tel:+380951234567">+380951234567</a>
          </span>
        </div>
        <div class="column is-12 is-flex is-flex-direction-column">
          <span class="title is-size-3">
            Мы в социальных сетях:
          </span>
          <div class="ml-6 is-flex">
            <a href="#" class="link-icon">
              <you-tube />
            </a>
            <a href="#" class="link-icon">
              <facebook-icon />
            </a>
            <a href="#" class="link-icon">
              <instagram-icon />
            </a>
            <a href="#" class="link-icon">
              <tik-tok-icon />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import YouTube from "@/components/icons/YouTubeIcon.vue";
import FacebookIcon from "@/components/icons/FacebookIcon.vue";
import InstagramIcon from "@/components/icons/InstagramIcon.vue";
import TikTokIcon from "@/components/icons/TikTokIcon.vue";

export default {
  name: "Contact",
  components: {
    YouTube,
    FacebookIcon,
    InstagramIcon,
    TikTokIcon
  }
};
</script>
<style lang="scss" scoped>
a {
  outline: none;
  text-decoration: none;
}

.page__wrapper {
  position: absolute;
  top: 0;
  left: -32px; //remove is-fluid class padding
  right: -32px; //remove is-fluid class padding
  height: 100%;
  overflow-y: auto;
}

.custom-link {
  margin-left: 10px;
  border-bottom: 1px solid transparent;
  transition: 0.3s;

  &:link {
    color: #000000;
  }

  &:visited {
    color: rgba(#000000, 0.5);
  }

  &:focus {
    color: rgba(#000000, 0.5);
    border-bottom: 1px solid rgba(#000000, 0.5);
  }

  &:hover {
    color: rgba(#000000, 0.5);
    border-bottom: 1px solid rgba(#000000, 0.5);
  }

  &:active {
    color: rgba(#000000, 0.5);
  }
}

.link-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: transparent;
  opacity: 0.7;
  transition: 0.3s;

  &:not(:first-child) {
    margin-left: 5px;
  }

  &:hover,
  &:focus {
    background-color: rgba(#00d1b2, 0.2);
    opacity: 1;
  }

  svg {
    width: 30px;
    height: 30px;
    fill: #000000;
  }
}
</style>
