<template>
  <div class="q-pa-md q-gutter-sm">
    <q-btn
      :key="`btn_size_sq_md`"
      color="primary"
      :label="`Nuevo Servei`"
      @click="crearServei"
    />
  </div>
  <div class="q-pa-md">
    <q-input v-model="filter" placeholder="Buscar Servei" dense outlined />
    <q-table
      flat bordered
      title="Preu Temporada"
      :rows="filteredRows"
      :columns="columns"
      row-key="id"
      :selected-rows-label="getSelectedString"
      selection="multiple"
      v-model:selected="selected"
      :filter = "filter"
    >
      <template v-slot:body-cell-Accio="props">
        <q-td :props="props">
          <div>
            <q-btn @click="editarServei(props.row)" icon="edit" color="primary">
            </q-btn>
            <q-btn @click="eliminarServei(props.row)" icon="delete" color="negative">
            </q-btn>
          </div>
        </q-td>
      </template>
    </q-table>
    <div class="q-mt-md">
      Selected: {{ JSON.stringify(selected) }}
    </div>
  </div>
</template>

<script>

import {ServeiService} from "src/service/ServeiService";
import {ConfiguracionsService} from "src/service/ConfiguracionsService";

export default {
  name: "ServeiPage",
  data(){
    return{
      selected: [],
      rows: [],
      columns: [
        {name: 'id',align: 'center',label: 'ID',field: 'id',sortable: true},
        {name: 'nom',align: 'center',label: 'Nom',field: 'nom',sortable: true},
        {name: 'descripcio',align: 'center',label: 'Descripcio',field: 'descripcio',sortable: true},
        {name: 'Accio',align: 'center',label: 'Accio',field: 'Accio',sortable: true},
      ],
      filter: ''
    };
  },
  async created() {
    await this.datosServei();
    await this.getSelectedString();
  },
  methods: {
    async datosServei(){
      try {
        const propietatId = this.$route.params.id_propietat;
        if (propietatId != null){
          const respuesta = await ServeiService.findServeisBypropietatId(propietatId);
          this.rows = await respuesta;
        }else{
          const repuesta = await ServeiService.findAllServeis();
          this.rows = await repuesta;
        }
        console.log(this.rows);
      }catch (error){
        console.error('Error al obtener serveis:',error);
      }
    },
    async eliminarServei(row) {
      try {
        await ServeiService.delete(row.id);
        const index = this.rows.findIndex(servei => servei.id === row.id);
        if (index !== -1){
          this.rows.splice(index,1);
        }
      } catch (error) {
        console.error('Error al eliminar el servei:', error);
        alert("Error al eliminar servei.");
      }
    },
    async editarServei(row) {
      this.$router.push({path:`/servei/${row.id}`})
    },
    crearServei(){
      this.$router.push({path:'/servei'})
    },
    getSelectedString () {
      return this.selected?.length === 0 ? '' : `${this.selected.length} record${this.selected.length > 1 ? 's' : ''} selected of ${this.rows.length}`
    }
  },
  computed: {
    filteredRows() {
      let searchTerm = this.filter.toLowerCase();
      return this.rows.filter(servei => {
        return servei.id.toString().toLowerCase().includes(searchTerm);
      });
    }
  }
}
</script>

<style scoped>

</style>
