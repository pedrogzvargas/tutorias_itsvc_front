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
      lazy-validation
    >
      <v-container>
        <v-row>
          <v-col
            cols="12"
            sm="12"
          >
            <v-text-field
              v-model="form.income"
              label="¿A cuánto ascienden los ingresos mensuales de tu familia?"
              outlined
              :rules="[v => !!v || 'Este campo es requerido']"
              :readonly="!isEditing"
              :disabled="!isEditing"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            sm="12"
          >
            <v-text-field
              v-model="form.family_income"
              label="¿En caso de ser económicamente independiente a cuánto asciende tu ingreso?"
              outlined
              :rules="[v => !!v || 'Este campo es requerido']"
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
  import ProgressBar from '../../app/ProgressBar'
  import IncomeService from '../../../services/student/IncomeService'
  import ActionNotifier from '../../common/general/ActionNotifier'
  import { get } from 'vuex-pathify'
  export default {
    name: 'IncomeForm',
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
        hasRecord: null,
        actionMessage: null,
        actionMessageColor: null,
        form: {
          income: null,
          family_income: null,
        },
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
    created () {
      this.callMainService()
    },
    methods: {
      async callMainService () {
        await IncomeService.get(this.currentUser.id).then(
          (response) => {
            this.form.income = response.data.data.income
            this.form.family_income = response.data.data.family_income
            this.hasRecord = true
          },
        ).catch(
          (response) => {
            this.notify('No se encontró información económica', 'secondary')
            this.isLoading = false
            return Promise.reject(response)
          },
        )
        this.isLoading = false
      },
      async createIncome () {
        await IncomeService.post(this.currentUser.id, this.form).then(
          (response) => {
            this.notify('Guardado correctamente', 'success')
          },
        ).catch(
          (response) => {
            this.notify('No se pudo guardar correctamente', 'error')
            this.hasRecord = true
            return Promise.reject(response)
          },
        )
        this.isLoading = false
        this.isEditing = false
      },
      async updateIncome () {
        await IncomeService.put(this.currentUser.id, this.form).then(
          (response) => {
            this.notify('Actualizado correctamente', 'success')
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
      persist () {
        if (this.$refs.form.validate()) {
          this.isLoading = true
          if (!this.hasRecord) {
            this.createIncome()
          } else {
            this.updateIncome()
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

<style scoped>

</style>
