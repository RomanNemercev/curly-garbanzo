<template>
    <div class="apartment-block" role="listitem" v-for="apartment in apartments" :key="apartment.id">
        <div class="apartment-block__item a">
            <img :src="`/images/${apartment.image}`" loading="lazy" alt="Layout" class="apartment-block__image">
        </div>
        <div class="apartment-block__item b">{{ apartment.layout }}</div>
        <div class="apartment-block__item c">{{ apartment.area }} <span class="apartment-block__m">м²</span></div>
        <div class="apartment-block__item d">{{ apartment.floors }} <span class="apartment-block__f">этаж</span></div>
        <div class="apartment-block__item e">{{ apartment.price.toLocaleString() }} <span
              class="apartment-block__r">₽</span></div>
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
    grid-template-columns: 9.9877fr 35.083fr 14.983fr 14.983fr 14.983fr;
    column-gap: 20px;
    max-width: 100%;
    box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.1);

    &__item:first-child {
        padding: 26.4px 7px;
    }

    &__item:nth-child(2) {
        font-size: 1.6rem;
        font-weight: 500;
        padding-top: 19px;
    }

    &__item:nth-child(3) {
        font-size: 1.6rem;
        font-weight: 400;
        padding-top: 18px;

        .apartment-block__m {
            display: none;
        }
    }

    &__item:nth-child(4) {
        font-size: 1.6rem;
        color: rgba(11, 23, 57, 0.5);
        padding-top: 18px;

        .apartment-block__f {
            display: none;
        }
    }

    &__item:nth-child(4)::first-letter {
        color: var(--color_zodiac);
    }

    &__item:last-child {
        font-size: 1.6rem;
        font-weight: 400;
        padding-top: 18px;

        .apartment-block__r {
            display: none;
        }
    }
}

@media (max-width: 960px) {
    .apartment-block {
        border: 1px solid rgba(0, 0, 0, 0.1);
        border-radius: 8px;
        box-shadow: none;
        // display: flex;
        // flex-direction: row-reverse;
        display: grid;
        grid-template-areas:
            "i i i i i f f f"
            "i i i i i f f f"
            "b o n n n f f f"
            "b o n n n f f f"
            "b o n n n f f f";

        &__item:first-child {
            padding: 24px 30px 18px 20px;
        }

        &__item:nth-child(2) {
            font-size: 14px;
            font-weight: 500;
            padding-top: 21px;
            padding-left: 25px;
            line-height: 10px;
        }

        &__item:nth-child(3) {
            display: flex;
            column-gap: 5px;
            font-size: 14px;
            font-weight: 500;
            padding-top: 0;
            padding-left: 22px;
            margin-top: -5px;

            .apartment-block__m {
                display: inline-block;
            }
        }

        &__item:nth-child(4) {
            font-size: 14px;
            font-weight: 500;
            padding-top: 0;
            margin-top: -5px;

            .apartment-block__f {
                display: inline-block;
            }
        }

        &__item:last-child {
            padding-top: 0;
            font-size: 14px;
            font-weight: 500;
            margin-top: -5px;
            margin-left: -23px;

            .apartment-block__r {
                display: inline-block;
            }
        }
    }

    .apartment-block:not(:last-of-type) {
        margin-bottom: 4px;
    }

    .a {
        grid-area: f;
    }

    .b {
        grid-area: i;
    }

    .c {
        grid-area: b;
    }

    .d {
        grid-area: o;
    }

    .e {
        grid-area: n;
    }

}
</style>