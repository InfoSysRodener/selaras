<template>
    <div class="flex flex-col items-center w-full h-full">
        <div class="pt-10 flex flex-row justify-center items-center">
          <h1 class="font-semibold text-lg xl:text-4xl tracking-widest text-center"> Meet The Artist </h1>
        </div>
        <div class="my-10 grid grid-cols-7">
            <div class="col-span-2">
              <img class="h-32 sm:h-56 lg:h-96 w-full object-cover" src="~/assets/images/3.svg">
            </div>
            <div class="col-span-3"> 
                <video class="w-full  h-full lg:h-96" controls>
                  <source src="mov_bbb.mp4" type="video/mp4">
                    <source src="mov_bbb.ogg" type="video/ogg">
                    Your browser does not support HTML video.
                </video>
            </div>
            <div class="col-span-2">
                <img class="h-32 sm:h-56 lg:h-96 w-full object-cover" src="~/assets/images/5.svg">
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
      layout: 'exhibition_layouts',
      middleware:'auth',
  }
</script>

<style scoped>
    h1{
       font-family: Montserrat-Itallic; 
    }
</style>