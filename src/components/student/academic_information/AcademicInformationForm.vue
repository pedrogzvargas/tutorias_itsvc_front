<template>
  <div>
    <progress-bar v-if="isLoading" />
    <action-notifier
      ref="ActionNotifier"
      :text="actionMessage"
      :color="actionMessageColor"
    />
    <v-form v-if="!isLoading">
      <v-container>
        <v-row>
          <v-col
            cols="12"
            sm="12"
          >
            <university-select
              ref="UniversitySelect"
              :default-selected="form.university_id"
              :readonly="!isEditing"
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
              :readonly="!isEditing"
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
              :readonly="!isEditing"
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
              :readonly="!isEditing"
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
              :readonly="!isEditing"
              :default-selected="form.group_id"
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
      groups: [],
      academicInformationId: null,
      actionMessage: null,
      actionMessageColor: null,
      hasRecord: null,
      form: {
        university_id: 0,
        major_id: 0,
        period_id: 0,
        period_number_id: 0,
        group_id: 0,
      },
    }),
    computed: {
      currentUserId () {
        return this.studentId ? this.studentId : this.userType.id
      },
      ...get('user', [
        'userType',
      ]),
    },
    created () {
      this.fillForm()
    },
    methods: {
      persist () {
        this.isLoading = true
        if (!this.hasRecord) {
          this.createAcademicInformation()
        } else {
          this.updateAcademicInformation()
        }
      },
      fillForm () {
        AcademicInformationService.get(this.currentUserId).then(
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
            this.groups.push({ id: response.data.data.group_id, name: response.data.data.group })
            this.isLoading = false
            this.hasRecord = true
          },
        ).catch(
          (response) => {
            this.notify('No hay información academica para mostrar', 'error')
            this.isLoading = false
            return Promise.reject(response)
          },
        )
      },
      createAcademicInformation () {
        AcademicInformationService.post(this.currentUserId, this.academicInformationId, this.form).then(
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
      updateAcademicInformation () {
        AcademicInformationService.put(this.currentUserId, this.academicInformationId, this.form).then(
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