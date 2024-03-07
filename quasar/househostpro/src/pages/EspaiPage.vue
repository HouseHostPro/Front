<template>
  <div class="q-pa-md q-gutter-sm">
    <q-btn
      :key="`btn_size_sq_md`"
      color="primary"
      :label="`Nuevo Espai`"
      @click="crearEspai"
    />
  </div>
  <div class="q-pa-md q-gutter-sm">
    <q-btn
      :key="`btn_size_sq_md`"
      color="primary"
      :label="`Nuevo Espai Defecte`"
      @click="crearEspaiDefecte"
    />
  </div>
  <div class="q-pa-md">
    <q-input v-model="filter" placeholder="Buscar Configuracio" dense outlined />
    <q-table
      flat bordered
      title="Espais"
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
            <q-btn @click="editarEspai(props.row)" icon="edit" color="primary">
            </q-btn>
            <q-btn @click="eliminarEspai(props.row)" icon="delete" color="negative">
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
import {EspaiService} from "src/service/EspaiService";

export default {
  name: "EspaiPage",
  data(){
    return{
      selected: [],
      rows: [],
      columns: [
        {name: 'id',align: 'center',label: 'ID',field: 'id',sortable: true},
        {name: 'tipus',align: 'center',label: 'Tipo',field: 'tipus',sortable: true},
        {name: 'Accio',align: 'center',label: 'Accio',field: 'Accio',sortable: true}
      ],
      filter: '',
    };
  },
  async created() {
    await this.datosEspai();
    await this.getSelectedString();
  },
  methods: {
    async datosEspai() {
      try {
        const dominiId = this.$route.params.id_propietat;
        console.log(dominiId);
        if (dominiId != null){
          const respuesta = await EspaiService.findEspaisByPropietat(dominiId);
          if (respuesta) {
            this.rows = respuesta.map(item => {
              return item.espaisDefecte;
            });
          }
          this.rows =await respuesta.espaisDefecte;
        }else{
          const respuesta = await EspaiService.findAllEspaisDefecte();
          this.rows =await respuesta;
        }
        console.log(this.rows);
      } catch (error) {
        console.error('Error al obtener los espais:', error);
      }
    },
    async eliminarEspai(row) {
      try {
        await EspaiService.delete(row.id);
        const index = this.rows.findIndex(config => config.id === row.id);
        if (index !== -1) {
          this.rows.splice(index, 1);
        }
      } catch (error) {
        console.error('Error al eliminar el espai:', error);
        alert("Error al eliminar el espai.");
      }
    },
    async editarEspai(row) {
      this.$router.push({path: `/espai/${row.id}`})
    },
    crearEspai() {
      this.$router.push({path: '/espai'})
    },
    crearEspaiDefecte() {
      this.$router.push({path: '/espaidefecte'})
    },
    getSelectedString() {
      return this.selected?.length === 0 ? '' : `${this.selected.length} record${this.selected.length > 1 ? 's' : ''} selected of ${this.rows.length}`
    },
  },
  computed: {
    filteredRows() {
      return this.rows.filter(row => {
        const searchTerm = this.filter.toLowerCase();
        return Object.values(row).some(value => {
          return String(value).toLowerCase().includes(searchTerm);
        });
      });
    }
  }
}
</script>



<style scoped>

</style>
