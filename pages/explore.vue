/* eslint-disable vue/no-unused-components */
<template>
  <div>
    <Scene>
      <MenuView />
      <div class="absolute bottom-0 right-0">
        <img
          v-if="mute"
          class="w-14 h-14 cursor-pointer select-none"
          src="~/assets/muted.svg"
          @click="setMute()"
        />
        <img
          v-else
          class="w-14 h-14 cursor-pointer select-none"
          src="~/assets/mute.svg"
          @click="setMute()"
        />
      </div>
      <div
        v-if="isLoading"
        class="
          flex
          justify-center
          absolute
          items-center
          w-full
          h-screen
          z-30
          bg-gray-100
          opacity-90
        "
      >
        <div class="flex flex-col">
          <img class="w-14 h-14" src="~/assets/loading.gif" />
          <p class="text-xs mt-3 text-center">
            {{ progressTime.toFixed(2) }} %
          </p>
        </div>
      </div>
    </Scene>
  </div>
</template>

<script>
import Scene from '../webgl/Scene.vue'
import MenuView from '../components/exhibition/MenuView.vue'

export default {
  components: {
    Scene,
    MenuView,
  },
  layout: 'exhibition_layouts',
  middleware: 'auth',
  data() {
    return {
      isLoading: true,
      progressTime: 0,
      mute: false,
    }
  },
  created() {
    this.$nuxt.$on('LOADING-SCENE', (payload) => {
      this.progressTime = payload.progress
      if (payload.progress === 100) this.isLoading = false
    })
  },
  beforeDestroy() {
    this.$nuxt.$off('LOADING-SCENE')
  },
  methods: {
    setMute() {
      this.mute = !this.mute
      this.$nuxt.$emit('MUTE-BACKGROUND-MUSIC', this.mute)
    },
  },
}
</script>
