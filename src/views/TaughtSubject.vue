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
        <taught-subject-detail />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import TaughtSubjectDetail from '../components/admin/subject/TaughtSubjectDetail'
  export default {
    name: 'TaughtSubject',
    components: {
      TaughtSubjectDetail,
    },
  }
</script>

<style scoped>

</style>
