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
                  mdi-walk
                </v-icon>
                Estado Psicofisiológico
              </v-tab>
              <v-tab
                class="mr-3"
                href="#tab-2"
              >
                <v-icon class="mr-2">
                  mdi-human-handsup
                </v-icon>
                Área de Integración
              </v-tab>
              <v-tab
                class="mr-3"
                href="#tab-3"
              >
                <v-icon class="mr-2">
                  mdi-human-edit
                </v-icon>
                Características Personales
              </v-tab>
              <v-tab
                class="mr-3"
                href="#tab-4"
              >
                <v-icon class="mr-2">
                  mdi-head-snowflake
                </v-icon>
                Área Psicopedagógica
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
                  icon="mdi-walk"
                >
                  <template #title>
                    Estado Psicofisiológico
                  </template>
                  <estado-psicofisiologico-form />
                </material-card>
              </v-card-text>
            </v-tab-item>
            <v-tab-item
              value="tab-2"
            >
              <v-card-text>
                <material-card
                  color="primary"
                  icon="mdi-human-handsup"
                >
                  <template #title>
                    Área de Integración
                  </template>
                  <area-integracion-form />
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
                    Características Personales
                  </template>
                  <caracteristicas-personales-form />
                </material-card>
              </v-card-text>
            </v-tab-item>
            <v-tab-item
              value="tab-4"
            >
              <v-card-text>
                <material-card
                  color="primary"
                  icon="mdi-head-snowflake"
                >
                  <template #title>
                    Área Psicopedagógica
                  </template>
                  <area-psicopedagogica-form />
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
  import EstadoPsicofisiologicoForm from '../components/student/interview/estado_psicofisiologico/EstadoPsicofisiologicoForm'
  import AreaIntegracionForm from '../components/student/interview/area_integracion/AreaIntegracionForm'
  import CaracteristicasPersonalesForm
    from '../components/student/interview/caracteristicas_personales/CaracteristicasPersonalesForm'
  import AreaPsicopedagogicaForm from '../components/student/interview/area_psicopedagogica/AreaPsicopedagogicaForm'
  export default {
    name: 'StudentInterview',
    components: {
      EstadoPsicofisiologicoForm,
      AreaIntegracionForm,
      CaracteristicasPersonalesForm,
      AreaPsicopedagogicaForm,
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
