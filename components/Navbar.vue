<template> 
    <nav class="bg-selaras-black py-4 fixed w-full z-50">
        <div class="flex flex-row justify-between">
            <img  class="ml-5 sm:ml-10 cursor-pointer" src="~/assets/SelarasLogo.svg" @click="redirectToExhibition()"/>

            <div  class="flex flex-row cursor-pointer" @click="isOpen = !isOpen">
                <img src="~/assets/icons/account-circle.svg" />
                <p class="text-white pl-2  mr-5 sm:mr-10">Account</p>
            </div>
           <div v-show="isOpen" class="absolute right-0 mt-8 mr-2  w-44 bg-white rounded-sm shadow-xl z-20 text-center" @click="isOpen = !isOpen">
                <a class="block px-4 py-4 text-sm capitalize text-gray-700 hover:bg-orange hover:text-white cursor-pointer" @click="logOut" >
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
            isOpen:false,
        }
    },
    // watch:{
    //     '$route'(val){ 
    //         if(val.name === 'explore') this.isFixed = true;
    //     }
    // },
    methods:{
        async logOut(){
            try {
                await this.$store.dispatch('auth/logout');
                this.$router.push('sign-in');
            } catch (error) {
                console.log({error});
            }
        },
        redirectToExhibition() {
            this.$router.push('/exhibition');
        }
    }
}
</script>