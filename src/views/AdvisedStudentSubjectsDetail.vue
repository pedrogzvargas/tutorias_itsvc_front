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
        <subjects-detail />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import SubjectsDetail from '../components/tutor/group/SubjectsDetail'
  export default {
    name: 'AdvisedStudentSubjectsDetail',
    components: {
      SubjectsDetail,
    },
  }
</script>

<style scoped>

</style>
