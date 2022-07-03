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
            sm="12"
          >
            <boolean-select
              :default-selected="form.has_job"
              :readonly="!isEditing"
              :disabled="!isEditing"
              :label="'¿Trabajas?'"
              :rules="[v => v!== null || 'Este campo es requerido']"
              @SelectedItem="selectItem"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            sm="6"
          >
            <v-text-field
              v-model="form.company_name"
              label="Nombre de la compañia"
              outlined
              :rules="companyNameRules"
              :readonly="!isEditing"
              :disabled="!isEditing"
            />
          </v-col>
          <v-col
            cols="12"
            sm="6"
          >
            <v-text-field
              v-model="form.schedule"
              label="Horario"
              outlined
              :rules="scheduleRules"
              :readonly="!isEditing"
              :disabled="!isEditing"
            />
          </v-col>
        </v-row>
        <v-divider />
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
            @click="persist"
          >
            Guardar
          </v-btn>
        </v-card-actions>
      </v-container>
    </v-form>
  </div>
</template>
<script>
  import ProgressBar from '../../app/ProgressBar'
  import JobService from '../../../services/student/JobService'
  import BooleanSelect from '../../common/general/BooleanSelect'
  import ActionNotifier from '../../common/general/ActionNotifier'
  import { get } from 'vuex-pathify'
  export default {
    name: 'JobForm',
    components: {
      ActionNotifier,
      BooleanSelect,
    },
    props: {
      studentId: Number,
    },
    data () {
      return {
        isEditing: false,
        isLoading: true,
        hasRecord: null,
        actionMessage: null,
        actionMessageColor: null,
        form: {
          has_job: null,
          company_name: null,
          schedule: null,
        },
      }
    },
    computed: {
      currentUser () {
        return this.studentId ? this.studentId : this.data.roles[0]
      },
      ...get('user', [
        'data',
      ]),
      companyNameRules () {
        const rules = [v => !!v || 'Nombre de la compañia es requerida']
        return this.form.has_job ? rules : []
      },
      scheduleRules () {
        const rules = [v => !!v || 'Horario es requerida']
        return this.form.has_job ? rules : []
      },
    },
    created () {
      this.callMainService()
    },
    methods: {
      async callMainService () {
        await JobService.get(this.currentUser.id).then(
          (response) => {
            this.form.has_job = response.data.data.has_job
            this.form.company_name = response.data.data.company_name
            this.form.schedule = response.data.data.schedule
            this.hasRecord = true
          },
        ).catch(
          (response) => {
            this.notify('No se encontró información laboral', 'secondary')
            this.isLoading = false
            return Promise.reject(response)
          },
        )
        this.isLoading = false
      },
      async createJob () {
        await JobService.post(this.currentUser.id, this.form).then(
          (response) => {
            this.hasRecord = true
            this.notify('Guardado correctamente', 'success')
          },
        ).catch(
          (response) => {
            this.notify('No se pudo guardar correctamente', 'error')
            return Promise.reject(response)
          },
        )
        this.isLoading = false
        this.isEditing = false
      },
      async updateJob () {
        await JobService.put(this.currentUser.id, this.form).then(
          (response) => {
            this.notify('Actualizado correctamente', 'success')
            this.isEditing = false
          },
        ).catch(
          (response) => {
            this.notify('No se pudo guardar correctamente', 'error')
            return Promise.reject(response)
          },
        )
        this.isLoading = false
        this.isEditing = false
      },
      persist () {
        if (this.$refs.form.validate()) {
          this.isLoading = true
          if (!this.hasRecord) {
            this.createJob()
          } else {
            this.updateJob()
          }
        }
      },
      notify (message, type) {
        this.actionMessage = message
        this.actionMessageColor = type
        this.$refs.ActionNotifier.snackbar = true
      },
      selectItem (item) {
        this.form.has_job = item
        if (this.form.has_job === false) {
          this.form.company_name = null
          this.form.schedule = null
        }
      },
    },
  }
</script>
