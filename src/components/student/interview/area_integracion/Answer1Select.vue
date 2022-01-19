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
    name: 'Answer1Select',
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
          { id: 'Bien', name: 'Bien' },
          { id: 'Regular', name: 'Regular' },
          { id: 'Mal', name: 'Mal' },
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
