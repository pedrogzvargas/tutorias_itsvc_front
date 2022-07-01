<template>
  <div>
    <progress-bar v-if="isLoading" />
    <sibling-modal-form
      ref="siblingModalForm"
      :mode="siblingModelMode"
      :current-record="selectedSibling"
      @listUpdated="fillSiblings"
    />
    <confirmation-modal
      ref="confirmationModal"
      :message="confirmationModalMessage"
      @agree="deleteSibling"
      @rejection="selectedSibling = null"
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
            Fecha de nacimiento
          </th>
          <th class="primary--text">
            Sexo
          </th>
          <th class="primary--text">
            Acciones
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(sibling, index) in siblings"
          :key="sibling.id"
        >
          <td>{{ index +1 }}</td>
          <td>{{ `${sibling.first_name} ${sibling.second_name || ''} ${sibling.last_name} ${sibling.second_last_name || ''}` }}</td>
          <td>{{ sibling.birth_date }}</td>
          <td>{{ sibling.gender }}</td>
          <td class="text-right">
            <v-row>
              <v-col
                cols="auto"
              >
                <v-icon
                  class="mx-1"
                  @click="showSiblingFormAsEdition(sibling)"
                >
                  mdi-pencil
                </v-icon>

                <v-icon
                  class="mx-1"
                  color="error"
                  @click="showConfirmationModal(sibling)"
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
  import ProgressBar from '../../../app/ProgressBar'
  import ActionNotifier from '../../../common/general/ActionNotifier'
  import ConfirmationModal from '../../../common/utils/ConfirmationModal'
  import SiblingsService from '../../../../services/student/parents/sibling/SiblingsService'
  import SiblingModalForm from './SiblingModalForm'
  import { get } from 'vuex-pathify'
  export default {
    name: 'SiblingsList',
    components: {
      ProgressBar,
      SiblingModalForm,
      ConfirmationModal,
      ActionNotifier,
    },
    data: () => ({
      dialog: false,
      isLoading: true,
      siblings: [],
      siblingModelMode: null,
      selectedSibling: null,
      confirmationModalMessage: '¿Estas seguro que deseas eliminar este hermano?',
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
      this.fillSiblings()
    },
    methods: {
      async fillSiblings () {
        await SiblingsService.get(this.currentUser.id).then(
          (response) => {
            this.siblings = response.data.data
            this.isLoading = false
          },
        ).catch(
          (response) => {
            this.notify('No se encontraron hermanos', 'warning')
            this.isLoading = false
            return Promise.reject(response)
          },
        )
        this.isLoading = false
      },
      showSiblingFormAsEdition (value) {
        this.siblingModelMode = 'edit'
        this.selectedSibling = value
        this.$refs.siblingModalForm.show = true
      },
      showSiblingFormAsCreation (value) {
        this.selectedSibling = null
        this.siblingModelMode = 'create'
        this.$refs.siblingModalForm.show = true
      },
      showConfirmationModal (sibling) {
        this.selectedSibling = sibling
        this.$refs.confirmationModal.dialog = true
      },
      deleteSibling () {
        SiblingsService.delete(this.currentUser.id, this.selectedSibling.id).then(
          (response) => {
            this.fillSiblings()
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
