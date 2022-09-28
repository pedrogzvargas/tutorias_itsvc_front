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
              :rules="nameRules"
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
              label="Segundo Nombre"
              :rules="secondNameRules"
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
              label="Apellido Paterno"
              :rules="lastNameRules"
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
              label="Apellido Materno"
              :rules="secondLastNameRules"
              outlined
              :readonly="!isEditing"
              :disabled="!isEditing"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col
            cols="12"
            sm="4"
          >
            <div>
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                :disabled="!isEditing"
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
                  :active-picker.sync="activePicker"
                  :max="new Date().toISOString().substr(0, 10)"
                  :readonly="!isEditing"
                  min="1950-01-01"
                  locale="es"
                  @change="save"
                />
              </v-menu>
            </div>
          </v-col>

          <v-col
            cols="12"
            sm="4"
          >
            <academic-degree-select
              :default-selected="form.academic_degree_id"
              :dense="false"
              :rules="[v => v!== null || 'Este campo es requerido']"
              :readonly="!isEditing"
              :disabled="!isEditing"
              @SelectedItem="form.academic_degree_id = $event"
            />
          </v-col>

          <v-col
            cols="12"
            sm="4"
          >
            <v-select
              v-model="form.is_alive"
              :items="trueFalseItems"
              :rules="[v => v!== null || 'Este campo es requerido']"
              :readonly="!isEditing"
              :disabled="!isEditing"
              item-value="id"
              item-text="name"
              label="Tu madre vive"
              outlined
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col
            cols="12"
            sm="3"
          >
            <v-text-field
              v-model="form.profession_occupation"
              label="Profesión"
              :rules="professionRules"
              outlined
              :readonly="!isEditing"
              :disabled="!isEditing"
            ></v-text-field>
          </v-col>

          <v-col
            cols="12"
            sm="3"
          >
            <boolean-select
              :default-selected="form.has_job"
              :readonly="!isEditing"
              :disabled="!isEditing"
              :label="'¿Trabaja?'"
              :rules="[v => v!== null || 'Este campo es requerido']"
              @SelectedItem="selectItem"
            />
          </v-col>

          <v-col
            cols="12"
            sm="3"
          >
            <v-text-field
              v-model="form.type_of_job"
              :value="typeOfJob"
              label="Tipo de Trabajo"
              outlined
              :rules="typeOfJobRules"
              :readonly="!isEditing"
              :disabled="!isEditing"
            ></v-text-field>
          </v-col>

          <v-col
            cols="12"
            sm="3"
          >
            <v-text-field
              v-model="form.workplace"
              label="Nombre o lugar de trabajo"
              :rules="workplaceRules"
              outlined
              :readonly="!isEditing"
              :disabled="!isEditing"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
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
  import ProgressBar from '../../../app/ProgressBar'
  import MotherGeneralInformationService
    from '../../../../services/student/parents/mother/MotherGeneralInformationService'
  import AcademicDegreeSelect from '../../../common/general/AcademicDegreeSelect'
  import ActionNotifier from '../../../common/general/ActionNotifier'
  import BooleanSelect from '../../../common/general/BooleanSelect'
  import { get } from 'vuex-pathify'
  export default {
    name: 'MotherGeneralInformationForm',
    components: {
      AcademicDegreeSelect,
      ActionNotifier,
    },
    props: {
      studentId: Number,
    },
    data () {
      return {
        isEditing: false,
        isLoading: true,
        activePicker: null,
        menu: false,
        valid: false,
        actionMessage: null,
        actionMessageColor: null,
        hasRecord: null,
        form: {
          first_name: '',
          second_name: '',
          last_name: '',
          second_last_name: '',
          birth_date: '',
          academic_degree_id: null,
          has_job: null,
          workplace: '',
          type_of_job: '',
          profession_occupation: '',
          is_alive: null,
        },
        trueFalseItems: [
          { id: null, name: 'Seleccione' },
          { id: true, name: 'Si' },
          { id: false, name: 'No' },
        ],
        nameRules: [
          v => !!v || 'Nombre es requerido',
          v => (v && v.length <= 100) || 'Nombre debe ser menor o igual a 100 caracteres',
        ],
        lastNameRules: [
          v => !!v || 'Apellido paterno es requerido',
          v => (v && v.length <= 100) || 'Apellido paterno debe ser menor o igual a 100 caracteres',
        ],
        birthDateRules: [
          v => !!v || 'Fecha de nacimiento es requerido',
        ],
        professionRules: [
          v => !!v || 'Profesion es requerido',
          v => (v && v.length <= 255) || 'Apellido paterno debe ser menor o igual a 255 caracteres',
        ],
      }
    },
    computed: {
      secondNameRules () {
        const rules = [v => (v && v.length <= 100) || 'Segundo nombre debe ser menor o igual a 100 caracteres']
        return this.form.second_name ? rules : []
      },
      secondLastNameRules () {
        const rules = [v => (v && v.length <= 100) || 'Apellido materno debe ser menor o igual a 100 caracteres']
        return this.form.second_last_name ? rules : []
      },
      typeOfJobRules () {
        const rules = [
          v => !!v || 'Tipo de trabajo es requerido',
          v => (v && v.length <= 255) || 'Tipo de trabajo debe ser menor o igual a 255 caracteres',
        ]
        return this.form.has_job ? rules : []
      },
      workplaceRules () {
        const rules = [
          v => !!v || 'Lugar de trabajo es requerido',
          v => (v && v.length <= 255) || 'Lugar de trabajo debe ser menor o igual a 255 caracteres',
        ]
        return this.form.has_job ? rules : []
      },
      typeOfJob () {
        return this.form.has_job ? this.form.type_of_job : null
      },
      currentUser () {
        return this.studentId ? this.studentId : this.data.roles[0]
      },
      ...get('user', [
        'data',
      ]),
    },
    watch: {
      menu (val) {
        val && setTimeout(() => (this.activePicker = 'YEAR'))
      },
      form: {
        deep: true,
        immediate: true,
        handler (val) {
          if (!val.has_job) {
            this.form.workplace = null
            this.form.type_of_job = null
          }
        },
      },
    },
    created () {
      this.fillForm()
    },
    methods: {
      validate () {
        this.$refs.form.validate()
      },
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
      persist () {
        if (this.$refs.form.validate()) {
          this.isLoading = true
          if (!this.hasRecord) {
            this.createMotherGeneralInformation()
          } else {
            this.updateMotherGeneralInformation()
          }
        }
      },
      async fillForm () {
        await MotherGeneralInformationService.get(this.currentUser.id).then(
          (response) => {
            this.form.first_name = response.data.data.first_name
            this.form.second_name = response.data.data.second_name
            this.form.last_name = response.data.data.last_name
            this.form.second_last_name = response.data.data.second_last_name
            this.form.birth_date = response.data.data.birth_date
            this.form.academic_degree_id = response.data.data.academic_degree_id
            this.form.has_job = response.data.data.has_job
            this.form.workplace = response.data.data.workplace
            this.form.type_of_job = response.data.data.type_of_job
            this.form.profession_occupation = response.data.data.profession_occupation
            this.form.is_alive = response.data.data.is_alive
            this.hasRecord = true
            this.$emit('registeredMother')
          },
        ).catch(
          (response) => {
            this.notify('No se encontró información de la madre', 'secondary')
            this.isLoading = false
            return Promise.reject(response)
          },
        )
        this.isLoading = false
      },
      async createMotherGeneralInformation () {
        await MotherGeneralInformationService.post(this.currentUser.id, this.form).then(
          (response) => {
            this.notify('Creado correctamente', 'success')
            this.hasRecord = true
            this.$emit('registeredMother')
          },
        ).catch(
          (response) => {
            this.notify('No se pudo guardar correctamente', 'error')
            return Promise.reject(response)
          },
        )
        this.isEditing = false
        this.isLoading = false
      },
      async updateMotherGeneralInformation () {
        await MotherGeneralInformationService.put(this.currentUser.id, this.form).then(
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
        this.isEditing = false
        this.isLoading = false
      },
      save (date) {
        this.$refs.menu.save(date)
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
