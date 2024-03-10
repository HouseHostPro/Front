<template>
  <div class="q-pa-md q-gutter-sm">
    <q-btn
      :key="`btn_size_sq_md`"
      color="primary"
      :label="`Nueva Propietat`"
      @click="crearPropietat"
    />
  </div>
  <div class="q-pa-md">
    <q-input v-model="filter" placeholder="Buscar Domini" dense outlined />
    <q-table
      flat bordered
      title="Dominis"
      :rows="filteredRows"
      :columns="columns"
      row-key="id"
      :selected-rows-label="getSelectedString"
      selection="multiple"
      v-model:selected="selected"
      :filter = "filter"
    >
      <template v-slot:body-cell-userPropietat="props">
        <q-td :props="props">
          <div v-if="props.row.userPropietat">
            {{ props.row.userPropietat.email }}
          </div>
        </q-td>
      </template>
      <template v-slot:body-cell-plantillaPropietat="props">
        <q-td :props="props">
          <div v-if="props.row.plantillaPropietat">
            {{ props.row.plantillaPropietat.nom }}
          </div>
        </q-td>
      </template>
      <template v-slot:body-cell-ciutat="props">
        <q-td :props="props">
          <div v-if="props.row.ciutat">
            {{ props.row.ciutat.nom }}
          </div>
        </q-td>
      </template>
      <template v-slot:body-cell-reservas="props">
        <q-td :props="props">
          <div>
            <q-btn @click="reservasDomini(props.row)" icon="search" color="primary">
            </q-btn>
          </div>
        </q-td>
      </template>
      <template v-slot:body-cell-configuracions="props">
        <q-td :props="props">
          <div>
            <q-btn @click="configuracionsDomini(props.row)" icon="search" color="primary">
            </q-btn>
          </div>
        </q-td>
      </template>
      <template v-slot:body-cell-serveis="props">
        <q-td :props="props">
          <div>
            <q-btn @click="serveiDomini(props.row)" icon="search" color="primary">
            </q-btn>
          </div>
        </q-td>
      </template>
      <template v-slot:body-cell-espais="props">
        <q-td :props="props">
          <div>
            <q-btn @click="espaiDomini(props.row)" icon="search" color="primary">
            </q-btn>
          </div>
        </q-td>
      </template>
      <template v-slot:body-cell-preuTemporada="props">
        <q-td :props="props">
          <div>
            <q-btn @click="preuTemporadaDomini(props.row)" icon="search" color="primary">
            </q-btn>
          </div>
        </q-td>
      </template>
      <template v-slot:body-cell-Accio="props">
        <q-td :props="props">
          <div>
            <q-btn @click="editarDomini(props.row)" icon="edit" color="primary">
            </q-btn>
            <q-btn @click="eliminarDomini(props.row)" icon="delete" color="negative">
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
import {PropietatService} from "src/service/PropietatService";
import {TraduccionService} from "src/service/TraduccionService";

export default {
  name: "DominisPage",
  data(){
    return{
      selected: [],
      rows: [],
      columns: [
        {name: 'id',align: 'center',label: 'ID',field: 'id',sortable: true},
        {name: 'nom',align: 'center',label: 'Nom',field: 'nom',sortable: true},
        {name: 'userPropietat',align: 'center',label: 'Propietari',field: 'userPropietat',sortable: true},
        {name: 'ciutat',align: 'center',label: 'Ciutat',field: 'ciutat',sortable: true},
        {name: 'plantillaPropietat',align: 'center',label: 'Plantilla',field: 'plantillaPropietat',sortable: true},
        {name: 'configuracions',align: 'center',label: 'Configuracions',field: 'configuracions',sortable: true},
        {name: 'serveis',align: 'center',label: 'Serveis',field: 'serveis',sortable: true},
        {name: 'espais',align: 'center',label: 'Espais',field: 'espais',sortable: true},
        {name: 'preuTemporada',align: 'center',label: 'Preu Temporadas',field: 'preuTemporada',sortable: true},
        {name: 'reservas',align: 'center',label: 'Reservas',field: 'reservas',sortable: true},
        {name: 'Accio',align: 'center',label: 'Accio',field: 'Accio',sortable: true}
      ],
      filter: '',
    };
  },
  async created() {
    await this.datosPropietats();
    await this.getSelectedString();
  },
  methods: {
    async datosPropietats() {
      try {
        const respuesta = await PropietatService.findAllPropietats();
        this.rows = await respuesta;
        await Promise.all(respuesta.map(async (row)=>{
          const traduccion = await TraduccionService.findTraduccionByCode(row.nom);
          row.nom = traduccion.value
        }));
        console.log(this.rows);
      } catch (error) {
        console.error('Error al obtener las propietats:', error);
      }
    },
    async eliminarDomini(row) {
      try {
        await PropietatService.delete(row.id);
        const index = this.rows.findIndex(domini => domini.id === row.id);
        if (index !== -1) {
          this.rows.splice(index, 1);
        }
      } catch (error) {
        console.error('Error al eliminar domini:', error);
        alert("Error al eliminar domini.");
      }
    },
    async editarDomini(row) {
      this.$router.push({path: `/domini/${row.id}`})
    },
    crearPropietat() {
      this.$router.push({path: '/domini'})
    },
    reservasDomini(row) {
      this.$router.push({path: `reserves/${row.id}`})
    },
    configuracionsDomini(row) {
      this.$router.push({path: `configuracions/${row.id}`})
    },
    preuTemporadaDomini(row) {
      this.$router.push({path: `preutemporadas/${row.id}`})
    },
    serveiDomini(row) {
      this.$router.push({path: `serveis/${row.id}`})
    },
    espaiDomini(row) {
      this.$router.push({path: `espais/${row.id}`})
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
          row.nom.toLowerCase().includes(searchTerm) ||
          row.userPropietat.email.toLowerCase().includes(searchTerm)
        );
      });
    }
  }
}
</script>

<style scoped>

</style>
