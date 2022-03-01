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
              :rules="[v => !!v || 'Este campo es requerido']"
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
  import FatherContactService from '../../../../services/student/parents/father/FatherContactService'
  import ActionNotifier from '../../../common/general/ActionNotifier'
  import { get } from 'vuex-pathify'
  export default {
    name: 'FatherContactForm',
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
        streetRules: [
          v => !!v || 'Calle es requerida',
          v => (v && v.length <= 200) || 'Calle debe ser menor de 200 caracteres',
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
        const phone = phoneList.filter(phone => phone.type === `${type}`) || ''
        return phone ? phone[0].number : ''
      },
      async fillForm () {
        await FatherContactService.get(this.currentUser.id).then(
          (response) => {
            this.form.home_phone = this.getPhone(response.data.data, 'home_phone')
            this.form.mobile_phone = this.getPhone(response.data.data, 'mobile_phone')
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
          this.saveFatherContact()
        }
      },
      async saveFatherContact () {
        await FatherContactService.post(this.currentUser.id, this.form).then(
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
