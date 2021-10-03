<template>
  <div>
    <div class="flex flex-row justify-center w-full content-center h-screen items-center">
      <div class="p-4 w-1/3">
        <AppLogo/>
        <div class="my-10">
         <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                Username
            </label>
            <input class="shadow-lg appearance-none border-0 rounded-sm w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username">
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
                    Email
                </label>
                <input class="shadow-lg appearance-none border-0 rounded-sm w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="Email">
            </div>
            <div class="mb-6">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="Phone Number">
                    Phone Number
                </label>
                <input class="shadow-lg appearance-none border-0 rounded-sm w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="Phone Number" type="text" placeholder="Phone Number">
            </div>


            <div class="mb-4">
                <div class="w-1/3"></div>
                <label class="block text-gray-500 font-bold">
                <input class="mr-2 leading-tight" type="checkbox">
                <span class="text-sm">
                I would like to subscribe to Selaras Art Space e-mail newsletter
                </span>
                </label>
            </div>
            <div class="mb-4">
                <div class="w-1/3"></div>
                <label class="block text-gray-500 font-bold">
                <input class="mr-2 leading-tight border-0 shadow-lg" type="checkbox">
                <span class="text-sm">
                I have read and agree to the Terms of Service and Privacy Policy 
                </span>
                </label>
            </div>
        </div>
        <div class="my-10">
          <button class="w-full p-2 bg-orange text-white"> Continue </button>
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
