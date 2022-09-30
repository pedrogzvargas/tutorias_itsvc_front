<template>
  <div>
    <progress-bar v-if="isLoading" />
    <v-breadcrumbs
      :items="items"
      v-if="!isLoading"
    >
      <template v-slot:divider>
        <v-icon>mdi-forward</v-icon>
      </template>
    </v-breadcrumbs>
    <material-card
      v-if="!isLoading"
      class="mb-10"
      color="primary"
      icon="mdi-human-male"
    >
      <template #title>
        Docente
      </template>
      <v-container>
        <v-row>
          <v-col
            cols="12"
            sm="3"
          >
            <v-text-field
              label="Nombre"
              :value="advisedGroup.tutor.first_name"
              outlined
              readonly
              disabled
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            sm="3"
          >
            <v-text-field
              label="Segundo nombre"
              :value="advisedGroup.tutor.second_name"
              outlined
              readonly
              disabled
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            sm="3"
          >
            <v-text-field
              label="Apellido paterno"
              :value="advisedGroup.tutor.last_name"
              outlined
              readonly
              disabled
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            sm="3"
          >
            <v-text-field
              label="Apellido materno"
              :value="advisedGroup.tutor.second_last_name"
              outlined
              readonly
              disabled
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col
            cols="12"
            sm="3"
          >
            <v-text-field
              label="Nombre de usuario"
              :value="advisedGroup.tutor.username"
              outlined
              readonly
              disabled
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            sm="3"
          >
            <v-switch
              class="px-10"
              v-model="advisedGroup.tutor.is_active"
              inset
              :label="advisedGroup.tutor.is_active ? 'Activo': 'Inactivo'"
              disabled
            ></v-switch>
          </v-col>
        </v-row>
      </v-container>
    </material-card>

    <material-card
      v-if="!isLoading"
      class="mb-10"
      color="primary"
      icon="mdi-account-multiple"
    >
      <template #title>
        Grupo
      </template>
      <v-container>
        <v-row>
          <v-col
            cols="12"
            sm="12"
          >
            <v-text-field
              label="Instituto"
              :value="advisedGroup.group.university"
              outlined
              readonly
              disabled
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            sm="6"
          >
            <v-text-field
              label="Carera"
              :value="advisedGroup.group.major"
              outlined
              readonly
              disabled
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            sm="6"
          >
            <v-text-field
              label="Periodo"
              :value="advisedGroup.group.period"
              outlined
              readonly
              disabled
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            sm="6"
          >
            <v-text-field
              label="Número de periodo"
              :value="advisedGroup.group.period_number"
              outlined
              readonly
              disabled
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            sm="6"
          >
            <v-text-field
              label="Grupo"
              :value="advisedGroup.group.group"
              outlined
              readonly
              disabled
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </material-card>

    <material-card
      v-if="!isLoading"
      class="mb-10"
      color="primary"
      icon="mdi-school"
    >
      <template #title>
        Ciclo escolar
      </template>
      <v-container>
        <v-row>
          <v-col
            cols="12"
            sm="8"
          >
            <v-text-field
              label="Nombre"
              :value="advisedGroup.school_cycle.name"
              outlined
              readonly
              disabled
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            sm="4"
          >
            <v-switch
              v-model="advisedGroup.school_cycle.is_active"
              class="px-10"
              inset
              :label="advisedGroup.school_cycle.is_active ? 'Activo': 'Inactivo'"
              disabled
            ></v-switch>
          </v-col>
        </v-row>
      </v-container>
    </material-card>

    <material-card
      v-if="!isLoading"
      color="primary"
      full-header
    >
      <template #heading>
        <div class="pa-3 white--text">
          <div class="text-h4 font-weight-light">
            Estudiantes inscritos
          </div>

          <div>
            <v-row>
              <v-col
                cols="12"
                md="6"
              >
                <div class="d-flex justify-start">
                  <v-text-field
                    v-model="searchValue"
                    label="Buscar"
                    clearable
                  ></v-text-field>
                  <v-btn
                    class="ma-3"
                    depressed
                    color="secondary"
                    @click="filterList"
                  >
                    Buscar
                  </v-btn>
                </div>
              </v-col>
            </v-row>
          </div>
        </div>
      </template>
      <v-card-text v-if="academicInformationId">
        <advised-group-students-list
          ref="AdvisedGroupStudentsList"
          :academic-information-id="academicInformationId"
          :search="searchValue"
        />
      </v-card-text>
    </material-card>
  </div>
</template>

<script>
  import { get } from 'vuex-pathify'
  import ProgressBar from '../../app/ProgressBar'
  import AdvisedGroupService from '../../../services/tutor/group/AdvisedGroupService'
  // import AdvisedGroupStudentsList from '../../tutor/group/AdvisedGroupStudentsList'
  // import AdvisedGroupStudentsList from '../../tutor/group/AdvisedGroupStudentsList'
  import AdvisedGroupStudentsList from '../tutor/AdvisedGroupStudentsList'

  export default {
    name: 'AdvisedGroupDetail',
    components: {
      ProgressBar,
      AdvisedGroupStudentsList,
    },
    data: () => ({
      isLoading: true,
      advisedGroup: null,
      advisedGroupId: null,
      academicInformationId: null,
      searchValue: '',
    }),
    computed: {
      items () {
        return [
          {
            text: 'Grupos asesorados',
            disabled: false,
            to: {
              name: this.data.groups[0].name === 'tutor' ? 'TutorAdvisedGroups' : 'AdvisedGroups',
            },
          },
          {
            text: 'Detalle',
            disabled: true,
          },
        ]
      },
      ...get('user', [
        'data',
      ]),
    },
    watch: {
      '$route.params.id': function (id) {
        this.fillAdvisedGroup(id)
      },
    },
    created () {
      this.advisedGroupId = this.$route.params.id
      this.fillAdvisedGroup()
    },
    methods: {
      async fillAdvisedGroup () {
        await AdvisedGroupService.get(this.advisedGroupId).then(
          (response) => {
            this.advisedGroup = response.data.data
            this.academicInformationId = response.data.data.group.id
          },
        ).catch(
          (response) => {
            this.notify('No se encontraron tutores', 'warning')
            return Promise.reject(response)
          },
        )
        this.isLoading = false
      },
      filterList () {
        this.$refs.AdvisedGroupStudentsList.page = 1
        this.$refs.AdvisedGroupStudentsList.fillStudents()
      },
    },
  }
</script>

<style scoped>

</style>
