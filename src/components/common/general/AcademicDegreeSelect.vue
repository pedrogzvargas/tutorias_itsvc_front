<template>
  <div>
    <v-select
      v-model="selected"
      item-value="id"
      item-text="name"
      :items="academicDegree"
      label="Nivel académico"
      :readonly="readonly"
      :disabled="disabled"
      :rules="rules"
      outlined
      :dense="dense"
      @change="emitSelected"
    />
  </div>
</template>

<script>
  import AcademicDegreeService from '../../../services/common/general/AcademicDegreeService'

  export default {
    name: 'AcademicDegreeSelect',
    props: {
      defaultSelected: Number,
      dense: Boolean,
      readonly: Boolean,
      disabled: Boolean,
      rules: Array,
    },
    data () {
      return {
        selected: this.defaultSelected,
        academicDegree: [
          { id: null, name: 'Seleccione' },
        ],
      }
    },
    watch: {
      defaultSelected (newValue, oldValue) {
        this.selected = newValue
      },
    },
    created () {
      this.fillSelect()
    },
    methods: {
      fillSelect () {
        AcademicDegreeService.get().then(
          academicDegree => academicDegree.data.data.forEach(
            element => this.academicDegree.push(element),
          ),
        ).catch(
          function (error) {
            console.log('Show error notification!')
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
