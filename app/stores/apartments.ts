import { defineStore } from 'pinia'
import { ref } from 'vue'

interface Apartment {
    id: string
    layout: string
    area: number
    floors: string
    price: number
    image: string
}

export const useApartmentsStore = defineStore('apartments', () => {
    const apartments = ref<Apartment[]>([])
    const filteredApartments = ref<Apartment[]>([])
    const currentPage = ref(1)
    const perPage = 5
    const loading = ref(false)

    const filters = ref({
        area: { min: 0, max: 100 },
        floors: { min: 1, max: 17 },
        price: { min: 0, max: 10000000 },
        rooms: [1, 2, 3]
    })

    async function fetchApartments() {
        loading.value = true
        if (import.meta.client) {
            const response = await fetch('/data/apartments.json')
            apartments.value = await response.json()
            filterApartments()
        }
        loading.value = false
    }

    function filterApartments() {
        filteredApartments.value = apartments.value
            .filter(apartment => {
                // Проверка floors
                const floorsStr = apartment.floors ?? ''
                const floorsNumStr = (floorsStr.split(' ')[0] ?? '')
                const floorsNum = floorsNumStr !== '' ? parseInt(floorsNumStr) : NaN

                // Проверка layout
                const layoutStr = apartment.layout ?? ''
                const layoutNumStr = (layoutStr.split(' ')[0] ?? '')
                const layoutNum = layoutNumStr !== '' ? parseInt(layoutNumStr) : NaN

                return (
                    apartment.area >= filters.value.area.min &&
                    apartment.area <= filters.value.area.max &&
                    !isNaN(floorsNum) &&
                    floorsNum >= filters.value.floors.min &&
                    floorsNum <= filters.value.floors.max &&
                    apartment.price >= filters.value.price.min &&
                    apartment.price <= filters.value.price.max &&
                    !isNaN(layoutNum) &&
                    filters.value.rooms.includes(layoutNum)
                )
            })
            .slice(0, perPage)
        currentPage.value = 1
    }

    function loadMore() {
        const nextEnd = (currentPage.value + 1) * perPage
        filteredApartments.value = apartments.value
            .filter(apartment => {
                const floorsStr = apartment.floors ?? ''
                const floorsNumStr = (floorsStr.split(' ')[0] ?? '')
                const floorsNum = floorsNumStr !== '' ? parseInt(floorsNumStr) : NaN

                const layoutStr = apartment.layout ?? ''
                const layoutNumStr = (layoutStr.split(' ')[0] ?? '')
                const layoutNum = layoutNumStr !== '' ? parseInt(layoutNumStr) : NaN

                return (
                    apartment.area >= filters.value.area.min &&
                    apartment.area <= filters.value.area.max &&
                    !isNaN(floorsNum) &&
                    floorsNum >= filters.value.floors.min &&
                    floorsNum <= filters.value.floors.max &&
                    apartment.price >= filters.value.price.min &&
                    apartment.price <= filters.value.price.max &&
                    !isNaN(layoutNum) &&
                    filters.value.rooms.includes(layoutNum)
                )
            })
            .slice(0, nextEnd)
        currentPage.value++
    }

    type FilterType = 'area' | 'floors' | 'price' | 'rooms'

    function updateFilter(type: FilterType, value: { min: number; max: number } | number[]) {
        loading.value = true
        if (type === 'rooms') {
            filters.value.rooms = value as number[]
        } else {
            filters.value[type] = value as { min: number; max: number }
        }
        filterApartments()
        loading.value = false
    }

    return { apartments, filteredApartments, currentPage, perPage, loading, fetchApartments, filterApartments, loadMore, filters, updateFilter }
})