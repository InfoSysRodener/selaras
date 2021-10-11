<template>
    <div>
        <div class="flex flex-row justify-center w-full content-center h-full static items-center">
            <div class="py-4 px-5 sm:px-10 sm:w-3/4 lg:w-2/5">
                <AppLogo/>
                <div v-if="atSignUp" class="mt-10 sm:my-10">
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
                        <input class="mr-2 leading-tight border-0 shadow-lg" type="checkbox">
                        <span class="text-xs sm:text-sm">
                        I have read and agree to the Terms of Service and Privacy Policy 
                        </span>
                        </label>
                    </div>
                    <div class="my-10 sm:my-10">
                        <button class="w-full p-2 bg-orange text-white" @click="atSignUp = !atSignUp"> Continue </button>
                        <p class="text-center mt-2">
                            If you already have an account,
                            <span class="underline text-orange cursor-pointer"> 
                                <NuxtLink to="/sign-in">
                                    sign in 
                                </NuxtLink>
                            </span>
                            here
                        </p>
                    </div>
                </div>
            
                <!-- Sign up Password -->
                <div v-else class="mb-52 mt-10 sm:my-10">
                    <div class="mb-2 sm:mb-4">
                        <label class="block text-gray-700  mb-2" for="Password">
                            Password
                        </label>
                        <input id="Password"  class="shadow-lg appearance-none border-0 rounded-sm w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="password" placeholder="Password">
                    </div>
                    <div class="mb-2 sm:mb-4">
                        <label class="block text-gray-700  mb-2" for="Re-enter Password">
                            Re-enter Password
                        </label>
                        <input id="Re-enter Password"  class="shadow-lg appearance-none border-0 rounded-sm w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="password" placeholder="Re-enter Password">
                    </div>
                    <div class="my-10 sm:my-10">
                        <button class="w-full p-2 bg-orange text-white"> Sign Up </button>
                    </div>
                </div>
            </div>
        </div>    
    <Footer class="mt-44"/>
  </div>
</template>

<script>
    import { Auth } from 'aws-amplify';

    import AppLogo from '../components/AppLogo.vue';
    import Footer from '../components/Footer.vue';

    export default {
        components:{AppLogo,Footer},
        data(){
            return {
               atSignUp:true,
            }
        },
        methods:{
            signUp(){
                Auth.signUp({
                    username: "youremail@yourdomain.com",
                    password: "your-secure-password",
                    attributes: {
                        email: "youremail@yourdomain.com"
                    }
                })
            }
        }
    }
</script>