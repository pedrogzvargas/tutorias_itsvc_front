<template>
  <div>
    <v-dialog
      v-model="show"
      max-width="75%"
    >
      <action-notifier
        ref="ActionNotifier"
        :text="actionMessage"
        :color="actionMessageColor"
      />
      <v-card class="pa-8">
        <p class="text-h6">
          Hitorial de materias
        </p>
        <v-divider />
        <v-simple-table>
          <thead>
          <tr>
            <th class="primary--text">
              #
            </th>
            <th class="primary--text">
              Materia
            </th>
            <th class="primary--text">
              Tipo
            </th>
            <th class="primary--text">
              Estatus
            </th>
            <th class="primary--text">
              Calificación
            </th>
            <th class="primary--text">
              Ciclo escolar
            </th>
            <th class="primary--text">
              Dada de baja
            </th>
          </tr>
          </thead>
          <tbody>
          <tr
            v-for="(subject, index) in subjects"
            :key="subject.id"
          >
            <td>{{ index +1 }}</td>
            <td>{{ `${subject.subject_name}` }}</td>
            <td>{{ subject.type_name }}</td>
            <td>{{ getStatus(subject.approved) }}</td>
            <td>{{ subject.final_score }}</td>
            <td>{{ subject.school_cycle_name }}</td>
            <td>{{ subject.unsubscribed ? 'Si' : 'No' }}</td>
          </tr>
          </tbody>
        </v-simple-table>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  import { get } from 'vuex-pathify'
  import StudentSubjectsService from '../../../services/student/StudentSubjectsService'
  import ActionNotifier from '../../common/general/ActionNotifier'
  export default {
    name: 'SubjectModalForm',
    components: {
      ActionNotifier,
    },
    props: {
      mode: String,
      studentId: String,
    },
    data () {
      return {
        show: false,
        valid: false,
        actionMessage: null,
        actionMessageColor: null,
        subjects: [],
      }
    },
    // eslint-disable-next-line vue/order-in-components
    computed: {
      ...get('user', [
        'data',
      ]),
    },
    // eslint-disable-next-line vue/order-in-components
    watch: {
      show () {
        if (this.show) {
          this.fillSubjects()
        }
      },
    },
    methods: {
      notify (message, type) {
        this.actionMessage = message
        this.actionMessageColor = type
        this.$refs.ActionNotifier.snackbar = true
      },
      async fillSubjects () {
        await StudentSubjectsService.get(this.studentId, { get_all: true }).then(
          (response) => {
            this.subjects = response.data
            this.totalItems = response.data.count
          },
        ).catch(
          (response) => {
            this.notify('No se encontraron materias', 'secondary')
            return Promise.reject(response)
          },
        )
      },
      getStatus (status) {
        if (status == null) {
          return 'Cursando'
        } else if (status === false) {
          return 'Reprobado'
        } else if (status) {
          return 'Aprobada'
        }
      },
    },
  }
</script>
