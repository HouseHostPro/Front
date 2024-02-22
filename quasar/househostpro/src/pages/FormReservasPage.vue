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
          <q-input v-if="isNewUser" v-model="contrasenya" type="password" label="Contrasenya"></q-input>
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
import {ref} from "vue";

export default {
  name: "FormReservasPage",
  data(){
    return{
      reserva:{
        id: ref(undefined),
        preu_total: ref(''),
        estat: ref(''),
        persones: ref(''),

      }
    }
  }
}
</script>

<style scoped>

</style>
