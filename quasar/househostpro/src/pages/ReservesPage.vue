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
    <q-table
      flat bordered
      title="Reservas"
      :rows="rows"
      :columns="columns"
      row-key="id"
      :selected-rows-label="getSelectedString"
      selection="multiple"
      v-model:selected="selected"
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
            <q-btn @click="editarUsuario(props.row)" icon="edit" color="primary">
            </q-btn>
            <q-btn @click="eliminarUsuario(props.row)" icon="delete" color="negative">
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
        {name: 'data_inici',align: 'center',label: 'Inicio',field: 'data_inici',sortable: true},
        {name: 'data_fi',align: 'center',label: 'Fi',field: 'data_fi',sortable: true},
        {name: 'Accio',align: 'center',label: 'Accio',field: 'Accio',sortable: true},
      ]
    };
  },
  async created() {
    await this.datosReserves();
    await this.getSelectedString();
  },
  methods: {
    async datosReserves(){
      try {
        const respuesta = await ReservaService.findAllReserves();
        this.rows =await respuesta;
        console.log(this.rows);
      }catch (error){
        console.error('Error al obtener las reserves:',error);
      }
    },
    async eliminarUsuario(row) {
      try {
        await UserService.delete(row.id);
        const index = this.rows.findIndex(user => user.id === row.id);
        if (index !== -1){
          this.rows.splice(index,1);
        }
      } catch (error) {
        console.error('Error al eliminar usuario:', error);
        alert("Error al eliminar usuario.");
      }
    },
    async editarUsuario(row) {
      this.$router.push({path:`user/${row.id}`})
    },
    crearUsuario(){
      this.$router.push({path:'user'})
    },
    getSelectedString () {
      return this.selected?.length === 0 ? '' : `${this.selected.length} record${this.selected.length > 1 ? 's' : ''} selected of ${this.rows.length}`
    }
  }
}
</script>

<style scoped>

</style>