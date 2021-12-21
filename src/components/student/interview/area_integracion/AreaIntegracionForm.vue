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
        <p class="text-h3 pa-6 py-1">Área familiar</p>
        <v-row>
          <v-col
            cols="12"
            sm="6"
            class="py-0"
          >
            <answer-select
              :default-selected="form.p1"
              :readonly="!isEditing"
              :disabled="!isEditing"
              :label="'¿Cómo es la relación con tu familia?'"
              :rules="[v => v!== null || 'Este campo es requerido']"
              @SelectedItem="form.p1 = $event"
            />
          </v-col>
          <v-col
            cols="12"
            sm="6"
            class="py-0"
          >
            <answer-select
              :default-selected="form.p3"
              :readonly="!isEditing"
              :disabled="!isEditing"
              :label="'¿Qué actitud tienes con tu familia?'"
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
            <boolean-select
              :default-selected="form.p2"
              :readonly="!isEditing"
              :disabled="!isEditing"
              :label="'¿Existen dificultades?'"
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
            <v-textarea
              v-if="form.p2"
              v-model="form.p2_1"
              outlined
              rows="3"
              name="input-7-4"
              label="Especifica las dificultades"
              :value="form.p2_1"
              :readonly="!isEditing"
              :disabled="!isEditing"
            />
          </v-col>
        </v-row>
        <v-divider />
        <p class="text-h3 pa-6 py-1">El padre</p>
        <v-row>
          <v-col
            cols="12"
            sm="6"
            class="py-0"
          >
            <answer1-select
              :default-selected="form.p4"
              :readonly="!isEditing"
              :disabled="!isEditing"
              :label="'¿Cómo te relacionas con tu Padre?'"
              :rules="[v => v!== null || 'Este campo es requerido']"
              @SelectedItem="form.p4 = $event"
            />
          </v-col>
          <v-col
            cols="12"
            sm="6"
            class="py-0"
          >
            <answer-select
              :default-selected="form.p5"
              :readonly="!isEditing"
              :disabled="!isEditing"
              :label="'¿Qué actitud tienes hacia tu Padre?'"
              :rules="[v => v!== null || 'Este campo es requerido']"
              @SelectedItem="form.p5 = $event"
            />
          </v-col>
        </v-row>
        <v-divider />
        <p class="text-h3 pa-6 py-1">La madre</p>
        <v-row>
          <v-col
            cols="12"
            sm="6"
            class="py-0"
          >
            <answer1-select
              :default-selected="form.p6"
              :readonly="!isEditing"
              :disabled="!isEditing"
              :label="'¿Cómo te relacionas con tu Madre?'"
              :rules="[v => v!== null || 'Este campo es requerido']"
              @SelectedItem="form.p6 = $event"
            />
          </v-col>
          <v-col
            cols="12"
            sm="6"
            class="py-0"
          >
            <answer-select
              :default-selected="form.p7"
              :readonly="!isEditing"
              :disabled="!isEditing"
              :label="'¿Qué actitud tienes hacia tu Madre?'"
              :rules="[v => v!== null || 'Este campo es requerido']"
              @SelectedItem="form.p7 = $event"
            />
          </v-col>
        </v-row>
        <v-divider />
        <v-row>
          <v-col
            cols="12"
            sm="12"
          >
            <answer-relative-select
              :default-selected="form.p8"
              :readonly="!isEditing"
              :disabled="!isEditing"
              :label="'¿Con quién te sientes mas ligado afectivamente?'"
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
              v-model="form.p8_1"
              outlined
              rows="3"
              name="input-7-4"
              label="Especifica por qué"
              :rules="[v => !!v || 'Este campo es requerido']"
              :value="form.p8_1"
              :readonly="!isEditing"
              :disabled="!isEditing"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            sm="6"
            class="py-0"
          >
            <answer-relative-select
              :default-selected="form.p9"
              :readonly="!isEditing"
              :disabled="!isEditing"
              :label="'¿Quién se ocupa más directamente de tu educación?'"
              :rules="[v => v!== null || 'Este campo es requerido']"
              @SelectedItem="form.p9 = $event"
            />
          </v-col>
          <v-col
            cols="12"
            sm="6"
            class="py-0"
          >
            <answer-relative-select
              :default-selected="form.p10"
              :readonly="!isEditing"
              :disabled="!isEditing"
              :label="'¿Quién ha influido más en tu decisión para estudiar esta carrera?'"
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
            <v-textarea
              v-model="form.p11"
              outlined
              rows="3"
              name="input-7-4"
              label="Consideras importante facilitar algún otro dato sobre tu ambiente familiar"
              :value="form.p11"
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
              :default-selected="form.p12"
              :readonly="!isEditing"
              :disabled="!isEditing"
              :label="'¿Cómo es tu relación con los compañeros?'"
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
            <v-textarea
              v-model="form.p13"
              outlined
              rows="3"
              name="input-7-4"
              label="¿Por qué?"
              :value="form.p13"
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
              :default-selected="form.p14"
              :readonly="!isEditing"
              :disabled="!isEditing"
              :label="'¿Cómo es tu relación con tus amigos?'"
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
            <boolean-select
              :default-selected="form.p15"
              :readonly="!isEditing"
              :disabled="!isEditing"
              :label="'¿Tienes Pareja?'"
              :rules="[v => v!== null || 'Este campo es requerido']"
              @SelectedItem="form.p15 = $event"
            />
          </v-col>
        </v-row>
        <v-row v-if="form.p15">
          <v-col
            cols="12"
            sm="12"
            class="py-0"
          >
            <v-textarea
              v-model="form.p15_1"
              outlined
              rows="3"
              name="input-7-4"
              label="¿Cómo es tu relación con tu pareja?"
              :value="form.p15_1"
              :readonly="!isEditing"
              :disabled="!isEditing"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            sm="6"
            class="py-0"
          >
            <answer-select
              :default-selected="form.p16"
              :readonly="!isEditing"
              :disabled="!isEditing"
              :label="'¿Cómo es tu relación con tus profesores?'"
              :rules="[v => v!== null || 'Este campo es requerido']"
              @SelectedItem="form.p16 = $event"
            />
          </v-col>
          <v-col
            cols="12"
            sm="6"
            class="py-0"
          >
            <answer-select
              :default-selected="form.p17"
              :readonly="!isEditing"
              :disabled="!isEditing"
              :label="'¿Cómo es tu relación con las autoridades académicas? '"
              :rules="[v => v!== null || 'Este campo es requerido']"
              @SelectedItem="form.p17 = $event"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            sm="6"
            class="py-0"
          >
            <v-textarea
              v-model="form.p18"
              outlined
              rows="3"
              name="input-7-4"
              label="¿Qué haces en tu tiempo libre?"
              :value="form.p18"
              :rules="[v => !!v || 'Este campo es requerido']"
              :readonly="!isEditing"
              :disabled="!isEditing"
            />
          </v-col>
          <v-col
            cols="12"
            sm="6"
            class="py-0"
          >
            <v-textarea
              v-model="form.p19"
              outlined
              rows="3"
              name="input-7-4"
              label="¿Cuál es tu actividad recreativa?"
              :value="form.p19"
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
  import AreaIntegracionService from '../../../../services/student/interview/AreaIntegracionService'
  import AnswerSelect from './AnswerSelect'
  import Answer1Select from './Answer1Select'
  import AnswerRelativeSelect from './AnswerRelativeSelect'
  import BooleanSelect from '../../../common/general/BooleanSelect'
  import ProgressBar from '../../../app/ProgressBar'
  import ActionNotifier from '../../../common/general/ActionNotifier'

  export default {
    name: 'AreaIntegracionForm',
    components: {
      ProgressBar,
      ActionNotifier,
      AnswerSelect,
      BooleanSelect,
      Answer1Select,
      AnswerRelativeSelect,
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
        p2_1: null,
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
        p13: null,
        p14: null,
        p15: null,
        p15_1: null,
        p16: null,
        p17: null,
        p18: null,
        p19: null,
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
            this.createAreaIntegracion()
          } else {
            this.updateAreaIntegracion()
          }
        }
      },
      fillForm () {
        AreaIntegracionService.get(this.currentUser.id).then(
          (response) => {
            this.form.p1 = response.data.data.p1
            this.form.p2 = response.data.data.p2
            this.form.p2_1 = response.data.data.p2_1
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
            this.form.p13 = response.data.data.p13
            this.form.p14 = response.data.data.p14
            this.form.p15 = response.data.data.p15
            this.form.p15_1 = response.data.data.p15_1
            this.form.p16 = response.data.data.p16
            this.form.p17 = response.data.data.p17
            this.form.p18 = response.data.data.p18
            this.form.p19 = response.data.data.p19
            this.isLoading = false
            this.hasRecord = true
          },
        ).catch(
          (response) => {
            this.notify('No hay registro de área de integración', 'error')
            this.isLoading = false
            return Promise.reject(response)
          },
        )
      },
      createAreaIntegracion () {
        AreaIntegracionService.post(this.currentUser.id, this.form).then(
          (response) => {
            this.isLoading = false
            this.isEditing = false
            this.notify('Creado correctamente', 'success')
          },
        ).catch(
          (response) => {
            this.notify('No se pudo guardar correctamente', 'error')
            this.isLoading = false
            return Promise.reject(response)
          },
        )
      },
      updateAreaIntegracion () {
        AreaIntegracionService.put(this.currentUser.id, this.form).then(
          (response) => {
            this.isLoading = false
            this.isEditing = false
            this.notify('Actualizado correctamente', 'success')
          },
        ).catch(
          (response) => {
            this.notify('No se pudo guardar correctamente', 'error')
            this.isLoading = false
            return Promise.reject(response)
          },
        )
      },
      notify (message, type) {
        this.actionMessage = message
        this.actionMessageColor = type
        this.$refs.ActionNotifier.snackbar = true
      },
    },
  }
</script>
