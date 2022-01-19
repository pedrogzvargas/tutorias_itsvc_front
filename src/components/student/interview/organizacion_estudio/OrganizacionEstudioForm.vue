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
              label="A.- ¿Sueles dejar para el último la preparación de tus trabajos?"
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
              label="B.- ¿Crees que el sueño o el cansancio te impidan estudiar eficazmente en muchas ocasiones"
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
              label="C.- ¿Es frecuente que no termines tu tarea a tiempo?"
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
              label="D.- ¿Tiendes a emplear tiempo en leer revistas, ver televisión o charlar cuando debieras dedicarlos a estudiar?"
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
              label="E.- Tus actividades sociales o deportivas. ¿te llevan a descuidar, a menudo, tus tareas escolares?"
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
              label="F.- ¿Sueles dejar pasar un día o más antes de repasar los apuntes tomados en clase?"
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
              label="G.- ¿Sueles dedicar tu tiempo libre entre las 4:00 de la tarde y las 9:00 de la noche a otras actividades que no sean estudiar?"
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
              label="H.- ¿Descubres algunas veces de pronto, que debes entregar una tarea antes de lo que creías?"
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
              label="I.- ¿Te retrasas, con frecuencia, en una asignatura debido a que tienes que estudiar otra?"
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
              label="J.- ¿Te parece que tu rendimiento es muy bajo, en relación con el tiempo que dedicas al estudio?"
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
              label="K.- ¿Está situado tu escritorio directamente frente a una ventana, puerta u otra fuente de distracción?"
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
              label="L.- ¿Sueles tener fotografías, trofeos o recuerdos sobre tu mesa de escritorio?"
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
              label="M.- ¿Sueles estudiar recostado en la cama o arrellanado en un asiento cómodo?"
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
              label="N.- ¿Produce resplandor la lámpara que utilizas al estudiar?"
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
              label="O.- Tu mesa de estudio ¿está tan desordenada y llena de objetos, que no dispones de sitio suficiente para estudiar con eficacia?"
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
              label="P.- ¿Sueles interrumpir tu estudio, por personas que vienen a visitarte?"
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
              label="Q.- ¿Estudias, con frecuencia, mientras tienes puesta la televisión y/o la radio?"
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
              label="R.- En el lugar donde estudias, ¿se pueden ver con facilidad revistas, fotos de jóvenes o materiales pertenecientes a tu afición?"
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
              label="S.- ¿Con frecuencia, interrumpen tu estudio, actividades o ruidos que provienen del exterior?"
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
              label="T.- ¿Suele hacerse lento tu estudio debido a que no tienes a la mano los libros y los materiales necesarios?"
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
  import OrganizacionEstudioService from '../../../../services/student/interview/OrganizacionEstudioService'
  import ProgressBar from '../../../app/ProgressBar'
  import ActionNotifier from '../../../common/general/ActionNotifier'
  import BooleanSelect from '../../../common/general/BooleanSelect'

  export default {
    name: 'OrganizacionEstudioForm',
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
            this.createOrganizacionEstudio()
          } else {
            this.updateOrganizacionEstudio()
          }
        }
      },
      fillForm () {
        OrganizacionEstudioService.get(this.currentUser.id).then(
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
      async createOrganizacionEstudio () {
        await OrganizacionEstudioService.post(this.currentUser.id, this.form).then(
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
      async updateOrganizacionEstudio () {
        await OrganizacionEstudioService.put(this.currentUser.id, this.form).then(
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
