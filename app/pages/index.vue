<template>
    <div class="apartments-page">
        <div v-if="!isHydrated || store.loading" class="apartments-page__loader">
            <div class="apartments-page__loader-spinner"></div>
            Загрузка...
        </div>
        <div v-else v-cloak class="apartments-page__main">
            <div class="apartments-page__main-table">
                <h1 class="apartments-page__main-title">Квартиры</h1>
                <div class="apartments-page__apartment-list" role="list" aria-label="Список квартир">
                    <div class="apartments-page__apartment-list-header" role="row">
                        <div class="apartments-page__apartment-list-header-item" role="columnheader">Планировка</div>
                        <div class="apartments-page__apartment-list-header-item" role="columnheader">Квартира</div>
                        <div class="apartments-page__apartment-list-header-item apartments-area" role="columnheader"
                          @click="store.sortBy('area')">S, м²
                            <div class="apartments-page__apartment-list-svg"
                              :class="store.sortOrder === 'asc' ? 'active' : 'non-active'">
                                <svg width="7" height="10" viewBox="0 0 7 10" fill="none"
                                  xmlns="http://www.w3.org/2000/svg">
                                    <g opacity="0.4">
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                          d="M2.82335 9.7465C2.98561 9.91016 3.19987 10 3.42956 10C3.65867 10 3.87408 9.91016 4.0352 9.7465L6.69029 6.98723C6.9137 6.7612 6.9137 6.39555 6.69029 6.16952C6.46747 5.94349 6.1058 5.94349 5.8824 6.16952L3.42956 8.72451L0.976151 6.16952C0.752751 5.94349 0.391653 5.94349 0.168252 6.16952C-0.0551483 6.39555 -0.0551483 6.7612 0.168252 6.98723L2.82335 9.7465Z"
                                          fill="#FF0000" />
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                          d="M2.82335 9.7465C2.98561 9.91016 3.19987 10 3.42956 10C3.65867 10 3.87408 9.91016 4.0352 9.7465L6.69029 6.98723C6.9137 6.7612 6.9137 6.39555 6.69029 6.16952C6.46747 5.94349 6.1058 5.94349 5.8824 6.16952L3.42956 8.72451L0.976151 6.16952C0.752751 5.94349 0.391653 5.94349 0.168252 6.16952C-0.0551483 6.39555 -0.0551483 6.7612 0.168252 6.98723L2.82335 9.7465Z"
                                          fill="#0B1739" />
                                    </g>
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                      d="M4.0345 0.253496C3.87223 0.0898395 3.65798 2.7968e-07 3.42829 2.9976e-07C3.19918 3.1979e-07 2.98377 0.0898396 2.82265 0.253496L0.167554 3.01277C-0.0558463 3.2388 -0.0558462 3.60445 0.167554 3.83048C0.390384 4.05651 0.752053 4.05651 0.975454 3.83048L3.42829 1.27549L5.8817 3.83048C6.1051 4.05651 6.4662 4.05651 6.6896 3.83048C6.913 3.60445 6.913 3.2388 6.6896 3.01277L4.0345 0.253496Z"
                                      fill="#3EB57C" />
                                </svg>
                            </div>
                        </div>
                        <div class="apartments-page__apartment-list-header-item apartments-floor" role="columnheader"
                          @click="store.sortBy('floors')">
                            Этаж
                            <div class="apartments-page__apartment-list-svg"
                              :class="store.sortOrder === 'asc' ? 'active' : 'non-active'">
                                <svg width="7" height="10" viewBox="0 0 7 10" fill="none"
                                  xmlns="http://www.w3.org/2000/svg">
                                    <g opacity="0.4">
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                          d="M2.82335 9.7465C2.98561 9.91016 3.19987 10 3.42956 10C3.65867 10 3.87408 9.91016 4.0352 9.7465L6.69029 6.98723C6.9137 6.7612 6.9137 6.39555 6.69029 6.16952C6.46747 5.94349 6.1058 5.94349 5.8824 6.16952L3.42956 8.72451L0.976151 6.16952C0.752751 5.94349 0.391653 5.94349 0.168252 6.16952C-0.0551483 6.39555 -0.0551483 6.7612 0.168252 6.98723L2.82335 9.7465Z"
                                          fill="#FF0000" />
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                          d="M2.82335 9.7465C2.98561 9.91016 3.19987 10 3.42956 10C3.65867 10 3.87408 9.91016 4.0352 9.7465L6.69029 6.98723C6.9137 6.7612 6.9137 6.39555 6.69029 6.16952C6.46747 5.94349 6.1058 5.94349 5.8824 6.16952L3.42956 8.72451L0.976151 6.16952C0.752751 5.94349 0.391653 5.94349 0.168252 6.16952C-0.0551483 6.39555 -0.0551483 6.7612 0.168252 6.98723L2.82335 9.7465Z"
                                          fill="#0B1739" />
                                    </g>
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                      d="M4.0345 0.253496C3.87223 0.0898395 3.65798 2.7968e-07 3.42829 2.9976e-07C3.19918 3.1979e-07 2.98377 0.0898396 2.82265 0.253496L0.167554 3.01277C-0.0558463 3.2388 -0.0558462 3.60445 0.167554 3.83048C0.390384 4.05651 0.752053 4.05651 0.975454 3.83048L3.42829 1.27549L5.8817 3.83048C6.1051 4.05651 6.4662 4.05651 6.6896 3.83048C6.913 3.60445 6.913 3.2388 6.6896 3.01277L4.0345 0.253496Z"
                                      fill="#3EB57C" />
                                </svg>
                            </div>
                        </div>
                        <div class="apartments-page__apartment-list-header-item apartments-rub" role="columnheader"
                          @click="store.sortBy('price')">
                            Цена, ₽
                            <div class="apartments-page__apartment-list-rub-svg"
                              :class="store.sortOrder === 'asc' ? 'active' : 'non-active'">
                                <svg width="7" height="10" viewBox="0 0 7 10" fill="none"
                                  xmlns="http://www.w3.org/2000/svg">
                                    <g opacity="0.4">
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                          d="M2.82335 9.7465C2.98561 9.91016 3.19987 10 3.42956 10C3.65867 10 3.87408 9.91016 4.0352 9.7465L6.69029 6.98723C6.9137 6.7612 6.9137 6.39555 6.69029 6.16952C6.46747 5.94349 6.1058 5.94349 5.8824 6.16952L3.42956 8.72451L0.976151 6.16952C0.752751 5.94349 0.391653 5.94349 0.168252 6.16952C-0.0551483 6.39555 -0.0551483 6.7612 0.168252 6.98723L2.82335 9.7465Z"
                                          fill="#FF0000" />
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                          d="M2.82335 9.7465C2.98561 9.91016 3.19987 10 3.42956 10C3.65867 10 3.87408 9.91016 4.0352 9.7465L6.69029 6.98723C6.9137 6.7612 6.9137 6.39555 6.69029 6.16952C6.46747 5.94349 6.1058 5.94349 5.8824 6.16952L3.42956 8.72451L0.976151 6.16952C0.752751 5.94349 0.391653 5.94349 0.168252 6.16952C-0.0551483 6.39555 -0.0551483 6.7612 0.168252 6.98723L2.82335 9.7465Z"
                                          fill="#0B1739" />
                                    </g>
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                      d="M4.0345 0.253496C3.87223 0.0898395 3.65798 2.7968e-07 3.42829 2.9976e-07C3.19918 3.1979e-07 2.98377 0.0898396 2.82265 0.253496L0.167554 3.01277C-0.0558463 3.2388 -0.0558462 3.60445 0.167554 3.83048C0.390384 4.05651 0.752053 4.05651 0.975454 3.83048L3.42829 1.27549L5.8817 3.83048C6.1051 4.05651 6.4662 4.05651 6.6896 3.83048C6.913 3.60445 6.913 3.2388 6.6896 3.01277L4.0345 0.253496Z"
                                      fill="#3EB57C" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div v-if="store.filteredApartments.length > 0" class="apartments-page__apartment-list-items"
                      role="listitem">
                        <ApartmentBlock v-for="(block, index) in apartmentBlocks" :key="index" :apartments="block" />
                    </div>
                    <div v-else class="apartments-page__apartment-list-no-results" role="alert">Нет квартир по выбранным
                        фильтрам</div>
                </div>
                <button aria-label="Загрузить ещё" v-if="hasMore" @click="loadMore" :disabled="loading"
                  class="apartments-page__btn-more">
                    Загрузить ещё
                </button>
            </div>
            <div class="apartments-page__main-filters">
                <!-- <h2 class="apartments-page__filters-title">Фильтры</h2> -->
                <div class="apartments-page__filter-group">
                    <!-- <label class="apartments-page__rooms-title">Кол-во комнат</label> -->
                    <div class="apartments-page__rooms-buttons">
                        <button aria-label="Выбрать однокомнатные квартиры" class="apartments-page__room-button"
                          :class="{ active: store.filters.rooms.includes(1) }" @click="toggleRoom(1)">1к</button>
                        <button aria-label="Выбрать двухкомнатные квартиры" class="apartments-page__room-button"
                          :class="{ active: store.filters.rooms.includes(2) }" @click="toggleRoom(2)">2к</button>
                        <button aria-label="Выбрать трехкомнатные квартиры" class="apartments-page__room-button"
                          :class="{ active: store.filters.rooms.includes(3) }" @click="toggleRoom(3)">3к</button>
                        <button aria-label="Выбрать четырекомнатные квартиры"
                          class="apartments-page__room-button disabled" disabled>4к</button>
                    </div>
                </div>
                <div class="apartments-page__filter-group">
                    <label class="apartments-page__rooms-title">Стоимость квартиры, ₽</label>
                    <p class="apartments-page__filter-item"><span class="apartments-page__from-title">от</span> <span
                          class="apartments-page__from-item">{{
                            store.filters.price.min.toLocaleString() }}</span><span
                          class="apartments-page__to-title">до</span> <span class="apartments-page__to-item">{{
                            store.filters.price.max.toLocaleString()
                            }}</span></p>
                    <div aria-label="Фильтр - Установить цену" id="slider-price" class="apartments-page__filter-slider">
                    </div>
                </div>
                <div class="apartments-page__filter-group">
                    <label class="apartments-page__rooms-title">Площадь, м²</label>
                    <p class="apartments-page__filter-item"><span class="apartments-page__from-title">от </span> <span
                          class="apartments-page__from-item">{{ store.filters.area.min }} </span> <span
                          class="apartments-page__to-title">до</span> <span class="apartments-page__to-item">{{
                            store.filters.area.max }}</span></p>
                    <div aria-label="Фильтр - Установить площадь" id="slider-area"
                      class="apartments-page__filter-slider"></div>
                </div>
                <button aria-label="Сбросить фильтры" @click="store.resetFilters"
                  class="apartments-page__main-reset">Сбросить
                    параметры <span class="apartments-page__btn-svg"><svg width="8" height="8" viewBox="0 0 8 8"
                          fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                              d="M3.99996 5.22223L1.37727 7.84492C1.12213 8.10007 0.641687 8.0333 0.304183 7.6958C-0.0333213 7.35829 -0.100086 6.87786 0.15506 6.62271L2.77775 4.00002L0.155017 1.37729C-0.100129 1.12214 -0.0333644 0.641701 0.30414 0.304197C0.641644 -0.0333071 1.12208 -0.100072 1.37723 0.155074L3.99996 2.77781L6.62282 0.154956C6.87796 -0.10019 7.3584 -0.0334256 7.6959 0.304079C8.03341 0.641583 8.10017 1.12202 7.84503 1.37717L5.22217 4.00002L7.84498 6.62283C8.10013 6.87797 8.03336 7.35841 7.69586 7.69592C7.35836 8.03342 6.87792 8.10019 6.62277 7.84504L3.99996 5.22223Z"
                              fill="#FF0000" />
                            <path fill-rule="evenodd" clip-rule="evenodd"
                              d="M3.99996 5.22223L1.37727 7.84492C1.12213 8.10007 0.641687 8.0333 0.304183 7.6958C-0.0333213 7.35829 -0.100086 6.87786 0.15506 6.62271L2.77775 4.00002L0.155017 1.37729C-0.100129 1.12214 -0.0333644 0.641701 0.30414 0.304197C0.641644 -0.0333071 1.12208 -0.100072 1.37723 0.155074L3.99996 2.77781L6.62282 0.154956C6.87796 -0.10019 7.3584 -0.0334256 7.6959 0.304079C8.03341 0.641583 8.10017 1.12202 7.84503 1.37717L5.22217 4.00002L7.84498 6.62283C8.10013 6.87797 8.03336 7.35841 7.69586 7.69592C7.35836 8.03342 6.87792 8.10019 6.62277 7.84504L3.99996 5.22223Z"
                              fill="#0B1739" />
                        </svg>
                    </span></button>
            </div>
            <button aria-label="Вернуться к началу страницы" v-if="showScrollTop" @click="scrollToTop"
              :class="{ 'show': showScrollTop }" class="apartments-page__main-top"><svg width="40" height="40"
                  viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="40" height="40" rx="20" fill="#95D0A1" />
                    <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M20 40C31.0457 40 40 31.0457 40 20C40 8.9543 31.0457 0 20 0C8.9543 0 0 8.9543 0 20C0 31.0457 8.9543 40 20 40Z"
                      fill="url(#paint0_linear_35_11)" fill-opacity="0.3" />
                    <path d="M20 26.0032L20 14.0032M20 14.0032L24.0006 18.0032M20 14.0032L15.9994 18.0032"
                      stroke="white" stroke-width="2" stroke-linecap="round" />
                    <defs>
                        <linearGradient id="paint0_linear_35_11" x1="-20" y1="20" x2="20" y2="60"
                          gradientUnits="userSpaceOnUse">
                            <stop stop-color="#AEE4B2" />
                            <stop offset="1" stop-color="#95D0A1" />
                        </linearGradient>
                    </defs>
                </svg></button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed, watch, nextTick } from 'vue'
import { useApartmentsStore } from '~/stores/apartments'
import ApartmentBlock from '~/components/ApartmentBlock.vue'
import noUiSlider from 'nouislider'
import 'nouislider/dist/nouislider.css'
const store = useApartmentsStore()
const isHydrated = ref(false)

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

function initSliders() {
    const sliderArea = document.getElementById('slider-area')
    if (sliderArea) {
        noUiSlider.create(sliderArea, {
            start: [store.filters.area.min, store.filters.area.max],
            range: { min: 0, max: 100 },
            connect: true
        }).on('update', (values) => {
            store.updateFilter('area', {
                min: Math.round(Number(values[0]) * 10) / 10,
                max: Math.round(Number(values[1]) * 10) / 10
            })
        })
    }

    const sliderPrice = document.getElementById('slider-price')
    if (sliderPrice) {
        noUiSlider.create(sliderPrice, {
            start: [store.filters.price.min, store.filters.price.max],
            range: { min: 0, max: 10_000_000 },
            connect: true
        }).on('update', (values) => {
            // округление до целого числа
            store.updateFilter('price', {
                min: Math.round(Number(values[0])),
                max: Math.round(Number(values[1]))
            })
        })
    }
}

onMounted(() => {
    if (!store.apartments.length) store.fetchApartments()
    window.addEventListener('scroll', () => {
        showScrollTop.value = window.scrollY > 100
    })

    watch(() => store.filters.rooms, (newRooms) => {
        console.log("Rooms updated on client:", newRooms)
        nextTick(() => {
            const buttons = document.querySelectorAll('.page__room-button')
            buttons.forEach(btn => {
                const room = parseInt(btn.textContent?.replace('k', '') || '0')
                btn.classList.toggle('active', newRooms.includes(room))
            })
        })
    }, { immediate: true, flush: 'post' })

    nextTick(() => {
        isHydrated.value = true
        nextTick(() => {
            initSliders()
        })
    })
})
</script>

<style scoped lang="scss">
.apartments-page {
    max-width: 1440px;
    margin: 0 auto;
    padding: 84px 80px;
    box-sizing: border-box;

    &__loader {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 50vh;
        font-size: 1.2em;
        color: #666;

        &-spinner {
            border: 4px solid rgba(0, 0, 0, 0.1);
            border-left-color: #4caf50;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            animation: spin 1s linear infinite;
            margin-bottom: 10px;
        }
    }

    &__main {
        display: grid;
        grid-template-columns: minmax(400px, 801px) minmax(200px, 399px);
        column-gap: 60px;
        justify-content: space-between;

        &-table {
            .apartments-page__main-title {
                font-size: 5.4rem;
                font-weight: 700;
                margin-bottom: 30px;
            }

            @media (max-width: 960px) {
                .apartments-page__main-title {
                    margin-bottom: 14px;
                }
            }

            .apartments-page__apartment-list {
                width: 100%;
                border-radius: 4px;
                overflow: hidden;
                margin-bottom: 50px;

                &-header {
                    display: grid;
                    grid-template-columns: 9.9877fr 35.083fr 14.983fr 14.983fr 14.983fr;
                    column-gap: 20px;
                    font-weight: 600;
                    padding-bottom: 10px;
                    box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.1);

                    .apartments-page__apartment-list-header-item {
                        text-align: left;
                        cursor: pointer;
                        font-size: 1.4rem;
                        line-height: 143%;
                        color: var(--color_zodiac);
                        padding: 5px 0;
                        font-weight: 400;

                        &:hover {
                            background-color: #e0e0e0;
                        }
                    }

                    @media (max-width: 960px) {
                        .apartments-page__apartment-list-header-item:nth-child(-n+2) {
                            display: none;
                        }
                    }

                    .apartments-floor,
                    .apartments-rub,
                    .apartments-area {
                        display: flex;
                        column-gap: 8px;
                    }

                    .apartments-page__apartment-list-svg {
                        &.active {
                            svg {
                                g {
                                    path {
                                        fill: #0B1739;
                                    }

                                    path {
                                        fill: #FF0000;
                                    }
                                }

                                path {
                                    fill: #3EB57C;
                                }
                            }
                        }

                        // &.non-active {
                        // }
                    }

                    .apartments-page__apartment-list-rub-svg {
                        &.active {
                            svg {
                                g {
                                    path {
                                        fill: #0B1739;
                                    }

                                    path {
                                        fill: #FF0000;
                                    }
                                }

                                path {
                                    fill: #3EB57C;
                                }
                            }
                        }

                        // &.non-active {
                        // }
                    }
                }

                @media (max-width: 960px) {
                    &-header {
                        display: flex;
                        box-shadow: none;
                        padding-bottom: 6px;
                    }
                }

                &__no-results {
                    padding: 20px;
                    text-align: center;
                    color: #999;
                }
            }

            @media (max-width: 960px) {
                .apartments-page__apartment-list {
                    margin-bottom: 23px;
                }
            }

            .apartments-page__btn-more {
                padding: 7px 23.28px;
                background-color: transparent;
                cursor: pointer;
                font-size: 16px;
                font-weight: 500;
                line-height: 150%;
                border: 1px solid rgba(11, 23, 57, 0.2);
                border-radius: 25px;
                color: var(--color_zodiac);
                transition: background-color .3s ease-in-out;

                &:disabled {
                    cursor: not-allowed;
                    opacity: 0.6;
                }

                &:hover:not(:disabled) {
                    background-color: rgba(62, 181, 124, 0.1);
                    border: 1px solid var(--color_ocean-green);
                }
            }

            @media (max-width: 960px) {
                .apartments-page__btn-more {
                    font-size: 15px;
                }
            }
        }

        &-filters {
            height: fit-content;
            background: linear-gradient(135deg, rgba(174, 228, 178, 0.3) 0%, rgba(149, 208, 161, 0.3) 100%);
            border-radius: 10px;
            padding: 40px;
            margin-top: 12px;

            .apartments-page__filter-group {
                margin-bottom: 25px;

                .apartments-page__rooms-title {
                    display: block;
                    margin-bottom: 8px;
                    font-size: 14px;
                    font-weight: 400;
                    line-height: 143%;
                }

                .apartments-page__rooms-buttons {
                    display: flex;
                    column-gap: 16px;

                    .apartments-page__room-button {
                        padding: 10px;
                        width: 44px;
                        height: 44px;
                        border: none;
                        border-radius: 100px;
                        cursor: pointer;
                        font-size: 16px;
                        font-weight: 400;
                        line-height: 150%;
                        color: var(--color_zodiac);
                        text-align: center;
                        background-color: var(--color_white);
                        transition: box-shadow .3s ease-in-out;

                        &.active {
                            background-color: var(--color_ocean-green);
                            box-shadow: 0 6px 20px 0 #95d0a1;
                            color: white;
                        }

                        &.disabled {
                            // opacity: 0.5;
                            color: rgba(11, 23, 57, 0.2);
                            cursor: not-allowed;
                        }

                        &:hover {
                            box-shadow: 0 6px 20px 0 #95d0a1;
                        }

                        &.disabled:hover {
                            box-shadow: none;
                        }
                    }
                }

                .apartments-page__filter-slider {
                    margin-bottom: 10px;
                }

                .apartments-page__filter-item {
                    margin-bottom: 11px;
                    white-space: nowrap;

                    .apartments-page__from-title {
                        font-size: 16px;
                        font-weight: 400;
                        line-height: 150%;
                        opacity: 0.5;
                        margin-right: 8px;
                    }

                    .apartments-page__from-item {
                        font-size: 16px;
                        font-weight: 500;
                        margin-right: 60px;
                    }

                    .apartments-page__to-title {
                        font-size: 16px;
                        font-weight: 400;
                        line-height: 150%;
                        opacity: 0.5;
                        margin-right: 8px;
                    }

                    .apartments-page__to-item {
                        font-size: 16px;
                        font-weight: 500;
                    }
                }
            }

            .apartments-page__filter-group:nth-child(2) {
                margin-bottom: 30px;
            }

            .apartments-page__filter-group:nth-child(3) {
                margin-bottom: 27px;

                .apartments-page__filter-item {
                    .apartments-page__from-item {
                        margin-right: 98px;
                    }
                }
            }

            .apartments-page__main-reset {
                background-color: transparent;
                padding: 6px 16px;
                border: none;
                cursor: pointer;
                font-size: 14px;
                font-weight: 400;
                line-height: 143%;
                color: #000000;
                display: flex;
                column-gap: 8px;
                border-radius: 25px;
                transition: background-color .3s ease-in-out;
                border: 1px solid transparent;

                &:hover {
                    background-color: rgba(62, 181, 124, 0.1);
                    border: 1px solid var(--color_ocean-green);
                }
            }
        }

        @media (max-width: 960px) {
            &-filters {
                padding: 20px;

                .apartments-page__filter-group {
                    .apartments-page__rooms-buttons {
                        column-gap: 15px;
                    }

                    .apartments-page__rooms-title {
                        font-size: 13px;
                        margin-bottom: 6px;
                    }

                    .apartments-page__filter-item {
                        margin-bottom: 11px;

                        .apartments-page__from-title {
                            font-size: 14px;
                        }

                        .apartments-page__from-item {
                            font-size: 14px;
                            margin-right: 51px;
                        }

                        .apartments-page__to-title {
                            font-size: 14px;
                        }

                        .apartments-page__to-item {
                            font-size: 14px;
                        }
                    }
                }

                .apartments-page__main-reset {
                    font-size: 13px;
                }
            }
        }

        &-top {
            position: fixed;
            right: 32px;
            bottom: 32px;
            cursor: pointer;
            background-color: transparent;
            border: none;

            &:disabled {
                cursor: not-allowed;
                opacity: 0.6;
            }
        }
    }

    @media (max-width: 960px) {
        &__main {
            column-gap: 28px;
            grid-template-columns: minmax(400px, 506px) minmax(200px, 318px);
        }
    }
}

@media (max-width: 960px) {
    .apartments-page {
        padding: 36px 54px;
    }
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

/* Для скрытия до гидрации */
[v-cloak] {
    display: none;
}

.noUi-target {
    background: rgba(11, 23, 57, 0.1);
    border: none;
    box-shadow: none;
    border-radius: 1px;
}

.noUi-horizontal {
    height: 3px;
}

:deep(.noUi-connect) {
    background: var(--color_ocean-green);
}

:deep(.noUi-horizontal .noUi-handle) {
    width: 15px;
    height: 15px;
    border-radius: 100%;
    background: var(--color_ocean-green);
    box-shadow: none;
    border: none;
    right: 0;
}

:deep(.noUi-handle:before) {
    display: none;
}

:deep(.noUi-handle:after) {
    display: none;
}

:deep(.noUi-horizontal .noUi-handle-lower) {
    right: -14px;
}
</style>
