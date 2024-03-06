<template>
  <div class="q-pa-md q-gutter-sm">
    <q-btn
      :key="`btn_size_sq_md`"
      color="primary"
      :label="`Nuevo Precio Temporada`"
      @click="crearPreuTemporada"
    />
  </div>
  <div class="q-pa-md">
    <q-input v-model="filter" placeholder="Buscar Preu Temporada" dense outlined />
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
      <template v-slot:body-cell-propietatPreuTemporada="props">
        <q-td :props="props">
          <div v-if="props.row.propietatPreuTemporada">
            {{ props.row.propietatPreuTemporada.nom }}
          </div>
        </q-td>
      </template>
      <template v-slot:body-cell-Accio="props">
        <q-td :props="props">
          <div>
            <q-btn @click="editarPreuTemporada(props.row)" icon="edit" color="primary">
            </q-btn>
            <q-btn @click="eliminarPreuTemporada(props.row)" icon="delete" color="negative">
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

import {PreuTemporadaService} from "src/service/PreuTemporadaService";

export default {
  name: "PreuTemporadaPage",
  data(){
    return{
      selected: [],
      rows: [],
      columns: [
        {name: 'id',align: 'center',label: 'ID',field: 'id',sortable: true},
        {name: 'preu',align: 'center',label: 'Preu',field: 'preu',sortable: true},
        {name: 'propietatPreuTemporada',align: 'center',label: 'Casa',field: 'propietatPreuTemporada',sortable: true},
        {name: 'dataInici',align: 'center',label: 'Inicio',field: 'dataInici',sortable: true},
        {name: 'dataFi',align: 'center',label: 'Fi',field: 'dataFi',sortable: true},
        {name: 'Accio',align: 'center',label: 'Accio',field: 'Accio',sortable: true},
      ],
      filter: ''
    };
  },
  async created() {
    await this.datosPreuTemporada();
    await this.getSelectedString();
  },
  methods: {
    async datosPreuTemporada(){
      try {
        const dominiId = this.$route.params.id_propietat;
        const respuesta = await PreuTemporadaService.findPreuTemporadaBypropietatId(dominiId);
        this.rows =await respuesta;
        console.log(this.rows);
      }catch (error){
        console.error('Error al obtener el preu temporada:',error);
      }
    },
    async eliminarPreuTemporada(row) {
      try {
        await PreuTemporadaService.delete(row.id);
        const index = this.rows.findIndex(preuTemporada => preuTemporada.id === row.id);
        if (index !== -1){
          this.rows.splice(index,1);
        }
      } catch (error) {
        console.error('Error al eliminar preu temporada:', error);
        alert("Error al eliminar preu temporada.");
      }
    },
    async editarPreuTemporada(row) {
      this.$router.push({path:`/preutemporada/${row.id}`})
    },
    crearPreuTemporada(){
      this.$router.push({path:'/preutemporada'})
    },
    getSelectedString () {
      return this.selected?.length === 0 ? '' : `${this.selected.length} record${this.selected.length > 1 ? 's' : ''} selected of ${this.rows.length}`
    }
  },
  computed: {
    filteredRows() {
      let searchTerm = this.filter.toLowerCase();
      return this.rows.filter(preuTemporada => {
        let searchDate = new Date(searchTerm);

        let startDate = new Date(preuTemporada.dataInici);
        let endDate = new Date(preuTemporada.dataFi);

        let idMatch = preuTemporada.id.toString().includes(searchTerm);
        let dateMatch = searchDate >= startDate && searchDate <= endDate;
        return idMatch || dateMatch;
      });
    }
  }
}
</script>

<style scoped>

</style>
