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
          Datos de la deficiencia
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
              <disability-select
                :default-selected="form.disability_id"
                :rules="[v => v!== null || 'Este campo es requerido']"
                @SelectedItem="form.disability_id = $event"
              />
            </v-col>
            <v-col
              cols="12"
              md="12"
              class="pb-0"
            >
              <v-textarea
                v-model="form.description"
                label="Descripción"
                :rules="descriptionRules"
                outlined
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
  import DisabilitySelect from '../../common/general/DisabilitySelect'
  import MedicalInformationService from '../../../services/student/MedicalInformationService'
  import ActionNotifier from '../../common/general/ActionNotifier'
  import { get } from 'vuex-pathify'
  export default {
    name: 'DeficiencyModalForm',
    components: {
      DisabilitySelect,
      ActionNotifier,
    },
    props: {
      mode: String,
      currentRecord: Object,
    },
    data () {
      return {
        show: false,
        valid: false,
        actionMessage: null,
        actionMessageColor: null,
        form: {
          disability_id: null,
          description: null,
          studentId: Number,
        },
      }
    },
    computed: {
      descriptionRules () {
        const requieredRules = [
          v => !!v || 'Description es requerida',
          v => (v && v.length <= 200) || 'Description debe ser menor de 200 caracteres',
        ]
        const lengthRules = this.form.description ? [v => (v && v.length <= 200) || 'Description debe ser menor de 200 caracteres'] : []
        return this.form.disability_id === 4 ? requieredRules : lengthRules
      },
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
          this.form.disability_id = this.currentRecord.disability_id
          this.form.description = this.currentRecord.description
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
        this.form.disability_id = 0
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
      createDeficiency () {
        MedicalInformationService.post(this.currentUser.id, this.form).then(
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
      updateDeficiency () {
        MedicalInformationService.put(this.currentUser.id, this.currentRecord.id, this.form).then(
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
            this.createDeficiency()
          } else {
            this.updateDeficiency()
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
