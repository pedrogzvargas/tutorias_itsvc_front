<template>
  <div>
    <progress-bar v-if="isLoading" />
    <student-modal-form
      ref="studentModalForm"
      :mode="modelMode"
      :current-record="selectedStudent"
      @listUpdated="fillStudents"
    />
    <confirmation-modal
      ref="confirmationModal"
      :message="confirmationModalMessage"
      @agree="deleteStudent"
      @rejection="selectedStudent = null"
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
                <v-icon
                  class="mx-1"
                  @click="showStudentFormAsEdition(student)"
                >
                  mdi-pencil
                </v-icon>

                <v-icon
                  class="mx-1"
                  color="error"
                  @click="showConfirmationModal(student)"
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
  import StudentService from '../../../services/student/StudentService'
  import StudentsService from '../../../services/student/StudentsService'
  import StudentModalForm from './StudentModalForm'
  export default {
    name: 'StudentsList',
    components: {
      ActionNotifier,
      ConfirmationModal,
      ProgressBar,
      StudentModalForm,
    },
    props: {
      search: String,
    },
    data: () => ({
      page: 1,
      totalItems: 0,
      dialog: false,
      isLoading: true,
      students: [],
      modelMode: null,
      selectedStudent: null,
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
      this.fillStudents()
    },
    methods: {
      async fillStudents () {
        await StudentsService.get(this.search, this.page).then(
          (response) => {
            this.students = response.data.results
            this.totalItems = response.data.count
          },
        ).catch(
          (response) => {
            this.notify('No se encontraron estudiantes', 'warning')
            this.isLoading = false
            return Promise.reject(response)
          },
        )
        this.isLoading = false
      },
      showStudentFormAsEdition (value) {
        this.modelMode = 'edit'
        this.selectedStudent = value
        this.$refs.studentModalForm.show = true
      },
      showStudentFormAsCreation (value) {
        this.selectedStudent = null
        this.modelMode = 'create'
        this.$refs.studentModalForm.show = true
      },
      showConfirmationModal (student) {
        this.selectedStudent = student
        this.$refs.confirmationModal.dialog = true
      },
      deleteStudent () {
        StudentService.delete(this.selectedStudent.id).then(
          (response) => {
            this.fillStudents()
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
