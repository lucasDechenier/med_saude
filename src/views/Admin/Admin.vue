<template>
  <section class="d-flex fill-height flex-grow flex-column bg-primary">
    <section class="d-flex flex-column overflow-auto flex-grow">
      <header class="d-flex flex-column align-center justify-center py-6">
        <section style="position: absolute; top: 20px; right: 20px;">
          <icon-btn
            icon="fas fa-sign-out-alt"
            class="color-primary hover-bg-white hover-color-cyan bg-secondary transition-all"
            @click="toLogout">
          </icon-btn>
        </section>
        <v-img
          contain
          max-height="150"
          max-width="150"
          :src="require('@/assets/logo.png')"
          :lazy-src="require('@/assets/logo.png')">
        </v-img>
        <span class="color-white font-35--bold text-center mt-4">
          Painel administrativo
        </span>
      </header>
      <section class=" flex-grow d-flex">
        <section class="d-flex flex-column align-center justify-center flex-wrap gap-10 py-10 flex-grow">
          <section :class="xs ? 'px-6' : 'px-15'" class="d-flex gap-6 flex-wrap flex-column" style="width: 100%;">
            <div v-for="(item, index) in options" :key="index" 
                 :class="lgAndDown ? 'py-6': 'py-9'"
                 class="container-button bg-secondary text-center color-cyan font-20--bold
            pointer hover-bg-white hover-color-primary transition-all px-4 align-center justify-center " @click="item.action">
              {{ item.name }}
            </div>
          </section>
        </section>
      </section>
    </section>
    <footer class="d-flex font-14--bold justify-center bg-white px-6 pt-4 pb-6 flex-column font-14 text-center color-primary gap-1">
      <span>
        Numeros de emergência:
      </span>
      <section class="d-flex align-center justify-center gap-5">
        <span>
          SAMU: 192
        </span>
        <span>
          BOMBEIROS: 193
        </span>
        <span>
          POLÍCIA MILITAR: 190
        </span>
      </section>
    </footer>
  </section>
</template>

<script>
import { mapActions } from 'vuex'
import Breakpoints from "@/mixins/Breakpoints";
import IconBtn from "@/components/IconBtn";

export default {
  name: "Home",
  components: {IconBtn},
  mixins: [Breakpoints],
  computed: {
    options() {
      return [
        {name: 'Criar agendamento', action: () => this.createSchedule()},
        {name: 'Histórico de consultas', action: () => { this.history('specialist') }},
        {name: 'Hístorico de exames', action: () => { this.history('exam') }},
      ]
    }
  },
  methods: {
    ...mapActions(['logout']),
    createSchedule(){
      this.$router.push('/admin/schedule')
    },
    history(type) {
      this.$router.push({path: '/admin/history', query: {type: type || 'specialist'}});
    },
    toLogout(){
      this.confirm({text: 'Deseja sair do sistema?'}, () =>{
        this.logout().then(() => {
          this.$router.push('/login')
        })
      })
    }
  },
}
</script>

<style lang="scss" scoped>
  .container-button{
    border-radius: 15px 15px 15px 15px;
  }
</style>