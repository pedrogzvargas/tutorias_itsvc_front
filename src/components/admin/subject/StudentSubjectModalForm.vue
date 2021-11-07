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
          Datos de materia
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
              <current-taugh-subject-select
                :default-selected="form.tutor_subject_id"
                :rules="[v => !!v || 'Este campo es requerido']"
                @SelectedItem="form.tutor_subject_id = $event"
              />
            </v-col>
            <v-col
              cols="12"
              md="12"
              class="pb-0 px-5"
            >
              <subject-type-select
                :default-selected="form.type_id"
                :rules="[v => !!v || 'Este campo es requerido']"
                @SelectedItem="form.type_id = $event"
              />
            </v-col>
            <v-col
              cols="8"
              md="8"
              class="pb-0 px-5"
            >
              <v-text-field
                v-model="form.final_score"
                label="Calificación"
                outlined
              />
            </v-col>
            <v-col
              cols="4"
              sm="4"
            >
              <v-select
                v-model="form.approved"
                item-value="id"
                item-text="name"
                :items="subjectStatusItems"
                :label="'Estatus'"
                outlined
                @change="emitSelected"
              ></v-select>
            </v-col>
            <v-col
              cols="12"
              md="12"
              class="pb-0 px-5"
            >
              <failure-metric-select
                :default-selected="form.failure_metric_id"
                @SelectedItem="form.failure_metric_id = $event"
              />
            </v-col>
            <v-col
              cols="12"
              md="12"
              class="pb-0"
            >
              <v-textarea
                v-model="form.comment"
                label="Comentario"
                outlined
              />
            </v-col>
            <v-col
              cols="7"
              md="7"
              class="pb-0 px-5"
            >
              <school-cycle-select
                :default-selected="form.school_cycle_id"
                :rules="[v => !!v || 'Este campo es requerido']"
                @SelectedItem="form.school_cycle_id = $event"
              />
            </v-col>
            <v-col
              cols="5"
              md="5"
              class="pb-0 px-5"
            >
              <boolean-select
                :default-selected="form.unsubscribed"
                :label="'¿Materia dada de baja?'"
                :rules="[v => v!== null || 'Este campo es requerido']"
                @SelectedItem="form.unsubscribed = $event"
              />
            </v-col>
          </v-row>
        </v-form>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="secondary"
            @click="resetValidation"
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
  import SchoolCycleSelect from '../../common/general/SchoolCycleSelect'
  import CurrentTaughSubjectSelect from '../../common/academic/CurrentTaughSubjectSelect'
  import SubjectTypeSelect from '../../common/academic/SubjectTypeSelect'
  import FailureMetricSelect from '../../common/academic/FailureMetricSelect'
  import StudentSubjectsService from '../../../services/student/StudentSubjectsService'
  import BooleanSelect from '../../common/general/BooleanSelect'
  export default {
    name: 'StudentSubjectModalForm',
    components: {
      CurrentTaughSubjectSelect,
      SubjectTypeSelect,
      FailureMetricSelect,
      ActionNotifier,
      SchoolCycleSelect,
      BooleanSelect,
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
          tutor_subject_id: null,
          type_id: null,
          final_score: null,
          approved: null,
          failure_metric_id: null,
          comment: null,
          school_cycle_id: null,
          unsubscribed: null,
        },
        subjectStatusItems: [
          { id: null, name: 'Cursando' },
          { id: true, name: 'Aprovada' },
          { id: false, name: 'Reprovada' },
        ],
      }
    },
    watch: {
      currentRecord () {
        if (this.mode === 'edit' && this.currentRecord) {
          this.form.tutor_subject_id = this.currentRecord.tutor_subject_id
          this.form.type_id = this.currentRecord.type_id
          this.form.final_score = this.currentRecord.final_score
          this.form.approved = this.currentRecord.approved
          this.form.failure_metric_id = this.currentRecord.failure_metric_id
          this.form.comment = this.currentRecord.comment
          this.form.group_id = this.currentRecord.group_id
          this.form.school_cycle_id = this.currentRecord.school_cycle_id
          this.form.unsubscribed = this.currentRecord.unsubscribed
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
    created () {
      this.studentId = this.$route.params.id
    },
    methods: {
      validate () {
        this.$refs.form.validate()
      },
      reset () {
        // this.$refs.form.reset()
        this.resetValidation()
        this.form.tutor_subject_id = null
        this.form.type_id = null
        this.form.final_score = null
        this.form.approved = null
        this.form.failure_metric_id = null
        this.form.comment = null
        this.form.school_cycle_id = null
        this.form.unsubscribed = null
      },
      resetValidation () {
        this.$refs.form.resetValidation()
        this.show = false
      },
      createStudentSubject () {
        this.emitShow = false
        StudentSubjectsService.post(this.studentId, this.form).then(
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
      updateStudentSubject () {
        this.emitShow = false
        StudentSubjectsService.put(this.currentRecord.student_id, this.currentRecord.id, this.form).then(
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
            this.createStudentSubject()
          } else {
            this.updateStudentSubject()
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
    },
  }
</script>
