<template>
  <v-container
    id="ubjecs-view"
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
            <div class="pa-5 white--text">
              <div class="text-h4 font-weight-light">
                Materias impartidas
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
                  <v-col
                    cols="12"
                    md="6"
                  >
                    <div class="d-flex justify-end mb-6">
                      <v-icon
                        class="mx-1"
                        @click="showModalASCreate"
                      >
                        mdi-book-plus
                      </v-icon>
                    </div>
                  </v-col>
                </v-row>
              </div>
            </div>
          </template>
          <v-card-text>
            <subjects-list
              ref="SubjectsList"
              :search="searchValue"
            />
          </v-card-text>
        </material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import SubjectsList from '../components/admin/subject/SubjectsList'
  export default {
    name: 'TaughtSubjects',
    components: {
      SubjectsList,
    },
    data: () => ({
      searchValue: '',
    }),
    methods: {
      showModalASCreate () {
        this.$refs.SubjectsList.showSubjectFormAsCreation()
      },
      filterList () {
        this.$refs.SubjectsList.page = 1
        this.$refs.SubjectsList.fillSubjects()
      },
    },
  }
</script>

<style scoped>

</style>
