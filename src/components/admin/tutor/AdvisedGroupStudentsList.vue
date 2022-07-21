<template>
  <div>
    <progress-bar v-if="isLoading" />
<!--    <tutor-modal-form-->
<!--      ref="tutorModalForm"-->
<!--      :mode="tutorModelMode"-->
<!--      :current-record="selectedTutor"-->
<!--      @listUpdated="fillTutors"-->
<!--    />-->
    <confirmation-modal
      ref="confirmationModal"
      :message="confirmationModalMessage"
      @agree="deleteStudent"
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
            Email
          </th>
          <th class="primary--text">
            Acciones
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(student, index) in students"
          :key="student.id"
        >
          <td>{{ index +1 }}</td>
          <td>{{ `${student.first_name} ${student.second_name || ''} ${student.last_name} ${student.second_last_name || ''}` }}</td>
          <td>{{ student.username }}</td>
          <td>{{ student.email }}</td>
          <td class="text-right">
            <v-row>
              <v-col
                cols="auto"
              >
                <v-icon
                  class="mx-1"
                  @click="$router.push({name: 'StudentSubjectsDetail', params: { id: student.id }})"
                >
                  mdi-arrow-right-thick
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
  import AdvisedGroupStudentsService from '../../../services/tutor/group/AdvisedGroupStudentsService'
  export default {
    name: 'AdvisedGroupStudentsList',
    components: {
      ActionNotifier,
      ConfirmationModal,
      ProgressBar,
    },
    props: {
      academicInformationId: Number,
      search: String,
    },
    data: () => ({
      page: 1,
      totalItems: 0,
      dialog: false,
      isLoading: true,
      students: [],
      tutorModelMode: null,
      selectedTutor: null,
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
      // academicInformationId (value) {
      //   this.fillStudents()
      // },
    },
    created () {
      if (this.academicInformationId) {
        this.fillStudents()
      }
    },
    methods: {
      async fillStudents () {
        await AdvisedGroupStudentsService.get(this.academicInformationId, this.search, this.page).then(
          (response) => {
            this.students = response.data.results
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
      showStudentFormAsEdition (value) {
        this.tutorModelMode = 'edit'
        this.selectedTutor = value
        this.$refs.tutorModalForm.show = true
      },
      showStudentFormAsCreation (value) {
        this.selectedTutor = null
        this.tutorModelMode = 'create'
        this.$refs.tutorModalForm.show = true
      },
      showConfirmationModal (sibling) {
        this.selectedTutor = sibling
        this.$refs.confirmationModal.dialog = true
      },
      deleteStudent () {
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
