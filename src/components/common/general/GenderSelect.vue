<template>
  <div>
    <v-select
      v-model="selected"
      item-value="id"
      item-text="name"
      :items="genders"
      label="Genero"
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
  import GenderService from '../../../services/common/general/GenderService'

  export default {
    name: 'GenderSelect',
    props: {
      defaultSelected: Number,
      dense: Boolean,
      readonly: Boolean,
      disabled: Boolean,
      rules: Array,
    },
    data () {
      return {
        isEditing: true,
        selected: this.defaultSelected,
        genders: [
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
        GenderService.get().then(
          genders => genders.data.data.forEach(
            element => this.genders.push(element),
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
