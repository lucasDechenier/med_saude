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
        Cadastro de agendamentos
      </span>
    </header>
    <div
      class="bg-primary d-flex flex-column"
    >
      <header class="d-flex flex-column justify-center px-6 py-4 font-18--bold gap-2 color-white">
        <span>Vamos começar?</span>
        <span>Preencha os campos do seu agendamento</span>
      </header>
      <section class="d-flex flex-column overflow-auto flex-grow bg-white px-6 py-4 pb-9">
        <v-form ref="form">
          <div class="mb-n3">
            <div class="color-primary font-14--bold mb-2">
              <label>Título:</label>
            </div>
            <v-text-field
              v-model="schedule.title" label=""
              filled rounded
              placeholder="Digite o título do agendamento"
              class="color-primary bra-3 mb-n3" color="#00CCB5"
              :rules="[required]"
            ></v-text-field>
          </div>
          <div>
            <div class="color-primary font-14--bold mb-2">
              <label>Descrição:</label>
            </div>
            <v-textarea
              v-model="schedule.description"
              row="1" label=""
              auto-grow
              placeholder="Digite a descrição do seu agendamento"
              filled
              rounded class="color-primary bra-3" color="#00CCB5"
              :rules="[required]"
            ></v-textarea>
          </div>
          <div>
            <div class="color-primary font-14--bold mb-2">
              <label>Tipo:</label>
            </div>
            <v-autocomplete
              v-model="schedule.type"
              :items="[{value: 'specialist', text: 'Consulta'},{value: 'exam', text: 'Exame'}]" 
              label=""
              filled 
              rounded
              class="color-primary bra-3 mb-n3"
              color="#00CCB5"
              :rules="[required]"
            ></v-autocomplete>
          </div>
          <div>
            <div class="color-primary font-14--bold mb-2">
              <label>Data:</label>
            </div>
            <date-picker v-model="schedule.appointmentDate" no-icon filled
                         placeholder="Data disponível do agendamento"
                         rounded picker-class="color-primary bra-3 mb-n3" color="#00CCB5"
                         :rules="[required]">
            </date-picker>
          </div>
          <div>
            <div class="color-primary font-14--bold mb-2">
              <label>Horário:</label>
            </div>
            <v-text-field
              v-model="schedule.appointmentHour" v-mask="'##:##'"
              label=""
              placeholder="Horário disponível do agendamento"
              filled
              rounded class="color-primary bra-3" color="#00CCB5"
              :rules="[required]"
            ></v-text-field>
          </div>
          <div>
            <div class="color-primary font-14--bold mb-2">
              <label>Preço:</label>
            </div>
            <v-text-field
              v-model="schedule.price"
              type="number" step="0.01" label=""
              filled 
              rounded
              prefix="R$"
              class="bra-3 mb-n3"
              color="#00CCB5"
              :rules="[required]"
            ></v-text-field>
          </div>
        </v-form>
        <section class="d-flex align-center justify-center mt-3">
          <v-btn
            outlined
            class="color-primary px-6 font-18--semibold py-6"
            @click="createSchedule"
          >
            Cadastrar
          </v-btn>
        </section>
      </section>
    </div>
  </section>
</template>

<script>
import Breakpoints from "@/mixins/Breakpoints";
import IconBtn from "@/components/IconBtn";
import DatePicker from '@/components/form/DatePicker'
import ScheduleService from '@/services/ScheduleService'
import {required} from "@/utils/validations";
import { cloneDeep } from 'lodash'

export default {
  name: "Home",
  components: {IconBtn, DatePicker},
  mixins: [Breakpoints],
  data() {
    return {
      schedule: {
        title: '',
        description: '',
        appointmentDate: '',
        appointmentHour: '',
        type: '',
        price: 0.0,
      },
    }
  },
  methods: {
    required: required,
    createSchedule(){
      if(!this.$refs?.form?.validate()) return
      let schedule = cloneDeep(this.schedule)
      schedule.appointmentDate = this.$options.filters.toDate(schedule.appointmentDate)

      ScheduleService.createSchedule(schedule).then(() => { 
        this.alertSuccess({title: 'Agendamento criado com sucesso'})
      })
    },
    goHome(){
      this.$router.push('/admin')
    }
  },
}
</script>

<style lang="scss" scoped>
</style>