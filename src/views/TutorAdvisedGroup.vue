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
  import TutorAdvisedGroupDetail from '../components/tutor/group/TutorAdvisedGroupDetail'
  export default {
    name: 'TutorAdvisedGroup',
    components: {
      TutorAdvisedGroupDetail,
    },
  }
</script>
