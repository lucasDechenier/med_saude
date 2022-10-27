<template>
  <section class="d-flex fill-height flex-grow"
           :class="mdAndUp ? 'back-image' : ''">
    <section
      class="d-flex fill-height full-width justify-center align-center flex-grow"
    >
      <div
        class="bg-primary d-flex flex-column"
        :class="mdAndUp ? 'bra-6 size-container' : 'flex-grow fill-height'"
      >
        <header class="d-flex flex-column justify-center px-6 py-4 font-18--bold gap-2 color-white">
          <span>Vamos começar?</span>
          <span>Precisamos saber sobre você.</span>
        </header>
        <section class="d-flex flex-column overflow-auto flex-grow bg-white px-6 py-4">
          <v-form ref="form">
            <div class="mb-n3">
              <div class="color-primary font-14--bold mb-2">
                <label>Seu nome:</label>
              </div>
              <v-text-field
                v-model="user.name" label=""
                filled rounded
                class="color-primary bra-3 mb-n3" color="#00CCB5"
                :rules="[required]"
              ></v-text-field>
            </div>
            <div>
              <div class="color-primary font-14--bold mb-2">
                <label>Sua data de nascimento:</label>
              </div>
              <date-picker v-model="user.birthDate" no-icon filled
                           rounded picker-class="color-primary bra-3 mb-n3" color="#00CCB5"
                           :rules="[required]">
              </date-picker>
            </div>
            <div>
              <div class="color-primary font-14--bold mb-2">
                <label>Seu cpf:</label>
              </div>
              <v-text-field
                v-model="user.cpf" v-mask="'###.###.###-##'" label=""
                filled 
                rounded
                class="color-primary bra-3 mb-n3"
                color="#00CCB5"
                :rules="[required, (v) => v.length < 14 ? 'CPF preenchido incorretamente' : true]"
              ></v-text-field>
            </div>
            <div>
              <div class="color-primary font-14--bold mb-2">
                <label>Seu email:</label>
              </div>
              <v-text-field
                v-model="user.email" label=""
                filled 
                rounded
                class="color-primary bra-3 mb-n3"
                color="#00CCB5"
                :rules="[required]"
              ></v-text-field>
            </div>
            <div>
              <div class="color-primary font-14--bold mb-2">
                <label>Crie uma senha:</label>
              </div>
              <v-text-field
                v-model="user.password" label=""
                filled 
                rounded class="color-primary bra-3 mb-n3" color="#00CCB5"
                :rules="[required]"
                :type="show_password ? 'text' : 'password'"
                :append-icon="show_password ? 'visibility_off' : 'visibility'"
                @click:append="show_password = !show_password"
              ></v-text-field>
            </div>
            <div>
              <div class="color-primary font-14--bold mb-2">
                <label>Confirme a senha:</label>
              </div>
              <v-text-field
                v-model="user.confirmPassword" label=""
                filled
                rounded class="color-primary bra-3" color="#00CCB5"
                :rules="[required, (v) => confirmationPassword(v)]"
                :type="show_password ? 'text' : 'password'"
                :append-icon="show_password ? 'visibility_off' : 'visibility'"
                @click:append="show_password = !show_password"
              ></v-text-field>
            </div>
          </v-form>
        </section>
        <footer class="d-flex align-center justify-space-between px-6 bg-white pt-3 pb-4"
                :class="mdAndUp ? 'brbl-6 brbr-6': ''">
          <v-btn
            outlined
            class="color-primary px-8"
            @click="goToLogin"
          >
            Voltar
          </v-btn>
          <v-btn
            outlined
            class="color-primary px-6"
            @click="register"
          >
            Cadastrar
          </v-btn>
        </footer>
      </div>
    </section>
  </section>
</template>

<script>
import Breakpoints from "@/mixins/Breakpoints";
import {required} from "@/utils/validations";
import DatePicker from '@/components/form/DatePicker'
import UserService from "@/services/UserService";

export default {
  name: "Register",
  components: { DatePicker },
  mixins: [Breakpoints],
  data() {
    return {
      user: {
        name: "",
        password: "",
        confirmPassword: "",
        birthDate: "",
        cpf: "",
        email: ""
      },
      show_password: false,
    };
  },
  methods: {
    required: required,
    register(){
      if(!this.$refs?.form?.validate()) return

      UserService.register(this.user).then(() => {
        this.alertSuccess({title: 'Registro feito com sucesso'})
        this.goToLogin()
      })
    },
    confirmationPassword(value){
      return value === this.user.password ? true : 'Confirmação de senha inválida'
    },
    goToLogin(){
      this.$router.push('/login');
    }
  },
}
</script>

<style scoped lang="scss">
.back-image {
  background-image: url("../../assets/login-background.png");
  background-size: cover;
}

.size-container {
  min-height: 576px !important;
  max-height: 80vh;
  width: 600px !important;
}
</style>