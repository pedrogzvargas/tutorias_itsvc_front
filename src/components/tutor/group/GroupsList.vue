<template>
  <div>
    <progress-bar v-if="isLoading" />
    <group-modal-form
      :key="groupModelKey"
      ref="groupModalForm"
      :mode="groupModelMode"
      :current-record="selectedGroup"
      @listUpdated="reloadGroupList"
      @hiddenModal="hideModal"
    />
    <confirmation-modal
      ref="confirmationModal"
      :message="confirmationModalMessage"
      @agree="deleteGroup"
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
          <td>{{ `${group.first_name} ${group.second_name || ''} ${group.last_name} ${group.second_last_name || ''}` }}</td>
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
                  @click="$router.push({name: 'AdvisedGroup', params: { id: group.id }})"
                >
                  mdi-arrow-right-thick
                </v-icon>
                <v-icon
                  class="mx-1"
                  @click="showGroupFormAsEdition(group)"
                >
                  mdi-pencil
                </v-icon>

                <v-icon
                  class="mx-1"
                  color="error"
                  @click="showConfirmationModal(group)"
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
  import GroupService from '../../../services/tutor/group/GroupService'
  import GroupsService from '../../../services/tutor/group/GroupsService'
  import GroupModalForm from './GroupModalForm'
  export default {
    name: 'GroupsList',
    components: {
      ActionNotifier,
      ConfirmationModal,
      ProgressBar,
      GroupModalForm,
    },
    props: {
      search: String,
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
        this.fillGroups()
      },
    },
    created () {
      this.fillGroups()
    },
    methods: {
      async fillGroups () {
        await GroupsService.get(this.search, this.page).then(
          (response) => {
            this.groups = response.data.results
            this.totalItems = response.data.count
          },
        ).catch(
          (response) => {
            this.notify('No se encontraron tutores', 'warning')
            return Promise.reject(response)
          },
        )
        this.isLoading = false
      },
      reloadGroupList () {
        this.fillGroups()
        this.notify('Actualizado correctamente', 'success')
        this.groupModelKey += 1
        this.groupModelMode = null
      },
      hideModal () {
        this.groupModelKey += 1
        this.selectedGroup = null
        this.groupModelMode = null
      },
      showGroupFormAsEdition (value) {
        this.groupModelMode = 'edit'
        this.selectedGroup = value
        this.$refs.groupModalForm.show = true
      },
      showGroupFormAsCreation () {
        this.selectedGroup = null
        this.groupModelMode = 'create'
        this.$refs.groupModalForm.show = true
      },
      showConfirmationModal (group) {
        this.selectedGroup = group
        this.$refs.confirmationModal.dialog = true
      },
      deleteGroup () {
        GroupService.delete(this.selectedGroup.id).then(
          (response) => {
            this.fillGroups()
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
