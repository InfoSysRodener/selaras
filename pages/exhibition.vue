<template>
    <div>
        <Navbar/>
        <div class="w-full h-screen absolute bg-exhibition bg-cover bg-bottom"></div> 
        <div class="w-full h-screen relative backdrop-filter backdrop-brightness-185 backdrop-blur-lg">
            <div class="flex flex-row justify-center pt-10 w-full">
                <div class="flex flex-col justify-between items-center content-center w-1/2">
                    <div class="flex flex-row">
                      <div class="pr-10">
                        <img src="~/assets/images/1.svg">
                        <p class="text-lg pt-4 font-semibold tracking-widest">Widi Wardani Purnama</p>
                      </div>
                      <div class="pl-10">
                        <img src="~/assets/images/2.svg">
                        <p class="text-lg pt-4 font-semibold tracking-widest">Sandy Tisa Pratama</p>
                      </div>
                    </div>
                    <div class="mt-5 w-3/5">
                      <h1 class="text-center text-4xl font-semibold tracking-widest">Exhibition Title</h1>
                        <p class="my-5 text-center">01 Dec 2020 - 01 Dec 2021</p>
                        <p class="mb-5 text-center">
                            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
                        </p>
                        <button class="my-5 p-3 bg-orange text-white w-full"> Enter Exhibition </button>   
                    </div> 
                </div>    
            </div>
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

<style scoped>
    h1{
       font-family: Montserrat-Itallic; 
    }

</style>