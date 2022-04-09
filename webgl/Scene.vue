<template>
   <div>
        <div id="threeDiv" ref="container" class="w-full h-screen">
            <slot/>
        </div>
        <div id="controlsDiv" class="ml-5"></div>
   </div>
</template>

<script>
    import SceneInit from './js/scene.js';    
    export default {
        // beforeRouteLeave (to, from, next) { 
        //     document.dispatchEvent(new Event('disposeAll'));
        //     next();
        // }, 
        mounted() {
            this.scene = new SceneInit({ dom: this.$refs.container });

            this.$nuxt.$on('MUTE-BACKGROUND-MUSIC',(payload) =>{
                this.scene.muteMusic(payload);
            })

            this.$nuxt.$on('CLOSED-PAINTING-VIEW',() => {
                this.scene.moveBackCamera();
            })
        },
        beforeDestroy(){
            this.$nuxt.$off('CLOSED-PAINTING-VIEW');
            this.$nuxt.$off('MUTE-BACKGROUND-MUSIC');
            document.dispatchEvent(new Event('disposeAll'));
        },

    }
</script>

