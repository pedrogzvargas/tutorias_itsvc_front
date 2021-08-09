<template>
  <div>
    <v-select
      v-model="selected"
      item-value="id"
      item-text="name"
      :items="relationship"
      label="Relación"
      :readonly="readonly"
      :rules="rules"
      outlined
      :dense="dense"
      @change="emitSelected"
    />
  </div>
</template>

<script>
  import RelationshipService from '../../../services/common/general/RelationshipService'

  export default {
    name: 'RelationshipSelect',
    props: {
      defaultSelected: Number,
      dense: Boolean,
      readonly: Boolean,
      rules: Array,
    },
    data () {
      return {
        selected: this.defaultSelected,
        relationship: [
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
        RelationshipService.get().then(
          relationship => relationship.data.data.forEach(
            element => this.relationship.push(element),
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
