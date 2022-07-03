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
            <v-text-field
              v-model="form.mobile_phone"
              label="Teléfono celular"
              outlined
              :rules="mobilePhoneRules"
              :readonly="!isEditing"
              :disabled="!isEditing"
            />
          </v-col>

          <v-col
            cols="12"
            sm="4"
          >
            <v-text-field
              v-model="form.home_phone"
              label="Teléfono de casa"
              outlined
              :rules="homePhoneRules"
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
  import MotherContactService from '../../../../services/student/parents/mother/MotherContactService'
  import ActionNotifier from '../../../common/general/ActionNotifier'
  import { get } from 'vuex-pathify'
  export default {
    name: 'MotherContactForm',
    components: {
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
        hasRecord: null,
        phones: [],
        form: {
          home_phone: null,
          mobile_phone: null,
        },
        mobilePhoneRules: [
          v => !!v || 'Teléfono es requerida',
          v => (v && v.length <= 15) || 'Teléfono debe ser menor de 16 caracteres',
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
      homePhone () {
        return this.phones.filter(phone => phone.type === 'home_phone')
      },
      homePhoneRules () {
        const rules = [v => (v && v.length <= 16) || 'Teléfono debe ser menor de 16 caracteres']
        return this.form.home_phone ? rules : []
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
      getPhone (phoneList, type) {
        const phone = phoneList.filter(phone => phone.type === `${type}`) || []
        return phone.length ? phone[0].number : ''
      },
      async fillForm () {
        await MotherContactService.get(this.currentUser.id).then(
          (response) => {
            this.form.mobile_phone = this.getPhone(response.data.data, 'mobile_phone')
            this.form.home_phone = this.getPhone(response.data.data, 'home_phone')
            this.hasRecord = true
          },
        ).catch(
          (response) => {
            this.notify('No hay información de contacto', 'error')
            this.isLoading = false
            return Promise.reject(response)
          },
        )
        this.isLoading = false
      },
      persist () {
        if (this.$refs.form.validate()) {
          this.isLoading = true
          this.saveMotherContact()
        }
      },
      async saveMotherContact () {
        await MotherContactService.post(this.currentUser.id, this.form).then(
          (response) => {
            this.notify('Guardado correctamente', 'success')
          },
        ).catch(
          (response) => {
            this.notify('No se pudo guardar correctamente', 'error')
            return Promise.reject(response)
          },
        )
        this.isLoading = false
        this.isEditing = false
      },
      notify (message, type) {
        this.actionMessage = message
        this.actionMessageColor = type
        this.$refs.ActionNotifier.snackbar = true
      },
    },
  }
</script>
