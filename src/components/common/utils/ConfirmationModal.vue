<template>
  <v-dialog
    v-model="dialog"
    max-width="500"
  >
    <v-card>
      <v-card-title class="text-h5">
        {{ this.message }}
      </v-card-title>

      <v-card-actions>
        <v-spacer />

        <v-btn
          color="secondary"
          @click="rejection"
        >
          Cancelar
        </v-btn>

        <v-btn
          color="primary"
          @click="agree"
        >
          Aceptar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    name: 'ConfirmationModal',
    props: {
      message: String,
    },
    data () {
      return {
        dialog: false,
      }
    },
    methods: {
      agree () {
        this.dialog = false
        this.$emit('agree')
      },
      rejection () {
        this.dialog = false
        this.$emit('rejection')
      },
    },
  }
</script>

<style scoped>

</style>
