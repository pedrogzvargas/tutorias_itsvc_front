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
            <v-textarea
              v-model="form.p1"
              outlined
              rows="3"
              name="input-7-4"
              label="¿Cómo te gustaría ser?"
              :value="form.p1"
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
            class="py-0"
          >
            <boolean-select
              :default-selected="form.p2"
              :readonly="!isEditing"
              :disabled="!isEditing"
              :label="'¿Recibes ayuda en tu casa para la realización de tareas escolares?'"
              :rules="[v => v!== null || 'Este campo es requerido']"
              @SelectedItem="form.p2 = $event"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            sm="6"
            class="py-0"
          >
            <answer-problems-select
              :default-selected="form.p3"
              :readonly="!isEditing"
              :disabled="!isEditing"
              :label="'¿Qué problemas personales intervienen en tus estudios?'"
              :rules="[v => v!== null || 'Este campo es requerido']"
              @SelectedItem="form.p3 = $event"
            />
          </v-col>
          <v-col
            cols="12"
            sm="6"
            class="py-0"
          >
            <answer-select
              :default-selected="form.p4"
              :readonly="!isEditing"
              :disabled="!isEditing"
              :label="'¿Cuál es tu rendimiento escolar?'"
              :rules="[v => v!== null || 'Este campo es requerido']"
              @SelectedItem="form.p4 = $event"
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
              v-model="form.p5"
              outlined
              rows="3"
              name="input-7-4"
              label="¿Por qué vienes al Tecnológico?"
              :value="form.p5"
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
              v-model="form.p6"
              outlined
              rows="3"
              name="input-7-4"
              label="¿Qué te motiva para venir al Tecnológico?"
              :value="form.p6"
              :rules="[v => !!v || 'Este campo es requerido']"
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
            <v-text-field
              v-model="form.p7"
              outlined
              rows="3"
              name="input-7-4"
              label="¿Cuál es tu promedio general del ciclo escolar anterior?"
              :value="form.p7"
              :rules="[v => !!v || 'Este campo es requerido']"
              :readonly="!isEditing"
              :disabled="!isEditing"
            />
          </v-col>
          <v-col
            cols="12"
            sm="4"
            class="py-0"
          >
            <boolean-select
              :default-selected="form.p8"
              :readonly="!isEditing"
              :disabled="!isEditing"
              :label="'¿Tienes asignaturas reprobadas?'"
              :rules="[v => v!== null || 'Este campo es requerido']"
              @SelectedItem="form.p8 = $event"
            />
          </v-col>
          <v-col
            cols="12"
            sm="2"
            class="py-0"
          >
            <v-text-field
              v-model="form.p8_1"
              outlined
              rows="3"
              name="input-7-4"
              label="¿Cuántas?"
              :value="form.p8_1"
              :rules="subjectsNUmberRules"
              :readonly="!isEditing"
              :disabled="!isEditing"
            />
          </v-col>
        </v-row>
        <p class="text-h3 pa-6 py-1">Plan de vida y carrera</p>
        <v-row>
          <v-col
            cols="12"
            sm="6"
            class="py-0"
          >
            <v-textarea
              v-model="form.p9"
              outlined
              rows="3"
              name="input-7-4"
              label="¿Cuáles son tus planes inmediatos?"
              :value="form.p9"
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
              v-model="form.p10"
              outlined
              rows="3"
              name="input-7-4"
              label="¿Cuáles son tus metas en la vida?"
              :value="form.p10"
              :rules="[v => !!v || 'Este campo es requerido']"
              :readonly="!isEditing"
              :disabled="!isEditing"
            />
          </v-col>
        </v-row>
        <p class="text-h3 pa-6 py-1">Características Personales</p>
        <v-row>
          <v-col
            cols="12"
            sm="4"
            class="py-0"
          >
            <v-textarea
              v-model="form.p11"
              outlined
              rows="3"
              name="input-7-4"
              label="Yo Soy..."
              :value="form.p11"
              :rules="[v => !!v || 'Este campo es requerido']"
              :readonly="!isEditing"
              :disabled="!isEditing"
            />
          </v-col>
          <v-col
            cols="12"
            sm="4"
            class="py-0"
          >
            <v-textarea
              v-model="form.p12"
              outlined
              rows="3"
              name="input-7-4"
              label="Mi Carácter es..."
              :value="form.p12"
              :rules="[v => !!v || 'Este campo es requerido']"
              :readonly="!isEditing"
              :disabled="!isEditing"
            />
          </v-col>
          <v-col
            cols="12"
            sm="4"
            class="py-0"
          >
            <v-textarea
              v-model="form.p13"
              outlined
              rows="3"
              name="input-7-4"
              label="A mí me gusta que..."
              :value="form.p13"
              :rules="[v => !!v || 'Este campo es requerido']"
              :readonly="!isEditing"
              :disabled="!isEditing"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            sm="4"
            class="py-0"
          >
            <v-textarea
              v-model="form.p14"
              outlined
              rows="3"
              name="input-7-4"
              label="Yo Aspiro en la Vida..."
              :value="form.p14"
              :rules="[v => !!v || 'Este campo es requerido']"
              :readonly="!isEditing"
              :disabled="!isEditing"
            />
          </v-col>
          <v-col
            cols="12"
            sm="4"
            class="py-0"
          >
            <v-textarea
              v-model="form.p15"
              outlined
              rows="3"
              name="input-7-4"
              label="Yo tengo miedo que..."
              :value="form.p15"
              :rules="[v => !!v || 'Este campo es requerido']"
              :readonly="!isEditing"
              :disabled="!isEditing"
            />
          </v-col>
          <v-col
            cols="12"
            sm="4"
            class="py-0"
          >
            <v-textarea
              v-model="form.p16"
              outlined
              rows="3"
              name="input-7-4"
              label="Pero pienso que podré lograr..."
              :value="form.p16"
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
  import { get } from 'vuex-pathify'
  import AreaPsicopedagogicaService from '../../../../services/student/interview/AreaPsicopedagogicaService'
  import ProgressBar from '../../../app/ProgressBar'
  import ActionNotifier from '../../../common/general/ActionNotifier'
  import BooleanSelect from '../../../common/general/BooleanSelect'
  import AnswerSelect from './AnswerSelect'
  import AnswerProblemsSelect from './AnswerProblemsSelect'

  export default {
    name: 'AreaPsicopedagogicaForm',
    components: {
      ProgressBar,
      ActionNotifier,
      AnswerSelect,
      AnswerProblemsSelect,
      BooleanSelect,
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
        p8_1: null,
        p9: null,
        p10: null,
        p11: null,
        p12: null,
        p13: null,
        p14: null,
        p15: null,
        p16: null,
      },
    }),
    computed: {
      showMiedos () {
        const requiered = ['Frecuente', 'Muy frecuente', 'A veces']
        const setRequiered = new Set(requiered)
        return setRequiered.has(this.form.p8)
      },
      subjectsNUmberRules () {
        const rules = [v => !!v || 'Este campo es requerido']
        return this.form.p8 ? rules : []
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
            this.createAreaPsicopedagogica()
          } else {
            this.updateAreaPsicopedagogica()
          }
        }
      },
      fillForm () {
        AreaPsicopedagogicaService.get(this.currentUser.id).then(
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
            this.form.p13 = response.data.data.p13
            this.form.p14 = response.data.data.p14
            this.form.p15 = response.data.data.p15
            this.form.p16 = response.data.data.p16
            this.isLoading = false
            this.hasRecord = true
          },
        ).catch(
          (response) => {
            this.notify('No hay registro de área de área psicopedagógica', 'secondary')
            this.isLoading = false
            return Promise.reject(response)
          },
        )
      },
      async createAreaPsicopedagogica () {
        await AreaPsicopedagogicaService.post(this.currentUser.id, this.form).then(
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
      async updateAreaPsicopedagogica () {
        await AreaPsicopedagogicaService.put(this.currentUser.id, this.form).then(
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
