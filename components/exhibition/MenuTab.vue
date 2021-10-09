<template>
    <div class="absolute overflow-y-auto flex flex-row-reverse w-full h-full backdrop-filter backdrop-brightness-185 backdrop-blur-lg">
        <aside class="p-10 flex overflow-y-auto flex-col justify-between bg-white w-1/4">
            <div class="flex flex-row-reverse">
                <img src="~/assets/icons/menu/close.svg" />
            </div>
            <div>
                <ul>
                    <li class="py-3 px-2 cursor-pointer">
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
                <HelpTab/>
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

    import HelpTab from './Help.vue'
    export default {
        components:{HelpTab}
    }
</script>