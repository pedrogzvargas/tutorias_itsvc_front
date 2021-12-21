<template>
  <div>
    <v-select
      v-if="question.question_type.type==='choice'"
      v-model="selectedChoice"
      :items="question.choice"
      :label="question.question"
      :rules="inputRules"
      item-value="id"
      item-text="choice"
      outlined
      dense
    />
    <v-select
      v-if="question.question_type.type==='bool'"
      v-model="selectedBool"
      :items="boolItems"
      :label="question.question"
      :rules="inputRules"
      item-value="id"
      item-text="name"
      outlined
      dense
    />
    <v-text-field
      v-if="question.question_type.type==='string'"
      v-model="stringValue"
      :label="question.question"
      dense
      outlined
    />
  </div>
</template>

<script>
  export default {
    name: 'Answare',
    components: {

    },
    props: {
      question: Object,
    },
    data () {
      return {
        boolItems: [
          { id: true, name: 'Si' },
          { id: false, name: 'No' },
        ],
      }
    },
    computed: {
      selectedChoice () {
        return this.question.choice_answer.length ? this.question.choice_answer[0].choice : null
      },
      selectedBool () {
        return this.question.bool_answer.length ? this.question.bool_answer[0].response : null
      },
      stringValue () {
        return this.question.string_answer.length ? this.question.string_answer[0].response : null
      },
      inputRules () {
        const rules = [v => !!v || 'Este campo es requerido']
        return this.question.required ? rules : []
      },
    },
  }
</script>

<style scoped>

</style>
