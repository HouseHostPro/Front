<template>
  <q-page class="bg-light-blue window-height window-width row justify-center items-center">
    <div class="column">
      <div class="row">
        <h5 class="text-h5 text-white q-my-md">HouseHostPro</h5>
      </div>
      <div class="row">
        <q-card square bordered class="q-pa-lg shadow-1">
          <q-card-section>
            <q-form class="q-gutter-md">
              <q-input square filled clearable v-model="user.email" type="email" label="email" />
              <q-input square filled clearable v-model="user.contrasenya" type="password" label="password">
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
          <q-card-section class="text-center q-pa-none">
            <p class="text-grey-6">Not reigistered? Created an Account</p>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import {defineComponent} from "vue";
import axios from "axios";

export default defineComponent({
  name: "LoginPage",
  data(){
    return{
      user: {},
      isPwd: true
    }
  },
  methods:{
    async login(){
      localStorage.removeItem('token');
      const loginFetch = await fetch("http://localhost:8080/usuari/login",{
        method: 'POST',
        body: JSON.stringify(this.user)
      })
      const response = await loginFetch.text();

      localStorage.setItem("token",response);
    }
  }
})
</script>

<style scoped>
.q-card {
  width: 560px;
}
</style>
