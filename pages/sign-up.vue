
<template>
    <div>
        <div class="flex flex-row justify-center w-full content-center h-screen static items-center">
            <div class="py-4 px-5 sm:px-10 sm:w-3/4 lg:w-2/5">
                <AppLogo/>
                <Alert v-show="showAlert"  :message="alertMessage" :type="alertType"/>
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
                            <div class="relative flex">
                                <div
                                    class="text-orange absolute inline-flex items-center justify-center bottom-0 w-10 h-full"
                                >
                                    <span>+62</span>
                                </div>
                                <FormulateInput
                                    v-model="signupForm.phone_number"
                                    input-class="shadow-lg pl-10 appearance-none border-0 rounded-sm w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    type="tel" 
                                    placeholder="(555) 555-1212" 
                                    validation="^required"
                                    :outer-class="['w-full']"
                                    :wrapper-class="['flex flex-col']"
                                    error-class="absolute text-red-700 text-xs mt-1"
                                >
                                </FormulateInput>
                            </div>
                        </div>
                        <div class="mb-2  sm:mt-6 sm:mb-4">
                            <div class="w-1/3"></div>
                            <label class="block text-gray-500 font-bold">
                            <input v-model="isCheck" class="mr-2 leading-tight border-0 shadow-lg " type="checkbox">
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
                            <FormulateInput
                                type="submit"
                                :disabled="isLoading"
                                :label="isLoading ? 'Loading...' : 'Sign Up'"
                                input-class="w-full p-2 bg-orange text-white shadow-lg"
                            />
                             <FormulateInput
                                v-if="showAlert"
                                type="button"
                                label="Back"
                                input-class="w-full p-2 border-1 text-gray-700 mt-2 shadow-lg"
                                @click="back"
                            />
                        </div>
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
               showAlert:false,
               alertMessage:'',
               alertType:'info',
               passwordError:null,
               userExists:false,
               isLoading:false,
            }
        },
        methods:{
            validateRegister(){
                if(this.isCheck){
                    this.step = this.steps.confirm;
                    this.showAlert = false;
                     
                }else{
                    this.alertType = 'info'
                    this.alertMessage = 'You need to check that you accept the Terms and Conditions';
                } 
            },
            back(){
                 this.step = this.steps.register;
            },
            register(){
                this.isLoading = true;
                const { email, password } = this.signupForm;
                try {

                    // register
                    this.$store.dispatch('auth/register', this.signupForm).then( async (result) => {
                        console.log(result);
                        this.alertType = 'info'
                        this.alertMessage = 'Successfully Register';

                        // login
                        await this.$store.dispatch('auth/login', { email, password });
                        this.isLoading = false;
                        this.alertMessage = 'Redirecting...';
                        this.$router.push('/exhibition');
                    }).catch(error => {
                        this.isLoading = false;
                        this.showAlert = true;
                        this.alertType = 'error'
                        if(error.code !== 'InvalidParameterException'){
                            this.alertMessage = error.message;
                        }
                        if(error.code === 'UsernameExistsException' || error.name === 'UsernameExistsException'){
                            this.alertMessage = error.message;
                            // this.userExists = true;

                        }
                        console.log({error});
                    })

                    

                } catch (error) {
                    this.isLoading = false;
                    // console.log( { error } );
                    // console.log( error.message );
                    // console.log( error.name );
                    if(error.code !== 'InvalidParameterException'){
                        this.alertMessage = error.message;
                    }
                    if(error.code === 'UsernameExistsException' || error.name === 'UsernameExistsException'){
                        this.alertMessage = error.message;
                        this.userExists = true;
                        // this.signupForm.email = null;
                    }
                  
                }
           }
        },
        
    }
</script>
