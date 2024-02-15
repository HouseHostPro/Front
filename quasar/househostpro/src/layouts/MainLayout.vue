<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          House Host Pro
        </q-toolbar-title>

      </q-toolbar>
    </q-header>
    <q-drawer show-if-above v-model="drawerModel" :width="drawerWidth">
      <q-list>
        <q-item v-for="link in links" :key="link.path" clickable @click="irALink(link.path)">
          <q-item-section>
            <q-item-label>{{ link.text }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import {defineComponent} from "vue";

export default defineComponent({
  name: 'MainLayout',
  data(){
    return {
      drawerModel: true,
      drawerWidth: 200,
      links: [
        { path: '/perfil', text: 'Perfil' },
        { path: '/usuaris', text: 'Usuaris' },
        { path: '/reserves', text: 'Página 2' },
        {}
      ]
    }
  }
})
</script>
