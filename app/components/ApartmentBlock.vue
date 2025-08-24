<template>
    <div class="apartment-block">
        <ApartmentCard v-for="apartment in apartments" :key="apartment.id" :apartment="apartment" />
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
    grid-template-columns: 1fr;
    gap: 20px;
    margin-bottom: 20px;

    @media (max-width: 960px) {
        grid-template-columns: 1fr;
    }
}
</style>