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
          Datos de hermano
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
              md="6"
              class="pb-0"
            >
              <v-text-field
                v-model="form.first_name"
                :rules="firstNameRules"
                label="Nombre"
                outlined
              />
            </v-col>
            <v-col
              cols="12"
              md="6"
              class="pb-0"
            >
              <v-text-field
                v-model="form.second_name"
                :rules="secondNameRules"
                label="Segundo nombre"
                outlined
              />
            </v-col>
            <v-col
              cols="12"
              md="6"
              class="pb-0"
            >
              <v-text-field
                v-model="form.last_name"
                :rules="lastNameRules"
                label="Apellido paterno"
                outlined
              />
            </v-col>
            <v-col
              cols="12"
              md="6"
              class="pb-0"
            >
              <v-text-field
                v-model="form.second_last_name"
                :rules="secondLastNameRules"
                label="Apellido materno"
                outlined
              />
            </v-col>
            <v-col
              cols="12"
              md="6"
              class="pb-0"
            >
              <gender-select
                :default-selected="form.gender_id"
                :rules="[v => !!v || 'Este campo es requerido']"
                @SelectedItem="form.gender_id = $event"
              />
            </v-col>
            <v-col
              cols="12"
              md="6"
              class="pb-0"
            >
              <v-menu
                v-model="birthDateMenu"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="form.birth_date"
                    label="Fecha de nacimiento"
                    readonly
                    :rules="birthDateRules"
                    outlined
                    v-bind="attrs"
                    v-on="on"
                  />
                </template>
                <v-date-picker
                  v-model="form.birth_date"
                  locale="es"
                  @input="birthDateMenu = false"
                />
              </v-menu>
            </v-col>
            <v-col
              cols="12"
              md="12"
              class="pb-0"
            >
              <academic-degree-select
                :default-selected="form.academic_degree_id"
                :rules="[v => !!v || 'Este campo es requerido']"
                @SelectedItem="form.academic_degree_id = $event"
              />
            </v-col>
            <v-col
              cols="12"
              md="6"
              class="pb-0"
            >
              <relationship-select
                :default-selected="form.relationship_id"
                :rules="[v => !!v || 'Este campo es requerido']"
                @SelectedItem="form.relationship_id = $event"
              />
            </v-col>
            <v-col
              cols="12"
              md="6"
              class="pb-0"
            >
              <attitude-select
                :default-selected="form.attitude_id"
                :rules="[v => !!v || 'Este campo es requerido']"
                @SelectedItem="form.attitude_id = $event"
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
  import SiblingsService from '../../../../services/student/parents/sibling/SiblingsService'
  import ActionNotifier from '../../../common/general/ActionNotifier'
  import GenderSelect from '../../../common/general/GenderSelect'
  import AcademicDegreeSelect from '../../../common/general/AcademicDegreeSelect'
  import AttitudeSelect from '../../../common/general/AttitudeSelect'
  import RelationshipSelect from '../../../common/general/RelationshipSelect'
  export default {
    name: 'SiblingModalForm',
    components: {
      ActionNotifier,
      GenderSelect,
      AcademicDegreeSelect,
      AttitudeSelect,
      RelationshipSelect,
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
        form: {
          first_name: null,
          second_name: null,
          last_name: null,
          second_last_name: null,
          gender_id: 0,
          birth_date: null,
          academic_degree_id: 0,
          relationship_id: 0,
          attitude_id: 0,
        },
        firstNameRules: [
          v => !!v || 'Nombre es requerido',
          v => (v && v.length <= 100) || 'Nombre debe ser menor de 100 caracteres',
        ],
        lastNameRules: [
          v => !!v || 'Apellido paterno es requerido',
          v => (v && v.length <= 100) || 'Apellido paterno debe ser menor de 100 caracteres',
        ],
        birthDateRules: [
          v => !!v || 'Fecha de nacimiento es requerido',
        ],
      }
    },
    computed: {
      secondNameRules () {
        const rules = [v => (v && v.length <= 100) || 'Segundo nombre debe menor o igual a 100 caracteres']
        return this.form.second_name ? rules : []
      },
      secondLastNameRules () {
        const rules = [v => (v && v.length <= 100) || 'Apellido materno debe menor o igual a 100 caracteres']
        return this.form.second_last_name ? rules : []
      },
    },
    watch: {
      currentRecord () {
        if (this.mode === 'edit' && this.currentRecord) {
          this.form.first_name = this.currentRecord.first_name
          this.form.second_name = this.currentRecord.second_name
          this.form.last_name = this.currentRecord.last_name
          this.form.second_last_name = this.currentRecord.second_last_name
          this.form.gender_id = this.currentRecord.gender_id
          this.form.birth_date = this.currentRecord.birth_date
          this.form.academic_degree_id = this.currentRecord.academic_degree_id
          this.form.relationship_id = this.currentRecord.relationship_id
          this.form.attitude_id = this.currentRecord.attitude_id
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
        this.form.gender_id = 0
        this.form.academic_degree_id = 0
        this.form.relationship_id = 0
        this.form.attitude_id = 0
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
      createInstitute () {
        SiblingsService.post(1, this.form).then(
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
        SiblingsService.put(1, this.currentRecord.id, this.form).then(
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
