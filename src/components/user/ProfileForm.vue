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
      lazy-validation
    >
      <v-container>
        <v-row>
          <v-col
            cols="12"
            sm="3"
          >
            <v-text-field
              v-model="form.first_name"
              label="Nombre"
              outlined
              :readonly="!isEditing"
              :disabled="!isEditing"
            ></v-text-field>
          </v-col>

          <v-col
            cols="12"
            sm="3"
          >
            <v-text-field
              v-model="form.second_name"
              label="Segundo nombre"
              outlined
              :readonly="!isEditing"
              :disabled="!isEditing"
            ></v-text-field>
          </v-col>

          <v-col
            cols="12"
            sm="3"
          >
            <v-text-field
              v-model="form.last_name"
              label="Apellido paterno"
              outlined
              :readonly="!isEditing"
              :disabled="!isEditing"
            ></v-text-field>
          </v-col>

          <v-col
            cols="12"
            sm="3"
          >
            <v-text-field
              v-model="form.second_last_name"
              label="Apellido materno"
              outlined
              :readonly="!isEditing"
              :disabled="!isEditing"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            sm="12"
          >
            <v-text-field
              v-model="form.email"
              label="Correo electrónico"
              outlined
              :readonly="!isEditing"
              :disabled="!isEditing"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer />
          <v-btn
            v-if="!isEditing"
            color="primary"
            @click="isEditing = !isEditing"
          >
            Editar
          </v-btn>
          <v-btn
            v-if="isEditing"
            color="secondary"
            @click="isEditing = !isEditing"
          >
            Cancelar
          </v-btn>
          <v-btn
            :disabled="!isEditing"
            color="success"
            @click="updateProfile"
          >
            Guardar
          </v-btn>
        </v-card-actions>
      </v-container>
    </v-form>
  </div>
</template>

<script>
  import ActionNotifier from '../common/general/ActionNotifier'
  import ProfileService from '../../services/student/ProfileService'
  import ProgressBar from '../app/ProgressBar'
  import { get } from 'vuex-pathify'

  export default {
    name: 'ProfileForm',
    props: {
      userId: Number,
    },
    data: () => ({
      tabs: null,
      isEditing: false,
      actionMessage: null,
      actionMessageColor: null,
      isLoading: true,
      form: {
        first_name: '',
        second_name: '',
        last_name: '',
        second_last_name: '',
        email: '',
      },
    }),
    computed: {
      currentUser () {
        return this.userId ? this.userId : this.data.userId
      },
      ...get('user', [
        'data',
      ]),
    },
    created () {
      ProfileService.get(this.currentUser).then(
        (response) => {
          this.form.first_name = response.data.data.first_name
          this.form.second_name = response.data.data.second_name
          this.form.last_name = response.data.data.last_name
          this.form.second_last_name = response.data.data.second_last_name
          this.form.email = response.data.data.email
        },
      ).catch(
        (response) => {
          return Promise.reject(response)
        },
      )
      this.isLoading = false
    },
    methods: {
      updateProfile () {
        if (this.$refs.form.validate()) {
          this.isLoading = true
          ProfileService.put(this.currentUser, this.form).then(
            (response) => {
              this.data.fullName = `${this.form.first_name || ''} ${this.form.second_name || ''} ${this.form.last_name || ''} ${this.form.second_last_name || ''}`
              this.notify('Guardado correctamente', 'success')
              this.isEditing = false
              this.isLoading = false
            },
          ).catch(
            (response) => {
              this.isLoading = false
              this.notify('No se pudo guardar correctamente', 'error')
              return Promise.reject(response)
            },
          )
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
