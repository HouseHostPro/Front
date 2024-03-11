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
          <q-item-label
            header
          >
            Panel de control
          </q-item-label>
          <q-item v-for="link in links"
                  :key="link.path"
                  clickable @click="irALink(link.path)"
          >
            <q-item-section>
              <q-item-label class="text-center">{{ link.text }}</q-item-label>
            </q-item-section>
            <q-item-section side top>
              <q-icon :name="link.icon" />
            </q-item-section>
          </q-item>
          <div class="text-center">
            <q-btn
              flat
              dense
              round
              aria-label="Logout"
              @click="logout"
              label="Cerrar Sesion"
              class="q-pr-sm"
            ><q-icon name="exit_to_app" class="q-ml-sm" /></q-btn>
          </div>
        </q-list>
      </q-drawer>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import {defineComponent} from "vue";
import {UserService} from "src/service/UserService";

export default defineComponent({
  name: 'MainLayout',
  data(){
    return {
      drawerModel: true,
      drawerWidth: 200,
      links: [
        { path: '/users', text: 'Usuaris',icon: 'people' },
        { path: '/reserves', text: 'Reserves',icon: 'event'},
        { path: '/dominis', text: 'Propietats',icon: 'home'},
        { path: '/configuracions', text: 'Configuracions',icon: 'settings'},
        { path: '/serveis', text: 'Serveis',icon: 'build'},
        { path: '/espais', text: 'Espais',icon: 'place'}
      ]
    }
  },
  methods: {
    irALink(path) {
      this.$router.push(path);
    },
    toggleLeftDrawer () {
      this.drawerModel = !this.drawerModel
    },
    logout() {

      localStorage.removeItem('token');

      this.$router.push('/login');
    }
  }
})
</script>
