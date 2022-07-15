<template>
  <div>
    <progress-bar v-if="isLoading" />
    <student-subject-modal-form
      ref="studentSubjectModalForm"
      :mode="ModalMode"
      :current-record="selectedStudentSubject"
      @listUpdated="fillStudents"
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
          Aprovada
        </th>
        <th class="primary--text">
          Calificación
        </th>
        <th class="primary--text">
          Ciclo escolar
        </th>
        <th class="primary--text">
          Acciones
        </th>
      </tr>
      </thead>
      <tbody>
      <tr
        v-for="(subject, index) in subjects"
        :key="subject.id"
      >
        <td>{{ index +1 }}</td>
        <td>{{ `${subject.name} ${subject.second_name || ''} ${subject.last_name} ${subject.second_last_name || ''}` }}</td>
        <td>
          <v-icon
            v-if="subject.approved"
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
        <td>{{ subject.final_score }}</td>
        <td>{{ subject.school_cycle_name }}</td>
        <td class="text-right">
          <v-row>
            <v-col
              cols="auto"
            >
              <v-icon
                class="mx-1"
                @click="showStudentSubjectFormAsEdition(subject)"
              >
                mdi-pencil
              </v-icon>

              <v-icon
                class="mx-1"
                color="error"
                @click="showConfirmationModal(subject)"
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
  import TutorService from '../../../services/admin/tutor/TutorService'
  import TaughtSubjectStudentsService from '../../../services/admin/subject/TaughtSubjectStudentsService'
  import StudentSubjectModalForm from '../subject/StudentSubjectModalForm'
  export default {
    name: 'TutorTaughtSubjectStudentsList',
    components: {
      ActionNotifier,
      ConfirmationModal,
      ProgressBar,
      StudentSubjectModalForm,
    },
    props: {
      search: String,
    },
    data: () => ({
      page: 1,
      totalItems: 0,
      dialog: false,
      isLoading: true,
      subjects: [],
      ModalMode: null,
      selectedStudentSubject: null,
      confirmationModalMessage: '¿Estas seguro que deseas eliminar este alumno?',
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
        this.fillStudents()
      },
    },
    created () {
      this.tutorSubjectId = this.$route.params.id
      this.fillStudents()
    },
    methods: {
      async fillStudents () {
        await TaughtSubjectStudentsService.get(this.tutorSubjectId, this.search, this.page).then(
          (response) => {
            this.subjects = response.data.results
            this.totalItems = response.data.count
          },
        ).catch(
          (response) => {
            this.notify('No se encontraron estudiantes', 'secondary')
            this.isLoading = false
            return Promise.reject(response)
          },
        )
        this.isLoading = false
      },
      showStudentSubjectFormAsEdition (value) {
        this.ModalMode = 'edit'
        this.selectedStudentSubject = value
        this.$refs.studentSubjectModalForm.show = true
      },
      showStudentSubjectFormAsCreation (value) {
        this.selectedStudentSubject = null
        this.ModalMode = 'create'
        this.$refs.studentSubjectModalForm.show = true
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
