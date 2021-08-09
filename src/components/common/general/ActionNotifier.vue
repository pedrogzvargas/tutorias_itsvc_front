<template>
  <v-snackbar
    v-model="snackbar"
    :timeout="timeout"
    :color="color"
    :top="true"
  >
    {{ text }}

    <template v-slot:action="{ attrs }">
      <v-btn
        color="black"
        text
        v-bind="attrs"
        @click="snackbar = false"
      >
        Cerrar
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
  export default {
    name: 'ActionNotifier',
    props: {
      text: String,
      color: String,
    },
    data () {
      return {
        snackbar: false,
        timeout: 3000,
      }
    },
  }
</script>

<style scoped>

</style>
