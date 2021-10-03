<template>
  <div>
    <div class="flex flex-row justify-center w-full content-center h-screen items-center">
      <div class="p-4">
        <AppLogo/>
        <div class="my-14 tracking-wider text-center font-medium">
            <p> 'Selaras art space' adalah sebuah ruang presentasi </p>
            <p> karya online yang menghadirkan karya para seniman </p>
            <p> Indonesia dalam berbagai medium. </p>
            <br>
            <p> Dalam keadaan yang spesial ini, kami mencoba  </p>
            <p> memberikan sebuah ruang untuk seniman bisa </p>
            <p> memajang karya dan memasarkannya kepada </p>
            <p> khalayak yang lebih luas. </p>
        </div>
        <div class="mb-10">
          <button class="w-full p-2 bg-orange text-white"> Explore </button>
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
