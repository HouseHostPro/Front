<template>
  <div>
    <q-icon @click="volverPaginaAnterior" name="arrow_back" class="cursor-pointer icono-flecha" />
  </div>
</template>

<script>
export default {
  name: "FormConfiguracioPage",
  methods:{
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
