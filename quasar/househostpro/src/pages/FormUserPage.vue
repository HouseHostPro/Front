<template>
  <div>
    <q-icon @click="volverPaginaAnterior" name="arrow_back" class="cursor-pointer icono-flecha" />
  </div>
  <div class="q-pa-xl text-center">
    <q-form
      @submit="crearUsuario"
      class="q-gutter-md"
    >
    <div class="row q-col-gutter-x-md q-col-gutter-y-md">
      <div class="col-4">
        <q-input v-model="user.nom" label="Nom"></q-input>
      </div>
      <div class="col-4">
        <q-input v-model="user.cognom1" label="Cognom 1"></q-input>
      </div>
      <div class="col-4">
        <q-input v-model="user.cognom2" label="Cognom 2"></q-input>
      </div>
    </div>

    <div class="row q-col-gutter-x-md q-col-gutter-y-md">
      <div class="col-6">
        <q-input v-model="user.email" type="email" label="Email"></q-input>
      </div>
      <div class="col-6">
        <q-input v-if="isNewUser" v-model="contrasenya" :type="isPwd ? 'password' : 'text'" label="Contrasenya">
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
      </div>
      <div class="col-6">
        <q-input v-model="user.telefon" type="tel" label="telefon"></q-input>
      </div>
      <div class="col-6">
        <q-select v-model="user.roles_user" :options="opcionesRols" label="Rol" value-field="value" :readonly="user.id !== undefined"></q-select>
      </div>
    </div>
    <div class="row q-col-gutter-x-md q-col-gutter-y-md">
      <div class="col-6">
        <q-input v-model="user.direccio" label="Direcció"></q-input>
      </div>
      <div class="col-6">
        <q-select v-model="user.ciutat" :options="opcionesCiutats" label="Ciutat" value-field="value" />
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
import {defineComponent, ref} from "vue"
import {UserService} from "src/service/UserService.js";
export default defineComponent({
  name: "FormUser",
  data(){
    return{
      user:{
        id: ref(undefined),
        nom: ref(''),
        cognom1: ref(''),
        cognom2: ref(''),
        email: ref(''),
        telefon: ref(''),
        direccio: ref(''),
        ciutat: ref(''),
        roles_user: ref('')
      },
      ciutats: [],
      roles: [],
      contrasenya: ref(''),
      isNewUser: true,
      isPwd: true
    };
  },
  async created() {
    await this.listCiutats();
    await this.getUserData();
    await this.listRols();
  },
  methods:{
    async getUserData() {
      try {
        const userId = this.$route.params.id;
        console.log(userId);
        if (userId) {
          const userData = await UserService.findUserById(userId);
          this.isNewUser = false;
          this.user = userData;
          this.user.id= userData.id;
          this.user.ciutat.label = userData.ciutat.nom;
          this.user.ciutat.value = userData.ciutat.id;
          this.user.roles_user = userData.roles[0].nom;
        }
      } catch (error) {
        console.error('Error al obtener datos del usuario:', error);
      }
    },
    async listCiutats(){
      try {
        this.ciutats = await UserService.findAllCiutats();
      }catch (error){
        console.error('Error al obtener datos:',error)
      }
    },
    async listRols(){
      try {
        this.roles = await UserService.findAllRols()
      }catch (error){
        console.error('Error al obtener los roles:',error)
      }
    },
    async crearUsuario(){
      try {
        const user = {
          id: this.user.id,
          nom: this.user.nom,
          cognom1: this.user.cognom1,
          cognom2: this.user.cognom2,
          email: this.user.email,
          contrasenya: this.contrasenya,
          telefon: this.user.telefon,
          direccio: this.user.direccio,
          ciutat_id: this.user.ciutat.value,
          rol_user: this.user.roles_user.value
        }
        console.log(user);
        await UserService.create(user)
        console.log("Usuario creado");
        await this.$router.push({path: '/users'});
      }catch (error){
        console.error('Error al enviar datos:',error);
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
    opcionesCiutats(){
      return this.ciutats.map(ciutat => ({label: ciutat.nom, value: ciutat.id}));
    },
    opcionesRols(){
      return this.roles.map(rol => ({label: rol.nom,value: rol.nom}));
    }
  }
})
</script>

<style>
.icono-flecha {
  font-size: 24px;
}
</style>
