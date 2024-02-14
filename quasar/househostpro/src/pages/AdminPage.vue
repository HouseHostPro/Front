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
    <q-table
      flat bordered
      title="Usuarios"
      :rows="rows"
      :columns="columns"
      row-key="id"
      :selected-rows-label="getSelectedString"
      selection="multiple"
      v-model:selected="selected"
    >
      <template v-slot:body-cell-Accio="props">
        <q-td :props="props">
          <div>
            <q-btn @click="editarUsuario(props.row)" icon="edit" color="primary">
              Editar
            </q-btn>
            <q-btn @click="eliminarUsuario(props.row)" icon="delete" color="negative">
              Eliminar
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
        {name: 'Accio',align: 'center',label: 'Accio',field: 'Accio',sortable: true},
      ]
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
        window.location.reload();
      } catch (error) {
        console.error('Error al eliminar usuario:', error)
      }
    },
    async editarUsuario(row) {
      try {
        await UserService.update(row.id);
      } catch (error) {
        console.error('Error al editar usuario:', error)
      }
    },
    crearUsuario(){
      this.$router.push({path:'createuser'})
    },
    getSelectedString () {
      return this.selected?.length === 0 ? '' : `${this.selected.length} record${this.selected.length > 1 ? 's' : ''} selected of ${this.rows.length}`
    }
  }
})
</script>

<style scoped>

</style>
