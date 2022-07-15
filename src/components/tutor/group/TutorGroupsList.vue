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
            Carrera
          </th>
          <th class="primary--text">
            Periodo
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
          v-for="(group, index) in groups"
          :key="group.id"
        >
          <td>{{ index +1 }}</td>
          <td>{{ group.major }}</td>
          <td>{{ group.period_number }}</td>
          <td>{{ group.school_cycle_name }}</td>
          <td>
            <v-icon
              v-if="group.school_cycle_active"
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
                  @click="$router.push({name: 'TutorAdvisedGroup', params: { id: group.id }})"
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
  import TutorGroupsService from '../../../services/tutor/group/TutorGroupsService'
  import { get } from 'vuex-pathify'
  export default {
    name: 'TutorGroupsList',
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
      groups: [],
      groupModelMode: null,
      groupModelKey: 0,
      selectedGroup: null,
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
        // console.log(value)
        this.fillGroups()
      },
    },
    created () {
      this.fillGroups()
    },
    methods: {
      async fillGroups () {
        await TutorGroupsService.get(this.currentUser.id, this.search, this.page).then(
          (response) => {
            this.groups = response.data.results
            this.totalItems = response.data.count
          },
        ).catch(
          (response) => {
            this.notify('No se encontraron grupos', 'secondary')
            this.isLoading = false
            return Promise.reject(response)
          },
        )
        this.isLoading = false
      },
      notify (message, type) {
        this.actionMessage = message
        this.actionMessageColor = type
        this.$refs.ActionNotifier.snackbar = true
      },
    },
  }
</script>
