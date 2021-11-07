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
          Datos de la materia
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
              <subject-select
                :default-selected="form.subject_id"
                :rules="[v => !!v || 'Este campo es requerido']"
                @SelectedItem="form.subject_id = $event"
              />
            </v-col>
            <v-col
              cols="12"
              md="12"
              class="pb-0 px-5"
            >
              <school-cycle-select
                :default-selected="form.school_cycle_id"
                :rules="[v => !!v || 'Este campo es requerido']"
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
  import SchoolCycleSelect from '../../common/general/SchoolCycleSelect'
  import SubjectsService from '../../../services/admin/subject/SubjectsService'
  import SubjectService from '../../../services/tutor/subject/SubjectService'
  import TutorSelect from '../tutor/TutorSelect'
  import SubjectSelect from '../../common/academic/SubjectSelect'
  export default {
    name: 'SubjectModalForm',
    components: {
      ActionNotifier,
      SchoolCycleSelect,
      TutorSelect,
      SubjectSelect,
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
          subject_id: 0,
          school_cycle_id: 0,
        },
      }
    },
    watch: {
      currentRecord () {
        if (this.mode === 'edit' && this.currentRecord) {
          this.form.tutor_id = this.currentRecord.tutor_id
          this.form.subject_id = this.currentRecord.subject_id
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
        this.form.tutor_id = 0
        this.form.subject_id = 0
        this.form.school_cycle_id = 0
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
      createSubject () {
        this.emitShow = false
        SubjectsService.post(this.form).then(
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
      updateSubject () {
        this.emitShow = false
        SubjectService.put(this.currentRecord.id, this.form).then(
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
            this.createSubject()
          } else {
            this.updateSubject()
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
