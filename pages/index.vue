<script setup>
import { useLazyAsyncData } from '#app' // Импортируем функцию useLazyAsyncData из Nuxt 3

import { onMounted, ref } from 'vue'
import Card from '../components/Card.vue'
import Isotope from 'isotope-layout'
import imagesLoaded from 'imagesloaded'
import Filter from '../components/Filter.vue'
const activeTabs = ref('all')
const cards = ref([])
const grid = ref(null)
const loadingItems = ref(false)
const loading = ref(true)
let iso = null
const { articlesAPIClient } = useAPI()

const filterItems = (item) => {
  activeTabs.value = item.url
  iso?.arrange({
    filter: item.url === '*' ? '*' : '.' + item.url,
    sortBy: 'number'
  })
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
const { data: fetchedData, pending, error } = useLazyAsyncData('news', async () => {
  return await articlesAPIClient.getArticles()
});


// Обработка данных после получения
const processFetchedData = () => {
  if (fetchedData.value) {
    cards.value = fetchedData.value.documents
    loading.value = false
    updateItems()
  } else if (error.value) {
    console.error(error.value);
    loading.value = false;
  }
}

// Следим за изменениями данных и обновляем состояние компонента
watchEffect(() => {
  loading.value = pending.value;
  if (fetchedData.value || error.value) {
    processFetchedData();
  }
})

// Вызываем updateItems по монтированию компонента
onMounted(() => {
  updateItems()
})
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
