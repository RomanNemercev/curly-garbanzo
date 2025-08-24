<template>
    <div class="apartment-card">
        <img :src="`/images/${apartment.image}`" alt="Layout" class="apartment-card__image" />
        <div class="apartment-card__info">
            <h3 class="apartment-card__title">{{ apartment.layout }}</h3>
            <p class="apartment-card__details">{{ apartment.area }} м² • {{ apartment.floors }} • {{
                apartment.price.toLocaleString() }} ₽</p>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    apartment: {
        id: string
        layout: string
        area: number
        floors: string
        price: number
        image: string
    }
}>()
</script>

<style scoped lang="scss">
.apartment-card {
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    overflow: hidden;

    &__image {
        // width: 100%;
        height: auto;
    }

    &__info {
        padding: 10px;
    }

    &__title {
        font-size: 1.1em;
        margin: 0 0 5px;
    }

    &__details {
        font-size: 0.9em;
        color: #666;
    }
}
</style>