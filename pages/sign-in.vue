<template>
  <div>
    <div class="flex flex-row justify-center w-full content-center h-screen static items-center">
      <div class="py-4 px-5 sm:px-10 sm:w-3/4 lg:w-2/5">
        <AppLogo/>
        <form @submit.prevent="login">
          <div class="mt-10 sm:my-10">
              <div class="mb-2 sm:mb-4">
                  <label class="block text-gray-700  mb-2" for="email">
                    Email
                  </label>
                  <input 
                    id="email"
                    v-model="loginForms.email"
                    class="shadow-lg appearance-none border-0 rounded-sm w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                    type="text"
                    placeholder="Email"
                    />
              </div>
              <div class="mb-2 sm:mb-4">
                <label class="block text-gray-700  mb-2" for="Password">
                    Password
                </label>
                <input
                   id="Password"  
                   v-model="loginForms.password"
                   class="shadow-lg appearance-none border-0 rounded-sm w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                   type="password" 
                   placeholder="Password"
                   />
              </div>
          </div>
          <div class="my-10 sm:my-10">
              <button class="w-full p-2 bg-orange text-white cursor-pointer"> Sign In </button>
              <p class="text-center mt-2"> 
                  If you don't have an account,
                  <span class="underline text-orange cursor-pointer"> 
                      <NuxtLink to="/sign-up">
                        sign up 
                      </NuxtLink>
                  </span>
                  here
              </p>
          </div>
        </form>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
  import AppLogo from '../components/AppLogo.vue';
  import Footer from '../components/Footer.vue';
  export default {
    components:{AppLogo,Footer},
    middleware: 'guest',
    data(){
      return {
         loginForms:{
           email:'',
           password:''
         }
      }
    },
    methods:{
        async login(){
            try {
              await this.$store.dispatch('auth/login', this.loginForms);
              this.$router.push('exhibition');
            } catch (error) {
              console.log({ error })
            }
        }
    }
  }
</script>


