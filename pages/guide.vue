<template>
    <div class="flex flex-row justify-center content-center items-center w-full h-full">
        <div class="w-full bg-white p-5 sm:p-24 mx-5 my-20 lg:w-3/5">
           <div class="flex flex-row justify-between sm:justify-around text-center">
                <div>
                   <NuxtLink to="/explore">
                    <img class="mb-2" src="~/assets/icons/guided-tour.svg">
                    <h1 class="font-semibold text-sm sm:text-xl">Guided Tour</h1>
                    <p class="text-sm">(Listen Mode)</p>
                    </NuxtLink>
                </div>
                <div class="px-5"></div>
                <div>
                  <NuxtLink to="/explore">
                    <img class="mb-2" src="~/assets/icons/explore-exhibition.svg">
                    <h1 class="font-semibold text-sm sm:text-xl">Explore Exhibition</h1>
                    <p class="text-sm">(Read Mode)</p>
                  </NuxtLink>
                </div>
           </div>
           <p class="my-10 text-xs sm:text-sm text-center">(You can always change it later inside the exhibition.)</p>
        </div>
    </div>
</template>


<script>
  export default {
      layout: 'exhibition_layouts',
  }
</script>
