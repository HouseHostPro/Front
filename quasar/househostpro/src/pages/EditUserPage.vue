<template>
  <div class="q-pa-md">
    <div class="q-gutter-y-md column" style="max-width: 300px">
      <q-toggle v-model="dense" label="Dense QInput" />

      <q-input filled v-model="text" :dense="dense" />

      <q-input filled v-model="text" label="Label (stacked)" stack-label :dense="dense" />

      <q-input filled v-model="text" label="Label" :dense="dense" />

      <q-input filled v-model="ph" label="Label" placeholder="Placeholder" hint="With placeholder" :dense="dense" />

      <q-input filled v-model="ph" placeholder="Placeholder" hint="With placeholder" :dense="dense" />

      <q-input filled square v-model="text" hint="With perfect square borders" :dense="dense" />

      <q-input filled v-model="text" :dense="dense">
        <template v-slot:prepend>
          <q-icon name="event" />
        </template>
      </q-input>

    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: "EditPage",
  data: {

  },
  async created(){
    const usersFetch = await fetch("http://localhost:8080/usuari/usuaribyid")
    const users = await usersFetch.json();
    this.rows = users;
  }
}
</script>

<style scoped>

</style>
