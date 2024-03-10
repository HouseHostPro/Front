<template>
  <div>
    <q-icon @click="volverPaginaAnterior" name="arrow_back" class="cursor-pointer icono-flecha" />
  </div>
  <div class="q-pa-xl text-center">
    <q-form
      @submit="crearDomini"
      class="q-gutter-md"
    >
      <div class="row q-col-gutter-x-md q-col-gutter-y-md">
        <div class="col-4">
          <q-input v-model="domini.nom" label="Nom"></q-input>
        </div>
        <div class="col-4">
          <q-input v-model="domini.descripcio" type="text" label="Descripcio"></q-input>
        </div>
        <div class="col-4">
          <q-input v-model="domini.m2" type="number" label="m2"></q-input>
        </div>
      </div>
      <div class="row q-col-gutter-x-md q-col-gutter-y-md">
        <div class="col-4">
          <q-input v-model="email" type="email" @input="getUser" label="Email"></q-input>
        </div>
        <div class="col-4">
          <q-input v-model="dominiName.valor" type="text" label="Domini"></q-input>
        </div>
        <div class="col-4">
          <q-input v-model="preuBase.valor" type="number" label="Preu Base"></q-input>
        </div>
      </div>
      <div class="row q-col-gutter-x-md q-col-gutter-y-md">
        <div class="col-4">
          <q-input v-model="domini.localitzacio" label="Localitzacio"></q-input>
        </div>
        <div class="col-4">
          <q-select v-model="domini.ciutat" :options="opcionesCiutats" label="Ciutat" value-field="value" />
        </div>
        <div class="col-4">
          <q-select v-model="domini.plantilla" :options="opcionesPlantillas" label="Plantilla" value-field="value" />
        </div>
      </div>
      <div class="row q-col-gutter-x-md q-col-gutter-y-md">
        <div class="col-2">
          <q-input v-model="PrecioLimpieza.valor" label="Precio Limpieza" type="number"/>
        </div>
        <div class="col-2">
          <q-input v-model="horaEntrada.valor" filled type="time" label="Hora Entrada" />
        </div>
        <div class="col-2">
          <q-input v-model="horaSalida.valor" filled type="time" label="Hora Salida" />
        </div>
        <div class="col-2">
          <q-toggle v-model="fumar.valor" label="Fumar"/>
        </div>
        <div class="col-2">
          <q-toggle v-model="mascotas.valor" label="Mascotas"/>
        </div>
        <div class="col-2">
          <q-toggle v-model="visitas.valor" label="Visitas"/>
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
import {PropietatService} from "src/service/PropietatService";
import {ConfiguracionsService} from "src/service/ConfiguracionsService";
import {TraduccionService} from "src/service/TraduccionService";

export default {
  name: "FormDominiPage",
  data(){
    return{
      domini:{
        id: ref(undefined),
        nom: ref(''),
        descripcio: ref(''),
        localitzacio: ref(''),
        m2: ref(''),
        user_id: ref(''),
        ciutat: ref(''),
        plantilla: ref('')
      },
      dominiName: {
        clau: ref("domini"),
        valor: ref('')
      },
      preuBase: {
        clau: ref("preu_base"),
        valor: ref('')
      },
      mascotas: {
        clau: ref("mascotas"),
        valor: ref('')
      },
      fumar: {
        clau: ref("fumar"),
        valor: ref('')
      },
      visitas: {
        clau: ref("visitas"),
        valor: ref('')
      },
      horaEntrada: {
        clau: ref("hora_entrada"),
        valor: ref('')
      },
      horaSalida: {
        clau: ref("hora_salida"),
        valor: ref('')
      },
      PrecioLimpieza: {
        clau: ref("preu_neteja"),
        valor: ref('')
      },
      user: [],
      ciutats: [],
      email: ref(''),
      plantillas: [],
    };
  },
  async created() {
    await this.listCiutats();
    await  this.listPlantillas();
    await this.getDominiData();
  },
  methods:{
    async getDominiData() {
      try {
        const dominiId = this.$route.params.id;
        if (dominiId) {
          const dominiData = await PropietatService.findPropietatByid(dominiId);
          const traduccionData = await TraduccionService.findTraduccionByCode(dominiData.nom);
          const configData = await ConfiguracionsService.findConfiguracioByClauAndPropietat(this.dominiName.clau,parseInt(dominiData.id));
          const preuBase = await ConfiguracionsService.findConfiguracioByClauAndPropietat(this.preuBase.clau,parseInt(dominiData.id));
          const fumarBase = await ConfiguracionsService.findConfiguracioByClauAndPropietat(this.fumar.clau,parseInt(dominiData.id));
          const mascotaBase = await ConfiguracionsService.findConfiguracioByClauAndPropietat(this.mascotas.clau,parseInt(dominiData.id));
          const visitasBase = await ConfiguracionsService.findConfiguracioByClauAndPropietat(this.visitas.clau,parseInt(dominiData.id));
          const entradaBase = await ConfiguracionsService.findConfiguracioByClauAndPropietat(this.horaEntrada.clau,parseInt(dominiData.id));
          const salidaBase = await ConfiguracionsService.findConfiguracioByClauAndPropietat(this.horaSalida.clau,parseInt(dominiData.id));
          const natejaBase = await ConfiguracionsService.findConfiguracioByClauAndPropietat(this.PrecioLimpieza.clau,parseInt(dominiData.id));
          this.domini = dominiData;
          this.domini.nom = traduccionData.value;
          this.dominiName = configData;
          this.preuBase = preuBase;
          this.fumar = fumarBase;
          this.mascotas = mascotaBase;
          this.visitas = visitasBase;
          this.horaEntrada = entradaBase;
          this.horaSalida = salidaBase;
          this.PrecioLimpieza = natejaBase;
          this.domini.id= dominiData.id;
          this.domini.ciutat.label = dominiData.ciutat.nom;
          this.domini.ciutat.value = dominiData.ciutat.id;
          this.email = dominiData.userPropietat.email;
          this.dominiName.valor = configData.valor;
          this.domini.plantilla = dominiData.plantillaPropietat;
          this.domini.plantilla.label = dominiData.plantillaPropietat.nom;
          this.domini.plantilla.value = dominiData.plantillaPropietat.id;
          this.preuBase.valor = preuBase.valor;
          this.fumar.valor = fumarBase.valor === "true";
          this.mascotas.valor = mascotaBase.valor === "true";
          this.visitas.valor = visitasBase.valor === "true";
          this.horaEntrada.valor = entradaBase.valor;
          this.horaSalida.valor = salidaBase.valor;
          this.PrecioLimpieza.valor = natejaBase.valor;
        }
      } catch (error) {
        console.error('Error al obtener datos del domini:', error);
      }
    },
    async getUser(){
      try {
        console.log(this.email)
        this.user = await UserService.findUserByEmail(this.email);
        console.log(this.domini.user);
        console.log(this.user.id);
        this.domini.user_id = this.user.id;
        console.log("id del usuario "+this.domini.user_id);
      }catch (error){
        console.log("Error de obtener user: ",error)
      }
    },
    async listCiutats(){
      try {
        this.ciutats = await UserService.findAllCiutats();
      }catch (error){
        console.error('Error al obtener datos:',error)
      }
    },
    async listPlantillas(){
      try {
        this.plantillas = await PropietatService.findPlantillas();
      }catch (error){
        console.error('Error al obtener datos:',error)
      }
    },
    async crearDomini(){
      try {
        await this.getUser();
        if (this.user){
          const domini = {
            id: this.domini.id,
            nom: this.domini.nom,
            descripcio: this.domini.descripcio,
            localitzacio: this.domini.localitzacio,
            m2: this.domini.m2,
            usuari_id: this.domini.user_id,
            plantilla_id: this.domini.plantilla.value,
            ciutat_id: this.domini.ciutat.value,
            clau: this.dominiName.clau,
            valor: this.dominiName.valor,
            preuClau: this.preuBase.clau,
            preuValor: this.preuBase.valor,
            fumarClau: this.fumar.clau,
            fumarValor: this.fumar.valor,
            mascotasClau: this.mascotas.clau,
            mascotasValor: this.mascotas.valor,
            visitasClau: this.visitas.clau,
            visitasValor: this.visitas.valor,
            entradaClau: this.horaEntrada.clau,
            entradaValor: this.horaEntrada.valor,
            salidaClau: this.horaSalida.clau,
            salidaValor: this.horaSalida.valor,
            limpiezaClau: this.PrecioLimpieza.clau,
            limpiezaValor: this.PrecioLimpieza.valor
          }
          await PropietatService.create(domini);
          console.log("Domini creado");
          await this.$router.push({path: '/dominis'});
        }else {
          console.log("Usuario no encontrado");
        }
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
    opcionesPlantillas(){
      return this.plantillas.map(plantilla => ({label: plantilla.nom, value: plantilla.id}));
    }
  }
}
</script>

<style>
.icono-flecha {
  font-size: 24px;
}
</style>
