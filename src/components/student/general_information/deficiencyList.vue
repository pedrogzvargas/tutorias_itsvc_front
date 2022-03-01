<template>
  <div>
    <progress-bar v-if="isLoading" />
    <deficiency-modal-form
      ref="deficiencyModalForm"
      :mode="deficiencyModelMode"
      :current-record="selectedDeficiency"
      @listUpdated="fillDeficiencies"
    />
    <confirmation-modal
      ref="confirmationModal"
      :message="confirmationModalMessage"
      @agree="deleteDeficiency"
    />
    <action-notifier
      ref="ActionNotifier"
      :text="actionMessage"
      :color="actionMessageColor"
    />
    <v-simple-table v-if="!isLoading">
      <thead>
        <tr>
          <th class="primary--text">
            #
          </th>
          <th class="primary--text">
            Deficiencia
          </th>
          <th class="primary--text">
            Descripción
          </th>
          <th class="primary--text">
            Acciones
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(deficiency, index) in deficiencies"
          :key="deficiency.id"
        >
          <td>{{ index +1 }}</td>
          <td>{{ deficiency.disability_name }}</td>
          <td>{{ deficiency.description }}</td>
          <td class="text-right">
            <v-row>
              <v-col
                cols="auto"
              >
                <v-icon
                  class="mx-1"
                  @click="showDeficiencyFormAsEdition(deficiency)"
                >
                  mdi-pencil
                </v-icon>

                <v-icon
                  class="mx-1"
                  color="error"
                  @click="showConfirmationModal(deficiency)"
                >
                  mdi-close
                </v-icon>
              </v-col>
            </v-row>
          </td>
        </tr>
      </tbody>
    </v-simple-table>
  </div>
</template>
<script>
  import MedicalInformationService from '../../../services/student/MedicalInformationService'
  import ProgressBar from '../../app/ProgressBar'
  import ConfirmationModal from '../../common/utils/ConfirmationModal'
  import DeficiencyModalForm from '../../student/general_information/deficiencyModalForm'
  import ActionNotifier from '../../common/general/ActionNotifier'
  import { get } from 'vuex-pathify'
  export default {
    name: 'DeficiencyList',
    components: {
      ProgressBar,
      ConfirmationModal,
      ActionNotifier,
      DeficiencyModalForm,
    },
    props: {
      studentId: Number,
    },
    data: () => ({
      dialog: false,
      isLoading: true,
      deficiencies: [],
      deficiencyModelMode: null,
      selectedDeficiency: null,
      confirmationModalMessage: '¿Estas seguro que deseas eliminar este instituto?',
      actionMessage: null,
      actionMessageColor: null,
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
      this.fillDeficiencies()
    },
    methods: {
      async fillDeficiencies () {
        await MedicalInformationService.get(this.currentUser.id).then(
          (response) => {
            this.deficiencies = response.data.data
          },
        ).catch(
          (response) => {
            this.notify('No hay deficiencias registradas', 'warning')
            this.isLoading = false
            return Promise.reject(response)
          },
        )
        this.isLoading = false
      },
      showDeficiencyFormAsEdition (value) {
        this.deficiencyModelMode = 'edit'
        this.selectedDeficiency = value
        this.$refs.deficiencyModalForm.show = true
      },
      showDeficiencyFormAsCreation (value) {
        this.selectedDeficiency = null
        this.deficiencyModelMode = 'create'
        this.$refs.deficiencyModalForm.show = true
      },
      showConfirmationModal (institute) {
        this.selectedDeficiency = institute
        this.$refs.confirmationModal.dialog = true
      },
      deleteDeficiency () {
        MedicalInformationService.delete(this.currentUser.id, this.selectedDeficiency.id).then(
          (response) => {
            this.fillDeficiencies()
            this.notify('Eliminado correctamente', 'success')
          },
        ).catch(
          (response) => {
            this.notify('No se pudo eliminar el registro', 'warning')
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
