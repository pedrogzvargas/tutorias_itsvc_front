<template>
  <div>
    <v-autocomplete
      v-model="selected"
      item-value="id"
      item-text="name"
      :items="failureMetrics"
      :readonly="readonly"
      :disabled="disabled"
      :rules="rules"
      outlined
      label="Métrica de reprobación"
      @change="emitSelected"
    ></v-autocomplete>
  </div>
</template>

<script>
  import FailureMetricService from '../../../services/common/academy/FailureMetricService'
  export default {
    name: 'FailureMetricSelect',
    props: {
      defaultSelected: Number,
      readonly: Boolean,
      disabled: Boolean,
      rules: Array,
    },
    data () {
      return {
        selected: this.defaultSelected,
        failureMetrics: [
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
      FailureMetricService.get().then(
        subjects => subjects.data.data.forEach(
          element => this.failureMetrics.push(element),
        ),
      ).catch(
        function (error) {
          return Promise.reject(error)
        },
      )
    },
    methods: {
      emitSelected () {
        this.$emit('SelectedItem', this.selected)
      },
    },
  }
</script>
