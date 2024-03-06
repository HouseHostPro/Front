<template>
  <div>
    <q-icon @click="volverPaginaAnterior" name="arrow_back" class="cursor-pointer icono-flecha" />
  </div>
  <div class="q-pa-xl text-center">
    <q-form
      @submit="crearPreuTemporada"
      class="q-gutter-md"
    >
      <div class="row q-col-gutter-x-md q-col-gutter-y-md">
        <div class="col-3">
          <q-input v-model="preuTemporada.propietatPreuTemporada.id" type="number" label="Propietat ID"></q-input>
        </div>
        <div class="col-3">
          <q-input v-model="preuTemporada.dataInici" type="date" label="Inici"></q-input>
        </div>
        <div class="col-3">
          <q-input v-model="preuTemporada.dataFi" type="date" label="Fi"></q-input>
        </div>
        <div class="col-3">
          <q-input v-model="preuTemporada.preu" type="number" label="Preu"></q-input>
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
import {PreuTemporadaService} from "src/service/PreuTemporadaService";

export default {
  name: "FormPreuTemporadaPage",
  data(){
    return{
      preuTemporada:{
        id: ref(undefined),
        propietatPreuTemporada:{
          id: ref('')
        },
        preu: ref(''),
        dataInici: ref(''),
        dataFi: ref('')
      }
    }
  },
  async created(){
    await this.getPreuTemporada();
  },
  methods:{
    async getPreuTemporada() {
      try {
        const id = this.$route.params.id;
        if (id){
          this.preuTemporada = await PreuTemporadaService.findPreuTemporadaById(id);
        }
      }catch (error){
        console.error('Error al obtener datos de la configuracion:', error);
      }
    },
    async crearPreuTemporada(){
      try {
        const preuTemporada = this.preuTemporada;
        await PreuTemporadaService.create(preuTemporada);
        await this.$router.push({path: `/preutemporadas/${this.preuTemporada.propietatPreuTemporada.id}`});
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
