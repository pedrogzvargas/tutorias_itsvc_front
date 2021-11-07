<template>
  <div>
    <v-select
      v-model="selected"
      item-value="id"
      item-text="name"
      :items="tutorsList"
      label="Tutor"
      :readonly="readonly"
      :dense="dense"
      :rules="rules"
      outlined
      @change="emitSelected"
    ></v-select>
  </div>
</template>

<script>
  import TutorsService from '../../../services/tutor/tutor/TutorsService'

  export default {
    name: 'TutorSelect',
    props: {
      defaultSelected: Number,
      dense: Boolean,
      readonly: Boolean,
      rules: Array,
    },
    data () {
      return {
        isEditing: true,
        selected: this.defaultSelected,
        tutors: [],
      }
    },
    computed: {
      tutorsList () {
        return this.tutors.map(tutor => {
          return {
            id: tutor.id,
            name: `${tutor.first_name} ${tutor.second_name || ''} ${tutor.last_name} ${tutor.second_last_name || ''}`,
          }
        })
      },
    },
    watch: {
      defaultSelected (value) {
        this.selected = value
      },
    },
    created () {
      this.fillSelect()
    },
    methods: {
      fillSelect () {
        TutorsService.get().then(
          tutors => tutors.data.results.forEach(
            element => this.tutors.push(element),
          ),
        ).catch(
          function (error) {
            return Promise.reject(error)
          },
        )
      },
      emitSelected () {
        this.$emit('SelectedItem', this.selected)
      },
    },
  }
</script>

<style scoped>

</style>
