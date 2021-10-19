<template>
    <div class="absolute flex flex-row-reverse w-full h-full">
        <aside class="p-10 overflow-y-auto flex flex-col justify-between bg-transparent w-3/4 sm:w-1/2 md:3/5 lg:w-1/4">
            <div class="flex justify-end">
                <img class="cursor-pointer" :src="require(`~/assets/icons/menu/${ open ? 'close' : 'hamburger'}.svg`)" @click="toggleTab"/>
            </div>
            <div v-show="open" v-if="mode == 'guided'" class="flex justify-end">
                <div>
                    <div ref="btnPrevious" class="flex flex-row justify-end items-center cursor-pointer">
                        <label class="text-xs underline text-white pr-5">Previous</label>
                        <img src="~/assets/icons/media/previous.svg" />
                    </div>
                    <div class="flex flex-row justify-end items-center cursor-pointer">
                        <label class="text-xs underline text-white pr-5">Play</label>
                        <img class="-mr-1" src="~/assets/icons/media/play.svg" />
                    </div>  
                    <div  ref="btnNext" class="flex flex-row justify-end items-center cursor-pointer">
                       <label class="text-xs underline text-white pr-5">Next</label>
                       <img src="~/assets/icons/media/next.svg" />
                    </div>
                </div>
            </div>
            <div v-show="open" v-else class="flex justify-end">
                <div>
                    <div class="mb-10">
                        <h1 class="text-2xl font-semibold">{{ selectedArt.title }} </h1>
                        <p class="font-medium">{{ selectedArt.author }} </p>
                    </div>
                    <div class="mb-5">
                        <p>{{ selectedArt.details.date }}</p>
                        <p>{{ selectedArt.details.size }}</p>
                        <p>{{ selectedArt.details.type }}</p>
                    </div>
                    <div>
                        <p>{{ selectedArt.description }}</p>
                        <p>{{ selectedArt.idr }}</p>
                    </div>
                </div>
            </div>
            <div v-show="open" class="flex justify-end">
                <div>
                   <div class="flex flex-row justify-end items-center">
                        <label class="text-xs underline text-white pr-5">Buy</label>
                        <img src="~/assets/icons/menu/cart.svg"/>
                    </div>
                    
                    <div class="flex flex-row justify-end items-center">
                        <label class="text-xs underline text-white pr-5">Explore Mode</label>
                        <img src="~/assets/icons/menu/explore.svg"/>
                    </div>
                </div>
            </div>
        </aside>
    </div>
</template>

<script>
    import ListenModeInit from '@/webgl/js/listenModeControls.js'

    export default {
        data(){
            return {
                mode:'guided', // guided || explore 
                open:false,

                selectedArt:{
                    title: 'Hikayat PohonHidup',
                    author:'Sandy Tisa Pratama',
                    details:{
                        size:'60x100cm',
                        date:'2021',
                        type:'Mixed Media on Canvas'
                    },
                    description:'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam',
                    idr:'xxxxxxxxx'
                }
            }
        },
        mounted(){
            ListenModeInit({ 
                previous: this.$refs.btnPrevious,
                next: this.$refs.btnNext
            });
        },
        methods:{
            toggleTab(){
                this.open = !this.open;
            }
        },
        
       
    }
</script>
<style scoped>
    /* width */
  
    ::-webkit-scrollbar,
    ::-webkit-scrollbar-thumb,
    ::-webkit-scrollbar-track { 
        width: 8px;
        border: none;
        background: transparent;
    }


    ::-webkit-scrollbar-button,
    ::-webkit-scrollbar-track-piece,
    ::-webkit-scrollbar-corner,
    ::-webkit-resizer {
        display: none;
    }

    /* Track */
    ::-webkit-scrollbar-track {
    /* border-radius: 100vh; */
    /* background: #000000; */
         
       background-image: url('~/assets/images/scrollbar.svg');
       background-repeat: repeat-y;
       background-size: contain;
       background-position: center;
       background:cover;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: #F88E52;
        /* margin:2px; */
        /* border-radius: 100vh; */
        /* border: 3px solid #edf2f7; */
        /* box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5); */
   
    }

    /* Handle on hover */
    /* ::-webkit-scrollbar-thumb:hover {
      background: #a0aec0;
    } */

    
</style>