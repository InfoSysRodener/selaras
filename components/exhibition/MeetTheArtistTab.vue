<template>
    <div>
        <div v-for="artist in artists" :key="artist.title" class="my-5">
            <h1 class="text-lg font-semibold mb-5">{{ artist.title }}</h1>
                <img :src="require(`~/assets/artists/${artist.image}`)" />
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
                        image:'WidiWardani.jpg',
                        title: 'Widi Wardani Purama',
                        description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr ,sed',
                        social:[

                        ]
                    },
                    {
                        image:'SandyTisa.jpg',
                        title: 'Sandy Tisa',
                        description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr ,sed',
                        social:[

                        ]
                    }
                ]
            }
        }
    }
</script>