<template>
    <div>
        <Navbar/>
        <div class="w-full h-screen">
            <Scene/>
        </div>
        <ExhibitionDetail/>
        <Footer/>
    </div>
</template>



<script>
  import Scene from '../components/webgl/Scene.vue';
  import Navbar from '../components/Navbar.vue';
  import Footer from '../components/Footer.vue';
  import ExhibitionDetail from '../components/exhibition/Detail.vue';
  export default {
    components:{ExhibitionDetail,Navbar,Footer,Scene}
  }
</script>