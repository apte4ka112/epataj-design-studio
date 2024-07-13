<script setup>
import { ref, onMounted } from 'vue'
import { useLazyAsyncData } from '#app'

import menuIcon from '../assets/icon/menu.vue'
import siteIcon from '../assets/icon/site.vue'
import logoSmall from '../assets/icon/logo-small.vue'
import smiIcon from '../assets/icon/smi.vue'
import reklamaIcon from '../assets/icon/reklama.vue'
import newsIcon from '../assets/icon/news.vue'

const activeTabs = ref(0)
const emit = defineEmits(['setFilter'])
const loading = ref(true)
const navigation = ref([])

const { categoriesAPIClient } = useAPI()

const getNameComponent = (item) => {
  const icons = {
    site: siteIcon,
    brand: logoSmall,
    smi: smiIcon,
    reklama: reklamaIcon,
    news: newsIcon
  }
  return icons[item.code] || menuIcon
}

// Используем useLazyAsyncData для получения данных
const { data: fetchedData, pending, error } = useLazyAsyncData('categories', async () => {
  return await categoriesAPIClient.getCategories()
});

// Обработка данных после получения
const processFetchedData = () => {
  if (fetchedData.value) {
    navigation.value = fetchedData.value.documents;
    loading.value = false;
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


</script>
<template>
    <div class="navigation" v-if="!loading">
        <div
            v-for="(item, index) in navigation"
            :key="index"
            class="navigation__item"
            :class="{
                active: activeTabs == index,
            }"
            @click="(activeTabs = index), emit('setFilter', item)"
        >
            <div class="navigation__item-icon">
                <component :is="getNameComponent(item)" />
            </div>
            <div class="navigation__item-text">
                {{ item.name }}
            </div>
        </div>
    </div>
  <div class="navigation" v-else>
    <div
        v-for="(item, index) in 3"
        :key="index"
        class="navigation__item"
    >
      <div class="navigation__item-icon">
      </div>
      <div class="navigation__item-text">
      </div>
    </div>
  </div>

</template>

<style lang="scss">
.navigation {
    margin-top: 32px;
    display: flex;
    justify-content: center;
    gap: 34px;
    @media (max-width: 768px) {
        margin-left: -20px;
        margin-right: -20px;
        overflow: auto;
        justify-content: flex-start;
        padding-left: 50px;
        padding-right: 50px;
        -ms-overflow-style: none;
        overflow: -moz-scrollbars-none;
        &::-webkit-scrollbar {
            width: 0;
        }
    }

    &__item {
        user-select: none;
        color: var(--color-secondory-text);
        cursor: pointer;
        transition: all 0.2s ease-out;

        path {
            fill: var(--color-secondory-text);
        }
        &.active {
            color: var(--color-brand);
            cursor: default;
            .navigation__item-icon {
                background: var(--color-brand);
            }
            path {
                fill: #fff;
            }
        }

        &:not(.active):hover {
            color: var(--color-secondory-text-hover);
            .navigation__item-icon {
                background: var(--color-secondory-bg-hover);
            }
            path {
                fill: var(--color-secondory-text-hover);
            }
        }
        &-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 16px;
            gap: 10px;
            border-radius: 24px;
            background: var(--color-secondory);

            width: 64px;
            height: 64px;
        }
        &-text {
            margin-top: 4px;
            font-size: 14px;
            font-style: normal;
            font-weight: 500;
            line-height: 20px;
            height: 20px;
        }
    }
}
</style>
