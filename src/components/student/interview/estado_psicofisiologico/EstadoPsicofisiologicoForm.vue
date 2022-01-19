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
              :label="'Manos y/o pies hinchados'"
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
              :label="'Dolores en el Vientre'"
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
              :label="'Dolores de cabeza y/o vómitos'"
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
              :label="'Perdida de equilibrio'"
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
              :label="'Fatiga y agotamiento'"
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
              :label="'Perdida de vista u oído'"
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
              :label="'Dificultades para dormir'"
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
              :label="'Pesadillas o terrores nocturnos'"
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
            <v-textarea
              v-if="showMiedos"
              v-model="form.p8_1"
              outlined
              rows="3"
              name="input-7-4"
              label="Pesadillas o terrores nocturnosa que: "
              :rules="[v => v!== null || 'Este campo es requerido']"
              :value="form.p8_1"
              :readonly="!isEditing"
              :disabled="!isEditing"
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
              :label="'Incontinencia (orina, heces)'"
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
              :label="'Tartamudeos al explicarse'"
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
              :label="'Miedos intensos ante cosas'"
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
            <v-textarea
              v-model="form.p12"
              outlined
              rows="3"
              name="input-7-4"
              label="Observaciones de Higiene: "
              :value="form.p12"
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
  import { get } from 'vuex-pathify'
  import EstadoPsicofisiologicoService from '../../../../services/student/interview/EstadoPsicofisiologicoService'
  import ProgressBar from '../../../app/ProgressBar'
  import ActionNotifier from '../../../common/general/ActionNotifier'
  import AnswerSelect from './AnswerSelect'

  export default {
    name: 'EstadoPsicofisiologicoForm',
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
      hasRecord: null,
      form: {
        p1: null,
        p2: null,
        p3: null,
        p4: null,
        p5: null,
        p6: null,
        p7: null,
        p8: null,
        p8_1: null,
        p9: null,
        p10: null,
        p11: null,
        p12: null,
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
            this.createEstadoPsicofisiologico()
          } else {
            this.updateEstadoPsicofisiologico()
          }
        }
      },
      fillForm () {
        EstadoPsicofisiologicoService.get(this.currentUser.id).then(
          (response) => {
            this.form.p1 = response.data.data.p1
            this.form.p2 = response.data.data.p2
            this.form.p3 = response.data.data.p3
            this.form.p4 = response.data.data.p4
            this.form.p5 = response.data.data.p5
            this.form.p6 = response.data.data.p6
            this.form.p7 = response.data.data.p7
            this.form.p8 = response.data.data.p8
            this.form.p8_1 = response.data.data.p8_1
            this.form.p9 = response.data.data.p9
            this.form.p10 = response.data.data.p10
            this.form.p11 = response.data.data.p11
            this.form.p12 = response.data.data.p12
            this.isLoading = false
            this.hasRecord = true
          },
        ).catch(
          (response) => {
            this.notify('No hay registro de estado psicofisiológico', 'error')
            this.isLoading = false
            return Promise.reject(response)
          },
        )
      },
      async createEstadoPsicofisiologico () {
        await EstadoPsicofisiologicoService.post(this.currentUser.id, this.form).then(
          (response) => {
            this.hasRecord = true
            this.notify('Creado correctamente', 'success')
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
      async updateEstadoPsicofisiologico () {
        await EstadoPsicofisiologicoService.put(this.currentUser.id, this.form).then(
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
