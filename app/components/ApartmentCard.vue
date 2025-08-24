<template>
    <tr class="apartment-card" v-for="apartment in apartments" :key="apartment.id">
        <td class="apartment-card__cell"><img :src="`/images/${apartment.image}`" alt="Layout"
              class="apartment-card__image"></td>
        <td class="apartment-card__cell">{{ apartment.layout }}</td>
        <td class="apartment-card__cell">{{ apartment.area }}</td>
        <td class="apartment-card__cell">{{ apartment.floors }}</td>
        <td class="apartment-card__cell">{{ apartment.price.toLocaleString() }} ₽</td>
    </tr>
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
.apartment-card {
    &__cell {
        padding: 10px;
        border-bottom: 1px solid #e0e0e0;
    }

    &__image {
        width: 100px;
        height: auto;
    }
}
</style>