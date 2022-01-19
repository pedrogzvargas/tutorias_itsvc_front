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
              label="A.- ¿Tiendes a comenzar la lectura de un libro de texto sin hojear previamente los subtítulos y las ilustraciones?"
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
              label="B.- ¿Te saltas por lo general las figuras, gráficas y tablas cuando estudias un tema?"
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
              label="C.- ¿Suele serte difícil seleccionar los puntos de los temas de estudio?"
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
              label="D.- ¿Te sorprendes con cierta frecuencia, pensando en algo que no tiene nada que ver con lo que estudias?"
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
              label="E.- ¿Sueles tener dificultad en entender tus apuntes de clase cuando tratas de repasarlos, después de cierto tiempo?"
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
              label="F.- Al tomar notas, ¿te sueles quedar atrás con frecuencia debido a que no puedes escribir con suficiente rapidez?"
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
              label='G.- Poco después de comenzar un curso, ¿sueles encontrarte con tus apuntes formando un “revoltijo"?'
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
              label="H.- ¿Tomas normalmente tus apuntes tratando de escribir las palabras exactas del docente?"
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
              label="I.- Cuando tomas notas de un libro, ¿tienes la costumbre de copiar el material necesario, palabra por Palabra?"
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
              label="J.- ¿Te es difícil preparar un temario apropiado para una evaluación?"
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
              label="K.- ¿Tienes problemas para organizar los datos o el contenido de una evaluación?"
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
              label="L.- ¿Al repasar el temario de una evaluación formulas un resumen de este?"
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
              label="M.- ¿Te preparas a veces para un evaluación memorizando fórmulas, definiciones o reglas que no entiendes con claridad?"
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
              label="N.- ¿Te resulta difícil decidir qué estudiar y cómo estudiarlo cuando preparas una evaluación?"
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
              label="O.- ¿Sueles tener dificultades para organizar, en un orden lógico, las asignaturas que debes estudiar por temas?"
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
              label="P.- Al preparar evaluación, ¿sueles estudiar toda la asignatura, en el último momento?"
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
              label="Q.- ¿Sueles entregar tus exámenes sin revisarlos detenidamente, para ver si tienen algún error cometido por descuido?"
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
              label="R.- ¿Te es posible con frecuencia terminar una evaluación de exposición de un tema en el tiempo prescrito?"
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
              label='S.- ¿Sueles perder puntos en exámenes con preguntas de “Verdadero - falso", debido a que no lees detenidamente?'
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
              label="T.- ¿Empleas normalmente mucho tiempo en contestar la primera mitad de la prueba y tienes que apresurarte en la segunda?"
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
  import TecnicaEstudioService from '../../../../services/student/interview/TecnicaEstudioService'
  import ProgressBar from '../../../app/ProgressBar'
  import ActionNotifier from '../../../common/general/ActionNotifier'
  import BooleanSelect from '../../../common/general/BooleanSelect'

  export default {
    name: 'TecnicaEstudioForm',
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
            this.createTecnicaEstudio()
          } else {
            this.updateTecnicaEstudio()
          }
        }
      },
      fillForm () {
        TecnicaEstudioService.get(this.currentUser.id).then(
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
            this.notify('No hay registro de Técnicas de Estudio', 'error')
            this.isLoading = false
            return Promise.reject(response)
          },
        )
      },
      async createTecnicaEstudio () {
        await TecnicaEstudioService.post(this.currentUser.id, this.form).then(
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
      async updateTecnicaEstudio () {
        await TecnicaEstudioService.put(this.currentUser.id, this.form).then(
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
