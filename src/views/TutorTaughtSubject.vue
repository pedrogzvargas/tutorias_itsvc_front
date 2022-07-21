<template>
  <v-container
    id="subject-detail-view"
    fluid
    tag="section"
  >
    <v-row justify="center">
      <v-col
        cols="12"
        md="9"
      >
        <tutor-taught-subject-detail />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import TutorTaughtSubjectDetail from '../components/tutor/subject/TutorTaughtSubjectDetail'
  export default {
    name: 'TutorTaughtSubject',
    components: {
      TutorTaughtSubjectDetail,
    },
  }
</script>

<style scoped>

</style>
