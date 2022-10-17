<template>
  <div>
    <progress-bar v-if="isLoading" />
    <action-notifier
      ref="ActionNotifier"
      :text="actionMessage"
      :color="actionMessageColor"
    />
    <v-form
      v-if="!isLoading"
      ref="form"
      v-model="valid"
      lazy-validation
      @submit.prevent=""
    >
      <v-container>
        <v-row>
          <v-col
            cols="12"
            sm="12"
          >
            <v-file-input
              v-model="image"
              accept=".csv"
              label="Archivo"
              :rules="[v => !!v || 'Este campo es requerido']"
              @change="handleImage"
            />
          </v-col>
        </v-row>
        <v-divider />
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary"
            @click="loadStudents"
          >
            Cargar al sistema
          </v-btn>
        </v-card-actions>
      </v-container>
    </v-form>
  </div>
</template>
<script>
  import ProgressBar from '../../app/ProgressBar'
  import LoadStudentsService from '../../../services/admin/load/LoadStudentsService'
  import ActionNotifier from '../../common/general/ActionNotifier'
  import { get } from 'vuex-pathify'
  export default {
    name: 'LoadStudentsForm',
    components: {
      ActionNotifier,
    },
    data () {
      return {
        isLoading: false,
        actionMessage: null,
        actionMessageColor: null,
        valid: false,
        image: '',
        form: {
          file: null,
        },
      }
    },
    computed: {
      ...get('user', [
        'data',
      ]),
    },
    methods: {
      handleImage (e) {
        const selectedImage = this.image
        this.createBase64Image(selectedImage)
      },
      createBase64Image (fileObject) {
        const reader = new FileReader()
        reader.onload = (e) => {
          this.form.file = e.target.result.split(',')[1]
        }
        reader.readAsDataURL(fileObject)
      },
      async loadStudents () {
        if (this.$refs.form.validate()) {
          this.isLoading = true
          await LoadStudentsService.post(this.form).then(
            (response) => {
              this.notify('Guardado correctamente', 'success')
              this.isLoading = false
            },
          ).catch(
            (response) => {
              this.notify('No se pudo guardar correctamente', 'error')
              this.isLoading = false
              return Promise.reject(response)
            },
          )
          this.isLoading = false
        }
      },
      notify (message, type) {
        this.actionMessage = message
        this.actionMessageColor = type
        this.$refs.ActionNotifier.snackbar = true
      },
    },
  }
</script>
