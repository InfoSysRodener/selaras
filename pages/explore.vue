/* eslint-disable vue/no-unused-components */
<template>
    <div>
       <Scene>
         <MenuView/>
         <div v-if="isLoading" class="flex justify-center absolute items-center h-screen z-50 bg-gray-200 opacity-90 ">
            <img class="w-14 h-14" src="~/assets/loading.gif"/>
         </div>
       </Scene>
      
    </div>
</template>


<script>
  import Scene from '../webgl/Scene.vue';
  import MenuView from '../components/exhibition/MenuView.vue';

  export default {
    components:{
      Scene,
      MenuView,
    },
    layout: 'exhibition_layouts',
    middleware:'auth',
    data(){
      return {
        isLoading:true,
      }
    },
    created(){
      this.$nuxt.$on('LOADING-SCENE', (payload) => {
          console.log(payload);
          if(payload.progress === 100) this.isLoading = false;
      });
    },
    beforeDestroy(){
      this.isLoading = true;
      this.$nuxt.$off('LOADING-SCENE');
    },
  }
</script> 