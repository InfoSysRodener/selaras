<template>
    <div class="flex flex-col items-center w-full h-full">
        <div class="pt-28 flex flex-row justify-center items-center">
          <h1 class="font-semibold text-lg xl:text-4xl tracking-widest text-center"> Meet The Artist </h1>
        </div>
        <div class="my-14 inline-flex justify-center items-center w-full relative h-xl">
            <div class="hidden sm:block relative  left-0">
              <img class="h-xl w-full object-contain" src="~/assets/images/meet-the-artist-painting1.png">
            </div>
            <div class="block relative"> 
                <video ref="myvideo" class="w-full h-full sm:h-xl" controls Autoplay=autoplay>
                    <source src="/3D/meet_the_artist.mov" type="video/mp4">
                     <!-- <source src="/3D/selarasvideo.mp4" type="video/mp4">  -->
                    Your browser does not support HTML video.
                </video>
            </div>
            <div class="hidden sm:block relative right-0">
                <img class="h-xl w-full object-contain" src="~/assets/images/meet-the-artist-painting2.png">
            </div>
        </div>
        <div class="pb-10 w-1/3">
          <NuxtLink to="/explore">
             <button class="my-5 p-3 bg-orange text-white w-full"> Start Tour </button>   
          </NuxtLink>
        </div>
    </div>
</template>


<script>
  export default {
      beforeRouteLeave (to, from, next) { 
        this.$refs.myvideo.pause();
        next();
      },
      layout: 'exhibition_layouts',
      middleware:'auth',
  }
</script>

<style scoped>
    h1{
       font-family: Montserrat-Itallic; 
    }
</style>