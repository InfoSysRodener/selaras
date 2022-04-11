<template>
    <div class="grid grid-cols-6 mx-5 pt-10 sm:p-10 gap-4 border-t">
     <div class="col-span-6 sm:col-start-1 sm:col-span-2">   
        <div class="flex flex-col justify-between h-64 sm:h-full">
            <div>
                <h1 class="font-medium text-4xl">{{ exhibition.title }} </h1>
                <p class="text-lg">{{ exhibition.date }}</p>
            </div>
            <div>
                <h1 class="font-medium text-2xl">Art Catalog</h1>
                <div class="flex w-32 mt-3">
                    <a class="flex items-center" href="/3D/Selaras-Art-Space-ecatalog.pdf" download>
                        <p class="flex text-xs underline w-32 cursor-pointer">
                            download
                            <img class="ml-2 cursor-pointer" src="~/assets/icons/pdf.svg" />
                        </p>
                        <!-- <img class="cursor-pointer" src="~/assets/icons/pdf.svg" /> -->
                    </a>
                    <!-- <a class="flex items-center" href="/3D/Selaras-Art-Space-pricelist.pdf" download>
                        <p class="flex text-xs underline w-32 cursor-pointer">
                            price list
                             <img class="ml-2 cursor-pointer" src="~/assets/icons/pdf.svg" />
                        </p>
                    </a> -->
                </div>
            </div>
        </div> 
     </div>
     <div class="col-span-6 sm:col-start-3  sm:col-span-4 my-10 sm:mt-0">  
        <h1 class="mb-10 text-xl font-medium tracking-widest">Selaras Art Space</h1>
        <p class="w-full sm:w-3/5 leading-5 tracking-wide">
           {{ content[0] }}
           <br/>
           <br/>
           {{ content[1] }}
        </p>

        <!-- <div class="mt-14">
            <h1 class="text-lg">Share this exhibition</h1>
            <div class="mt-2 flex flex-row">
                <img class="w-12" src="~/assets/icons/social/facebook-outline.svg" />
                <img class="w-12" src="~/assets/icons/social/twitter-outline.svg"/>
                <img class="w-12" src="~/assets/icons/social/email-outline.svg" />
            </div>
        </div> -->
     </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                exhibition:{
                    title:'TITIK BERANGKAT',
                    date: '11 April - 30 June 2022',
                    description:'Setiap manusia memiliki titik berangkat dalam hidupnya masing-masing. Sandy dan Widi mencoba menuturkan titik berangkat mereka lewat karya, yang akan menggugah rasa dalam melihat kembali bagaimana titik berangkat kita dalam hidup.'
                },
                content: [
                    `
                    Selaras Art Space' adalah sebuah ruang virtual presentasi 
                    karya yang menghadirkan kreasi para seniman 
                    Indonesia dalam berbagai medium. 
                    `,
                    `
                    Kami memberikan sebuah ruang agar para seniman bisa memperkenalkan
                    karya nya kepada khalayak yang lebih luas.
                     `
                ]
            }
        }
    }
</script>