<template>
    <div>
        <div v-for="art in arts" :key="art">
            <img class="py-2" :src="require(`~/assets/images/${art}`)" />
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                arts:[
                    '1.svg',
                    '2.svg',
                ]
            }
        }
    }
</script>