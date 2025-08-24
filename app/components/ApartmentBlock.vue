<template>
    <ApartmentCard :apartments="apartments" />
</template>

<script setup lang="ts">
import ApartmentCard from './ApartmentCard.vue'
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