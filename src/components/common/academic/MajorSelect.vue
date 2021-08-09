<template>
  <div>
    <v-select
      v-model="selected"
      item-value="id"
      item-text="name"
      :items="majors"
      label="Carrera"
      :readonly="readonly"
      outlined
      @change="emitSelected"
    ></v-select>
  </div>
</template>

<script>
  import MajorService from '../../../services/common/academy/MajorService'

  export default {
    name: 'MajorSelect',
    props: {
      universityId: Number,
      defaultSelected: Number,
      readonly: Boolean,
    },
    data () {
      return {
        selected: this.defaultSelected,
        majors: [
          { id: 0, name: 'Seleccione' },
        ],
      }
    },
    watch: {
      universityId: function () {
        this.majors = [
          { id: 0, name: 'Seleccione' },
        ]
        this.selected = 0
        this.fillSelect()
      },
      defaultSelected (value) {
        this.selected = value
      },
    },
    created () {
      this.fillSelect()
    },
    methods: {
      fillSelect () {
        if (this.universityId) {
          MajorService.get(this.universityId).then(
            universities => universities.data.data.forEach(
              element => this.majors.push(element),
            ),
          ).catch(
            function (error) {
              return Promise.reject(error)
            },
          )
        } else {
          console.info('No existe univeridad id')
        }
      },
      emitSelected () {
        this.$emit('SelectedItem', this.selected)
      },
    },
  }
</script>
