<template>
    <div v-if="movie">
        <h2>{{movie.original_title}}</h2>
        <img :src="movie.imageUrl ? movie.imageUrl : 'https://placeimg.com/200/200/tech'" width="200" style="float:right" />
        <h3>{{product.description}}</h3>
        <p>Price: {{product.price}}</p>
        <p>Fixed price? {{product.fixedPrice}}</p>
        <p>Discontinued? {{product.discontinued}}</p>
        <p>Modified date: {{product.modifiedDate }}</p>
    </div>
</template>

<script>
    export default {
        props: {
            movie: {
                type: Object,
                default: null
            },
        },
    }
</script>

<style lang="scss" scoped>

</style>