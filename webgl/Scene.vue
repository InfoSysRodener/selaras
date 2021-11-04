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
        data(){
            return {
                scene: null
            }
        },
        mounted() {
            this.scene = new SceneInit({ dom: this.$refs.container });
        },
        beforeDestroy(){
            // console.log(this.scene.dispose());
            // this.scene.dispose();
        }
    }
</script>

