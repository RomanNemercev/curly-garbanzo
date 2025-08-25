<template>
    <div class="apartment-block" role="listitem" v-for="apartment in apartments" :key="apartment.id">
        <div class="apartment-block__item">
            <img :src="`/images/${apartment.image}`" loading="lazy" alt="Layout" class="apartment-block__image">
        </div>
        <div class="apartment-block__item">{{ apartment.layout }}</div>
        <div class="apartment-block__item">{{ apartment.area }}</div>
        <div class="apartment-block__item">{{ apartment.floors }}</div>
        <div class="apartment-block__item">{{ apartment.price.toLocaleString() }}</div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    apartments: {
        id: string
        layout: string
        area: number
        floors: string
        price: number
        image: string
    }[]
}>()
</script>

<style scoped lang="scss">
.apartment-block {
    display: grid;
    grid-template-columns: 9.9877fr 35.083fr 14.983fr 14.983fr 14.983fr;
    column-gap: 20px;
    max-width: 100%;
    box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.1);

    &__item:first-child {
        padding: 26.4px 7px;
    }

    &__item:nth-child(2) {
        font-size: 1.6rem;
        font-weight: 500;
        padding-top: 19px;
    }

    &__item:nth-child(3) {
        font-size: 1.6rem;
        font-weight: 400;
        padding-top: 18px;
    }

    &__item:nth-child(4) {
        font-size: 1.6rem;
        color: rgba(11, 23, 57, 0.5);
        padding-top: 18px;
    }

    &__item:nth-child(4)::first-letter {
        color: var(--color_zodiac);
    }

    &__item:last-child {
        font-size: 1.6rem;
        font-weight: 400;
        padding-top: 18px;
    }
}
</style>