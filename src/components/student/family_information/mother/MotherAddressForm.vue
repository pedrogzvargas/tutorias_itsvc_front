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
            sm="6"
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
            sm="3"
          >
            <v-text-field
              v-model="form.indoor_number"
              label="Número interior"
              outlined
              :rules="indoorNumberRules"
              :readonly="!isEditing"
              :disabled="!isEditing"
            />
          </v-col>

          <v-col
            cols="12"
            sm="3"
          >
            <v-text-field
              v-model="form.outdoor_number"
              label="Número exterior"
              outlined
              :rules="outdoorNumberRules"
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
              outlined
              :rules="colonyRules"
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
              outlined
              :rules="localityRules"
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
              :rules="[v => v!== null || 'Estado es requerido']"
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
              outlined
              :rules="zipCodeRules"
              :counter="5"
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
  import MotherAddressService from '../../../../services/student/parents/mother/MotherAddressService'
  import StateSelect from '../../../common/address/StateSelect'
  import ActionNotifier from '../../../common/general/ActionNotifier'
  import { get } from 'vuex-pathify'
  export default {
    name: 'MotherAddressForm',
    components: {
      StateSelect,
      ActionNotifier,
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
        valid: false,
        form: {
          street: null,
          outdoor_number: null,
          indoor_number: null,
          colony: null,
          locality: null,
          state_id: null,
          zip_code: null,
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
      }
    },
    computed: {
      indoorNumberRules () {
        const rules = [v => (v && v.length <= 50) || 'Número interior debe menor o igual a 50 caracteres']
        return this.form.indoor_number ? rules : []
      },
      currentUser () {
        return this.studentId ? this.studentId : this.data.roles[0]
      },
      ...get('user', [
        'data',
      ]),
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
      async fillForm () {
        await MotherAddressService.get(this.currentUser.id).then(
          (response) => {
            this.form.street = response.data.data.street
            this.form.outdoor_number = response.data.data.outdoor_number
            this.form.indoor_number = response.data.data.indoor_number
            this.form.colony = response.data.data.colony
            this.form.locality = response.data.data.locality
            this.form.state_id = response.data.data.state_id
            this.form.zip_code = response.data.data.zip_code
            this.hasRecord = true
          },
        ).catch(
          (response) => {
            this.notify('No hay información para mostrar', 'error')
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
            this.createMotherAddress()
          } else {
            this.updateMotherAddress()
          }
        }
      },
      async createMotherAddress () {
        await MotherAddressService.post(this.currentUser.id, this.form).then(
          (response) => {
            this.notify('Guardado correctamente', 'success')
            this.hasRecord = true
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
      async updateMotherAddress () {
        await MotherAddressService.put(this.currentUser.id, this.form).then(
          (response) => {
            this.notify('Guardado correctamente', 'success')
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
