<template>
  <v-container
    id="user-profile-view"
    fluid
    tag="section"
  >
    <progress-bar v-if="isLoading" />
    <v-row
      v-if="!isLoading"
      justify="center"
    >
      <v-col
        cols="12"
        md="9"
      >
        <app-card class="mt-4 text-center">
          <v-card-text class="text-center">
            <h4 class="text-h3 mb-1 text--primary">
              Curso: {{ this.course.name }}
            </h4>
          </v-card-text>

          <v-card-text
            v-for="(questionnaire, index) in this.course.questionnaire"
            :key="questionnaire.id"
            class="text-left"
          >
            <p class="text-h3">
              Modulo: {{questionnaire.module.name }}
            </p>
            <v-row
              v-for="(question, index) in questionnaire.question"
              :key="question.id"
            >
              <v-col
                class="d-flex"
                cols="12"
                sm="6"
              >
                <p class="text-h3 pa-6 py-1">
                  {{ index + 1 }}.- {{ question.question }}
                </p>
              </v-col>
              <v-col
                class="d-flex"
                cols="12"
                sm="6"
              >
                <answare
                  :question="question"
                />
              </v-col>
            </v-row>
          </v-card-text>
        </app-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import ProgressBar from '../components/app/ProgressBar'
  import StudentCourseService from '../services/student/StudentCourseService'
  import Answare from '../components/common/course/Answare'
  export default {
    name: 'StudentCourse',
    components: {
      Answare,
      ProgressBar,
    },
    data: () => ({
      isLoading: true,
      course: null,
    }),
    created () {
      this.fillCourse()
    },
    methods: {
      async fillCourse () {
        await StudentCourseService.get(1, 2).then(
          (response) => {
            this.course = response.data.data.course
          },
        ).catch(
          (response) => {
            return Promise.reject(response)
          },
        )
        this.isLoading = false
      },
    },
  }
</script>
