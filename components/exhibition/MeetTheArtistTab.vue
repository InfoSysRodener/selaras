<template>
    <div>
        <div v-for="artist in artists" :key="artist.title">
            <h1 class="text-lg font-semibold mb-5">{{ artist.title }}</h1>
                <img src="~/assets/images/2.svg"/>
                <p class="my-5 text-sm">
                    {{ artist.description }}
                </p>
            <div class="my-5 flex flex-row">
                <img class="w-10" src="~/assets/icons/social/facebook-outline.svg">
                <img class="w-10" src="~/assets/icons/social/twitter-outline.svg">
                <img class="w-10" src="~/assets/icons/social/instagram-outline.svg">
                <img class="w-10" src="~/assets/icons/social/globe-outline.svg">
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                artists:[
                    {
                        title: 'Widi Wardani Purama',
                        description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr ,sed',
                    },
                    {
                        title: 'Artist Name',
                        description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr ,sed',
                    }
                ]
            }
        }
    }
</script>