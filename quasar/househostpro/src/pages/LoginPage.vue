<template>
  <q-page class="bg-light-blue row justify-center items-center">
    <div class="column">
      <div class="row">
        <h5 class="text-h5 text-white q-my-md">HouseHostPro</h5>
      </div>
      <div class="row">
        <q-card square bordered class="q-pa-lg shadow-1 flex column justify-center">
          <q-card-section>
            <q-form class="q-gutter-md">
              <h4 class="text-h4 text-black q-my-md">Iniciar Sesion</h4>
              <q-input square filled clearable v-model="user.email" type="email" label="email" />
              <q-input square filled clearable v-model="user.contrasenya" :type="isPwd ? 'password' : 'text'" label="password">
                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>
            </q-form>
          </q-card-section>
          <q-card-actions class="q-px-md">
            <q-btn unelevated color="light-blue-7" size="lg" class="full-width" label="Login" @click="login"/>
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import {defineComponent} from "vue";
import {UserService} from "src/service/UserService.js";
export default defineComponent({
  name: "LoginPage",
  data(){
    return{
      user: {},
      isPwd: true
    }
  },
  async created() {
  },
  methods:{
    async login(){
      try {
        localStorage.removeItem('token');
        const response = await UserService.login(this.user);
        console.log(response);
        localStorage.setItem("token",response);
        await this.$router.push({path:'admin'});
      }catch (error){
        console.error("Error al iniciar sesión:", error);
      }

    }
  }
})
</script>

<style scoped>
.q-card {
  width: 660px;
  height: 400px;
}
</style>
