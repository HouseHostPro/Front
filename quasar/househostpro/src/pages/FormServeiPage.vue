<template>
  <div>
    <q-icon @click="volverPaginaAnterior" name="arrow_back" class="cursor-pointer icono-flecha" />
  </div>
  <div class="q-pa-xl text-center">
    <q-form
      @submit="crearServei"
      class="q-gutter-md"
    >
      <div class="row q-col-gutter-x-md q-col-gutter-y-md">
        <div class="col-6">
          <q-input v-model="servei.nom" type="text" label="Nom"></q-input>
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
import {ServeiService} from "src/service/ServeiService";

export default {
  name: "FormServeiPage",
  data(){
    return{
      servei:{
        id: ref(undefined),
        nom: ref('')
      }
    }
  },
  async created(){
    await this.getServei();
  },
  methods:{
    async getServei() {
      try {
        const id = this.$route.params.id;
        if (id){
          this.servei = await ServeiService.findServeiByid(id);
        }
      }catch (error){
        console.error('Error al obtener datos de la configuracion:', error);
      }
    },
    async crearServei(){
      try {
        const servei = this.servei;
        await ServeiService.create(servei);
        await this.$router.push({path: `/serveis`});
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
  }
}
</script>

<style>
.icono-flecha {
  font-size: 24px;
}
</style>
