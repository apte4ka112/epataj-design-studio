<template>
  <header class="header">
    <div class="header__logo">
      <img src="../assets/icon/logo.svg" alt="" >
    </div>
    <div class="header__control animate__animated animate__fadeIn">
      <a
          href="https://t.me/moovchaan"
          target="_blank"
          class="header__button button button-icon"
      >
        <img src="../assets/icon/telegram.svg" alt="" >
        Написать в TG</a
      >
      <a href="#" class="header__button button">Заказать</a>
    </div>
  </header>
</template>

<script setup>
</script>
<style lang="scss">
.header {
  margin-top: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  min-height: 64px;

  &__control {
    right: 0;
    position: absolute;
    display: flex;
    gap: 12px;
    @media (max-width: 768px) {
      display: none;
    }
  }
}
</style>
