<template>
    <div>
        <Navbar/>
        <div class="w-full h-screen relative">
            <Scene>
              <!-- <MenuTab/>  -->
              <ListenTab/>
            </Scene>
        </div>
        <ExhibitionDetail/> 
        <Footer/>
    </div>
</template>


<script>
  import Scene from '../webgl/Scene.vue';
  import Navbar from '../components/Navbar.vue';
  import Footer from '../components/Footer.vue';
  import ExhibitionDetail from '../components/exhibition/Detail.vue';
  // import MenuTab from '../components/exhibition/MenuTab.vue';
  import ListenTab from '../components/exhibition/ListenTab.vue';
  export default {
    components:{ExhibitionDetail,Navbar,Footer,Scene,ListenTab}
  }
</script> 