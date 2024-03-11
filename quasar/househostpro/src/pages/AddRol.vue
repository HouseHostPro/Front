<template>
  <div>
    <q-icon @click="volverPaginaAnterior" name="arrow_back" class="cursor-pointer icono-flecha" />
  </div>
  <div class="q-pa-xl text-center">
    <q-form
      @submit="addRol"
      class="q-gutter-md"
    >
      <div class="row q-col-gutter-x-md q-col-gutter-y-md">
        <div class="col-6">
          <q-input v-model="userRol.email" type="text" label="Email" readonly></q-input>
        </div>
        <div class="col-6">
          <q-select v-model="userRol.rol" :options="opcionesRols" label="Rol" value-field="value"></q-select>
        </div>
      </div>
      <div class="row q-col-gutter-x-md q-col-gutter-y-md">
        <div class="col-10"></div>
        <div class="col-2 text-right">
          <q-btn label="Enviar" type="submit" color="primary"/>
        </div>
      </div>
    </q-form>
  </div>
</template>

<script>
import {ref} from "vue";
import {UserService} from "src/service/UserService";

export default {
  name: "AddRoles",
  data(){
    return{
      userRol:{
        email: ref(''),
        rol: ref('')
      },
      roles: []
    }
  },
  async created() {
    await this.getUserData();
    await this.listRols();
  },
  methods:{
    async getUserData() {
      try {
        const userId = this.$route.params.iduser;
        console.log(userId);
        if (userId) {
          const userData = await UserService.findUserById(userId);
          this.userRol.email = userData.email;
        }
      } catch (error) {
        console.error('Error al obtener datos del usuario:', error);
      }
    },
    async listRols(){
      try {
        this.roles = await UserService.findAllRols()
      }catch (error){
        console.error('Error al obtener los roles:',error)
      }
    },
    async addRol(){
      try {
        const userRol = {
          email: this.userRol.email,
          rol: this.userRol.rol.value
        }

        await UserService.addRol(userRol);
        await this.$router.push({path: `/users`});
      }catch (error){
        console.error('Error al enviar datos:',error)
      }
    },
    volverPaginaAnterior() {
      if (this.$router){
        this.$router.go(-1);
      }else {
        console.error("No se puede volver.");
      }
    }
  },
  computed:{
    opcionesRols(){
      return this.roles.map(rol => ({label: rol.nom,value: rol.nom}));
    }
  }
}
</script>

<style>
.icono-flecha {
  font-size: 24px;
}
</style>
