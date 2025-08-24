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
    const fullFiltered = ref<Apartment[]>([]) // Новый: полный отфильтрованный массив без пагинации
    const filteredApartments = ref<Apartment[]>([])
    const currentPage = ref(1)
    const perPage = 5
    const loading = ref(false)

    const filters = ref({
        area: { min: 0, max: 200 }, // Расширил max, чтобы протестировать (верни 100, если нужно)
        floors: { min: 1, max: 17 },
        price: { min: 0, max: 20000000 }, // Расширил, чтобы захватить все цены
        rooms: [1, 2, 3, 4] // Добавил 4 disabled, но для теста
    })

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
                } else if (sortKey.value === 'floors') {
                    const floorsStrA = a.floors ?? ''
                    const floorsNumStrA = (floorsStrA.split(' ')[0] ?? '')
                    valueA = parseInt(floorsNumStrA)
                    const floorStrB = b.floors ?? ''
                    const floorsNumStrB = (floorStrB.split(' ')[0] ?? '')
                    valueB = parseInt(floorsNumStrB)
                } else if (sortKey.value === 'price') {
                    valueA = a.price
                    valueB = b.price
                }
                return sortOrder.value === 'asc' ? (valueA ?? 0) - (valueB ?? 0) : (valueB ?? 0) - (valueA ?? 0)
            })
        }

        fullFiltered.value = sorted.filter(apartment =>
            apartment.area >= filters.value.area.min && apartment.area <= filters.value.area.max &&
            parseInt((apartment.floors ?? '').split(' ')[0] ?? '') >= filters.value.floors.min &&
            parseInt((apartment.floors ?? '').split(' ')[0] ?? '') <= filters.value.floors.max &&
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

    return { apartments, fullFiltered, filteredApartments, currentPage, perPage, loading, fetchApartments, filterApartments, loadMore, filters, updateFilter, sortKey, sortOrder, sortBy }
})