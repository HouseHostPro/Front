<template>
  <div class="q-pa-md q-gutter-sm">
    <q-btn
      :key="`btn_size_sq_md`"
      color="primary"
      :label="`Nuevo usuario`"
    />
  </div>
  <div class="q-pa-md">
    <q-table
      flat bordered
      title="Usuarios"
      :rows="rows"
      :columns="columns"
      row-key="id"
      :selected-rows-label="getSelectedString"
      selection="multiple"
      v-model:selected="selected"
    />

  </div>

</template>

<script>
import {defineComponent} from "vue"



export default defineComponent({
  name: "AdminPage",
  data(){
    return{
      rows: [],
      columns: [
        {name: 'id',align: 'center',label: 'ID',field: 'id',sortable: true},
        {name: 'nom',align: 'center',label: 'Nom',field: 'nom',sortable: true},
        {name: 'cognom1',align: 'center',label: 'Primer Cognom',field: 'cognom1',sortable: true},
        {name: 'email',align: 'center',label: 'Correu',field: 'email',sortable: true},
        {name: 'Accio',align: 'center',label: 'Accio',field: 'Accio',sortable: true},
      ]
    };
  },
  created() {
    this.datosUsuarios();
  },
  methods: {
    async datosUsuarios(){
      try {
        const respuesta = await fetch("http://localhost:8080/usuari/usuaris");
        this.rows =await respuesta.json();
        console.log(this.rows);
      }catch (error){
        console.error('Error al obtener datos:',error);
      }
    }
  }
})
</script>

<style scoped>

</style>
