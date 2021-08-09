<template>
  <div>
    <v-select
      v-model="selected"
      item-value="id"
      item-text="name"
      dense
      :items="disabilities"
      label="Deficiencia"
      :readonly="readonly"
      :rules="rules"
      outlined
      @change="emitSelected"
    ></v-select>
  </div>
</template>

<script>
  import DisabilityService from '../../../services/common/general/DisabilityService'

  export default {
    name: 'DisabilitySelect',
    props: {
      defaultSelected: Number,
      readonly: Boolean,
      rules: Array,
    },
    data () {
      return {
        isEditing: true,
        selected: this.defaultSelected,
        disabilities: [
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
        DisabilityService.get().then(
          genders => genders.data.data.forEach(
            element => this.disabilities.push(element),
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
