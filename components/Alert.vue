<template>
    <div class="my-5">
        <div v-if="type === 'error'">
            <div class="bg-orange-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
                <p class="font-bold">Error</p>
                <p>{{ message }}</p>
            </div>
        </div>
        <div v-if="type === 'info'">
            <div class="bg-orange border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md" role="alert">
            <div class="flex">
                <div class="py-1"><svg class="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
                <div>
                 <p class="font-bold">Message</p>
                 <p class="text-sm">{{ message }}</p>
                </div>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props:{ 
            type:{
                type:String,
                default:'error'
            },
            message:{
                type: String,
                default:'hellow'
            }
        }
    }
</script>