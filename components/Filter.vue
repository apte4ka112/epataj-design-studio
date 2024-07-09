<script setup>
import Navigation from '../components/Navigation.vue'
import Category from '../components/Category.vue'
import { ref } from 'vue'
const emit = defineEmits(['setFilter'])
const activeTabs = ref(1)
const activeCategory = ref(1)
const category = ref(null)
const setFilter = (item) => {
  activeTabs.value = 1
  category.value = item.url === '*' ? '*' : '.' + item.url,
  emit('setFilter', item)
  activeCategory.value = item.name
}
const filterItems = (item) => {
  if (activeTabs.value !== item.id) {
    activeTabs.value = item.id
    emit('setFilter', item)
  }
}
</script>
<template>
    <div class="filter">
        <Navigation @set-filter="setFilter" />
<!--        <div class="filter__category">-->
<!--            <Category-->
<!--                v-if="category && category.length > 0"-->
<!--                :active="1 === activeTabs"-->
<!--                :item="{ title: 'все', name: '.site' }"-->
<!--                @click="filterItems({ id: 1, name: activeCategory })"-->
<!--            />-->
<!--            <Category-->
<!--                v-for="item in category"-->
<!--                :key="item.id"-->
<!--                :active="item.id === activeTabs"-->
<!--                :item="item"-->
<!--                @click="filterItems(item)"-->
<!--            />-->
<!--        </div>-->
    </div>
</template>

<style lang="scss">
.filter {
    &__category {
        margin-top: 28px;
        display: flex;
        justify-content: center;
        gap: 12px;
        flex-wrap: wrap;
    }
}
</style>
