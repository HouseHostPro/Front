<template>
  <div class="q-pa-md q-gutter-sm">
    <q-btn
      :key="`btn_size_sq_md`"
      color="primary"
      :label="`Nueva Reserva`"
      @click="crearReserva"
    />
  </div>
  <div class="q-pa-md">
    <q-input v-model="filter" placeholder="Buscar Reserva" dense outlined />
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
      <template v-slot:body-cell-userReserva="props">
        <q-td :props="props">
          <div v-if="props.row.userReserva">
            {{ props.row.userReserva.email }}
          </div>
        </q-td>
      </template>
      <template v-slot:body-cell-propietat="props">
        <q-td :props="props">
          <div v-if="props.row.propietat">
            {{ props.row.propietat.nom }}
          </div>
        </q-td>
      </template>
      <template v-slot:body-cell-Accio="props">
        <q-td :props="props">
          <div>
            <q-btn @click="editarReserva(props.row)" icon="edit" color="primary">
            </q-btn>
            <q-btn @click="eliminarReserva(props.row)" icon="delete" color="negative">
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
import {ReservaService} from "src/service/ReservaService";
import {date} from "quasar";
import {TraduccionService} from "src/service/TraduccionService";

export default {
  name: "ReservesPage",
  data(){
    return{
      selected: [],
      rows: [],
      columns: [
        {name: 'id',align: 'center',label: 'ID',field: 'id',sortable: true},
        {name: 'estat',align: 'center',label: 'Estat',field: 'estat',sortable: true},
        {name: 'preu_total',align: 'center',label: 'Preu',field: 'preu_total',sortable: true},
        {name: 'persones',align: 'center',label: 'Persones',field: 'persones',sortable: true},
        {name: 'userReserva',align: 'center',label: 'Cliente',field: 'userReserva',sortable: true},
        {name: 'propietat',align: 'center',label: 'Casa',field: 'propietat',sortable: true},
        {name: 'data_inici',align: 'center',label: 'Inicio',field: row => date.formatDate(row.data_inici,'DD-MM-YYYY'),sortable: true},
        {name: 'data_fi',align: 'center',label: 'Fi',field: row => date.formatDate(row.data_fi,'DD-MM-YYYY'),sortable: true},
        {name: 'Accio',align: 'center',label: 'Accio',field: 'Accio',sortable: true},
      ],
      filter: ''
    };
  },
  async created() {
    await this.datosReserves();
    await this.getSelectedString();
  },
  methods: {
    async datosReserves(){
      try {
        const dominiId = this.$route.params.id_propietat;
        const userId = this.$route.params.id_user;
        if (dominiId != null){
          const respuesta = await ReservaService.findReservesByPropietatId(dominiId);
          for (const row of respuesta) {
            const traduccion = await TraduccionService.findTraduccionByCode(row.propietat.nom);
            row.propietat.nom = traduccion.value;
          }

          this.rows = respuesta;
        }else if (userId != null){
          const respuesta = await ReservaService.findReservesByUserId(userId);
          for (const row of respuesta) {
            const traduccion = await TraduccionService.findTraduccionByCode(row.propietat.nom);
            row.propietat.nom = traduccion.value;
          }

          this.rows = respuesta;
        }else {
          const respuesta = await ReservaService.findAllReserves();
          for (const row of respuesta) {
            const traduccion = await TraduccionService.findTraduccionByCode(row.propietat.nom);
            row.propietat.nom = traduccion.value;
          }

          this.rows = respuesta;
        }
      }catch (error){
        console.error('Error al obtener las reserves:',error);
      }
    },
    async eliminarReserva(row) {
      try {
        await ReservaService.delete(row.id);
        const index = this.rows.findIndex(reserva => reserva.id === row.id);
        if (index !== -1){
          this.rows.splice(index,1);
        }
      } catch (error) {
        console.error('Error al eliminar reserva:', error);
        alert("Error al eliminar reserva.");
      }
    },
    async editarReserva(row) {
      this.$router.push({path:`/reserva/${row.id}`})
    },
    crearReserva(){
      this.$router.push({path:'/reserva'})
    },
    getSelectedString () {
      return this.selected?.length === 0 ? '' : `${this.selected.length} record${this.selected.length > 1 ? 's' : ''} selected of ${this.rows.length}`
    }
  },
  computed: {
    filteredRows() {
      let searchTerm = this.filter.toLowerCase();
      return this.rows.filter(reserva => {
        let searchDate = new Date(searchTerm);

        let startDate = new Date(reserva.data_inici);
        let endDate = new Date(reserva.data_fi);

        let idMatch = reserva.userReserva.id.toString().includes(searchTerm);
        let emailMatch = reserva.userReserva.email.toLowerCase().includes(searchTerm);
        let dateMatch = startDate.getTime() === searchDate.getTime() || endDate.getTime() === searchDate.getTime();

        return idMatch || emailMatch || dateMatch;
      });
    }
  }
}
</script>

<style scoped>

</style>
