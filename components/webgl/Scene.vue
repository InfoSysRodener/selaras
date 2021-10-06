<template>
    <div ref="container" class="w-screen h-screen" >
    
    </div>
</template>

<script>

    import SceneInit from './js/scene.js';    

    export default {
        mounted() {
            this.scene = new SceneInit({ dom: this.$refs.container });
        },
    }
</script>

