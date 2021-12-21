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
              label="1.- Me ayuda trazar o escribir a mano las palabras cuando tengo que aprenderlas de memoria."
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
              label="2.- Recuerdo mejor un tema al escuchar una conferencia en vez de leer un libro de texto."
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
              label="3.- Prefiero las clases que requieren una prueba sobre lo que se lee en el libro de texto."
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
              label="4.- Me gusta comer bocados y mascar chicle, cuando estudio."
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
              label="5.- Al prestar atención a una conferencia, puedo recordar las ideas principales sin anotarlas."
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
              label="6.- Prefiero las instrucciones escritas sobre las orales."
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
              label="7.- Yo resuelvo bien los rompecabezas y los laberintos."
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
              label="8.- Prefiero las clases que requieran una prueba sobre lo que se presenta durante una conferencia."
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
              label="9.- Me ayuda ver diapositivas y videos para comprender un tema."
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
              label="10.- Recuerdo más cuando leo un libro que cuando escucho una conferencia."
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
              label="11.- Por lo general, tengo que escribir los números del teléfono para recordarlos bien."
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
              label="12.- Prefiero recibir las noticias escuchando la radio en vez de leerlas en un periódico."
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
              label="13.- Me gusta tener algo como un bolígrafo o un lápiz en la mano cuando estudio."
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
              label="14.- Necesito copiar los ejemplos de la pizarra del maestro para examinarlos más tarde."
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
              label="15.- Prefiero las instrucciones orales del maestro a aquellas escritas en un examen o en la pizarra."
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
              label="16.- Prefiero que un libro de texto tenga diagramas gráficos y cuadros porque me ayudan mejor a entender el material."
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
              label="17.- Me gusta escuchar música al estudiar una obra, novela, etc."
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
              label="18.- Tengo que apuntar listas de cosas que quiero hacer para recordarlas."
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
              label="19.- Puedo corregir mi tarea examinándola y encontrando la mayoría de los errores."
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
              label="20.- Prefiero leer el periódico en vez de escuchar las noticias."
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
              label="21.- Puedo recordar los números de teléfono cuando los oigo."
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
              label="22.- Gozo el trabajo que me exige usar la mano o herramientas."
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
              label="23.- Cuando escribo algo, necesito leerlo en voz alta para oír como suena."
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
              label="24.- Puedo recordar mejor las cosas cuando puedo moverme mientras estoy aprendiéndolas, por ej. caminar al estudiar, o participar en una actividad que me permita moverme, etc."
              :rules="[v => v!== null || 'Este campo es requerido']"
              @SelectedItem="form.p24 = $event"
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
  import EstiloAprendizajeService from '../../../../services/student/interview/EstiloAprendizajeService'
  import ProgressBar from '../../../app/ProgressBar'
  import ActionNotifier from '../../../common/general/ActionNotifier'
  import AnswerSelect from './AnswerSelect'

  export default {
    name: 'EstiloAprendizajeForm',
    components: {
      AnswerSelect,
      ProgressBar,
      ActionNotifier,
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
        p21: null,
        p22: null,
        p23: null,
        p24: null,
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
            this.createOrganizacionEstudio()
          } else {
            this.updateOrganizacionEstudio()
          }
        }
      },
      fillForm () {
        EstiloAprendizajeService.get(this.currentUser.id).then(
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
      createOrganizacionEstudio () {
        EstiloAprendizajeService.post(this.currentUser.id, this.form).then(
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
      updateOrganizacionEstudio () {
        EstiloAprendizajeService.put(this.currentUser.id, this.form).then(
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
