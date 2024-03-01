<template>
  <div>
    <q-icon @click="volverPaginaAnterior" name="arrow_back" class="cursor-pointer icono-flecha" />
  </div>
  <div class="q-pa-xl text-center">
    <q-form
      @submit="crearConfig"
      class="q-gutter-md"
    >
      <div class="row q-col-gutter-x-md q-col-gutter-y-md">
        <div class="col-4">
          <q-input v-model="config.propietatConfiguracio.id" type="number" label="Propietat ID"></q-input>
        </div>
        <div class="col-4">
          <q-input v-model="config.clau" type="text" label="Clau"></q-input>
        </div>
        <div class="col-4">
          <q-input v-model="config.valor" label="Valor"></q-input>
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
import {ConfiguracionsService} from "src/service/ConfiguracionsService";

export default {
  name: "FormConfiguracioPage",
  data(){
    return{
      config:{
        id: ref(undefined),
        propietatConfiguracio:{
          id: ref('')
        },
        clau: ref(''),
        valor: ref('')
      }
    }
  },
  async created(){
    await this.getConfig();
  },
  methods:{
    async getConfig() {
      try {
        const configId = this.$route.params.id;
        if (configId){
          this.config = await ConfiguracionsService.findConfiguracioById(configId);
        }
      }catch (error){
        console.error('Error al obtener datos de la configuracion:', error);
      }
    },
    async crearConfig(){
      try {
        const config = this.config;
        await ConfiguracionsService.create(config);
        await this.$router.push({path: '/configuracions'});
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
