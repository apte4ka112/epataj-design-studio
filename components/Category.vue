<script setup>
defineProps({
  item: String,
  active: Boolean
})
</script>
<template>
    <div
        class="category"
        :class="{
            active,
        }"
    >
        <div class="category__text">
            {{ item.title }}
        </div>
    </div>
</template>

<style lang="scss">
.category {
    display: inline-flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 8px 13px 8px 13px;
    background: var(--color-secondory);
    border-radius: 24px;
    user-select: none;
    cursor: pointer;
    color: var(--color-secondory-text);

    &.active {
        background: var(--color-brand);
        color: #fff;
        cursor: default;
    }

    &:not(.active):hover {
        background: var(--color-secondory-bg-hover);
        color: var(--color-secondory-text-hover);
    }

    &__text {
        font-size: 14px;
        font-weight: 500;
        line-height: 20px;
        text-align: center;
    }
}
</style>
