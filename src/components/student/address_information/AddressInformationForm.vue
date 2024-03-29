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
            sm="8"
          >
            <v-text-field
              v-model="form.street"
              label="Calle"
              outlined
              :rules="streetRules"
              :readonly="!isEditing"
              :disabled="!isEditing"
            />
          </v-col>

          <v-col
            cols="12"
            sm="2"
          >
            <v-text-field
              v-model="form.indoor_number"
              label="Número interior"
              :rules="indoorNumberRules"
              outlined
              :readonly="!isEditing"
              :disabled="!isEditing"
            />
          </v-col>

          <v-col
            cols="12"
            sm="2"
          >
            <v-text-field
              v-model="form.outdoor_number"
              label="Número exterior"
              :rules="outdoorNumberRules"
              :counter="50"
              outlined
              :readonly="!isEditing"
              :disabled="!isEditing"
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col
            cols="12"
            sm="4"
          >
            <v-text-field
              v-model="form.colony"
              label="Colonia"
              :rules="colonyRules"
              outlined
              :readonly="!isEditing"
              :disabled="!isEditing"
            />
          </v-col>

          <v-col
            cols="12"
            sm="4"
          >
            <v-text-field
              v-model="form.locality"
              label="Localidad"
              :rules="localityRules"
              outlined
              :readonly="!isEditing"
              :disabled="!isEditing"
            />
          </v-col>

          <v-col
            cols="12"
            sm="2"
          >
            <state-select
              :default-selected="form.state_id"
              :rules="[v => !!v || 'Este campo es requerido']"
              :readonly="!isEditing"
              :disabled="!isEditing"
              @SelectedItem="form.state_id = $event"
            />
          </v-col>

          <v-col
            cols="12"
            sm="2"
          >
            <v-text-field
              v-model="form.zip_code"
              label="Código postal"
              :rules="zipCodeRules"
              :counter="5"
              outlined
              :readonly="!isEditing"
              :disabled="!isEditing"
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col
            cols="12"
            sm="6"
          >
            <house-type-select
              :default-selected="form.housing_type_id"
              :rules="[v => !!v || 'Este campo es requerido']"
              :readonly="!isEditing"
              :disabled="!isEditing"
              @SelectedItem="form.housing_type_id = $event"
            />
          </v-col>

          <v-col
            cols="12"
            sm="6"
          >
            <home-status-select
              v-model="form.home_status_id"
              :default-selected="form.home_status_id"
              :rules="[v => !!v || 'Este campo es requerido']"
              :readonly="!isEditing"
              :disabled="!isEditing"
              @SelectedItem="form.home_status_id = $event"
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col
            cols="12"
            sm="12"
          >
            <v-textarea
              v-model="form.home_status_description"
              label="Especificamente la vivienda es"
              auto-grow
              outlined
              rows="1"
              row-height="25"
              :rules="homeStatusDescription"
              :readonly="!isEditing"
              :disabled="!isEditing"
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col
            cols="12"
            sm="4"
          >
            <v-text-field
              v-model="form.members"
              label="Número de personas con las que vives"
              :rules="membersRules"
              outlined
              type="number"
              :readonly="!isEditing"
              :disabled="!isEditing"
            />
          </v-col>

          <v-col
            cols="12"
            sm="8"
          >
            <v-text-field
              v-model="form.family_relationship"
              label="¿Cómo es tu relación con las personas que vives?"
              outlined
              :rules="relationshipRules"
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
  import ActionNotifier from '../../common/general/ActionNotifier'
  import ProgressBar from '../../app/ProgressBar'
  import AddressService from '../../../services/student/AddressService'
  import StateSelect from '../../common/address/StateSelect'
  import HomeStatusSelect from '../../common/address/HomeStatusSelect'
  import HouseTypeSelect from '../../common/address/HouseTypeSelect'
  import { get } from 'vuex-pathify'
  export default {
    name: 'AddressInformationForm',
    components: {
      ActionNotifier,
      ProgressBar,
      StateSelect,
      HomeStatusSelect,
      HouseTypeSelect,
    },
    props: {
      studentId: Number,
    },
    data () {
      return {
        isEditing: false,
        isLoading: true,
        actionMessage: null,
        actionMessageColor: null,
        hasRecord: null,
        valid: false,
        form: {
          street: null,
          indoor_number: null,
          outdoor_number: null,
          colony: null,
          locality: null,
          state_id: null,
          zip_code: null,
          housing_type_id: null,
          home_status_id: null,
          home_status_description: null,
          family_relationship: null,
          members: null,
        },
        streetRules: [
          v => !!v || 'Calle es requerida',
          v => (v && v.length <= 200) || 'Calle debe ser menor de 200 caracteres',
        ],
        outdoorNumberRules: [
          v => !!v || 'Número exterior es requerida',
          v => (v && v.length <= 50) || 'Número exterior debe ser menor de 50 caracteres',
        ],
        colonyRules: [
          v => !!v || 'Colonia es requerida',
          v => (v && v.length <= 200) || 'Colonia debe ser menor de 200 caracteres',
        ],
        localityRules: [
          v => !!v || 'Localidad es requerida',
          v => (v && v.length <= 200) || 'Localidad debe ser menor de 200 caracteres',
        ],
        zipCodeRules: [
          v => !!v || 'Código postal es requerido',
          v => (v && v.length !== 4) || 'Código postal debe ser de 5 caracteres',
        ],
        membersRules: [
          v => !!v || 'Número de personas con las que vives es requerido',
        ],
        relationshipRules: [
          v => !!v || 'Relación con las personas que vives es requerido',
          v => (v && v.length <= 255) || 'Relación debe ser menor de 255 caracteres',
        ],
      }
    },
    computed: {
      indoorNumberRules () {
        const rules = [v => (v && v.length <= 50) || 'Número interior debe menor o igual a 50 caracteres']
        return this.form.indoor_number ? rules : []
      },
      homeStatusDescription () {
        const rules = [v => (v && v.length <= 255) || 'Descripción de la vivienda debe menor o igual a 255 caracteres']
        return this.form.home_status_description ? rules : []
      },
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
      async callMainService () {
        await AddressService.get(this.currentUser.id).then(
          (response) => {
            this.form.street = response.data.data.street
            this.form.indoor_number = response.data.data.indoor_number
            this.form.outdoor_number = response.data.data.outdoor_number
            this.form.colony = response.data.data.colony
            this.form.locality = response.data.data.locality
            this.form.state_id = response.data.data.state_id
            this.form.zip_code = response.data.data.zip_code
            this.form.housing_type_id = response.data.data.housing_type_id
            this.form.home_status_id = response.data.data.home_status_id
            this.form.home_status_description = response.data.data.home_status_description
            this.form.family_relationship = response.data.data.family_relationship
            this.form.members = response.data.data.members
            this.hasRecord = true
          },
        ).catch(
          (response) => {
            this.notify('No se encontró información domiciliaria', 'secondary')
            this.isLoading = false
            return Promise.reject(response)
          },
        )
        this.isLoading = false
      },
      async saveAddressInformation () {
        await AddressService.post(this.currentUser.id, this.form).then(
          (response) => {
            this.notify('Guardado correctamente', 'success')
          },
        ).catch(
          (response) => {
            this.notify('No se pudo guardar correctamente', 'error')
            this.isLoading = false
            return Promise.reject(response)
          },
        )
        this.isEditing = false
        this.isLoading = false
      },
      async updateAddressInformation () {
        await AddressService.put(this.currentUser.id, this.form).then(
          (response) => {
            this.notify('Guardado correctamente', 'success')
          },
        ).catch(
          (response) => {
            this.notify('No se pudo guardar correctamente', 'error')
            this.isLoading = false
            return Promise.reject(response)
          },
        )
        this.isEditing = false
        this.isLoading = false
      },
      persist () {
        if (this.$refs.form.validate()) {
          this.isLoading = true
          if (!this.hasRecord) {
            this.saveAddressInformation()
          } else {
            this.updateAddressInformation()
          }
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
