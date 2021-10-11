<template>
    <div class="flex flex-col justify-center items-center w-full h-full">  
        <div class="flex flex-row px-5 pt-10 lg:pt-5">
          <div>
            <img src="~/assets/images/widi.svg">
            <p class="text-xs p-1 lg:text-lg lg:p-4 font-semibold sm:tracking-widest">Widi Wardani Purnama</p>
          </div>
          <div class="px-2 sm:px-5 xl:px-10"></div>
          <div>
            <img src="~/assets/images/sandy.svg">
            <p class="text-xs p-1 lg:text-lg lg:p-4 font-semibold sm:tracking-widest">Sandy Tisa Pratama</p>
          </div>
        </div>
        <div class="px-5 py-5 md:w-3/4 lg:w-1/3">
            <h1 class="text-center text-lg lg:text-4xl font-semibold tracking-widest">{{ exhibition.title}}</h1>
            <p class="my-5 text-xs lg:text-base text-center">{{ exhibition.date }}</p>
            <p class="mb-5 text-xs lg:text-sm text-center">
                {{ exhibition.description }}
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
      data(){
        return{
          exhibition:{
            title:'TITIK BERANGKAT',
            date: '21 Oktober 2021 - 31 Januari 2022',
            description:'Setiap manusia memiliki titik berangkat dalam hidupnya masing-masing. Sandy dan Widi mencoba menuturkan titik berangkat mereka lewat karya, yang akan menggugah rasa dalam melihat kembali bagaimana titik berangkat kita dalam hidup.'
          },
        }
      }
  }
</script>

<style scoped>
    h1{
       font-family: Montserrat-Itallic; 
    }

</style>