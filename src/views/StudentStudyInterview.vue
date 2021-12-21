<template>
  <v-container
    id="address-information-view"
    fluid
    tag="section"
  >
    <v-row justify="center">
      <v-col
        cols="12"
        md="9"
      >
        <material-card
          color="primary"
          full-header
        >
          <template #heading>
            <v-tabs
              v-model="tabs"
              background-color="transparent"
              slider-color="white"
              class="pa-8"
            >
              <span
                class="subheading font-weight-light mx-3"
                style="align-self: center"
              >Entrevista:</span>
              <v-tab
                class="mr-3"
                href="#tab-1"
              >
                <v-icon class="mr-2">
                  mdi-hand-okay
                </v-icon>
                Organización del Estudio
              </v-tab>
              <v-tab
                class="mr-3"
                href="#tab-2"
              >
                <v-icon class="mr-2">
                  mdi-human-male-board-poll
                </v-icon>
                Técnicas de Estudio
              </v-tab>
              <v-tab
                class="mr-3"
                href="#tab-3"
              >
                <v-icon class="mr-2">
                  mdi-human-greeting-variant
                </v-icon>
                Motivación para el Estudio
              </v-tab>
              <v-tab
                class="mr-3"
                href="#tab-4"
              >
                <v-icon class="mr-2">
                  mdi-bookshelf
                </v-icon>
                Estilos de Aprendizaje
              </v-tab>
            </v-tabs>
          </template>
          <v-tabs-items
            v-model="tabs"
            background-color="transparent"
          >
            <v-tab-item
              value="tab-1"
            >
              <v-card-text>
                <material-card
                  color="primary"
                  icon="mdi-hand-okay"
                >
                  <template #title>
                    Organización del Estudio
                  </template>
                  <organizacion-estudio-form />
                </material-card>
              </v-card-text>
            </v-tab-item>
            <v-tab-item
              value="tab-2"
            >
              <v-card-text>
                <material-card
                  color="primary"
                  icon="mdi-human-male-board-poll"
                >
                  <template #title>
                    Técnicas de Estudio
                  </template>
                  <tecnica-estudio-form />
                </material-card>
              </v-card-text>
            </v-tab-item>
            <v-tab-item
              value="tab-3"
            >
              <v-card-text>
                <material-card
                  color="primary"
                  icon="mdi-human-edit"
                >
                  <template #title>
                    Motivación para el Estudio
                  </template>
                  <motivacion-estudio-form />
                </material-card>
              </v-card-text>
            </v-tab-item>
            <v-tab-item
              value="tab-4"
            >
              <v-card-text>
                <material-card
                  color="primary"
                  icon="mdi-bookshelf"
                >
                  <template #title>
                    Estilos de Aprendizaje
                  </template>
                  <estilo-aprendizaje-form />
                </material-card>
              </v-card-text>
            </v-tab-item>
          </v-tabs-items>
        </material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import OrganizacionEstudioForm from '../components/student/interview/organizacion_estudio/OrganizacionEstudioForm'
  import TecnicaEstudioForm from '../components/student/interview/tecnica_estudio/TecnicaEstudioForm'
  import MotivacionEstudioForm from '../components/student/interview/motivacion_estudio/MotivacionEstudioForm'
  import EstiloAprendizajeForm from '../components/student/interview/estilo_aprendizaje/EstiloAprendizajeForm'
  export default {
    name: 'StudentStudyInterview',
    components: {
      OrganizacionEstudioForm,
      TecnicaEstudioForm,
      MotivacionEstudioForm,
      EstiloAprendizajeForm,
    },
    data: () => ({
      tabs: null,
      isLoading: true,
      course: null,
    }),
    created () {
    },
    methods: {
    },
  }
</script>
