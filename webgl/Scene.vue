<template>
   <div>
        <div id="threeDiv" ref="container" class="w-screen h-screen">
        </div>
        <div id="controlsDiv"></div>
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

