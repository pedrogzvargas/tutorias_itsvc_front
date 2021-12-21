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
            <boolean-select
              :default-selected="form.p1"
              :readonly="!isEditing"
              :disabled="!isEditing"
              label="A.- Después de los primeros días o semanas del curso, ¿tiendes a perder interés por el estudio?"
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
            <boolean-select
              :default-selected="form.p2"
              :readonly="!isEditing"
              :disabled="!isEditing"
              label='B.- ¿Crees que en general, basta estudiar lo necesario para obtener un "aprobado” en las asignaturas?'
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
            <boolean-select
              :default-selected="form.p3"
              :readonly="!isEditing"
              :disabled="!isEditing"
              label="C.- ¿Te sientes frecuentemente confuso o indeciso sobre cuáles deben ser tus metas formativas y profesionales?"
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
              :default-selected="form.p4"
              :readonly="!isEditing"
              :disabled="!isEditing"
              label="D.- ¿Sueles pensar que no vale la pena el tiempo y el esfuerzo que son necesarios para lograr una educación universitaria?"
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
            <boolean-select
              :default-selected="form.p5"
              :readonly="!isEditing"
              :disabled="!isEditing"
              label="E.- ¿Crees que es más importante divertirte y disfrutar de la vida, que estudiar?"
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
            <boolean-select
              :default-selected="form.p6"
              :readonly="!isEditing"
              :disabled="!isEditing"
              label="F.- ¿Sueles pasar el tiempo de clase en divagaciones o soñando despierto en lugar de atender al docente?"
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
            <boolean-select
              :default-selected="form.p7"
              :readonly="!isEditing"
              :disabled="!isEditing"
              label="G.- ¿Te sientes habitualmente incapaz de concentrarte en tus estudios debido a que estas inquieto, aburrido o de mal humor?"
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
            <boolean-select
              :default-selected="form.p8"
              :readonly="!isEditing"
              :disabled="!isEditing"
              label="H.- ¿Piensas con frecuencia que las asignaturas que estudias tienen poco valor practico para ti?"
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
            <boolean-select
              :default-selected="form.p9"
              :readonly="!isEditing"
              :disabled="!isEditing"
              label="I.- ¿Sientes, frecuentes deseos de abandonar la escuela y conseguir un trabajo?"
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
            <boolean-select
              :default-selected="form.p10"
              :readonly="!isEditing"
              :disabled="!isEditing"
              label="J.- ¿Sueles tener la sensación de lo que se enseña en los centros docentes no te prepara para afrontar los problemas de la vida adulta?"
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
            <boolean-select
              :default-selected="form.p11"
              :readonly="!isEditing"
              :disabled="!isEditing"
              label="K.- ¿Sueles dedicarte de modo casual, según el estado de ánimo en que te encuentres?"
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
            <boolean-select
              :default-selected="form.p12"
              :readonly="!isEditing"
              :disabled="!isEditing"
              label="L.- ¿Te horroriza estudiar libros de textos porque son insípidos y aburridos?"
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
            <boolean-select
              :default-selected="form.p13"
              :readonly="!isEditing"
              :disabled="!isEditing"
              label="M.- ¿Esperas normalmente a que te fijen la fecha de un evaluación para comenzar a estudiar los textos o repasar tus apuntes de clases?"
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
            <boolean-select
              :default-selected="form.p14"
              :readonly="!isEditing"
              :disabled="!isEditing"
              label="N - ¿Sueles pensar que los exámenes son pruebas penosas de las que no se puede escapar y respecto a las cuales lo que debe hacerse es sobrevivir, del modo que sea?"
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
              label="O.- ¿Sientes con frecuencia que tus docentes no comprenden las necesidades de los estudiantes?"
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
            <boolean-select
              :default-selected="form.p16"
              :readonly="!isEditing"
              :disabled="!isEditing"
              label="P.- ¿Tienes normalmente la sensación de que tus docentes exigen demasiadas horas de estudio fuera de clase?"
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
            <boolean-select
              :default-selected="form.p17"
              :readonly="!isEditing"
              :disabled="!isEditing"
              label="Q.- ¿Dudas por lo general, en pedir ayuda a tus docentes en tareas que te son difíciles?"
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
            <boolean-select
              :default-selected="form.p18"
              :readonly="!isEditing"
              :disabled="!isEditing"
              label="R.- ¿Sueles pensar que tus docentes no tienen contacto con los temas y sucesos de actualidad?"
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
            <boolean-select
              :default-selected="form.p19"
              :readonly="!isEditing"
              :disabled="!isEditing"
              label="S.- ¿Te sientes reacio, por lo general, a hablar con tus docentes de tus proyectos futuros, de estudio o profesionales?"
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
            <boolean-select
              :default-selected="form.p20"
              :readonly="!isEditing"
              :disabled="!isEditing"
              label="T.- ¿Criticas con frecuencia a tus docentes cuando charlas con tus compañeros?"
              :rules="[v => v!== null || 'Este campo es requerido']"
              @SelectedItem="form.p20 = $event"
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
  import MotivacionEstudioService from '../../../../services/student/interview/MotivacionEstudioService'
  import ProgressBar from '../../../app/ProgressBar'
  import ActionNotifier from '../../../common/general/ActionNotifier'
  import BooleanSelect from '../../../common/general/BooleanSelect'

  export default {
    name: 'MotivacionEstudioForm',
    components: {
      ProgressBar,
      ActionNotifier,
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
      },
    }),
    computed: {
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
            this.createMotivacionEstudio()
          } else {
            this.updateMotivacionEstudio()
          }
        }
      },
      fillForm () {
        MotivacionEstudioService.get(this.currentUser.id).then(
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
            this.isLoading = false
            this.hasRecord = true
          },
        ).catch(
          (response) => {
            this.notify('No hay registro de Organizacion del Estudio', 'error')
            this.isLoading = false
            return Promise.reject(response)
          },
        )
      },
      createMotivacionEstudio () {
        MotivacionEstudioService.post(this.currentUser.id, this.form).then(
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
      updateMotivacionEstudio () {
        MotivacionEstudioService.put(this.currentUser.id, this.form).then(
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
