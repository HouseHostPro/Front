<template>
  <div class="q-pa-md q-gutter-sm">
    <q-btn
      :key="`btn_size_sq_md`"
      color="primary"
      :label="`Nueva Configuracion`"
      @click="crearConfiguracio"
    />
  </div>
  <div class="q-pa-md">
    <q-input v-model="filter" placeholder="Buscar Configuracio" dense outlined />
    <q-table
      flat bordered
      title="Reservas"
      :rows="filteredRows"
      :columns="columns"
      row-key="id"
      :selected-rows-label="getSelectedString"
      selection="multiple"
      v-model:selected="selected"
      :filter = "filter"
    >
      <template v-slot:body-cell-propietatConfiguracio="props">
        <q-td :props="props">
          <div>
            {{ props.row.propietatConfiguracio.nom }}
          </div>
        </q-td>
      </template>
      <template v-slot:body-cell-Accio="props">
        <q-td :props="props">
          <div>
            <q-btn @click="editarConfiguracio(props.row)" icon="edit" color="primary">
            </q-btn>
            <q-btn @click="eliminarConfiguracio(props.row)" icon="delete" color="negative">
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
import {ConfiguracionsService} from "src/service/ConfiguracionsService";
import {ReservaService} from "src/service/ReservaService";

export default {
  name: "ConfiguracioPage",
  data(){
    return{
      selected: [],
      rows: [],
      columns: [
        {name: 'id',align: 'center',label: 'ID',field: 'id',sortable: true},
        {name: 'propietatConfiguracio',align: 'center',label: 'Casa',field: 'propietatConfiguracio',sortable: true},
        {name: 'clau',align: 'center',label: 'Tipo',field: 'clau',sortable: true},
        {name: 'valor',align: 'center',label: 'Configuracio',field: (row)=>(row.valor==='true')?'si':(row.valor==='false')?'no':row.valor,sortable: true },
        {name: 'Accio',align: 'center',label: 'Accio',field: 'Accio',sortable: true},
      ],
      filter: '',
    };
  },
  async created() {
    await this.datosConfiguracions();
    await this.getSelectedString();
  },
  methods: {
    async datosConfiguracions() {
      try {
        const dominiId = this.$route.params.id_propietat;
        console.log(dominiId);
        if (dominiId != null){
          const respuesta = await ConfiguracionsService.findConfiguracionsByPropietat(dominiId);
          this.rows = await respuesta;
        }else{
          const repuesta = await ConfiguracionsService.findAllConfiguracions();
          this.rows = await repuesta;
        }

        console.log(this.rows);
      } catch (error) {
        console.error('Error al obtener las configuracions:', error);
      }
    },
    async eliminarConfiguracio(row) {
      try {
        await ConfiguracionsService.delete(row.id);
        const index = this.rows.findIndex(config => config.id === row.id);
        if (index !== -1) {
          this.rows.splice(index, 1);
        }
      } catch (error) {
        console.error('Error al eliminar la configuracion:', error);
        alert("Error al eliminar la configuracion.");
      }
    },
    async editarConfiguracio(row) {
      this.$router.push({path: `configuracio/${row.id}`})
    },
    crearConfiguracio() {
      this.$router.push({path: 'configuracio'})
    },
    getSelectedString() {
      return this.selected?.length === 0 ? '' : `${this.selected.length} record${this.selected.length > 1 ? 's' : ''} selected of ${this.rows.length}`
    },
  },
  computed: {
    filteredRows() {
      return this.rows.filter(row => {
        const searchTerm = this.filter.toLowerCase();
        return (
          row.clau.toLowerCase().includes(searchTerm) ||
          row.propietatConfiguracio.nom.toLowerCase().includes(searchTerm) ||
          row.valor.toLowerCase().includes(searchTerm)
        );
      });
    }
  }
}
</script>


<style scoped>

</style>
<script setup>
</script>
