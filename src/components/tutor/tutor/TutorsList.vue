<template>
  <div>
    <progress-bar v-if="isLoading" />
    <tutor-modal-form
      ref="tutorModalForm"
      :mode="tutorModelMode"
      :current-record="selectedTutor"
      @listUpdated="fillTutors"
    />
    <confirmation-modal
      ref="confirmationModal"
      :message="confirmationModalMessage"
      @agree="deleteSibling"
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
            Nombre
          </th>
          <th class="primary--text">
            Usuario
          </th>
          <th class="primary--text">
            Activo
          </th>
          <th class="primary--text">
            Acciones
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(tutor, index) in tutors"
          :key="tutor.id"
        >
          <td>{{ index +1 }}</td>
          <td>{{ `${tutor.first_name} ${tutor.second_name || ''} ${tutor.last_name} ${tutor.second_last_name || ''}` }}</td>
          <td>{{ tutor.username }}</td>
          <td>
            <v-icon
              v-if="tutor.is_active"
              class="mx-1"
              color="success"
            >
              mdi-check-circle-outline
            </v-icon>
            <v-icon
              v-else
              class="mx-1"
              color="error"
            >
              mdi-close-circle-outline
            </v-icon>
          </td>
          <td class="text-right">
            <v-row>
              <v-col
                cols="auto"
              >
                <v-icon
                  class="mx-1"
                  @click="showTutorFormAsEdition(tutor)"
                >
                  mdi-pencil
                </v-icon>

                <v-icon
                  class="mx-1"
                  color="error"
                  @click="showConfirmationModal(tutor)"
                >
                  mdi-close
                </v-icon>
              </v-col>
            </v-row>
          </td>
        </tr>
      </tbody>
    </v-simple-table>
    <div
      v-if="!isLoading"
      class="text-center"
    >
      <v-pagination
        v-model="page"
        :length="totalPages"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
  import ActionNotifier from '../../common/general/ActionNotifier'
  import ConfirmationModal from '../../common/utils/ConfirmationModal'
  import ProgressBar from '../../app/ProgressBar'
  import TutorModalForm from './TutorModalForm'
  import TutorsService from '../../../services/tutor/tutor/TutorsService'
  import TutorService from '../../../services/tutor/tutor/TutorService'
  export default {
    name: 'TutorsList',
    components: {
      ActionNotifier,
      ConfirmationModal,
      ProgressBar,
      TutorModalForm,
    },
    props: {
      search: String,
    },
    data: () => ({
      page: 1,
      totalItems: 0,
      dialog: false,
      isLoading: true,
      tutors: [],
      tutorModelMode: null,
      selectedTutor: null,
      confirmationModalMessage: '¿Estas seguro que deseas eliminar este tutor?',
      actionMessage: null,
      actionMessageColor: null,
    }),
    computed: {
      totalPages () {
        const total = this.totalItems / 10
        return Math.ceil(total)
      },
    },
    watch: {
      page (value) {
        // console.log(value)
        this.fillTutors()
      },
    },
    created () {
      this.fillTutors()
    },
    methods: {
      async fillTutors () {
        await TutorsService.get(this.search, this.page).then(
          (response) => {
            this.tutors = response.data.results
            this.totalItems = response.data.count
          },
        ).catch(
          (response) => {
            this.notify('No se encontraron tutores', 'warning')
            this.isLoading = false
            return Promise.reject(response)
          },
        )
        this.isLoading = false
      },
      showTutorFormAsEdition (value) {
        this.tutorModelMode = 'edit'
        this.selectedTutor = value
        this.$refs.tutorModalForm.show = true
      },
      showTutorFormAsCreation (value) {
        this.selectedTutor = null
        this.tutorModelMode = 'create'
        this.$refs.tutorModalForm.show = true
      },
      showConfirmationModal (sibling) {
        this.selectedTutor = sibling
        this.$refs.confirmationModal.dialog = true
      },
      deleteSibling () {
        TutorService.delete(this.selectedTutor.id).then(
          (response) => {
            this.fillTutors()
            this.notify('Eliminado correctamente', 'success')
          },
        ).catch(
          (response) => {
            this.notify('No se pudo eliminar correctamente', 'error')
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

<style scoped>

</style>
