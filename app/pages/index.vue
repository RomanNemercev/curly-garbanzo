<template>
    <div class="container">
        <h1 class="title">Квартиры</h1>
        <div class="filters">
            <h2>Фильтры</h2>
            <div class="filter-group">
                <label>Кол-во комнат</label>
                <div class="rooms-buttons">
                    <button class="room-button" :class="{ active: store.filters.rooms.includes(1) }"
                      @click="toggleRoom(1)">1к</button>
                    <button class="room-button" :class="{ active: store.filters.rooms.includes(2) }"
                      @click="toggleRoom(2)">2к</button>
                    <button class="room-button" :class="{ active: store.filters.rooms.includes(3) }"
                      @click="toggleRoom(3)">3к</button>
                    <button class="room-button disabled" disabled>4к</button>
                </div>
            </div>
            <div class="filter-group">
                <label>Цена (₽)</label>
                <div id="slider-price" class="slider"></div>
                <p>От: {{ store.filters.price.min.toLocaleString() }} ₽ До: {{
                    store.filters.price.max.toLocaleString()
                }} ₽</p>
            </div>
            <div class="filter-group">
                <label>Площадь, м²</label>
                <div id="slider-area" class="slider"></div>
                <p>От: {{ store.filters.area.min }} До: {{ store.filters.area.max }}</p>
            </div>
            <button @click="store.resetFilters" class="reset-button">Сбросить параметры</button>
        </div>
        <table class="apartment-table">
            <thead>
                <tr>
                    <th class="apartment-table__header">Планировка</th>
                    <th class="apartment-table__header">Квартира</th>
                    <th class="apartment-table__header" @click="store.sortBy('area')">S, м² <span
                          v-if="store.sortKey === 'area'">{{ store.sortOrder === 'asc' ? '↑' : '↓' }}</span></th>
                    <th class="apartment-table__header" @click="store.sortBy('floors')">Этаж <span
                          v-if="store.sortKey === 'floors'">{{ store.sortOrder === 'asc' ? '↑' : '↓' }}</span></th>
                    <th class="apartment-table__header" @click="store.sortBy('price')">Цена <span
                          v-if="store.sortKey === 'price'">{{ store.sortOrder === 'asc' ? '↑' : '↓' }}</span></th>
                </tr>
            </thead>
            <tbody v-if="store.filteredApartments.length > 0">
                <template v-for="(block, index) in apartmentBlocks" :key="index">
                    <ApartmentBlock :apartments="block" />
                </template>
            </tbody>
            <tbody v-else>
                <tr>
                    <td colspan="5" class="no-results">Нет квартир по выбранным фильтрам</td>
                </tr>
            </tbody>
        </table>
        <button v-if="hasMore" @click="loadMore" :disabled="loading" class="load-more">
            Загрузить ещё
        </button>
        <button v-if="showScrollTop" @click="scrollToTop" :class="{ 'show': showScrollTop }"
          class="scroll-top">Наверх</button>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed, watch } from 'vue'
import { useApartmentsStore } from '~/stores/apartments'
import ApartmentBlock from '~/components/ApartmentBlock.vue'
import noUiSlider from 'nouislider'
import 'nouislider/dist/nouislider.css'
const store = useApartmentsStore()

const apartmentBlocks = computed(() => {
    const blocks = []
    for (let i = 0; i < store.filteredApartments.length; i += 5) {
        blocks.push(store.filteredApartments.slice(i, i + 5))
    }
    console.log(blocks);

    return blocks
})

const hasMore = computed(() => store.filteredApartments.length < store.fullFiltered.length)
const loading = computed(() => store.loading)
const showScrollTop = ref(false)

function loadMore() {
    store.loadMore()
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
}

function toggleRoom(room: number) {
    const rooms = store.filters.rooms
    if (rooms.includes(room)) {
        store.updateFilter('rooms', rooms.filter((r: number) => r !== room))
    } else {
        store.updateFilter('rooms', [...rooms, room])
    }
}

onMounted(() => {
    if (!store.apartments.length) store.fetchApartments()
    window.addEventListener('scroll', () => {
        showScrollTop.value = window.scrollY > 100
    })

    // Слайдер для площади
    const sliderArea = document.getElementById('slider-area')
    if (sliderArea) {
        noUiSlider.create(sliderArea, {
            start: [store.filters.area.min, store.filters.area.max],
            range: { min: 0, max: 100 },
            connect: true
        }).on('update', (values) => {
            store.updateFilter('area', { min: Number(values[0]), max: Number(values[1]) })
        })
    }

    // Слайдер для цены
    const sliderPrice = document.getElementById('slider-price')
    if (sliderPrice) {
        noUiSlider.create(sliderPrice, {
            start: [store.filters.price.min, store.filters.price.max],
            range: { min: 0, max: 10_000_000 },
            connect: true
        }).on('update', (values) => {
            store.updateFilter('price', { min: Number(values[0]), max: Number(values[1]) })
        })
    }
})

watch(() => store.filters.rooms, (newRooms) => {
    console.log('Rooms updated on client:', newRooms)
}, { immediate: true })
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

.filters {
    margin-bottom: 20px;

    h2 {
        margin-bottom: 10px;
    }

    .filter-group {
        margin-bottom: 20px;
    }

    label {
        display: block;
        margin-bottom: 5px;
    }

    .slider {
        margin-bottom: 10px;
    }

    p {
        margin: 0;
    }

    .rooms-buttons {
        display: flex;
        gap: 10px;
    }

    .room-button {
        padding: 5px 10px;
        border: 1px solid #ccc;
        border-radius: 50%;
        cursor: pointer;

        &.active {
            background-color: #4caf50;
            color: white;
        }

        &.disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }
    }

    .reset-button {
        padding: 10px 20px;
        background-color: #f0f0f0;
        border: none;
        cursor: pointer;

        &:hover {
            background-color: #e0e0e0;
        }
    }
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

.apartment-table {
    width: 100%;
    border-collapse: collapse;

    &__header {
        padding: 10px;
        text-align: left;
        cursor: pointer;

        &:hover {
            background-color: #f0f0f0;
        }
    }
}

.no-results {
    padding: 20px;
    text-align: center;
    color: #999;
}

.scroll-top {
    display: none;

    &.show {
        display: block;
    }
}
</style>
