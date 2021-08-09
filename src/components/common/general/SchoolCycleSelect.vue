<template>
  <div>
    <v-select
      v-model="selected"
      item-value="id"
      item-text="name"
      :items="school_cycles"
      label="Ciclo escolar"
      :readonly="readonly"
      :dense="dense"
      :rules="rules"
      outlined
      @change="emitSelected"
    ></v-select>
  </div>
</template>

<script>
  import SchoolCycleService from '../../../services/common/general/SchoolCycleService'

  export default {
    name: 'SchoolCycleSelect',
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
        school_cycles: [
          { id: null, name: 'Seleccione' },
        ],
      }
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
        SchoolCycleService.get().then(
          SchoolCycles => SchoolCycles.data.data.forEach(
            element => this.school_cycles.push(element),
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
