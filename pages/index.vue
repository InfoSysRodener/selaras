<template>
  <div>
    <div class="flex flex-row justify-center w-full content-center min-h-screen h-full items-center">
      <div class="p-4">
        <AppLogo/>
        <!-- <div class="text-center font-bold text-xl mt-14">
          <p>Coming Soon...</p>
        </div> -->
        <div>
          <div class="text-sm text-center my-14  sm:hidden">
            <p> 
              'Selaras art space' adalah sebuah ruang presentasi
              karya online yang menghadirkan karya para seniman
              Indonesia dalam berbagai medium. 
            </p>
            <br>
            <p> 
              Kami memberikan sebuah ruang agar para seniman bisa 
              memperkenalkan karya nya kepada 
              khalayak yang lebih luas
            </p>
          </div>
          <div class="hidden sm:block my-14 tracking-wider text-center font-medium">
              <p> 'Selaras art space' adalah sebuah ruang presentasi </p>
              <p> karya online yang menghadirkan karya para seniman </p>
              <p> Indonesia dalam berbagai medium. </p>
              <br>
              <p> Kami memberikan sebuah ruang agar para seniman bisa  </p>
              <p> memperkenalkan karya nya kepada  </p>
              <p> khalayak yang lebih luas </p>
          </div>
          <div class="mb-10">
            <NuxtLink to="/sign-up">
              <button class="w-full p-2 bg-orange text-white"> Explore </button>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
    <!-- <Footer/> -->
  </div>
</template>

<script>
  import AppLogo from '../components/AppLogo.vue';
  // import Footer from '../components/Footer.vue';
  export default {
    components:{AppLogo,
    // Footer
    },
    middleware:'guest',
    // validate({ params, query, redirect }) {
      
    //   console.log(params);
    //   // redirect('/'); 
    //   // return true // if the params are valid
    //   // return false // will stop Nuxt.js to render the route and display the error page
    // },
    // watch: {
    //   $route(to, from) {
    //     console.log(to,from);
    //   }
    // }
  }
</script>
