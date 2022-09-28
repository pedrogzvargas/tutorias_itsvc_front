<template>
  <div>
    <action-notifier
      ref="ActionNotifier"
      :text="actionMessage"
      :color="actionMessageColor"
    />
    <v-dialog
      v-model="show"
      max-width="640px"
    >
      <v-card class="pa-8">
        <p class="text-h6">
          Datos de la institución
        </p>
        <v-divider />
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
          @submit.prevent=""
        >
          <v-row>
            <v-col class="pb-0">
              <academic-degree-select
                :default-selected="form.academic_degree_id"
                :dense="true"
                :rules="[v => v!== null || 'Este campo es requerido']"
                @SelectedItem="form.academic_degree_id = $event"
              />
            </v-col>
            <v-col
              cols="12"
              md="12"
              class="pb-0"
            >
              <v-text-field
                v-model="form.institute_name"
                label="Nombre de la institución"
                :rules="instituteRules"
                dense
                outlined
              />
            </v-col>
            <v-col
              cols="12"
              md="12"
              class="pb-0"
            >
              <v-menu
                v-model="startDateMenu"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="form.start_date"
                    label="Fecha de inicio del periodo"
                    readonly
                    :rules="requireRules"
                    dense
                    outlined
                    v-bind="attrs"
                    v-on="on"
                  />
                </template>
                <v-date-picker
                  v-model="form.start_date"
                  locale="es"
                  @input="startDateMenu = false"
                />
              </v-menu>
            </v-col>
            <v-col class="pb-0">
              <v-menu
                v-model="endDateMenu"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="form.end_date"
                    label="Fecha fin del periodo"
                    readonly
                    :rules="requireRules"
                    dense
                    outlined
                    v-bind="attrs"
                    v-on="on"
                  />
                </template>
                <v-date-picker
                  v-model="form.end_date"
                  locale="es"
                  @input="endDateMenu = false"
                />
              </v-menu>
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
  import { get } from 'vuex-pathify'
  import AcademicDegreeSelect from '../../common/general/AcademicDegreeSelect'
  import InstitutesService from '../../../services/student/InstitutesService'
  import ActionNotifier from '../../common/general/ActionNotifier'
  export default {
    name: 'InstituteModalForm',
    components: {
      AcademicDegreeSelect,
      ActionNotifier,
    },
    props: {
      studentId: Number,
      mode: String,
      currentRecord: Object,
    },
    data () {
      return {
        show: false,
        valid: false,
        startDateMenu: false,
        endDateMenu: false,
        test_value: null,
        actionMessage: null,
        actionMessageColor: null,
        form: {
          institute_name: null,
          academic_degree_id: null,
          start_date: null,
          end_date: null,
        },
        instituteRules: [
          v => !!v || 'Nombre de la institución es requerido',
          v => (v && v.length <= 150) || 'Nombre de la institución debe ser menor de 150 caracteres',
        ],
        requireRules: [
          v => !!v || 'Este campo es requerido',
        ],
      }
    },
    computed: {
      currentUser () {
        return this.studentId ? this.studentId : this.data.roles[0]
      },
      ...get('user', [
        'data',
      ]),
    },
    watch: {
      currentRecord () {
        if (this.mode === 'edit' && this.currentRecord) {
          this.form.academic_degree_id = this.currentRecord.academic_degree_id
          this.form.institute_name = this.currentRecord.institute_name
          this.form.start_date = this.currentRecord.start_date
          this.form.end_date = this.currentRecord.end_date
        } else {
          this.reset()
        }
      },
    },
    methods: {
      validate () {
        this.$refs.form.validate()
      },
      reset () {
        this.$refs.form.reset()
        this.form.academic_degree_id = 0
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
      createInstitute () {
        InstitutesService.post(this.currentUser.id, this.form).then(
          (response) => {
            this.$emit('listUpdated')
            this.notify('Agregado correctamente', 'success')
          },
        ).catch(
          (response) => {
            this.notify('No se pudo agregar correctamente', 'error')
            return Promise.reject(response)
          },
        )
      },
      updateInstitute () {
        InstitutesService.put(this.currentUser.id, this.currentRecord.id, this.form).then(
          (response) => {
            this.$emit('listUpdated')
            this.notify('Actualizado correctamente', 'success')
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
            this.createInstitute()
          } else {
            this.updateInstitute()
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
