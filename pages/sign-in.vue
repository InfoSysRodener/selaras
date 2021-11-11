<template>
  <div>
    <div class="flex flex-row justify-center w-full content-center h-full static items-center">
      <div class="py-4 px-5 sm:px-10 sm:w-3/4 lg:w-2/5">
        <AppLogo/>
        <Alert v-if="errorMessage" :message="errorMessage"/>
        <FormulateForm  @submit="login">
          <div class="mt-10 sm:my-10">
              <div class="mb-2 sm:mb-4">
                   <FormulateInput 
                    v-model="loginForms.email"
                    label="Email"
                    label-class="block text-gray-700 mb-2"
                    error-class="text-red-700 text-xs mt-3"
                    type="email" 
                    placeholder="Email"
                    input-class="shadow-lg appearance-none border-0 rounded-sm w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                    validation="^required"
                   />
              </div>
              <div class="mb-2 sm:mb-4">
                   <FormulateInput 
                    v-model="loginForms.password"
                    label="Password"
                    label-class="block text-gray-700 mb-2"
                    error-class="text-red-700 text-xs mt-3"
                    type="password" 
                    placeholder="Password"
                    validation="^required"
                    input-class="shadow-lg appearance-none border-0 rounded-sm w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                   />
              </div>
          </div>
          <div class="my-10 sm:my-10">
              <!-- <button class="w-full p-2 bg-orange text-white cursor-pointer"> Sign In </button> -->
              <FormulateInput
                type="submit"
                :disabled="isLoading"
                :label="isLoading ? 'Loading...' : 'Sign In'"
                input-class="w-full p-2 bg-orange text-white"
              />
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
        </FormulateForm>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
  import AppLogo from '../components/AppLogo.vue';
  import Footer from '../components/Footer.vue';
  import Alert from '../components/Alert.vue';
  export default {
    components:{AppLogo,Footer,Alert},
    middleware: 'guest',
    data(){
      return {
         errorMessage: null,
         loginForms:{
           email:'',
           password:''
         },
         isLoading:false
      }
    },
    methods:{
        async login(){
            this.isLoading = true;
            try {
               await this.$store.dispatch('auth/login', this.loginForms);
               this.isLoading = false;
               this.$router.push('/exhibition');
            } catch (error) {
              console.log({ error });
              if(error.code !== 'InvalidParameterException'){
                  this.errorMessage = error.message;
              }
              this.isLoading = false;
            }
        }
    }
  }
</script>


