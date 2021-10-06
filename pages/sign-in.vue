<template>
  <div>
    <div class="flex flex-row justify-center w-full content-center h-full static items-center">
      <div class="py-4 px-5 sm:px-10 sm:w-3/4 lg:w-2/5">
        <AppLogo/>
        <div class="mt-10 sm:my-10">
         <div class="mb-2 sm:mb-4">
            <label class="block text-gray-700  mb-2" for="Name">
                Name
            </label>
            <input id="Name"  class="shadow-lg appearance-none border-0 rounded-sm w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Name">
            </div>
            <div class="mb-2 sm:mb-4">
                <label class="block text-gray-700  mb-2" for="email">
                    Email
                </label>
                <input id="email"  class="shadow-lg appearance-none border-0 rounded-sm w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Email">
            </div>
            <div class="mb-6">
                <label class="block text-gray-700  mb-2" for="Phone Number">
                    Phone Number
                </label>
                <input id="Phone Number" class="shadow-lg appearance-none border-0 rounded-sm w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Phone Number">
            </div>
            <div class="mb-2 sm:mb-4">
                <div class="w-1/3"></div>
                <label class="block text-gray-500 font-bold">
                <input class="mr-2 leading-tight" type="checkbox">
                <span class="text-xs sm:text-sm">
                    I would like to subscribe to Selaras Art Space e-mail newsletter
                </span>
                </label>
            </div>
            <div class="mb-2 sm:mb-4">
                <div class="w-1/3"></div>
                <label class="block text-gray-500 font-bold">
                <input class="mr-2 leading-tight border-0 shadow-lg" type="checkbox">
                <span class="text-xs sm:text-sm">
                I have read and agree to the Terms of Service and Privacy Policy 
                </span>
                </label>
            </div>
        </div>
        <div class="my-10 sm:my-10">
          <NuxtLink to="/exhibition">
           <button class="w-full p-2 bg-orange text-white"> Continue </button>
          </NuxtLink>
        </div>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
  import AppLogo from '../components/AppLogo.vue';
  import Footer from '../components/Footer.vue';
  export default {
    components:{AppLogo,Footer}
  }
</script>


