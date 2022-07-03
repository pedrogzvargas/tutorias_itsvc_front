<template>
  <div>
    <progress-bar v-if="isLoading" />
    <subject-modal-form
      :key="groupModelKey"
      ref="subjectModalForm"
      :mode="subjectModelMode"
      :current-record="selectedSubject"
      @listUpdated="reloadSubjectList"
      @hiddenModal="hideModal"
    />
    <confirmation-modal
      ref="confirmationModal"
      :message="confirmationModalMessage"
      @agree="deleteSubject"
      @rejection="selectedSubject = null"
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
            Docente
          </th>
          <th class="primary--text">
            Materia
          </th>
          <th class="primary--text">
            Código materia
          </th>
          <th class="primary--text">
            Periodo academico
          </th>
          <th class="primary--text">
            Periodo activo
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
          <td>{{ `${subject.first_name} ${subject.second_name || ''} ${subject.last_name} ${subject.second_last_name || ''}` }}</td>
          <td>{{ subject.subject }}</td>
          <td>{{ subject.subject_code }}</td>
          <td>{{ subject.school_cycle_name }}</td>
          <td>
            <v-icon
              v-if="subject.school_cycle_active"
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
                  @click="$router.push({name: 'TaughtSubject', params: { id: subject.id }})"
                >
                  mdi-arrow-right-thick
                </v-icon>
                <v-icon
                  class="mx-1"
                  @click="showSubjectFormAsEdition(subject)"
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
  import SubjectsService from '../../../services/admin/subject/SubjectsService'
  import SubjectService from '../../../services/admin/subject/SubjectService'
  import SubjectModalForm from './SubjectModalForm'
  export default {
    name: 'SubjectsList',
    components: {
      ActionNotifier,
      ConfirmationModal,
      ProgressBar,
      SubjectModalForm,
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
      subjectModelMode: null,
      groupModelKey: 0,
      selectedSubject: null,
      confirmationModalMessage: '¿Estás seguro que deseas eliminar esta materia?',
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
        this.fillSubjects()
      },
    },
    created () {
      this.fillSubjects()
    },
    methods: {
      async fillSubjects () {
        await SubjectsService.get(this.search, this.page).then(
          (response) => {
            this.subjects = response.data.results
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
      reloadSubjectList () {
        this.fillSubjects()
        this.notify('Actualizado correctamente', 'success')
        this.groupModelKey += 1
        this.subjectModelMode = null
      },
      hideModal () {
        this.groupModelKey += 1
        this.selectedSubject = null
        this.subjectModelMode = null
      },
      showSubjectFormAsEdition (value) {
        this.subjectModelMode = 'edit'
        this.selectedSubject = value
        this.$refs.subjectModalForm.show = true
      },
      showSubjectFormAsCreation () {
        this.selectedSubject = null
        this.subjectModelMode = 'create'
        this.$refs.subjectModalForm.show = true
      },
      showConfirmationModal (subject) {
        this.selectedSubject = subject
        this.$refs.confirmationModal.dialog = true
      },
      deleteSubject () {
        SubjectService.delete(this.selectedSubject.id).then(
          (response) => {
            this.notify('Eliminado correctamente', 'success')
            this.subjects = []
            this.totalItems -= 1
            this.setPage()
            this.fillSubjects()
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
      setPage () {
        if (this.page > this.totalPages) {
          this.page = this.totalPages
        }
      },
    },
  }
</script>

<style scoped>

</style>
