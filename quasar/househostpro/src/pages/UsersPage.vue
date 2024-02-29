<template>
  <div class="q-pa-md q-gutter-sm">
    <q-btn
      :key="`btn_size_sq_md`"
      color="primary"
      :label="`Nuevo usuario`"
      @click="crearUsuario"
    />
  </div>
  <div class="q-pa-md">
    <q-input v-model="filter" placeholder="Buscar usuario" dense outlined />
    <q-table
      flat bordered
      title="Usuarios"
      :rows="filteredRows"
      :columns="columns"
      row-key="id"
      :selected-rows-label="getSelectedString"
      selection="multiple"
      v-model:selected="selected"
      :filter = "filter"
    >
      <template v-slot:body-cell-roles="props">
        <q-td :props="props">
          <div v-if="props.row.roles && props.row.roles.length">
            {{ props.row.roles.map(role => role.nom).join(', ') }}
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
      <template v-slot:body-cell-reservas="props">
        <q-td :props="props">
          <div>
            <q-btn @click="reservasUser(props.row)" icon="search" color="primary">
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
import {defineComponent} from "vue"
import {UserService} from "src/service/UserService.js";

export default defineComponent({
  name: "AdminPage",
  data(){
    return{
      selected: [],
      rows: [],
      columns: [
        {name: 'id',align: 'center',label: 'ID',field: 'id',sortable: true},
        {name: 'nom',align: 'center',label: 'Nom',field: 'nom',sortable: true},
        {name: 'cognom1',align: 'center',label: 'Primer Cognom',field: 'cognom1',sortable: true},
        {name: 'email',align: 'center',label: 'Correu',field: 'email',sortable: true},
        {name: 'roles',align: 'center',label: 'Rols',field: 'roles',sortable: true},
        {name: 'reservas',align: 'center',label: 'Reservas',field: 'roles',sortable: true},
        {name: 'Accio',align: 'center',label: 'Accio',field: 'Accio',sortable: true},
      ],
      filter: ''
    };
  },
  async created() {
    await this.datosUsuarios();
    await this.getSelectedString();
  },
  methods: {
    async datosUsuarios(){
      try {
        const respuesta = await UserService.findAllUsers();
        this.rows =await respuesta;
        console.log(this.rows);
      }catch (error){
        console.error('Error al obtener datos:',error);
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
    reservasUser(row){
      this.$router.push({path: `reserves/${row.id}`})
    },
    getSelectedString() {
      return this.selected?.length === 0 ? '' : `${this.selected.length} record${this.selected.length > 1 ? 's' : ''} selected of ${this.rows.length}`
    }
  },
  computed: {
    filteredRows() {
      const searchTerm = this.filter.toLowerCase();
      return this.rows.filter(row => {
        const userFields = [row.nom, row.cognom1, row.email].some(field => {
          return field.toLowerCase().includes(searchTerm);
        });
        const rolesFound = row.roles && row.roles.some(role => {
          return role.nom.toLowerCase().includes(searchTerm);
        });
        return userFields || rolesFound;
      });
    }
  }
})
</script>

<style scoped>

</style>
