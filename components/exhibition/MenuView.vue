<template>
    <div>
        <div v-show="menu" class="z-10">
            <div v-show="view === 'menu-view'" :class="{  'top-0': isFullscreen , 'top-12': !isFullscreen }" class="right-0 block absolute w-64 bg-gray-50 rounded-bl-lg select-none">
                <ul>
                    <li class="py-3 relative cursor-pointer">
                        <div class="flex items-center justify-end px-2 relative">
                            <span class="rounded-full inline-block bg-white w-10 h-10 shadow-lg">
                               <button> <img class="cursor-pointer w-10 p-3 h-auto m-auto block" src="~/assets/icons/menu/close-svgrepo-com.svg" @click="toggleTab"/> </button>
                            </span>
                        </div>
                    </li>
                    <li class="py-3 px-2 text-right relative cursor-pointer" >
                        <div ref="btnFullscreen">
                            <div v-if="isFullscreen" class="flex items-center justify-end">
                                <p  class="pr-3 text-sm font-medium"> Exits fullscreen </p>
                                 <span class="rounded-full inline-block bg-white w-10 h-10 shadow-lg">
                                    <img  class="w-10 h-auto p-2 m-auto block" src="~/assets/icons/menu/fullscreen-svgrepo-com-exits.svg"/>
                                </span>
                            </div>
                            <div v-else class="flex items-center justify-end">
                                <p  class="pr-3 text-sm font-medium"> Enter fullscreen </p>
                                <span class="rounded-full inline-block bg-white w-10 h-10 shadow-lg">
                                    <img  class="w-10 h-auto p-2 m-auto block" src="~/assets/icons/menu/fullscreen-svgrepo-com.svg"/>
                                </span>
                            </div>
                        </div>
                    </li> 
                    <!-- <li class="py-3 px-2 text-right relative cursor-pointer" @click="toggleSelectedTab('art-catalogue')">
                        <div class="flex items-center justify-end">
                            <p class="pr-3 text-sm font-medium">Art catalogue </p>
                            <span class="rounded-full  inline-block bg-white w-10 h-10 shadow-lg">
                                <img  class="w-10 h-auto p-2 m-auto block" src="~/assets/icons/menu/images-interface-symbol-svgrepo-com.svg"/>
                            </span>
                        </div>
                    </li> -->
                    <li class="py-3 px-2 text-right relative cursor-pointer" @click="toggleSelectedTab('meet-the-artist')">
                        <div class="flex items-center justify-end">
                            <p class="pr-3 text-sm font-medium"> Meet the artists </p>
                            <span class="rounded-full relative bg-white w-10 h-10 shadow-lg">
                                <img  class="w-10 h-auto p-2 m-auto block" src="~/assets/icons/menu/artist-brush-svgrepo-com.svg"/>
                            </span>
                        </div>
                    </li>
                    <li class="py-3 px-2 text-right relative cursor-pointer" @click="toggleSelectedTab('about')">
                        <div class="flex items-center justify-end">
                            <p class="pr-3 text-sm font-medium"> About </p>
                            <span class="rounded-full bg-white w-10 h-10 shadow-lg">
                                <img  class="w-10 h-auto p-2 m-auto block" src="~/assets/icons/menu/info-svgrepo-com.svg"/>
                            </span>
                        </div>
                    </li>
                    <li class="py-3 px-2 text-right relative cursor-pointer" @click="toggleSelectedTab('help')">
                        <div class="flex items-center justify-end">
                            <p class="pr-3 text-sm font-medium"> Help </p>
                            <span class="rounded-full bg-white w-10 h-10 shadow-lg">
                                <img  class="w-10 h-auto p-2 m-auto block" src="~/assets/icons/menu/help-svgrepo-com.svg"/>
                            </span>
                        </div>
                    </li> 
                </ul>
            </div>
            <div v-show="view === 'painting-view'"  :class="{  'top-0': isFullscreen , 'top-12': !isFullscreen }" class="pl-10 right-0 block absolute w-64 bg-gray-50 rounded-bl-lg select-none">
                <ul>
                    <li class="py-3 relative cursor-pointer">
                        <div class="flex items-center justify-end px-2">
                            <p class="pr-3 text-sm font-medium"> Exits detail view</p>
                            <span class="rounded-full inline-block bg-white w-10 h-10 shadow-lg">
                                <button @click="closePaintingInfo"> 
                                    <img class="cursor-pointer w-10 p-3 h-auto m-auto block" src="~/assets/icons/menu/close-svgrepo-com.svg" /> 
                                </button>
                            </span>
                        </div>
                    </li>
                    <li class="py-3 px-2 text-right relative cursor-pointer" >
                        <div class="flex items-center justify-end" @click="openPaintingInfo">
                            <p class="pr-3 text-sm font-medium"> Painting info </p>
                            <span class="rounded-full inline-block bg-white w-10 h-10 shadow-lg">
                                <img  class="w-auto h-auto m-auto block" src="~/assets/icons/menu/PaintingInfo.png"/>
                            </span>
                        </div>
                    </li> 
                    <li v-show="soundStatus === 'stop'" class="py-3 px-2 text-right relative cursor-pointer" >
                        <div ref="btnPlay" class="flex items-center justify-end" >
                            <p class="pr-3 text-sm font-medium"> Play </p>
                            <span class="rounded-full inline-block bg-white w-10 h-10 shadow-lg">
                                <img  class="w-10 h-auto m-auto block" src="~/assets/icons/media/play.svg"/>
                            </span>
                        </div>
                    </li> 
                    <li v-show="soundStatus === 'playing'" class="py-3 px-2 text-right relative cursor-pointer" >
                        <div ref="btnPause" class="flex items-center justify-end" >
                            <p class="pr-3 text-sm font-medium"> Pause </p>
                            <span class="rounded-full inline-block bg-white w-10 h-10 shadow-lg">
                                <img  class="w-10 h-auto m-auto block" src="~/assets/icons/media/pause.svg"/>
                            </span>
                        </div>
                    </li> 
                    <li v-show="soundStatus === 'pause'" class="py-3 px-2 text-right relative cursor-pointer" >
                        <div ref="btnResume" class="flex items-center justify-end" >
                            <p class="pr-3 text-sm font-medium"> Resume </p>
                            <span class="rounded-full inline-block bg-white w-10 h-10 shadow-lg">
                                 <img  class="w-10 h-auto m-auto block" src="~/assets/icons/media/play.svg"/>
                            </span>
                        </div>
                    </li>
                    <!-- <li class="py-3 px-2 text-right relative cursor-pointer" >
                        <div ref="btnPrevious" class="flex items-center justify-end" >
                            <p class="pr-3 text-sm font-medium"> Previous </p>
                            <span class="rounded-full inline-block bg-white w-10 h-10 shadow-lg">
                                <img  class="w-10 h-auto m-auto block" src="~/assets/icons/media/previous.svg"/>
                            </span>
                        </div>
                    </li> 
                    <li class="py-3 px-2 text-right relative cursor-pointer" >
                        <div  ref="btnNext" class="flex items-center justify-end">
                            <p class="pr-3 text-sm font-medium"> Next </p>
                            <span class="rounded-full inline-block bg-white w-10 h-10 shadow-lg">
                                <img  class="w-10 h-auto  m-auto block" src="~/assets/icons/media/next.svg"/>
                            </span>
                        </div>
                    </li>  -->
                </ul>
            </div>
        </div>
        <div v-show="!menu" :class="{  'top-0': isFullscreen , 'top-12': !isFullscreen }" class="py-3 pl-10 right-0 block absolute w-64 select-none">
            <div class="flex items-center justify-end px-2">
                <span class="rounded-full inline-block bg-white w-10 h-10 shadow-lg">
                    <img class="cursor-pointer w-10 p-1 h-auto m-auto block" src="~/assets/icons/menu/hamburger.svg" @click="toggleTab"/>
                </span>
            </div>
       </div>
        
        <!-- controls -->
        <div v-show="view === 'menu-view'" class="hidden md:block px-10 bottom-14 sm:bottom-5 left-0 sm:left-10 absolute w-64 h-auto select-none">
            <div class="grid grid-cols-3 gap-5 mb-5">
                <span ref="btnUp" class="col-start-2 rounded-md w-12 h-12 bg-white inline-block shadow-lg">
                    <img class="cursor-pointer p-4 m-auto block w-12 h-12" src="~/assets/icons/controls/control-up.svg"/>
                </span>
            </div>
            <div class="grid grid-cols-3 gap-5">
                <span ref="btnLeft" class="col-start-1 rounded-md w-12 h-12 bg-white inline-block shadow-lg">
                    <img class="cursor-pointer p-4 m-auto block w-12 h-12" src="~/assets/icons/controls/control-left.svg"/>
                </span>   
                <span ref="btnDown" class="col-start-2 rounded-md w-12 h-12 bg-white inline-block shadow-lg">
                    <img class="cursor-pointer p-4 m-auto block w-12 h-12" src="~/assets/icons/controls/control-down.svg"/>
                </span>
                <span ref="btnRight" class="col-start-3 rounded-md w-12 h-12 bg-white inline-block shadow-lg">
                    <img class="cursor-pointer p-4 m-auto block w-12 h-12" src="~/assets/icons/controls/control-right.svg"/>
                </span>
            </div>
        </div>
        
        <!-- Modal -->
        <div v-if="modal" class="right-0 w-72 absolute h-full bg-gray-50 overflow-y-auto overflow-x-hidden select-none">
            <div class="flex justify-between items-center mt-14">
                <p class="capitalize ml-10 font-medium text-lg"> {{ selectedTab.replaceAll('-', ' ') }} </p>
                <img class="w-12 cursor-pointer" src="~/assets/icons/menu/close.svg" @click="closeSelectedTab"/>
            </div>
             <!-- content  -->
            <div  class="py-5 block px-10 my-5">
                <AboutTab v-if="selectedTab === 'about'"/>
                <ArtCatalogue v-if="selectedTab === 'art-catalogue'"/>
                <MeetTheArtistTab v-show="selectedTab === 'meet-the-artist'"/>
                <Help v-if="selectedTab === 'help'"/>
            </div>
        </div>

        <!-- painting information modal -->
        <div v-if="modalPainting" class="right-0 left-0 top-64 w-full sm:top-52 sm:left-1/4 sm:w-1/2 px-10 absolute overflow-y-auto overflow-x-hidden h-full select-none z-10 ">
            <div class="absolute right-5">
                <img class="w-10 cursor-pointer" src="~/assets/icons/menu/close.svg" @click="modalPainting = false"/>
            </div>
            <!-- content  -->
            <div  class="py-2 sm:py-5 px-2 sm:px-10 block mt-4 bg-gray-50 overflow-y-auto overflow-x-hidden h-auto">
                <div class="sm:flex sm:items-start py-2 sm:py-10">
                    <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <h3 class="text-2xl leading-6 font-medium text-gray-900" >
                            {{ selectedPaintings.title }}
                        </h3>
                        <h1 class="mt-1 mb-2 text-gray-700 text-lg">{{ selectedPaintings.artistName }}</h1>
                        <div class="mt-3">
                            <p class="text-sm text-gray-500">{{ selectedPaintings.year }}</p>
                            <p class="text-sm text-gray-500">{{ selectedPaintings.size }}</p>
                            <p class="text-sm text-gray-500">{{ selectedPaintings.media }}</p>
                        </div>
                        <div class="mt-5">
                            <p class="text-base">IDR {{ selectedPaintings.price }}</p>
                        </div> 
                    </div>
                </div>
            </div>
            <div class="bg-gray-100 px-4 py-1 sm:py-3 pr-2 sm:px-6 flex justify-end items-center">
                <a class="flex items-center" href="https://wa.me/+6287774288558" target="_blank">
                    <label class="text-xs underline pr-5 cursor-pointer">Buy</label>
                    <img class="w-10 cursor-pointer" src="~/assets/icons/menu/cart.svg"/>
                </a>
            </div>
        </div>

    </div>
</template>

<script>
    
    import AboutTab from './AboutTab.vue';
    import Help from './Help.vue';
    import ArtCatalogue from './ArtCatalogueTab.vue';
    import MeetTheArtistTab from './MeetTheArtistTab.vue';
   
    import ListenModeInit from '@/webgl/js/listenModeControls.js';
    import NavigationControlInit from '@/webgl/js/navigationControls.js';

    export default {
        components:{
            AboutTab,
            MeetTheArtistTab,
            Help,
            ArtCatalogue
        },
        data(){
            return {
                mute:false,
                menu:false,
                modal:false,
                selectedTab:null,
                view:'menu-view',
                modalPainting:false,
                isSoundPlay:false,
                soundStatus:'stop',
                isFullscreen:false,

                selectedPaintings:{
                    artistName:"Artist Name",
                    audio:"HPH_02.mp4",
                    media:"media ",
                    meshName:"hikayathidup2",
                    photo:"",
                    price:"price",
                    size:"100x60 cm",
                    title:"Title",
                    year:"2021"
                },
            }
        },
        watch:{
        //    menu(val) {
        //      if(val) this.modal = false;
        //    },
        //    modal(val){
        //      if(val) this.menu = false;
        //    }
        },
        created(){
            this.$nuxt.$on('SELECTED-PAINTING-EVENT', (payload) => {
                this.selectedPaintings = payload;
                this.menu = true;
            });

        },
        beforeDestroy(){
            this.$nuxt.$off('CHANGE-MENU-VIEW-EVENT');
            this.$nuxt.$off('SELECTED-PAINTING-EVENT');
        },
        mounted(){
            
            this.$nuxt.$on('CHANGE-MENU-VIEW-EVENT', (payload) => {
                this.view = payload; 
            });

            this.$nuxt.$on('LOADING-SCENE', (payload) => {
                if(payload.progress === 100) {
                    this.toggleSelectedTab('help');
                }
            });

            this.$nuxt.$on('CHANGE-PLAY-SOUND-EVENT', (payload) => {
                this.soundStatus = payload;
            });

            this.$nuxt.$on('FULLSCREEN-EVENT', (payload) => {
                this.isFullscreen = payload;
            });


            ListenModeInit({ 
                // previous: this.$refs.btnPrevious,
                // next: this.$refs.btnNext,
                play: this.$refs.btnPlay,
                pause:this.$refs.btnPause,
                resume:this.$refs.btnResume

            }); 
    
            NavigationControlInit({
                up: this.$refs.btnUp,
                left:this.$refs.btnLeft,
                down:this.$refs.btnDown,
                right:this.$refs.btnRight,
                fullscreen: this.$refs.btnFullscreen
            });

        },
        methods:{
            toggleTab(){
                this.menu = !this.menu;
            },
            toggleSelectedTab(val){
                this.modal = true;
                this.selectedTab = val;
            },
            closeSelectedTab(){
                this.modal = false;
            },
            openPaintingInfo(){
                this.modalPainting = true;
            },
            closePaintingInfo(){
                this.view = 'menu-view';
                this.modalPainting = false;
                this.$nuxt.$emit('CLOSED-PAINTING-VIEW');
            },
            setMute(){
                this.mute = !this.mute;
                this.$nuxt.$emit('MUTE-BACKGROUND-MUSIC', this.mute);
            }
        },
         
    }
</script>

<style scoped>

    div {
        -webkit-tap-highlight-color: transparent;
        
    }
    /* div { */
        /* -webkit-touch-callout: none; */
        /* -webkit-user-select: none */
    /* } */
    .scrolling-touch {
         /* -webkit-overflow-scrolling: touch; */
         touch-action:auto;
     }
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