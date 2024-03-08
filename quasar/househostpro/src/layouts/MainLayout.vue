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
          </q-item>
          <q-btn
            flat
            dense
            round
            icon="exit_to_app"
            aria-label="Logout"
            @click="logout"
            label="Cerrar Sesion"
          />
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
        { path: '/users', text: 'Usuaris' },
        { path: '/reserves', text: 'Reserves'},
        { path: '/dominis', text: 'Propietats'},
        { path: '/configuracions', text: 'Configuracions'},
        { path: '/serveis', text: 'Serveis'},
        { path: '/espais', text: 'Espais'}
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

      this.$store.commit('clearUserData');
    }
  }
})
</script>
