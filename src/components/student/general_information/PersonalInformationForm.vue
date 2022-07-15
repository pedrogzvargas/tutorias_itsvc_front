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
                    :rules="birthDateRules"
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
            sm="5"
          >
            <v-text-field
              v-model="form.place_birth"
              label="Lugar de nacimiento"
              outlined
              :rules="birthPlaceRules"
              :disabled="!isEditing"
              :readonly="!isEditing"
            />
          </v-col>

          <v-col
            cols="12"
            sm="3"
          >
            <gender-select
              :default-selected="form.gender_id"
              :rules="[v => !!v || 'Genero es requerido',]"
              :disabled="!isEditing"
              :readonly="!isEditing"
              @SelectedItem="form.gender_id = $event"
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col
            cols="12"
            sm="3"
          >
            <marital-status-select
              :default-selected="form.marital_status_id"
              :rules="[v => !!v || 'Este campo es requerido']"
              :disabled="!isEditing"
              :readonly="!isEditing"
              @SelectedItem="selectItem"
            />
          </v-col>

          <v-col
            cols="12"
            sm="5"
          >
            <v-text-field
              v-model="form.marital_status_description"
              label="Descripción"
              :rules="maritalStatusDescriptionRules"
              outlined
              :readonly="!isEditing"
              :disabled="!isEditing || form.marital_status_id !== 7"
            />
          </v-col>

          <v-col
            cols="12"
            sm="2"
          >
            <boolean-select
              :default-selected="form.has_children"
              :readonly="!isEditing"
              :disabled="!isEditing"
              :label="'¿Tienes hijos?'"
              :rules="[v => v!== null || 'Este campo es requerido']"
              @SelectedItem="selectHasChildrenItem"
            />
          </v-col>

          <v-col
            cols="12"
            sm="2"
          >
            <v-text-field
              v-model="form.number_of_children"
              :value="form.number_of_children"
              label="Número de hijos"
              :rules="numberOfChildrenRules"
              outlined
              :readonly="!isEditing"
              :disabled="!isEditing"
              type="number"
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col
            cols="12"
            sm="3"
          >
            <v-text-field
              v-model="form.height"
              label="Estatura"
              :rules="requiredRules"
              type="number"
              outlined
              :readonly="!isEditing"
              :disabled="!isEditing"
            />
          </v-col>

          <v-col
            cols="12"
            sm="3"
          >
            <v-text-field
              v-model="form.weight"
              label="Peso"
              :rules="requiredRules"
              type="number"
              outlined
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
            @click="cancelFormEdition"
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
  import GenderSelect from '../../common/general/GenderSelect'
  import MaritalStatusSelect from '../../common/general/MaritalStatusSelect'
  import PersonalInformationService from '../../../services/student/PersonalInformationService'
  import ActionNotifier from '../../common/general/ActionNotifier'
  import ProgressBar from '../../app/ProgressBar'
  import BooleanSelect from '../../common/general/BooleanSelect'
  import { get } from 'vuex-pathify'
  export default {
    name: 'PersonalInformationForm',
    components: {
      GenderSelect,
      MaritalStatusSelect,
      ActionNotifier,
      ProgressBar,
      BooleanSelect,
    },
    props: {
      studentId: Number,
    },
    data: () => ({
      isEditing: null,
      isLoading: true,
      activePicker: null,
      menu: false,
      actionMessage: null,
      actionMessageColor: null,
      valid: false,
      hasRecord: null,
      hasChildren: [
        { id: null, name: 'Seleccione' },
        { id: true, name: 'Si' },
        { id: false, name: 'No' },
      ],
      form: {
        place_birth: '',
        birth_date: '',
        gender_id: 0,
        has_children: null,
        marital_status_id: 0,
        marital_status_description: '',
        number_of_children: null,
        height: null,
        weight: null,
      },
      birthPlaceRules: [
        v => !!v || 'Lugar de nacimiento es requerido',
        v => (v && v.length <= 255) || 'Lugar de nacimiento debe ser menor de 255 caracteres',
      ],
      birthDateRules: [
        v => !!v || 'Lugar de nacimiento es requerido',
      ],
      requiredRules: [
        v => !!v || 'Este campo es requerido',
      ],
    }),
    computed: {
      currentUser () {
        return this.studentId ? this.studentId : this.data.roles[0]
      },
      ...get('user', [
        'data',
      ]),
      numberOfChildrenRules () {
        const rules = [v => !!v || 'Número de hijos es requerido']
        return this.form.has_children ? rules : []
      },
      maritalStatusDescriptionRules () {
        const rules = [
          v => !!v || 'Descripción requerido',
          v => (v && v.length <= 255) || 'Descripción debe ser menor de 255 caracteres',
        ]
        return this.form.marital_status_id === 7 ? rules : []
      },
      disabledSubmit () {
        let disabled = true
        disabled = !this.valid || !this.isEditing
        return disabled
      },
    },
    watch: {
      menu (val) {
        val && setTimeout(() => (this.activePicker = 'YEAR'))
      },
    },
    created () {
      this.callMainService()
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
      save (date) {
        this.$refs.menu.save(date)
      },
      async callMainService () {
        await PersonalInformationService.get(this.currentUser.id).then(
          (response) => {
            this.form.place_birth = response.data.data.place_birth
            this.form.birth_date = response.data.data.birth_date
            this.form.gender_id = response.data.data.gender_id
            this.form.marital_status_id = response.data.data.marital_status_id
            this.form.marital_status_description = response.data.data.marital_status_description
            this.form.number_of_children = response.data.data.number_of_children
            this.form.height = response.data.data.height
            this.form.weight = response.data.data.weight
            this.form.has_children = response.data.data.has_children
            this.hasRecord = true
          },
        ).catch(
          (response) => {
            this.notify('No se encontró información general', 'secondary')
            this.isLoading = false
            return Promise.reject(response)
          },
        )
        this.isLoading = false
      },
      persist () {
        if (this.$refs.form.validate()) {
          this.isLoading = true
          if (!this.hasRecord) {
            this.savePersonalInformation()
          } else {
            this.updatePersonalInformation()
          }
        }
      },
      async savePersonalInformation () {
        this.form.number_of_children = this.form.number_of_children ? this.form.number_of_children : null
        await PersonalInformationService.post(this.currentUser.id, this.form).then((response) => {
          this.notify('Guardado correctamente', 'success')
          this.hasRecord = true
        }).catch(
          (response) => {
            this.notify('No se pudo guardar correctamente', 'error')
            return Promise.reject(response)
          },
        )
        this.isEditing = false
        this.isLoading = false
      },
      async updatePersonalInformation () {
        this.form.number_of_children = this.form.number_of_children ? this.form.number_of_children : null
        await PersonalInformationService.put(this.currentUser.id, this.form).then((response) => {
          this.notify('Guardado correctamente', 'success')
        }).catch(
          (response) => {
            this.notify('No se pudo guardar correctamente', 'error')
            return Promise.reject(response)
          },
        )
        this.isEditing = false
        this.isLoading = false
      },
      notify (message, type) {
        this.actionMessage = message
        this.actionMessageColor = type
        this.$refs.ActionNotifier.snackbar = true
      },
      cancelFormEdition () {
        this.isEditing = false
        this.resetValidation()
      },
      selectItem (item) {
        this.form.marital_status_id = item
        if (this.form.marital_status_id !== 7) {
          this.form.marital_status_description = ''
        }
      },
      selectHasChildrenItem (item) {
        this.form.has_children = item
        if (!this.form.has_children) {
          this.form.number_of_children = ''
        }
      },
    },
  }
</script>
