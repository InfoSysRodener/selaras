<template>
    <div class="flex flex-col justify-center items-center w-full h-full">  
        <div class="flex flex-row px-5 pt-10 lg:pt-5">
          <div>
            <img src="~/assets/images/1.svg">
            <p class="text-xs p-1 lg:text-lg lg:p-4 font-semibold sm:tracking-widest">Widi Wardani Purnama</p>
          </div>
          <div class="px-2 sm:px-5 xl:px-10"></div>
          <div>
            <img src="~/assets/images/2.svg">
            <p class="text-xs p-1 lg:text-lg lg:p-4 font-semibold sm:tracking-widest">Sandy Tisa Pratama</p>
          </div>
        </div>
        <div class="px-5 py-5 md:w-3/4 lg:w-1/3">
            <h1 class="text-center text-lg lg:text-4xl font-semibold tracking-widest">Exhibition Title</h1>
            <p class="my-5 text-xs lg:text-base text-center">01 Dec 2020 - 01 Dec 2021</p>
            <p class="mb-5 text-xs lg:text-sm text-center">
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
            </p>
            <NuxtLink to="/meet-the-artist">
              <button class="my-5 p-3 bg-orange text-white w-full"> Enter Exhibition </button>
            </NuxtLink>   
        </div>    
    </div>
</template>


<script>
  export default {
      layout: 'exhibition_layouts',
   
  }
</script>

<style scoped>
    h1{
       font-family: Montserrat-Itallic; 
    }

</style>