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
              :default-selected="form.has_scholarship"
              :readonly="!isEditing"
              :disabled="!isEditing"
              :label="'¿Has estado becado?'"
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
              v-model="form.institute_name"
              label="Nombre de la institución"
              outlined
              :rules="institutionRules"
              :readonly="!isEditing"
              :disabled="!isEditing"
            />
          </v-col>
          <v-col
            cols="12"
            sm="6"
          >
            <v-text-field
              v-model="form.dependence_name"
              label="Nombre de la dependencia"
              outlined
              :rules="dependenceRules"
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
  import { get } from 'vuex-pathify'
  import BooleanSelect from '../../common/general/BooleanSelect'
  import ScholarshipService from '../../../services/student/ScholarshipService'
  import ProgressBar from '../../app/ProgressBar'
  import ActionNotifier from '../../common/general/ActionNotifier'

  export default {
    name: 'ScholarshipForm',
    components: {
      BooleanSelect,
      ProgressBar,
      ActionNotifier,
    },
    props: {
      studentId: Number,
    },
    data: () => ({
      isEditing: false,
      isLoading: true,
      actionMessage: null,
      actionMessageColor: null,
      hasRecord: null,
      form: {
        has_scholarship: null,
        institute_name: '',
        dependence_name: '',
      },
    }),
    computed: {
      currentUser () {
        return this.studentId ? this.studentId : this.data.roles[0]
      },
      ...get('user', [
        'data',
      ]),
      institutionRules () {
        const rules = [v => !!v || 'Nombre de la institución es requerida']
        return this.form.has_scholarship ? rules : []
      },
      dependenceRules () {
        const rules = [v => !!v || 'Nombre de la dependencia es requerida']
        return this.form.has_scholarship ? rules : []
      },
    },
    created () {
      this.fillForm()
    },
    methods: {
      persist () {
        if (this.$refs.form.validate()) {
          this.isLoading = true
          if (!this.hasRecord) {
            this.createScholarship()
          } else {
            this.updateScholarship()
          }
        }
      },
      fillForm () {
        ScholarshipService.get(this.currentUser.id).then(
          (response) => {
            this.form.has_scholarship = response.data.data.has_scholarship
            this.form.institute_name = response.data.data.institute_name
            this.form.dependence_name = response.data.data.dependence_name
            this.isLoading = false
            this.hasRecord = true
          },
        ).catch(
          (response) => {
            this.notify('No hay información de beca para mostrar', 'error')
            this.isLoading = false
            return Promise.reject(response)
          },
        )
      },
      createScholarship () {
        ScholarshipService.post(this.currentUser.id, this.form).then(
          (response) => {
            this.isLoading = false
            this.isEditing = false
            this.hasRecord = true
            this.notify('Actualizado correctamente', 'success')
          },
        ).catch(
          (response) => {
            this.notify('No se pudo guardar correctamente', 'error')
            this.isLoading = false
            return Promise.reject(response)
          },
        )
      },
      updateScholarship () {
        ScholarshipService.put(this.currentUser.id, this.form).then(
          (response) => {
            this.isLoading = false
            this.isEditing = false
            this.notify('Actualizado correctamente', 'success')
          },
        ).catch(
          (response) => {
            this.notify('No se pudo guardar correctamente', 'error')
            this.isLoading = false
            return Promise.reject(response)
          },
        )
      },
      notify (message, type) {
        this.actionMessage = message
        this.actionMessageColor = type
        this.$refs.ActionNotifier.snackbar = true
      },
      selectItem (item) {
        this.form.has_scholarship = item
        if (this.form.has_scholarship === false) {
          this.form.institute_name = ''
          this.form.dependence_name = ''
        }
      },
    },
  }
</script>
