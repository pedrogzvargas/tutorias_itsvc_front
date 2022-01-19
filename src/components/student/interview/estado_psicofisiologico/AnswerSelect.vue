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
    name: 'AnswerSelect',
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
          { id: 'Frecuente', name: 'Frecuente' },
          { id: 'Muy frecuente', name: 'Muy frecuente' },
          { id: 'Nunca', name: 'Nunca' },
          { id: 'Antes', name: 'Antes' },
          { id: 'A veces', name: 'A veces' },
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
