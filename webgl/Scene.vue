<template>
   <div>
        <div id="threeDiv" ref="container" class="w-full h-screen" style="touch-action:none">
            <slot/>
        </div>
        <div id="controlsDiv"></div>
   </div>
</template>

<script>
    import SceneInit from './js/scene.js';    
    export default {
        data() {
            return {
                scene:null
            }
        },
        mounted() {
            this.scene = new SceneInit({ dom: this.$refs.container });

            this.$nuxt.$on('CLOSED-PAINTING-VIEW',() => {
                console.log('closed painting view');
            })
        },
        beforeDestroy(){
            this.$nuxt.$off('CLOSED-PAINTING-VIEW');
            this.scene.dispose();
        }
    }
</script>

