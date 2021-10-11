<template>
    <div>
        <h1 class="text-2xl font-semibold mb-5">{{ title }}</h1>
        <img src="~/assets/images/2.svg"/>
        <p class="my-5">
            {{ description }}
        </p>
        <div class="my-5 flex flex-row">
             <img src="~/assets/icons/social/facebook-outline.svg">
             <img src="~/assets/icons/social/twitter-outline.svg">
             <img src="~/assets/icons/social/instagram-outline.svg">
             <img src="~/assets/icons/social/globe-outline.svg">
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                title: 'Widi Wardani Purama',
                description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr ,sed'
            }
        }
    }
</script>