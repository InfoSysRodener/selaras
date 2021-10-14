
<template>
    <div>
        <div class="flex flex-row justify-center w-full content-center h-full static items-center">
            <div class="py-4 px-5 sm:px-10 sm:w-3/4 lg:w-2/5">
                <AppLogo/>
                <Alert v-if="alertMessage" :message="alertMessage" :type="alertType"/>
                <FormulateForm
                    v-if="step === steps.register"
                    key=1
                    @submit="validateRegister"
                    
                 >
                    <div class="mt-10 sm:my-10">
                        <div class="mb-2 sm:mb-4">
                            <FormulateInput 
                                v-model="signupForm.name" 
                                label="Name"
                                label-class="block text-gray-700 mb-2"
                                error-class="text-red-700 text-xs mt-3"
                                type="text" 
                                placeholder="Name"
                                input-class="shadow-lg appearance-none border-0 rounded-sm w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                validation="^required"
                            />
                        </div>
                        <div class="mb-2 sm:mb-4">
                            <FormulateInput 
                                v-model="signupForm.email" 
                                label="Email"
                                label-class="block text-gray-700 mb-2"
                                error-class="text-red-700 text-xs mt-3"
                                type="email" 
                                placeholder="Email"
                                input-class="shadow-lg appearance-none border-0 rounded-sm w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                validation="^required"
                            />
                        </div>
                        <div class="mb-6">
                            <label class="block text-gray-700  mb-2" for="Phone Number">
                                Phone Number
                            </label>
                            <div class="flex flex-row">
                                <FormulateInput
                                    v-model="signupForm.phone_prefix"
                                    type="select"
                                    :options="['+62', '+63']"
                                    input-class="shadow-lg border-0 rounded-sm block py-2 px-5 " 
                                />
                                <input id="Phone Number" 
                                    v-model="signupForm.phone_number" 
                                    class="shadow-lg appearance-none border-0 rounded-sm w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    type="tel" 
                                    placeholder="(555) 555-1212"
                                />
                            </div>
                        </div>
                        <div class="mb-2 sm:mb-4">
                            <div class="w-1/3"></div>
                            <label class="block text-gray-500 font-bold">
                            <input v-model="isCheck" class="mr-2 leading-tight border-0 shadow-lg" type="checkbox">
                            <span class="text-xs sm:text-sm">
                                I have read and agree to the 
                                <span class="cursor-pointer underline">
                                    Terms of Service 
                                </span>
                                and
                                <span class="cursor-pointer underline">
                                    Privacy Policy 
                                </span>
                            </span>
                            </label>
                        </div>
                        <div class="my-10 sm:my-10">
                             <FormulateInput
                                type="submit"
                                label="Continue"
                                input-class="w-full p-2 bg-orange text-white"
                            />
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
                </FormulateForm>
                <!-- Sign up Password -->
                <FormulateForm v-else key=2 @submit="register()">
                    <div  class="mb-52 mt-10 sm:my-10">
                        <div class="mb-2 sm:mb-4">
                             <FormulateInput 
                                v-model="signupForm.password" 
                                label="Password"
                                name="password"
                                label-class="block text-gray-700 mb-2"
                                error-class="text-red-700 text-xs mt-3"
                                type="password" 
                                placeholder="Password"
                                validation="required|min:8,length|matches:/[0-9]/"
                                :validation-messages="{
                                     matches: 'Password must contain at least one numerals',
                                }"
                                input-class="shadow-lg appearance-none border-0 rounded-sm w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                            />
                        </div>
                        <div class="mb-2 sm:mb-4">
                             <FormulateInput 
                                v-model="signupForm.confirm_password" 
                                label="Confirm Password"
                                name="password_confirm"
                                label-class="block text-gray-700 mb-2"
                                error-class="text-red-700 text-xs mt-3"
                                type="password" 
                                placeholder="Re-enter Password"
                                validation="^required|confirm:password"
                                validation-name="Password confirmation"
                                input-class="shadow-lg appearance-none border-0 rounded-sm w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                            />
                            
                        </div>
                        <div class="my-10 sm:my-10">
                            <!-- <button class="w-full p-2 bg-orange text-white"> Sign Up </button> -->
                            <FormulateInput
                                type="submit"
                                :disabled="isLoading"
                                :label="isLoading ? 'Loading...' : 'Sign Up'"
                                input-class="w-full p-2 bg-orange text-white"
                            />
                            <!-- <button v-show="userExists" class="mt-5 w-full p-2 bg-white border text-gray-900" @click="step = steps.register; userExists = null" > Back </button> -->
                        </div>
                    </div>
                 </FormulateForm>
            </div>
        </div>    
        <Footer class="mt-44"/>
  </div>
</template>

<script>

    import AppLogo from '../components/AppLogo.vue';
    import Footer from '../components/Footer.vue';
    import Alert from '../components/Alert.vue';
    const steps = {
        register: 'REGISTER',
        confirm: 'CONFIRM'
    }
    export default {
        components:{AppLogo,Footer,Alert},
        middleware:'guest',
        data(){
            return {
               steps:{...steps},
               step: steps.register,
               isCheck:false,
               signupForm:{
                   name:null,
                   email:null,
                   password:'',
                   confirm_password:'',
                   phone_number:null,
                   phone_prefix:'+62',
               },
               alertMessage:null,
               alertType:null,
               passwordError:null,
               userExists:false,
               isLoading:false,
            }
        },
        methods:{
            validateRegister(){
                const { name , email, phone_number } = this.signupForm;
                if(name && email && phone_number){
                    if(this.isCheck){
                      this.step = this.steps.confirm;
                      this.alertMessage = null; 
                    }else{
                      this.alertMessage = 'You need to check that you accept the Terms and Conditions';
                    } 
                }
            },

           async register(){
                this.isLoading = true;
                try {
                    await this.$store.dispatch('auth/register', this.signupForm)
                    this.alertType = 'info'
                    this.alertMessage = 'Successfully Register';
                   
                    setTimeout(() => {
                        this.isLoading = false;
                        this.$router.push('sign-in');
                    },1000);

                } catch (error) {
                    this.isLoading = false;
                    console.log({ error });
                    if(error.code !== 'InvalidParameterException'){
                        this.alertMessage = error.message;
                    }
                    if(error.code === 'UsernameExistsException'){
                        this.userExists = true;
                        this.signupForm.email = null;
                    }
                }
           }
        },
        
    }
</script>