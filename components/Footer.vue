<template>
    <div class="bg-selaras-black p-3 relative h-full text-white text-center w-full text-xs sm:text-base">
      <p class="font-thin"> Copyright © <span class="underline">Selaras Art Space</span> {{ year }}</p>
    </div>
</template>

<script>
export default {
   data(){
        return {
            year: new Date().getFullYear(),
        }
    },
}
</script>

