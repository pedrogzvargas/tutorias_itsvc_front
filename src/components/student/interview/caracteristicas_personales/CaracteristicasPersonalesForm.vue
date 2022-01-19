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
            class="py-0"
          >
            <answer-select
              :default-selected="form.p1"
              :readonly="!isEditing"
              :disabled="!isEditing"
              :label="'Puntual'"
              :rules="[v => v!== null || 'Este campo es requerido']"
              @SelectedItem="form.p1 = $event"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            sm="12"
            class="py-0"
          >
            <answer-select
              :default-selected="form.p2"
              :readonly="!isEditing"
              :disabled="!isEditing"
              :label="'Tímido/a'"
              :rules="[v => v!== null || 'Este campo es requerido']"
              @SelectedItem="form.p2 = $event"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            sm="12"
            class="py-0"
          >
            <answer-select
              :default-selected="form.p3"
              :readonly="!isEditing"
              :disabled="!isEditing"
              :label="'Alegre'"
              :rules="[v => v!== null || 'Este campo es requerido']"
              @SelectedItem="form.p3 = $event"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            sm="12"
            class="py-0"
          >
            <answer-select
              :default-selected="form.p4"
              :readonly="!isEditing"
              :disabled="!isEditing"
              :label="'Agresivo/a'"
              :rules="[v => v!== null || 'Este campo es requerido']"
              @SelectedItem="form.p4 = $event"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            sm="12"
            class="py-0"
          >
            <answer-select
              :default-selected="form.p5"
              :readonly="!isEditing"
              :disabled="!isEditing"
              :label="'Abierto/a a las ideas de otros'"
              :rules="[v => v!== null || 'Este campo es requerido']"
              @SelectedItem="form.p5 = $event"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            sm="12"
            class="py-0"
          >
            <answer-select
              :default-selected="form.p6"
              :readonly="!isEditing"
              :disabled="!isEditing"
              :label="'Reflexivo/a'"
              :rules="[v => v!== null || 'Este campo es requerido']"
              @SelectedItem="form.p6 = $event"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            sm="12"
            class="py-0"
          >
            <answer-select
              :default-selected="form.p7"
              :readonly="!isEditing"
              :disabled="!isEditing"
              :label="'Constante'"
              :rules="[v => v!== null || 'Este campo es requerido']"
              @SelectedItem="form.p7 = $event"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            sm="12"
            class="py-0"
          >
            <answer-select
              :default-selected="form.p8"
              :readonly="!isEditing"
              :disabled="!isEditing"
              :label="'Optimista'"
              :rules="[v => v!== null || 'Este campo es requerido']"
              @SelectedItem="form.p8 = $event"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            sm="12"
            class="py-0"
          >
            <answer-select
              :default-selected="form.p9"
              :readonly="!isEditing"
              :disabled="!isEditing"
              :label="'Impulsivo/a'"
              :rules="[v => v!== null || 'Este campo es requerido']"
              @SelectedItem="form.p9 = $event"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            sm="12"
            class="py-0"
          >
            <answer-select
              :default-selected="form.p10"
              :readonly="!isEditing"
              :disabled="!isEditing"
              :label="'Silencioso/a'"
              :rules="[v => v!== null || 'Este campo es requerido']"
              @SelectedItem="form.p10 = $event"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            sm="12"
            class="py-0"
          >
            <answer-select
              :default-selected="form.p11"
              :readonly="!isEditing"
              :disabled="!isEditing"
              :label="'Generoso/a'"
              :rules="[v => v!== null || 'Este campo es requerido']"
              @SelectedItem="form.p11 = $event"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            sm="12"
            class="py-0"
          >
            <answer-select
              :default-selected="form.p12"
              :readonly="!isEditing"
              :disabled="!isEditing"
              :label="'Inquieto/a'"
              :rules="[v => v!== null || 'Este campo es requerido']"
              @SelectedItem="form.p12 = $event"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            sm="12"
            class="py-0"
          >
            <answer-select
              :default-selected="form.p13"
              :readonly="!isEditing"
              :disabled="!isEditing"
              :label="'Cambios de humor'"
              :rules="[v => v!== null || 'Este campo es requerido']"
              @SelectedItem="form.p13 = $event"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            sm="12"
            class="py-0"
          >
            <answer-select
              :default-selected="form.p14"
              :readonly="!isEditing"
              :disabled="!isEditing"
              :label="'Dominante'"
              :rules="[v => v!== null || 'Este campo es requerido']"
              @SelectedItem="form.p14 = $event"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            sm="12"
            class="py-0"
          >
            <answer-select
              :default-selected="form.p15"
              :readonly="!isEditing"
              :disabled="!isEditing"
              :label="'Egoísta'"
              :rules="[v => v!== null || 'Este campo es requerido']"
              @SelectedItem="form.p15 = $event"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            sm="12"
            class="py-0"
          >
            <answer-select
              :default-selected="form.p16"
              :readonly="!isEditing"
              :disabled="!isEditing"
              :label="'Sumiso/a'"
              :rules="[v => v!== null || 'Este campo es requerido']"
              @SelectedItem="form.p16 = $event"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            sm="12"
            class="py-0"
          >
            <answer-select
              :default-selected="form.p17"
              :readonly="!isEditing"
              :disabled="!isEditing"
              :label="'Confiado/a en si mismo/a'"
              :rules="[v => v!== null || 'Este campo es requerido']"
              @SelectedItem="form.p17 = $event"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            sm="12"
            class="py-0"
          >
            <answer-select
              :default-selected="form.p18"
              :readonly="!isEditing"
              :disabled="!isEditing"
              :label="'Imaginativo/a'"
              :rules="[v => v!== null || 'Este campo es requerido']"
              @SelectedItem="form.p18 = $event"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            sm="12"
            class="py-0"
          >
            <answer-select
              :default-selected="form.p19"
              :readonly="!isEditing"
              :disabled="!isEditing"
              :label="'Con iniciativa propia'"
              :rules="[v => v!== null || 'Este campo es requerido']"
              @SelectedItem="form.p19 = $event"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            sm="12"
            class="py-0"
          >
            <answer-select
              :default-selected="form.p20"
              :readonly="!isEditing"
              :disabled="!isEditing"
              :label="'Sociable'"
              :rules="[v => v!== null || 'Este campo es requerido']"
              @SelectedItem="form.p20 = $event"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            sm="12"
            class="py-0"
          >
            <answer-select
              :default-selected="form.p21"
              :readonly="!isEditing"
              :disabled="!isEditing"
              :label="'Responsable'"
              :rules="[v => v!== null || 'Este campo es requerido']"
              @SelectedItem="form.p21 = $event"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            sm="12"
            class="py-0"
          >
            <answer-select
              :default-selected="form.p22"
              :readonly="!isEditing"
              :disabled="!isEditing"
              :label="'Perseverante'"
              :rules="[v => v!== null || 'Este campo es requerido']"
              @SelectedItem="form.p22 = $event"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            sm="12"
            class="py-0"
          >
            <answer-select
              :default-selected="form.p23"
              :readonly="!isEditing"
              :disabled="!isEditing"
              :label="'Motivado/a'"
              :rules="[v => v!== null || 'Este campo es requerido']"
              @SelectedItem="form.p23 = $event"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            sm="12"
            class="py-0"
          >
            <answer-select
              :default-selected="form.p24"
              :readonly="!isEditing"
              :disabled="!isEditing"
              :label="'Activo/a'"
              :rules="[v => v!== null || 'Este campo es requerido']"
              @SelectedItem="form.p24 = $event"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            sm="12"
            class="py-0"
          >
            <answer-select
              :default-selected="form.p25"
              :readonly="!isEditing"
              :disabled="!isEditing"
              :label="'Independiente/a'"
              :rules="[v => v!== null || 'Este campo es requerido']"
              @SelectedItem="form.p25 = $event"
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
  import { get } from 'vuex-pathify'
  import CaracteristicasPersonalesService from '../../../../services/student/interview/CaracteristicasPersonalesService'
  import AnswerSelect from './AnswerSelect'
  import ProgressBar from '../../../app/ProgressBar'
  import ActionNotifier from '../../../common/general/ActionNotifier'

  export default {
    name: 'CaracteristicasPersonalesForm',
    components: {
      ProgressBar,
      ActionNotifier,
      AnswerSelect,
    },
    props: {
      studentId: Number,
    },
    data: () => ({
      isEditing: false,
      isLoading: true,
      actionMessage: null,
      actionMessageColor: null,
      hasRecord: false,
      form: {
        p1: null,
        p2: null,
        p3: null,
        p4: null,
        p5: null,
        p6: null,
        p7: null,
        p8: null,
        p9: null,
        p10: null,
        p11: null,
        p12: null,
        p13: null,
        p14: null,
        p15: null,
        p16: null,
        p17: null,
        p18: null,
        p19: null,
        p20: null,
        p21: null,
        p22: null,
        p23: null,
        p24: null,
        p25: null,
      },
    }),
    computed: {
      showMiedos () {
        const requiered = ['Frecuente', 'Muy frecuente', 'A veces']
        const setRequiered = new Set(requiered)
        return setRequiered.has(this.form.p8)
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
      persist () {
        if (this.$refs.form.validate()) {
          this.isLoading = true
          if (!this.hasRecord) {
            this.createCaracteristicasPersonales()
          } else {
            this.updateCaracteristicasPersonales()
          }
        }
      },
      fillForm () {
        CaracteristicasPersonalesService.get(this.currentUser.id).then(
          (response) => {
            this.form.p1 = response.data.data.p1
            this.form.p2 = response.data.data.p2
            this.form.p3 = response.data.data.p3
            this.form.p4 = response.data.data.p4
            this.form.p5 = response.data.data.p5
            this.form.p6 = response.data.data.p6
            this.form.p7 = response.data.data.p7
            this.form.p8 = response.data.data.p8
            this.form.p9 = response.data.data.p9
            this.form.p10 = response.data.data.p10
            this.form.p11 = response.data.data.p11
            this.form.p12 = response.data.data.p12
            this.form.p13 = response.data.data.p13
            this.form.p14 = response.data.data.p14
            this.form.p15 = response.data.data.p15
            this.form.p16 = response.data.data.p16
            this.form.p17 = response.data.data.p17
            this.form.p18 = response.data.data.p18
            this.form.p19 = response.data.data.p19
            this.form.p20 = response.data.data.p20
            this.form.p21 = response.data.data.p21
            this.form.p22 = response.data.data.p22
            this.form.p23 = response.data.data.p23
            this.form.p24 = response.data.data.p24
            this.form.p25 = response.data.data.p25
            this.isLoading = false
            this.hasRecord = true
          },
        ).catch(
          (response) => {
            this.notify('No hay registro de área de características personales', 'error')
            this.isLoading = false
            return Promise.reject(response)
          },
        )
      },
      async createCaracteristicasPersonales () {
        await CaracteristicasPersonalesService.post(this.currentUser.id, this.form).then(
          (response) => {
            this.hasRecord = true
            this.notify('Creado correctamente', 'success')
          },
        ).catch(
          (response) => {
            this.notify('No se pudo guardar correctamente', 'error')
            this.isLoading = false
            return Promise.reject(response)
          },
        )
        this.isLoading = false
        this.isEditing = false
      },
      updateCaracteristicasPersonales () {
        CaracteristicasPersonalesService.put(this.currentUser.id, this.form).then(
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
      notify (message, type) {
        this.actionMessage = message
        this.actionMessageColor = type
        this.$refs.ActionNotifier.snackbar = true
      },
    },
  }
</script>
