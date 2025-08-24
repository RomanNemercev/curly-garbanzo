<template>
    <div class="container">
        <h1 class="title">Квартиры</h1>
        <div class="filters">
            <h2>Фильтры</h2>
            <div class="filter-group">
                <label>Квадратура (м²)</label>
            </div>
            <div class="filter-group"></div>
            <div class="filter-group"></div>
            <div class="filter-group"></div>
        </div>
        <div v-for="(block, index) in apartmentBlocks" :key="index" class="apartment-blocks">
            <ApartmentBlock :apartments="block" />
        </div>
        <button v-if="hasMore" @click="loadMore" :disabled="loading" class="load-more">
            Загрузить ещё
        </button>
        <button v-if="showScrollTop" @click="scrollToTop" :class="{ 'show': showScrollTop }"
          class="scroll-top">Наверх</button>
        <!-- <button @click="store.fetchApartments">Получить данные</button> -->
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import ApartmentBlock from '~/components/ApartmentBlock.vue'
const store = useApartmentsStore()

const apartmentBlocks = computed(() => {
    const blocks = []
    for (let i = 0; i < store.filteredApartments.length; i += 5) {
        blocks.push(store.filteredApartments.slice(i, i + 5))
    }
    return blocks
})

const hasMore = computed(() => store.filteredApartments.length < store.apartments.length)
const loading = computed(() => store.loading)
const showScrollTop = ref(false)

function loadMore() {
    store.loadMore()
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
    if (!store.apartments.length) store.fetchApartments()
    window.addEventListener('scroll', () => {
        showScrollTop.value = window.scrollY > 100
    })
})
</script>

<style scoped lang="scss">
.container {
    max-width: 1440px;
    margin: 0 auto;
    padding: 20px;
}

.title {
    font-size: 2em;
    margin-bottom: 20px;
}

.load-more,
.scroll-top {
    padding: 10px 20px;
    margin: 10px 0;
    cursor: pointer;

    &:disabled {
        cursor: not-allowed;
        opacity: 0.6;
    }

    &:hover:not(:disabled) {
        background-color: #f0f0f0;
    }
}

.scroll-top {
    display: none;

    &.show {
        display: block;
    }
}
</style>
