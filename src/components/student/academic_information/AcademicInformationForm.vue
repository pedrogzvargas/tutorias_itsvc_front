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
            <university-select
              ref="UniversitySelect"
              :default-selected="form.university_id"
              :rules="[v => v!== null || 'Este campo es requerido']"
              :readonly="!isEditing"
              :disabled="!isEditing"
              @SelectedItem="updateMajors"
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col
            cols="12"
            sm="12"
          >
            <major-select
              :university-id="form.university_id"
              :default-selected="form.major_id"
              :rules="[v => v!== null || 'Este campo es requerido']"
              :readonly="!isEditing"
              :disabled="!isEditing"
              @SelectedItem="updatePeriods"
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col
            cols="12"
            sm="4"
          >
            <academic-period-select
              :university-id="form.university_id"
              :major-id="form.major_id"
              :rules="[v => v!== null || 'Este campo es requerido']"
              :readonly="!isEditing"
              :disabled="!isEditing"
              :default-selected="form.period_id"
              @SelectedItem="updatePeriodsNumber"
            />
          </v-col>

          <v-col
            cols="12"
            sm="4"
          >
            <period-number-select
              :university-id="form.university_id"
              :major-id="form.major_id"
              :academic-period-id="form.period_id"
              :default-selected="form.period_number_id"
              :rules="[v => v!== null || 'Este campo es requerido']"
              :readonly="!isEditing"
              :disabled="!isEditing"
              @SelectedItem="updateGroup"
            />
          </v-col>

          <v-col
            cols="12"
            sm="4"
          >
            <academic-group-select
              :university-id="form.university_id"
              :major-id="form.major_id"
              :academic-period-id="form.period_id"
              :academic-period-number-id="form.period_number_id"
              :default-selected="form.group_id"
              :rules="[v => v!== null || 'Este campo es requerido']"
              :readonly="!isEditing"
              :disabled="!isEditing"
              @SelectedItem="form.group_id = $event"
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
            :disabled="disabledSubmit"
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
  import AcademicInformationService from '../../../services/student/AcademicInformationService'
  import UniversitySelect from '../../common/academic/UniversitySelect'
  import MajorSelect from '../../common/academic/MajorSelect'
  import AcademicPeriodSelect from '../../common/academic/AcademicPeriodSelect'
  import PeriodNumberSelect from '../../common/academic/PeriodNumberSelect'
  import AcademicGroupSelect from '../../common/academic/AcademicGroupSelect'
  import ProgressBar from '../../app/ProgressBar'
  import ActionNotifier from '../../common/general/ActionNotifier'

  export default {
    name: 'AcademicInformationForm',
    components: {
      UniversitySelect,
      MajorSelect,
      AcademicPeriodSelect,
      PeriodNumberSelect,
      AcademicGroupSelect,
      ProgressBar,
      ActionNotifier,
    },
    props: {
      studentId: Number,
    },
    data: () => ({
      isEditing: false,
      isLoading: true,
      universities: [],
      majors: [],
      periods: [],
      period_numbers: [],
      academicGroups: [],
      academicInformationId: null,
      actionMessage: null,
      actionMessageColor: null,
      hasRecord: null,
      valid: false,
      form: {
        university_id: 0,
        major_id: 0,
        period_id: 0,
        period_number_id: 0,
        group_id: 0,
      },
    }),
    computed: {
      currentUser () {
        return this.studentId ? this.studentId : this.data.roles[0]
      },
      ...get('user', [
        'data',
      ]),
      disabledSubmit () {
        let disabled = true
        disabled = !this.valid || !this.isEditing
        return disabled
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
            this.createAcademicInformation()
          } else {
            this.updateAcademicInformation()
          }
        }
      },
      fillForm () {
        AcademicInformationService.get(this.currentUser.id).then(
          (response) => {
            this.academicInformationId = response.data.data.id
            this.form.university_id = response.data.data.university_id
            this.form.major_id = response.data.data.major_id
            this.form.period_id = response.data.data.period_id
            this.form.period_number_id = response.data.data.period_number_id
            this.form.group_id = response.data.data.group_id
            this.universities.push({ id: response.data.data.university_id, name: response.data.data.university })
            this.majors.push({ id: response.data.data.major_id, name: response.data.data.major })
            this.periods.push({ id: response.data.data.period_id, name: response.data.data.period })
            this.period_numbers.push({ id: response.data.data.period_number_id, name: response.data.data.period_number })
            this.academicGroups.push({ id: response.data.data.group_id, name: response.data.data.group })
            this.isLoading = false
            this.hasRecord = true
          },
        ).catch(
          (response) => {
            this.notify('No hay información academica para mostrar', 'secondary')
            this.isLoading = false
            return Promise.reject(response)
          },
        )
      },
      async createAcademicInformation () {
        await AcademicInformationService.post(this.currentUser.id, this.academicInformationId, this.form).then(
          (response) => {
            this.notify('Actualizado correctamente', 'success')
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
      async updateAcademicInformation () {
        await AcademicInformationService.put(this.currentUser.id, this.academicInformationId, this.form).then(
          (response) => {
            this.notify('Actualizado correctamente', 'success')
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
      updateMajors (item) {
        this.form.university_id = item
        this.form.major_id = 0
        this.form.period_id = 0
        this.form.period_number_id = 0
      },
      updatePeriods (item) {
        this.form.major_id = item
        this.form.period_id = 0
        this.form.period_number_id = 0
        this.form.group_id = 0
      },
      updatePeriodsNumber (item) {
        this.form.period_id = item
        this.form.period_number_id = 0
        this.form.group_id = 0
      },
      updateGroup (item) {
        this.form.period_number_id = item
        this.form.group_id = 0
      },
      notify (message, type) {
        this.actionMessage = message
        this.actionMessageColor = type
        this.$refs.ActionNotifier.snackbar = true
      },
    },
  }
</script>
