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
        {{ isSpecialist ?'Agendar consultas' : 'Agendar exames' }}
      </span>
    </header>
    <section class="d-flex flex-column overflow-auto py-9 bg-white flex-grow">
      <v-slide-y-transition>
        <section v-if="(items || []).length" class="d-flex px-9 gap-12 flex-wrap">
          <div v-for="item in items" :key="item.id" 
               :class="xs ? 'flex-column': ''"
               class="pl-5 pb-6 d-flex gap-2 justify-space-between container-schedule">
            <section :class="xs ? 'mb-3': ''" 
                     class="d-flex flex-column gap-2 color-primary font-14--bold mr-3 justify-space-between">
              <section class="d-flex flex-column gap-2">
                <span>{{ item.title }}</span>
                <div class="bra-2 d-flex">
                  <span class="bra-3 font-12--bold px-2 bg-primary color-white py-1">
                    {{ item.description }}
                  </span>
                </div>
                <span class="font-12--bold">Valor: R$ {{ item.price }}</span>
              </section>
              <div class="d-flex gap-3 flex-wrap font-12--bold">
                <span>Data: {{ $options.filters.toFormated(item.appointmentDate) }}</span>
                <span>Hora: {{ item.appointmentHour }}H</span>
              </div>
            </section>
            <div class="d-flex flex-column">
              <div v-ripple 
                   class="bg-primary d-flex container-button py-4 px-4 
                 text-center align-center justify-center
                 font-18--bold color-white hover-bg-secondary hover-color-primary transition-all pointer"
                   @click="toSchedule(item._id)">
                Agendar
              </div>
            </div>
          </div>
        </section>
      </v-slide-y-transition>
      <section v-if="(items || []).length == 0 && showEmpty" class="flex-grow mt-10 align-center flex-column color-primary font-18--bold text-center d-flex">
        <v-img
          class="mb-8"
          :contain="true"
          :max-height="200"
          :max-width="200"
          :src="require('@/assets/box_no_content.png')"
          :lazy-src="require('@/assets/box_no_content.png')">
        </v-img>
        Não há {{ isSpecialist ?' consultas' : 'exames' }} disponíveis para agendamento no momento
      </section>
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
  mounted(){
    this.showEmpty = false
    this.reload()
  },
  methods: {
    toSchedule(id){
      this.confirm({text: 'Você deseja confirmar o seu agendamento?'}, () =>{
        ScheduleService.toSchedule(id).then(() => {
          this.alertSuccess({title: 'Agendamento feito com sucesso'})
          this.reload()
        })
      })
    },
    reload(){
      ScheduleService.opened().then(data => {
        if(this.isSpecialist){
          this.schedules = data.filter((d) => d.type == 'specialist') || []
        }else{
          this.exams = data.filter((d) => d.type == 'exam') || []
        }
      }).finally(() => {
        this.showEmpty = true
      })
    },
    goHome(){
      this.$router.push('/')
    }
  },
}
</script>

<style lang="scss" scoped>
  .container-button{
    border-radius: 15px 15px 15px 0px;
  }

  @media (min-width: 801px){
    .container-schedule{
      width: calc(50% - 24px);
      border-bottom: 3px solid #EEEEEE;
    }
  }
  @media (max-width: 800px){
    .container-schedule{
      width: 100%;
      border-bottom: 3px solid #EEEEEE;
    }
  }
</style>