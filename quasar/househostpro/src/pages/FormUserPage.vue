<template>
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
        <q-input v-model="user.cognomU" label="Cognom 1"></q-input>
      </div>
      <div class="col-4">
        <q-input v-model="user.cognomDos" label="Cognom 2"></q-input>
      </div>
    </div>

    <div class="row q-col-gutter-x-md q-col-gutter-y-md">
      <div class="col-6">
        <q-input v-model="user.email" type="email" label="Email"></q-input>
      </div>
      <div class="col-6">
        <q-input v-model="contrasenya" type="password" label="Contrasenya"></q-input>
      </div>
      <div class="col-6">
        <q-input v-model="user.telefon" type="tel" label="telefon"></q-input>
      </div>
    </div>


    <div class="row q-col-gutter-x-md q-col-gutter-y-md">
      <div class="col-6">
        <q-input v-model="user.direccio" label="Direcció"></q-input>
      </div>
      <div class="col-6">
        <q-select v-model="user.ciutat" :options="opcionesCiutats" label="Ciutat" value-field="id" />
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
        nom: ref(''),
        cognomU: ref(''),
        cognomDos: ref(''),
        email: ref(''),
        telefon: ref(''),
        direccio: ref(''),
        ciutat: ref('')
      },
      ciutats: [],
      contrasenya: ref(''),
    };
  },
  async created() {
    await this.listCiutats();
  },
  methods:{
    async listCiutats(){
      try {
        this.ciutats = await UserService.findAllCiutats();
      }catch (error){
        console.error('Error al obtener datos:',error)
      }
    },
    async crearUsuario(){
      try {
        const user = {
          nom: this.user.nom,
          cognom1: this.user.cognomU,
          cognom2: this.user.cognomDos,
          email: this.user.email,
          contrasenya: this.contrasenya,
          telefon: this.user.telefon,
          direccio: this.user.direccio,
          ciutat_id: this.user.ciutat.value
        }
        console.log(user);
        await UserService.create(user)
        console.log("Usuario creado");
        await this.$router.push({path: 'admin'});
      }catch (error){
        console.error('Error al enviar datos:',error);
      }
    }
  },
  computed:{
    opcionesCiutats(){
      return this.ciutats.map(ciutat => ({label: ciutat.nom, value: ciutat.id}));
    }
  }
})
</script>

<style scoped>

</style>
