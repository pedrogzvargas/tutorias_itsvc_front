<template>
  <div>
    <action-notifier
      ref="ActionNotifier"
      :text="actionMessage"
      :color="actionMessageColor"
    />
    <v-form
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
                    outlined
                    readonly
                    :disabled="!isEditing"
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
              :readonly="!isEditing"
              :rules="[v => v!== null || 'Este campo es requerido']"
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
              label="Tu padre vive"
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
            <v-select
              v-model="form.has_job"
              :items="trueFalseItems"
              :rules="[v => v!== null || 'Este campo es requerido']"
              :readonly="!isEditing"
              :disabled="!isEditing"
              item-value="id"
              item-text="name"
              label="¿Trabaja?"
              outlined
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
              :readonly="!form.has_job"
              :disabled="!form.has_job"
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
              :readonly="!form.has_job"
              :disabled="!form.has_job"
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
  import MotherGeneralInformationService
    from '../../../../services/student/parents/mother/MotherGeneralInformationService'
  import AcademicDegreeSelect from '../../../common/general/AcademicDegreeSelect'
  import ActionNotifier from '../../../common/general/ActionNotifier'
  export default {
    name: 'MotherGeneralInformationForm',
    components: {
      AcademicDegreeSelect,
      ActionNotifier,
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
      typeOfJobRules () {
        const rules = [v => !!v || 'Tipo de trabajo es requerido']
        return this.form.has_job ? rules : []
      },
      workplaceRules () {
        const rules = [v => !!v || 'Lugar de trabajo es requerido']
        return this.form.has_job ? rules : []
      },
      typeOfJob () {
        return this.form.has_job ? this.form.type_of_job : null
      },
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
          this.updateFatherGeneralInformation()
        }
      },
      fillForm () {
        MotherGeneralInformationService.get(1).then(
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
          },
        )
      },
      updateFatherGeneralInformation () {
        MotherGeneralInformationService.put(1, this.form).then(
          (response) => {
            this.notify('Actualizado correctamente', 'success')
          },
        ).catch(
          (response) => {
            this.notify('No se pudo guardar correctamente', 'error')
            return Promise.reject(response)
          },
        )
      },
      save (date) {
        this.$refs.menu.save(date)
      },
      notify (message, type) {
        this.actionMessage = message
        this.actionMessageColor = type
        this.$refs.ActionNotifier.snackbar = true
      },
    },
  }
</script>

<style scoped>

</style>
