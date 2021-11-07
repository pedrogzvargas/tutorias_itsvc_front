<template>
  <div>
    <progress-bar v-if="isLoading" />
    <institute-modal-form
      ref="instituteModalForm"
      :mode="instituteModelMode"
      :current-record="selectedInstitute"
      @listUpdated="fillInstitutes"
    />
    <confirmation-modal
      ref="confirmationModal"
      :message="confirmationModalMessage"
      @agree="deleteInstitute"
    />
    <action-notifier
      ref="ActionNotifier"
      :text="actionMessage"
      :color="actionMessageColor"
    />
    <v-simple-table>
      <thead>
        <tr>
          <th class="primary--text">
            #
          </th>
          <th class="primary--text">
            Nivel
          </th>
          <th class="primary--text">
            Nombre de la institución
          </th>
          <th class="primary--text">
            Periodo
          </th>
          <th class="primary--text">
            Acciones
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(institute, index) in institutes"
          :key="institute.id"
        >
          <td>{{ index +1 }}</td>
          <td>{{ institute.academic_degree_name }}</td>
          <td>{{ institute.institute_name }}</td>
          <td>{{ institute.start_date }} -- {{ institute.end_date }}</td>
          <td class="text-right">
            <v-row>
              <v-col
                cols="auto"
              >
                <v-icon
                  class="mx-1"
                  @click="showInstituteFormAsEdition(institute)"
                >
                  mdi-pencil
                </v-icon>

                <v-icon
                  class="mx-1"
                  color="error"
                  @click="showConfirmationModal(institute)"
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
  import { get } from 'vuex-pathify'
  import InstitutesService from '../../../services/student/InstitutesService'
  import ProgressBar from '../../app/ProgressBar'
  import InstituteModalForm from './InstituteModalForm'
  import ConfirmationModal from '../../common/utils/ConfirmationModal'
  import ActionNotifier from '../../common/general/ActionNotifier'
  export default {
    name: 'InstitutesList',
    components: {
      ProgressBar,
      InstituteModalForm,
      ConfirmationModal,
      ActionNotifier,
    },
    props: {
      studentId: Number,
    },
    data: () => ({
      dialog: false,
      isLoading: true,
      institutes: [],
      instituteModelMode: null,
      selectedInstitute: null,
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
      this.fillInstitutes()
    },
    methods: {
      fillInstitutes () {
        InstitutesService.get(this.currentUser.id).then(
          (response) => {
            this.institutes = response.data.data
            this.isLoading = false
          },
        ).catch(
          (response) => {
            this.notify('No se encontró historial academico', 'warning')
            this.isLoading = false
            return Promise.reject(response)
          },
        )
      },
      showInstituteFormAsEdition (value) {
        this.instituteModelMode = 'edit'
        this.selectedInstitute = value
        this.$refs.instituteModalForm.show = true
      },
      showInstituteFormAsCreation (value) {
        this.selectedInstitute = null
        this.instituteModelMode = 'create'
        this.$refs.instituteModalForm.show = true
      },
      showConfirmationModal (institute) {
        this.selectedInstitute = institute
        this.$refs.confirmationModal.dialog = true
      },
      deleteInstitute () {
        InstitutesService.delete(this.currentUser.id, this.selectedInstitute.id).then(
          (response) => {
            this.fillInstitutes()
            this.notify('Eliminado correctamente', 'success')
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
