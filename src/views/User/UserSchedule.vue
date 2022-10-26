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
        {{ isSchedule ?'Agendar consultas' : 'Agendar exames' }}
      </span>
    </header>
    <section class="d-flex flex-column overflow-auto py-9 bg-white flex-grow">
      <section class="d-flex px-9 gap-12 flex-wrap">
        <div v-for="item in items" :key="item.id" 
             :class="xs ? 'flex-column': ''"
             class="pl-5 pb-6 d-flex gap-2 justify-space-between container-schedule">
          <section :class="xs ? 'mb-3': ''" 
                   class="d-flex flex-column gap-2 color-primary font-14--bold mr-3 justify-space-between">
            <section class="d-flex flex-column gap-2">
              <span>{{ item.name }}</span>
              <span>Valor: R$ {{ item.price }}</span>
            </section>
            <div class="d-flex gap-3 flex-wrap">
              <span>Data: {{ item.data }}</span>
              <span>Hora: {{ item.data }}</span>
            </div>
          </section>
          <div class="d-flex flex-column">
            <div v-ripple 
                 class="bg-primary d-flex container-button py-4 px-4 
                 text-center align-center justify-center
                 font-18--bold color-white hover-bg-secondary hover-color-primary transition-all pointer"
                 @click="toSchedule(item.id)">
              Agendar
            </div>
          </div>
        </div>
      </section>
    </section>
  </section>
</template>

<script>
import Breakpoints from "@/mixins/Breakpoints";
import IconBtn from "@/components/IconBtn";
export default {
  name: "Home",
  components: {IconBtn},
  mixins: [Breakpoints],
  data() {
    return {
      schedules: [{
        id: '1',
        name: 'Acunputura as gag as gas asg asg as gas as s gsa gas gsag sa  gsa ag ag ag asg g sag asg a  gasg asg asg asg as gas gas gasg asg asg as gasg a',
        price: 60.00,
        data: '27/03/2000',
        hora: '12:00'
      },{
        id: '1',
        name: 'Acunputura',
        price: 60.00,
        data: '27/03/2000',
        hora: '12:00'
      },{
        id: '1',
        name: 'Acunputurag as gasg asg as ',
        price: 60.00,
        data: '27/03/2000',
        hora: '12:00'
      },{
        id: '1',
        name: 'Acunputura',
        price: 60.00,
        data: '27/03/2000',
        hora: '12:00'
      },{
        id: '1',
        name: 'Acunputura',
        price: 60.00,
        data: '27/03/2000',
        hora: '12:00'
      },{
        id: '1',
        name: 'Acunputura',
        price: 60.00,
        data: '27/03/2000',
        hora: '12:00'
      },{
        id: '1',
        name: 'Acunputura',
        price: 60.00,
        data: '27/03/2000',
        hora: '12:00'
      },{
        id: '1',
        name: 'Acunputura',
        price: 60.00,
        data: '27/03/2000',
        hora: '12:00'
      },{
        id: '1',
        name: 'Acunputura',
        price: 60.00,
        data: '27/03/2000',
        hora: '12:00'
      },{
        id: '1',
        name: 'Acunputura',
        price: 60.00,
        data: '27/03/2000',
        hora: '12:00'
      },{
        id: '1',
        name: 'Acunputura',
        price: 60.00,
        data: '27/03/2000',
        hora: '12:00'
      },{
        id: '1',
        name: 'Acunputura',
        price: 60.00,
        data: '27/03/2000',
        hora: '12:00'
      },{
        id: '1',
        name: 'Acunputura',
        price: 60.00,
        data: '27/03/2000',
        hora: '12:00'
      },],
      exams: [{
        id: '1',
        name: 'Acunputura',
        price: 60.00,
        data: '27/03/2000',
        hora: '12:00'
      }],
    }
  },
  computed: {
    items(){
      return this.isSchedule ? this.schedules : this.exams
    },
    type() {
      return this.$route.query.type || 'schedule'; 
    },
    isSchedule() {
      return this.type == 'schedule'
    },
  },
  methods: {
    toSchedule(id){
      this.confirm({text: 'Você deseja confirmar o seu agendamento?'}, () =>{
        console.log(id)
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