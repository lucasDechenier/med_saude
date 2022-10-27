<template>
  <section class="d-flex fill-height flex-grow flex-column bg-primary">
    <header class="d-flex align-center justify-center py-7 flex-wrap full-width px-12"
            :class="xs ? 'gap-6': 'gap-13'">
      <section style="position: absolute; top: 20px; left: 20px;"
               @click="goHome">
        <icon-btn
          icon="fas fa-chevron-left"
          class="color-white hover-color-secondary">
        </icon-btn>
      </section>
      <v-img
        contain
        :max-height="xs ? '80' : '120'"
        :max-width="xs ? '80' : '120'"
        :src="require('@/assets/logo.png')"
        :lazy-src="require('@/assets/logo.png')">
      </v-img>
      <span class="color-white font-35--bold text-center">
        {{ isSpecialist ?'Histórico de consultas' : 'Histórico de exames' }}
      </span>
    </header>
    <section class="d-flex flex-column overflow-auto py-5 bg-white flex-grow">
      <section class="d-flex align-center justify-center gap-3 pb-8 flex-wrap">
        <div 
          v-ripple
          :class="step == 'scheduled' ? 'bg-primary color-white' : 'bg-secondary color-grey'"
          class=" px-3 py-1 bra-4 font-14--bold pointer 
        hover-bg-secondary hover-color-primary  transition-all"
          @click="step = 'scheduled' ">
          {{ isSpecialist ? 'Agendadas' : 'Agendados' }}
        </div>
        <div v-ripple 
             :class="step == 'finished' ? 'bg-primary color-white' : 'bg-secondary color-grey'"
             class="px-3 py-1 bra-4 font-14--bold pointer
        hover-bg-secondary hover-color-primary "
             @click="step = 'finished' ">
          {{ isSpecialist ? 'Finalizadas' : 'Finalizados' }}
        </div>
        <div v-ripple
             :class="step == 'canceled' ? 'bg-primary color-white' : 'bg-secondary color-grey'"
             class="px-3 py-1 bra-4 font-14--bold pointer
        hover-bg-secondary hover-color-primary"
             @click="step = 'canceled'">
          {{ isSpecialist ?'Canceladas' : 'Cancelados' }}
        </div>
      </section>
      <v-fade-transition>
        <section v-if="(items || []).length" class="d-flex px-9 gap-12 flex-wrap flex-column">
          <div v-for="item in items" :key="item.id" 
               class="pb-2 d-flex gap-2 justify-space-between bra-5 brtl-6 brtr-6 flex-column bg-primary">
            <section class="bg-secondary d-flex flex-grow justify-center brtl-5 brtr-5 py-2 flex-column align-center px-6" style="position: relative;">
              <span class="color-grey font-18--bold">{{ item.title }}</span>
              <span
                v-if="step == 'scheduled'"
                class="color-primary font-14--bold hover-bg-primary hover-color-white pointer px-2 bra-4 transition-all py-1"
                @click="cancel(item._id)">
                Cancelar
              </span>
            </section>
            <section class="d-flex align-center justify-center gap-2 py-2 font-18--bold flex-column color-white px-7 text-center flex-wrap">
              <span class="">Descrição: {{ item.description }}</span>
              <span>Data: {{ $options.filters.toFormated(item.appointmentDate) }}</span>
              <span>Hora: {{ item.appointmentHour }}H</span>
              <span>Preço: R$ {{ item.price }}</span>
            </section>
          </div>
        </section>
        <section v-else-if="(items || []).length == 0 && showEmpty" class="flex-grow mt-10 align-center flex-column color-primary font-18--bold text-center d-flex">
          <v-img
            class="mb-8"
            :contain="true"
            :max-height="200"
            :max-width="200"
            :src="require('@/assets/box_no_content.png')"
            :lazy-src="require('@/assets/box_no_content.png')">
          </v-img>
          Não há {{ isSpecialist ?' consultas' : 'exames' }}
        </section>
      </v-fade-transition>
    </section>
  </section>
</template>

<script>
import Breakpoints from "@/mixins/Breakpoints";
import IconBtn from "@/components/IconBtn";
import ScheduleService from "@/services/ScheduleService";

export default {
  name: "Home",
  components: {IconBtn},
  mixins: [Breakpoints],
  data() {
    return {
      schedules: [],
      exams: [],
      showEmpty: false,
      step: 'scheduled',
    }
  },
  computed: {
    items(){
      return this.isSpecialist ? this.schedules : this.exams
    },
    type() {
      return this.$route.query.type || 'specialist'; 
    },
    isSpecialist() {
      return this.type == 'specialist'
    },
  },
  watch: {
    step: {
      immediate: true,
      handler(newValue) { 
        this.reload(newValue)
      }
    }
  },
  mounted(){
    this.showEmpty = false
  },
  methods: {
    cancel(id){
      this.confirm({text: 'Você deseja confirmar o cancelamento desse agendamento?'}, () =>{
        ScheduleService.toCancel(id).then(() => {
          this.alertSuccess({title: 'Cancelamento feito com sucesso'})
          this.reload(this.step)
        })
      })
    },
    async reload(step){
      this.showEmpty = false
      this.schedules = []
      this.exams =[]
      let values = [];
      if(step == 'scheduled'){
        values = await ScheduleService.scheduledUser() || []
      }else if(step == 'canceled'){
        values = await ScheduleService.canceledUser() || []
      }else{
        values = await ScheduleService.finishedUser() || []
      }

      if(this.isSpecialist){
        this.schedules = values.filter((d) => d.type == 'specialist') || []
      }else{
        this.exams = values.filter((d) => d.type == 'exam') || []
      }
      this.showEmpty = true
    },
    goHome(){
      this.$router.push('/')
    }
  },
}
</script>

<style lang="scss" scoped>
</style>