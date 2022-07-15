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
        <tutor-advised-group-detail />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import TutorAdvisedGroupDetail from '../components/admin/tutor/TutorAdvisedGroupDetail'
  export default {
    name: 'TutorAdvisedGroup',
    components: {
      TutorAdvisedGroupDetail,
    },
  }
</script>

<style scoped>

</style>
