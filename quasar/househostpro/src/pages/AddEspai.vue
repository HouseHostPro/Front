<template>
  <div>
    <q-icon @click="volverPaginaAnterior" name="arrow_back" class="cursor-pointer icono-flecha" />
  </div>
  <div class="q-pa-xl text-center">
    <q-form
      @submit="addEspai"
      class="q-gutter-md"
    >
      <div class="row q-col-gutter-x-md q-col-gutter-y-md">
        <div class="col-6">
          <q-input v-model="dominiEspai.domini" type="text" label="Nom Propietat" readonly></q-input>
        </div>
      </div>
      <div class="row q-col-gutter-x-md q-col-gutter-y-md">
        <div class="col-6">
          <q-select v-model="dominiEspai.espai" :options="opcionesEspais" label="Espais" value-field="value"></q-select>
        </div>
        <div class="col-6">
          <q-input v-model="dominiEspai.quantitat" type="number" label="Quantitat"></q-input>
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
import {EspaiService} from "src/service/EspaiService";
import {PropietatService} from "src/service/PropietatService";
import {TraduccionService} from "src/service/TraduccionService";

export default {
  name: "AddRoles",
  data(){
    return{
      dominiEspai:{
        dominiId: ref(undefined),
        domini: ref(''),
        espai: ref(''),
        quantitat: ref('')
      },
      espais: []
    }
  },
  async created() {
    await this.getDominiData();
    await this.listEspais();
  },
  methods:{
    async getDominiData() {
      try {
        const dominiId = this.$route.params.id;
        if (dominiId) {
          const dominiData = await PropietatService.findPropietatByid(dominiId);
          const nomDomini = await TraduccionService.findTraduccionByCode(dominiData.nom);
          this.dominiEspai.dominiId = dominiData.id;
          this.dominiEspai.domini = nomDomini.value;


        }
      } catch (error) {
        console.error('Error al obtener datos del usuario:', error);
      }
    },
    async listEspais(){
      try {
        this.espais = await EspaiService.findAllEspaisDefecte();
      }catch (error){
        console.error('Error al obtener los roles:',error)
      }
    },
    async addEspai(){
      try {
        const dominiEspais = {
            id: this.dominiEspai.dominiId,
            espai: this.dominiEspai.espai.value,
            quantitat: this.dominiEspai.quantitat
          }
        await PropietatService.addEspai(dominiEspais);
        await this.$router.push({path: `/espais/${this.dominiEspai.dominiId}`});
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
    opcionesEspais(){
      return this.espais.map(espai => ({label: espai.tipus,value: espai.id}));
    }
  }
}
</script>

<style>
.icono-flecha {
  font-size: 24px;
}
</style>
