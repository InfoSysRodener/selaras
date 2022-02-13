<template>
    <div>
        <Navbar/>
        <div class="w-full h-full relative  bg-white bg-repeat bg-bottom">
            <!-- <div class="backdrop-filter backdrop-brightness-185 backdrop-blur-lg"> -->
               <Nuxt/>
            <!-- </div> -->
        </div>
        <ExhibitionDetail/>
        <Footer/>
    </div>
</template>

<script>
  import Navbar from '../components/Navbar.vue';
  import Footer from '../components/Footer.vue';
  import ExhibitionDetail from '../components/exhibition/Detail.vue';
  export default {
    components:{ExhibitionDetail,Navbar,Footer}
  }
</script>