<template>
  <div>
    <action-notifier
      ref="ActionNotifier"
      :text="actionMessage"
      :color="actionMessageColor"
    />
    <v-dialog
      v-model="show"
      max-width="740px"
    >
      <v-card class="pa-8">
        <p class="text-h6">
          Datos de grupo
        </p>
        <v-divider />
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
          @submit.prevent=""
        >
          <v-row>
            <v-col
              cols="12"
              md="12"
              class="pb-0 px-5"
            >
              <tutor-select
                :default-selected="form.tutor_id"
                :rules="[v => !!v || 'Este campo es requerido']"
                @SelectedItem="form.tutor_id = $event"
              />
            </v-col>
            <v-col
              cols="12"
              md="12"
              class="pb-0 px-5"
            >
              <university-select
                :default-selected="form.university_id"
                :rules="[v => !!v || 'Este campo es requerido']"
                @SelectedItem="updateMajors"
              />
            </v-col>
            <v-col
              cols="12"
              md="12"
              class="pb-0 px-5"
            >
              <major-select
                :university-id="form.university_id"
                :default-selected="form.major_id"
                @SelectedItem="updatePeriods"
              />
            </v-col>
            <v-col
              cols="12"
              md="12"
              class="pb-0 px-5"
            >
              <academic-period-select
                :university-id="form.university_id"
                :major-id="form.major_id"
                :default-selected="form.period_id"
                @SelectedItem="updatePeriodsNumber"
              />
            </v-col>
            <v-col
              cols="12"
              md="12"
              class="pb-0 px-5"
            >
              <period-number-select
                :university-id="form.university_id"
                :major-id="form.major_id"
                :academic-period-id="form.period_id"
                :default-selected="form.period_number_id"
                @SelectedItem="updateGroups"
              />
            </v-col>
            <v-col
              cols="12"
              md="12"
              class="pb-0 px-5"
            >
              <academic-group-select
                :university-id="form.university_id"
                :major-id="form.major_id"
                :academic-period-id="form.period_id"
                :academic-period-number-id="form.period_number_id"
                :default-selected="form.group_id"
                @SelectedItem="form.group_id = $event"
              />
            </v-col>
            <v-col
              cols="12"
              md="12"
              class="pb-0 px-5"
            >
              <school-cycle-select
                :default-selected="form.school_cycle_id"
                @SelectedItem="form.school_cycle_id = $event"
              />
            </v-col>
          </v-row>
        </v-form>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="secondary"
            @click="show = false"
          >
            Cancelar
          </v-btn>
          <v-btn
            color="primary"
            :disabled="!valid"
            @click="persist"
          >
            Guardar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  import ActionNotifier from '../../common/general/ActionNotifier'
  import UniversitySelect from '../../common/academic/UniversitySelect'
  import MajorSelect from '../../common/academic/MajorSelect'
  import AcademicPeriodSelect from '../../common/academic/AcademicPeriodSelect'
  import PeriodNumberSelect from '../../common/academic/PeriodNumberSelect'
  import AcademicGroupSelect from '../../common/academic/AcademicGroupSelect'
  import SchoolCycleSelect from '../../common/general/SchoolCycleSelect'
  import GroupService from '../../../services/tutor/group/GroupService'
  import GroupsService from '../../../services/tutor/group/GroupsService'
  import TutorSelect from '../tutor/TutorSelect'
  export default {
    name: 'GroupModalForm',
    components: {
      UniversitySelect,
      MajorSelect,
      ActionNotifier,
      AcademicPeriodSelect,
      PeriodNumberSelect,
      AcademicGroupSelect,
      SchoolCycleSelect,
      TutorSelect,
    },
    props: {
      mode: String,
      currentRecord: Object,
    },
    data () {
      return {
        show: false,
        valid: false,
        birthDateMenu: false,
        actionMessage: null,
        actionMessageColor: null,
        emitShow: true,
        form: {
          tutor_id: 0,
          university_id: 0,
          major_id: 0,
          period_id: 0,
          period_number_id: 0,
          group_id: 0,
          school_cycle_id: 0,
        },
      }
    },
    watch: {
      currentRecord () {
        if (this.mode === 'edit' && this.currentRecord) {
          this.form.university_id = this.currentRecord.university_id
          this.form.tutor_id = this.currentRecord.tutor_id
          this.form.major_id = this.currentRecord.major_id
          this.form.period_id = this.currentRecord.period_id
          this.form.period_number_id = this.currentRecord.period_number_id
          this.form.group_id = this.currentRecord.group_id
          this.form.school_cycle_id = this.currentRecord.school_cycle_id
        } else if (this.mode === 'create') {
          this.reset()
        }
      },
      show (value) {
        if (!value && this.emitShow === true) {
          this.$emit('hiddenModal')
        }
      },
    },
    methods: {
      validate () {
        this.$refs.form.validate()
      },
      reset () {
        this.$refs.form.reset()
        this.form.university_id = 0
        this.form.major_id = 0
        this.form.period_id = 0
        this.form.period_number_id = 0
        this.form.group_id = 0
        this.form.school_cycle_id = 0
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
      createGroup () {
        this.emitShow = false
        GroupsService.post(this.form).then(
          (response) => {
            this.notify('Agregado correctamente', 'success')
            this.$emit('listUpdated')
          },
        ).catch(
          (response) => {
            this.notify('No se pudo agregar correctamente', 'error')
            return Promise.reject(response)
          },
        )
      },
      updateGroup () {
        this.emitShow = false
        GroupService.put(this.currentRecord.id, this.form).then(
          (response) => {
            this.notify('Actualizado correctamente', 'success')
            this.$emit('listUpdated')
          },
        ).catch(
          (response) => {
            this.notify('No se pudo guardar correctamente', 'error')
            return Promise.reject(response)
          },
        )
      },
      persist () {
        if (this.$refs.form.validate()) {
          if (this.mode === 'create') {
            this.createGroup()
          } else {
            this.updateGroup()
          }
          this.show = false
          this.reset()
        }
      },
      notify (message, type) {
        this.actionMessage = message
        this.actionMessageColor = type
        this.$refs.ActionNotifier.snackbar = true
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
      updateGroups (item) {
        this.form.period_number_id = item
        this.form.group_id = 0
      },
    },
  }
</script>
