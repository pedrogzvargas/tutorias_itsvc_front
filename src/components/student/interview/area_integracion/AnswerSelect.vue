<template>
  <div>
    <v-select
      v-model="selected"
      item-value="id"
      item-text="name"
      :items="items"
      :label="label"
      :readonly="readonly"
      :dense="dense"
      :rules="rules"
      outlined
      @change="emitSelected"
    ></v-select>
  </div>
</template>

<script>
  export default {
    name: 'AnswerSelect',
    props: {
      defaultSelected: String,
      label: String,
      dense: Boolean,
      readonly: Boolean,
      rules: Array,
    },
    data () {
      return {
        isEditing: true,
        selected: this.defaultSelected,
        items: [
          { id: null, name: 'Seleccione' },
          { id: 'Buena', name: 'Buena' },
          { id: 'Regular', name: 'Regular' },
          { id: 'Mala', name: 'Mala' },
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
