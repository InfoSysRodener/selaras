<template>
   <div>
        <div id="threeDiv" ref="container" class="w-full h-screen">
            <slot/>
        </div>
        <div id="controlsDiv"></div>
   </div>
</template>

<script>
    import SceneInit from './js/scene.js';    
    export default {
        mounted() {
            this.scene = new SceneInit({ dom: this.$refs.container });
            console.log(this.scene);
        },
    }
</script>

