<script setup>
import { computed } from 'vue'
const props = defineProps({
  item: Object
})

const className = computed(() => {
  console.log(props.item)
  if(props.item === undefined) {
    return 'no-item'
  }
  if (props.item?.categories) {
    const list = props.item?.categories.map((item) => {
      return item?.code
    })
    return list.join(' ')
  }
})
</script>
<template>
    <div class="card" :class="className">

      <template v-if="item">
        <div class="card__image">
            <video
                v-if="item.video"
                autoplay
                muted
                loop="loop"
                :poster="item.image"
                playsinline=""
            >
                <source :src="item.video" type="video/mp4" >
            </video>
            <img v-else :src="item.image" alt="" >
        </div>
        <div class="card__content">
            <div v-if="item.categories" class="card__tags">
<!--                <div v-if="item.category?.title" class="tag active">-->
<!--                    {{ item.category.title }}-->
<!--                </div>-->
                <div v-for="el in item.categories" :key="el.title" class="tag active">
                    {{ el.name }}
                </div>
            </div>
            <div class="card__text">{{ item.name }}</div>
        </div>
      </template>

    </div>
</template>

<style lang="scss">
.no-item {
  background: var(--color-secondory);
  margin-bottom: 10px;
  height: 450px;
  &:after{
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    background-color: var(--color-secondory);
    background: linear-gradient(
            100deg,
            rgba(255, 255, 255, .0) 40%,
            rgba(255, 255, 255, .1) 50%,
            rgba(255, 255, 255, .0) 90%
    ) var(--color-secondory);
    background-size: 200% 100%;
    background-position-x: 180%;
    animation: 1s loading ease-in-out infinite;
  }
  &:nth-child(1) {
    height: 300px;
  }
  &:nth-child(2) {
    height: 323px;
  }
  &:nth-child(3) {
    height: 390px;
  }
  &:nth-child(4) {
    height: 280px;
  }
  &:nth-child(5) {
    height: 180px
  }
  &:nth-child(6) {
    height: 400px;
  }
}
.card {
    position: relative;
    border-radius: 24px;
    overflow: hidden;
    cursor: pointer;
    width: 400px;
    margin-bottom: 20px;
    opacity: 0;
    will-change: auto;

    &:not(.show) {
        transition: all 0.5s;
    }
    &.show {
        opacity: 1;
    }
    @media (max-width: 1400px) {
        width: calc(50% - 20px);
    }
    @media (max-width: 768px) {
        width: 100%;
        margin-bottom: 8px;
    }

    &__tags {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 8px;
    }
    &:hover {
        .card__image {
            transform: scale(1.05);
        }
    }
    video {
        max-width: 100%;
        display: block;
    }
    &__image {
        transition: all 0.2s ease-out;
        img {
            max-width: 100%;
          min-height: 250px;
        }
    }
    &__content {
        position: absolute;
        bottom: 0;
        left: 6px;
        right: 6px;
        bottom: 6px;
        padding: 8px 14px;
        text-align: left;
        border-radius: 20px;
        backdrop-filter: blur(24px);
        background: rgba(0, 0, 0, 0.7);
        color: #fff;
    }
}
.tag {
    &.active {
        background: var(--color-brand);

        color: #fff;
    }
    padding: 2px 4px 2px 4px;
    font-size: 14px;
    font-weight: 500;
    height: 24px;
    border-radius: 8px;
    display: inline-flex;
    background: #fff;
    color: var(--color-secondory-text);
}
@keyframes loading {
  to {
    background-position-x: -20%;
  }
}
</style>
