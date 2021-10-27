<template>
    <div>
        <!-- <PaintingInfoModal :toggle="togglePaintingInfo" @closed="togglePaintingInfo = false"/> -->
        <div class="absolute flex flex-row-reverse w-full h-full z-10">
            <div v-if="togglePaintingInfo" class="absolute inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            
                    <!-- <div class="fixed inset-0 bg-gray-200 bg-opacity-75 transition-opacity" aria-hidden="true"></div> -->

                    <!-- This element is to trick the browser into centering the modal contents. -->
                    <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                    <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div class="flex justify-end py-2 ">
                                <img class="w-10 cursor-pointer" src="~/assets/icons/menu/close.svg"  @click="closePaintingInfo"/>
                            </div>
                            <div class="sm:flex sm:items-start">
                                <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <h3 id="modal-title" class="text-lg leading-6 font-medium text-gray-900" >
                                       {{ this>$store.state.selectedPaitings.title }}
                                    </h3>
                                    <div class="mt-2">
                                    <p class="text-sm text-gray-500">
                                        Are you sure you want to deactivate your account? All of your data will be permanently removed. This action cannot be undone.
                                    </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="bg-gray-50 px-4 py-3 pr-2 sm:px-6 sm:flex justify-end items-center">
                            <label class="text-xs underline pr-2 cursor-pointer">Buy</label>
                            <img class="w-10 cursor-pointer" src="~/assets/icons/menu/cart.svg"/>
                        </div>
                    </div>
                </div>
            </div>

            <aside class="p-3 overflow-y-auto flex flex-col justify-between bg-transparent w-3/4 sm:w-1/2 md:3/5 lg:w-1/4">
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
                    <div ref="btnPaintingInfo" class="flex flex-row justify-end items-center cursor-pointer" @click="togglePaintingInfo = !togglePaintingInfo" >
                            <label class="text-xs underline text-white pr-5">Painting Info</label>
                            <img src="~/assets/icons/menu/paintingInfo.png"/>
                        </div>
                        
                        <div class="flex flex-row justify-end items-center cursor-pointer">
                            <label class="text-xs underline text-white pr-5">Explore Mode</label>
                            <img src="~/assets/icons/menu/explore.svg"/>
                        </div>
                    </div>
                </div>
            </aside>
        </div>
    </div>
</template>

<script>
    // import PaintingInfoModal from './PaintingInfoModal.vue'
    import ListenModeInit from '@/webgl/js/listenModeControls.js'

    export default {
        // components:{PaintingInfoModal},
        data(){
            return {
                togglePaintingInfo:false,
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
                next: this.$refs.btnNext,
                paintingInfo: this.$refs.btnPaintingInfo
            });
        },
        methods:{
            toggleTab(){
                this.open = !this.open;
            },
            closePaintingInfo(){
                this.togglePaintingInfo = false;
            }
        },
        
       
    }
</script>
<style scoped>
    div {
        -webkit-tap-highlight-color: transparent;
    }
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