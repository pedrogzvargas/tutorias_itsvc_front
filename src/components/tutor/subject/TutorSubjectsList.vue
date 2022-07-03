<template>
  <div>
    <progress-bar v-if="isLoading" />
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
  import ProgressBar from '../../app/ProgressBar'
  import TutorSubjectsService from '../../../services/tutor/subject/TutorSubjectsService'
  import { get } from 'vuex-pathify'
  export default {
    name: 'TutorSubjectsList',
    components: {
      ActionNotifier,
      ProgressBar,
    },
    props: {
      search: String,
      tutorId: Number,
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
      confirmationModalMessage: '¿Estas seguro que deseas eliminar este tutor?',
      actionMessage: null,
      actionMessageColor: null,
    }),
    computed: {
      totalPages () {
        const total = this.totalItems / 10
        return Math.ceil(total)
      },
      currentUser () {
        return this.tutorId ? this.tutorId : this.data.roles[0]
      },
      ...get('user', [
        'data',
      ]),
    },
    watch: {
      page (value) {
        this.fillSubjects()
      },
    },
    created () {
      this.fillSubjects()
    },
    methods: {
      async fillSubjects () {
        await TutorSubjectsService.get(this.currentUser.id, this.search, this.page).then(
          (response) => {
            this.subjects = response.data.results
            this.totalItems = response.data.count
          },
        ).catch(
          (response) => {
            this.notify('No se encontraron materias', 'secondary')
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
