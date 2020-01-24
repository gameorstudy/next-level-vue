<template>
      <div>
        <label v-if="label">{{ label }}</label>
        <select
          :value="value"
          v-bind="$attrs"
          @change="updateValue"
          v-on="$listeners"
        >
            <option v-for="option in options" :key="option" :selected="option === value" :value="option">{{ option }}</option>    
        </select>
      </div>
    </template>
    
    <script>
import { formFieldMixin } from '../mixins/formFieldMixin.js'
export default {
  mixins: [formFieldMixin],
  props: {
    options: {
      type: Array,
      required: true
    },
    value: [String, Number]
  }
}
</script>
