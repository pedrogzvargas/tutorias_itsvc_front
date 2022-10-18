<template>
  <v-container
    id="load-data-view"
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
              >Cargar información:</span>
              <v-tab
                class="mr-3"
                href="#tab-1"
              >
                <v-icon class="mr-2">
                  mdi-account-plus
                </v-icon>
                Cargar estudiantes
              </v-tab>
              <v-tab
                class="mr-3"
                href="#tab-2"
              >
                <v-icon class="mr-2">
                  mdi-book-plus-outline
                </v-icon>
                Cargar calificaciones
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
                  icon="mdi-account-plus"
                >
                  <template #title>
                    Cargar estudiantes
                  </template>
                  <load-students-form />
                </material-card>
              </v-card-text>
            </v-tab-item>
            <v-tab-item
              value="tab-2"
            >
              <v-card-text>
                <material-card
                  color="primary"
                  icon="mdi-book-plus-outline"
                >
                  <template #title>
                    Cargar materias
                  </template>
                  <load-student-subjects-form />
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
  import LoadStudentsForm from '../components/admin/load/LoadStudentsForm'
  import LoadStudentSubjectsForm from '../components/admin/load/LoadStudentSubjectsForm'
  export default {
    name: 'LoadData',
    components: {
      LoadStudentSubjectsForm,
      LoadStudentsForm,
    },
    data: () => ({
      tabs: null,
    }),
  }
</script>
