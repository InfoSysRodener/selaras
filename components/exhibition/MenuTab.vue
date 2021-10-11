<template>
    <div class="absolute overflow-y-auto flex flex-row-reverse w-full h-full backdrop-filter backdrop-brightness-185 backdrop-blur-lg">
        <aside class="p-10 flex overflow-y-auto flex-col justify-between bg-white w-1/4">
            <div class="flex flex-row-reverse">
                <img class="pointer" src="~/assets/icons/menu/close.svg"  @click="toggleTab('menu')" />
            </div>
            <div>
                <ul v-if="currentTab == 'menu'">
                    <li class="py-3 px-2 cursor-pointer" @click="toggleTab('art')">
                        Art Catalogue
                    </li>
                    <li class="py-3 px-2 cursor-pointer">
                        Meet The Artist
                    </li>
                    <li class="py-3 px-2 cursor-pointer">
                        About Seleras Art Space
                    </li>
                    <li class="py-3 px-2 cursor-pointer">
                        Help
                    </li>
                </ul>
                <ArtCatalogueTab v-else-if="currentTab == 'art'"/>
                <MeetTheArtistTab v-else-if="currentTab == 'artist'"/>
                <AboutTab v-else-if="currentTab == 'about'"/>
                <HelpTab v-else-if="currentTab == 'help'"/>
            </div>
            <div class="flex justify-end">
                <div>
                   <div class="flex flex-row justify-end items-center">
                        <label class="text-xs underline">Contact</label>
                        <img src="~/assets/icons/menu/account.svg">
                    </div>
                    
                    <div class="flex flex-row items-center">
                        <label class="text-xs underline">Instagram</label>
                        <img src="~/assets/icons/social/instagram-outline.svg">
                    </div>
                </div>
            </div>
        </aside>
    </div>
</template>

<script>

    import AboutTab from './AboutTab.vue';
    import HelpTab from './Help.vue';
    import MeetTheArtistTab from './MeetTheArtistTab.vue'
    import ArtCatalogueTab from './ArtCatalogueTab.vue'
    export default {
        components:{HelpTab,AboutTab,MeetTheArtistTab,ArtCatalogueTab},
        data(){
            return { 
                currentTab:'menu'
            }
        },
        methods:{
            toggleTab(name){
                console.log(name);
                switch(name){
                    case 'about':
                        this.currentTab = 'about';
                        break;
                    default :
                        this.currentTab = 'menu';  
                }
            }    
        }
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