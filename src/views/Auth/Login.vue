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
        <header class="d-flex flex-column overflow-auto align-center justify-center py-6">
          <v-img
            contain
            :max-height="mdAndUp ? '150' : '210'"
            :max-width="mdAndUp ? '150' : '210'"
            :src="require('@/assets/logo.png')"
            :lazy-src="require('@/assets/logo.png')">
          </v-img>
        </header>
        <section class="d-flex flex-column overflow-auto flex-grow bg-white px-6 pt-15">
          <v-form ref="form">
            <div>
              <v-text-field v-model="name" filled 
                            rounded dense color="#00CCB5"
                            placeholder="Digite seu email"
                            :rules="[required]"
                            class="mb-1"
                            label="E-mail:">
              </v-text-field>
            </div>
            <div>
              <v-text-field v-model="password" filled
                            :append-icon="show_password ? 'visibility_off' : 'visibility'"
                            :type="show_password ? 'text' : 'password'"
                            :rules="[required]"
                            rounded class="mb-3"
                            dense color="#00CCB5" placeholder="Digite sua senha"
                            label="Senha:"
                            @click:append="show_password = !show_password">
              </v-text-field>
            </div>
          </v-form>
          <div class="d-flex align-center justify-center">
            <v-btn rounded elevation="0"
                   class="bg-primary color-white text-normal font-18"
                   height="58"
                   min-width="200"
                   @click="login">
              Entrar
            </v-btn>
          </div>
        </section>
        <footer class="d-flex justify-center font-18 color-white py-3">
          <span class="px-3 bra-3 hover-bg-white hover-color-primary transition-all pointer"
                @click="register">
            Cadastre-se
          </span>
        </footer>
      </div>
    </section>
  </section>
</template>

<script>
import Breakpoints from "@/mixins/Breakpoints";
import {required} from "@/utils/validations";

export default {
  name: "Login",
  components: {},
  mixins: [Breakpoints],
  data() {
    return {
      name: "",
      password: "",
      show_password: false,
    };
  },
  methods: {
    required: required,
    login(){
      if(!this.$refs?.form?.validate()) return

      console.log('Login feito redirecione para página de login')
      this.$router.push('/');
    },
    register(){
      this.$router.push('/register');
    }
  },
};
</script>
<style scoped lang="scss">
.back-image {
  background-image: url("../../assets/login-background.png");
  background-size: cover;
}

.size-container {
  height: 576px !important;
  width: 459px !important;
}
</style>
