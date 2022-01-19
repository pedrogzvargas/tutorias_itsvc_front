<template>
  <div>
    <v-select
      v-model="selected"
      item-value="id"
      item-text="name"
      :items="items"
      :label="label"
      :readonly="readonly"
      :disabled="disabled"
      :dense="dense"
      :rules="rules"
      outlined
      @change="emitSelected"
    ></v-select>
  </div>
</template>

<script>
  export default {
    name: 'AnswerProblemsSelect',
    props: {
      defaultSelected: String,
      label: String,
      dense: Boolean,
      readonly: Boolean,
      disabled: Boolean,
      rules: Array,
    },
    data () {
      return {
        isEditing: true,
        selected: this.defaultSelected,
        items: [
          { id: null, name: 'Seleccione' },
          { id: 'Económicos', name: 'Económicos' },
          { id: 'Salud', name: 'Salud' },
          { id: 'Familiares', name: 'Familiares' },
          { id: 'Sociales', name: 'Sociales' },
        ],
      }
    },
    watch: {
      defaultSelected (value) {
        this.selected = value
      },
    },
    methods: {
      emitSelected () {
        this.$emit('SelectedItem', this.selected)
      },
    },
  }
</script>
