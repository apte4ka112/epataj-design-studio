<script setup>
import { onMounted, ref } from 'vue'

import Card from '../components/Card.vue'
import Isotope from 'isotope-layout'
import imagesLoaded from 'imagesloaded'
import Filter from '../components/Filter.vue'
const activeTabs = ref('all')

const cards = ref([
  // {
  //   image: 'https://img.brandshop.ru/cache/products/c/ctm-tdbb-0_1104x1104.jpg',
  //   name: 'Анимированные картинки нового поколения',
  //   category: {
  //     name: 'brand',
  //     title: 'Бренды'
  //   }
  // },
  //
  // {
  //   image: 'https://img.artlebedev.ru/everything/akkuyu/morda/akkuyu-cover-1200.png',
  //   video: 'https://img.artlebedev.ru/everything/akkuyu/morda/akkuyu-cover-1200.mp4',
  //   category: {
  //     name: 'site',
  //     title: 'Сайты',
  //     list: [
  //       {
  //         name: 'lend',
  //         title: 'lend'
  //       }
  //     ]
  //   },
  //   name: 'Анимированные картинки нового поколения'
  // },
  //
  // {
  //   image: 'https://img.artlebedev.ru/everything_files/images/9289/metro-promo-photo-1200.jpg.webp',
  //   name: 'Анимированные картинки нового поколения',
  //   category: 'desing'
  // },
  // {
  //   image: 'https://img.artlebedev.ru/everything/atach/identity/morda/atach-1200.jpg',
  //   video: 'https://img.artlebedev.ru/everything/atach/identity/morda/atach-1200.mp4',
  //   category: {
  //     name: 'site',
  //     title: 'Сайты',
  //     list: [
  //       {
  //         name: 'corparat',
  //         title: 'corparat'
  //       }
  //     ]
  //   },
  //   name: 'Анимированные '
  // },
  // {
  //   image: 'https://img.brandshop.ru/cache/products/m/men_home_20240123_677x724.jpg',
  //   name: 'Анимированные картинки нового поколения',
  //   category: 'desing'
  // },
  // {
  //   video: 'https://img.artlebedev.ru/everything/mokapus/morda/mokapus-morda-xl.mp4',
  //   name: 'Анимированные картинки нового поколения'
  // }
])

const grid = ref(null)
const loadingItems = ref(false)
let iso = null
const loading = ref(true)

const filterItems = (item) => {
  activeTabs.value = null
  if (iso) {
    iso.arrange({
      filter: item.url === '*' ? '*' : '.' + item.url,
      sortBy: 'number'
    })
  }
}
const updateItems = () => {
  imagesLoaded(grid.value, () => {
    iso = new Isotope(grid.value, {
      itemSelector: '.card',
      masonry: {
        gutter: 20,
        percentPosition: true
      }
    })

    loadingItems.value = true

    iso.layout()
  })
}
onMounted(() => {
  updateItems()
})


const { data, pending, error } = await useFetch(async () => {
  try {
    const response = await DB.listDocuments("epataj-database", "news");
    cards.value = response.documents;
    return { news: response.documents };
  } catch (err) {
    return { news: null };
  } finally {
    setTimeout(() => {
      loading.value = false
      updateItems()
    },500)
  }
}, {
  lazy: true
});
</script>

<template>
  <div class="page">
    <div class="animate__animated animate__fadeIn animate__fast">
      <Filter @set-filter="filterItems" />
    </div>

    <div class="page__body">
      <div ref="grid" class="grid  ">
        <template v-if="!loading">
          <Card
              v-for="item in cards"
              :key="item.name"
              :item="item"
              :class="[
                        {
                            'animate__animated animate__fadeIn animate__fast': activeTabs,
                            show: loadingItems,
                        },
                    ]"
          />
        </template>
        <template v-else>
          <span class="loader animate__animated animate__fadeIn animate__fast"></span>
        </template>

      </div>
    </div>
  </div>
</template>

<style lang="scss">
.loader {
  width: 48px;
  height: 24px;
  display: inline-block;
  position: relative;
  border: 1px solid var(--color-secondory);
  margin-top: 200px;
}
.loader::after {
  content: '';
  box-sizing: border-box;
  position: absolute;
  left: 100%;
  top: 50%;
  transform: translateY(-50%);
  border: 1px solid var(--color-secondory);
  width: 5px;
  height: 12px;
}
.loader::before {
  content: '';
  position: absolute;
  left: -8px;
  top: 50%;
  transform: translateY(-50%);
  height: 80%;
  width: 6px;
  box-sizing: border-box;
  animation: animloader  2s linear infinite;
}

@keyframes animloader {
  0% {
    box-shadow: 11px 0 rgba(255, 255, 255, 0), 22px 0 rgba(255, 255, 255, 0), 33px 0 rgba(255, 255, 255, 0), 44px 0 rgba(255, 255, 255, 0);
  }
  25% {
    box-shadow: 11px 0 var(--color-secondory), 22px 0 rgba(255, 255, 255, 0), 33px 0 rgba(255, 255, 255, 0), 44px 0 rgba(255, 255, 255, 0);
  }
  50% {
    box-shadow: 11px 0 var(--color-secondory), 22px 0 var(--color-secondory), 33px 0 rgba(255, 255, 255, 0), 44px 0 rgba(255, 255, 255, 0);
  }
  75% {
    box-shadow: 11px 0 var(--color-secondory), 22px 0 var(--color-secondory), 33px 0 var(--color-secondory), 44px 0 rgba(255, 255, 255, 0);
  }
  100% {
    box-shadow: 11px 0 var(--color-secondory), 22px 0 var(--color-secondory), 33px 0 var(--color-secondory), 44px 0 var(--color-secondory);
  }
}


.page {
  &__body {
    margin-top: 36px;
    gap: 20px;
    margin-bottom: 54px;
  }
}
</style>
