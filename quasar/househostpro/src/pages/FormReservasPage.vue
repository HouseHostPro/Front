<template>
  <div>
    <q-icon @click="volverPaginaAnterior" name="arrow_back" class="cursor-pointer icono-flecha" />
  </div>
  <div class="q-pa-xl text-center">
    <q-form
      @submit="crearReserva"
      class="q-gutter-md"
    >
      <div class="row q-col-gutter-x-md q-col-gutter-y-md">
        <div class="col-6">
          <q-input v-model="reserva.estat" label="Estado"></q-input>
        </div>
        <div class="col-6">
          <q-input v-model="reserva.persones" type="number" label="Personas"></q-input>
        </div>
      </div>
      <div class="row q-col-gutter-x-md q-col-gutter-y-md">
        <div class="col-6">
          <q-input v-model="email" type="email" @input="getUser" label="Email"></q-input>
        </div>
        <div class="col-6">
          <q-input v-model="nomPropietat" type="text" @input="getPropietat" label="Casa"></q-input>
        </div>
      </div>
      <div class="row q-col-gutter-x-md q-col-gutter-y-md">
        <div class="col-6">
          <q-input v-model="reserva.data_inici" type="date" label="Fecha Inicio"></q-input>
        </div>
        <div class="col-6">
          <q-input v-model="reserva.data_fi" type="date" label="Fecha Fin"></q-input>
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
import {ReservaService} from "src/service/ReservaService";
import {PropietatService} from "src/service/PropietatService";
import {TraduccionService} from "src/service/TraduccionService";

export default {
  name: "FormReservasPage",
  data(){
    return{
      reserva:{
        id: ref(undefined),
        estat: ref(''),
        persones: ref(''),
        usuari_id: ref(''),
        propietat_id: ref(''),
        data_inici: ref(''),
        data_fi: ref('')
      },
      email: ref(''),
      user: [],
      nomPropietat: ref(''),
      propietat: []
    }
  },
  async created() {
    await this.getReservaData();
  },
  methods:{
    async getReservaData() {
      try {
        const reservaId = this.$route.params.id;
        console.log(reservaId);
        if (reservaId) {
          const reservaData = await ReservaService.findReservesById(reservaId);
          this.reserva = reservaData;
          this.reserva.id= reservaData.id;
          this.reserva.persones = reservaData.persones;
          this.reserva.usuari_id = reservaData.userReserva.id;
          this.email = reservaData.userReserva.email;
          this.reserva.estat = reservaData.estat;
          this.reserva.data_inici = reservaData.data_inici;
          this.reserva.data_fi = reservaData.data_fi;
          this.reserva.propietat_id = reservaData.propietat.id;
          const traduccionData = await TraduccionService.findTraduccionByCode(reservaData.propietat.nom);
          this.nomPropietat = traduccionData.value;
        }
      } catch (error) {
        console.error('Error al obtener datos de la reserva:', error);
      }
    },
    async getUser(){
      try {
        this.user = await UserService.findUserByEmail(this.email);
        this.reserva.usuari_id = this.user.id;
      }catch (error){
        console.log("Error de obtener user: ",error)
      }
    },
    async getPropietat(){
      try {
        const propietatNom = await TraduccionService.findTraduccionByValue(this.nomPropietat);
        this.propietat = await PropietatService.findPropietatByNom(propietatNom.code);
        this.reserva.propietat_id = this.propietat.id;
      }catch (error){
        console.log("Error de obtener propiedad: ",error);
      }
    },
    async crearReserva(){
      try {
        await this.getUser();
        await this.getPropietat();
        if (this.user || this.propietat){
          const reserva = {
            id: this.reserva.id,
            estat: this.reserva.estat,
            persones: this.reserva.persones,
            usuari_id: this.reserva.usuari_id,
            propietat_id: this.reserva.propietat_id,
            data_inici: this.reserva.data_inici,
            data_fi: this.reserva.data_fi
          }
          console.log(reserva);
          await ReservaService.create(reserva);
          console.log("Usuario creado");
          await this.$router.push({path: '/reserves'});
        }else {
          console.log("propietat o usuario no encontrado");
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
  }
}
</script>

<style>
.icono-flecha {
  font-size: 24px;
}
</style>
