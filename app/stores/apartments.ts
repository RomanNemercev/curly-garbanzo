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
    const fullFiltered = ref<Apartment[]>([])
    const filteredApartments = ref<Apartment[]>([])
    const currentPage = ref(1)
    const perPage = 5
    const loading = ref(false)

    // start floors clear
    const defaultFilters = {
        area: { min: 0, max: 100 },
        price: { min: 0, max: 10_000_000 },
        rooms: [1, 2, 3]
    }
    const filters = ref({ ...defaultFilters })

    const sortKey = ref('')
    const sortOrder = ref('asc')

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
        let sorted = [...apartments.value]
        if (sortKey.value) {
            sorted.sort((a, b) => {
                let valueA, valueB
                if (sortKey.value === 'area') {
                    valueA = a.area
                    valueB = b.area
                } else if (sortKey.value === 'price') {
                    valueA = a.price
                    valueB = b.price
                }
                return sortOrder.value === 'asc' ? (valueA ?? 0) - (valueB ?? 0) : (valueB ?? 0) - (valueA ?? 0)
            })
        }

        fullFiltered.value = sorted.filter(apartment =>
            apartment.area >= filters.value.area.min && apartment.area <= filters.value.area.max &&
            apartment.price >= filters.value.price.min && apartment.price <= filters.value.price.max &&
            filters.value.rooms.includes(parseInt((apartment.layout ?? '').split('-')[0] ?? ''))
        )

        console.log('Full filtered length:', fullFiltered.value.length)
        console.log('Excluded apts:', apartments.value.filter(apt => !fullFiltered.value.includes(apt)).map(apt => apt.id))

        filteredApartments.value = fullFiltered.value.slice(0, perPage)
        currentPage.value = 1
    }

    function loadMore() {
        currentPage.value++
        const nextEnd = currentPage.value * perPage
        filteredApartments.value = fullFiltered.value.slice(0, nextEnd)
    }

    type FilterType = 'area' | 'price' | 'rooms'

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

    function resetFilters() {
        filters.value = { ...defaultFilters }
        filterApartments()
    }


    function sortBy(key: string) {
        loading.value = true
        if (sortKey.value === key) {
            sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
        } else {
            sortKey.value = key
            sortOrder.value = 'asc'
        }
        filterApartments()
        loading.value = false
    }

    return { apartments, fullFiltered, filteredApartments, currentPage, perPage, loading, fetchApartments, filterApartments, loadMore, filters, updateFilter, resetFilters, sortKey, sortOrder, sortBy }
})