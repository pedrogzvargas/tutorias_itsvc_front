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
        <advised-group-detail />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import AdvisedGroupDetail from '../components/admin/group/AdvisedGroupDetail'
  export default {
    name: 'AdvisedGroup',
    components: {
      AdvisedGroupDetail,
    },
  }
</script>

<style scoped>

</style>
