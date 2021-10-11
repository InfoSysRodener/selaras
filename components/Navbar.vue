<template> 
    <nav class="bg-selaras-black py-4">
        <div class="flex flex-row justify-between">
            <img class="ml-5 sm:ml-10" src="~/assets/SelarasLogo.svg"/>

            <div  class="flex flex-row cursor-pointer" @click="isOpen = !isOpen">
                <img src="~/assets/icons/account-circle.svg" />
                <p class="text-white pl-2  mr-5 sm:mr-10">Account</p>
            </div>
           <div v-show="isOpen" class="absolute right-0 mt-8 mr-2  w-44 bg-white rounded-sm shadow-xl z-20 text-center" @click="isOpen = !isOpen">
                <a href="#" class="block px-4 py-4 text-sm capitalize text-gray-700 hover:bg-orange hover:text-white">
                   Sign Out
                </a>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    data(){
        return {
            isOpen:false
        }
    },
    methods:{

    }
}
</script>