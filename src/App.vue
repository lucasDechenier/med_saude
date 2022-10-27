<template>
  <v-app>
    <vue-topprogress ref="topLoading" :height="5"></vue-topprogress>
    <v-main class="max-h-screen">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import {vueTopprogress} from 'vue-top-progress'

import {mapGetters} from 'vuex'

export default {
  name: 'App',
  components: {vueTopprogress},
  data: () => ({
    //
  }),
  computed: {
    ...mapGetters(['loadingApp']),
  },
  watch: {
    loadingApp: {
      immediate: true,
      handler (value) {
        if (this.$refs.topLoading) {
          value ? this.$refs.topLoading.start() : this.$refs.topLoading.done()
        }
      }
    }
  },
};
</script>
<style lang="scss" scoped>

</style>
