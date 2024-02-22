<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
          v-if="$route.meta.showSomePart"
        />
        <q-toolbar-title>
          House Host Pro
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-drawer show-if-above v-model="drawerModel" :width="drawerWidth" v-if="$route.meta.showSomePart">
        <q-list class="q-ma-auto">
          <q-item v-for="link in links"
                  :key="link.path"
                  clickable @click="irALink(link.path)"
          >
            <q-item-section>
              <q-item-label class="text-center">{{ link.text }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-drawer>
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
        { path: '/users', text: 'Usuaris' },
        { path: '/reserves', text: 'Reserves' },
        { path: '/dominis', text: 'Propietats'}
      ]
    }
  },
  methods: {
    irALink(path) {
      this.$router.push(path);
    },
    toggleLeftDrawer () {
      this.drawerModel = !this.drawerModel
    }
  }
})
</script>
