<template>
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    :return-value.sync="date"
    transition="scale-transition"
    offset-y
    :disabled="readonly"
    min-width="auto">
    <template #activator="{ on }">
      <v-text-field
        v-model="computedDateFormatted"
        readonly
        :class="pickerClass"
        v-bind="$attrs"
        v-on="on">
      </v-text-field>
    </template>
    <v-date-picker
      v-model="date"
      no-title
      scrollable
      @click:date="save">
    </v-date-picker>
  </v-menu>
</template>
<script>
export default {
  name: 'DatePicker',
  props: {
    value: {
      type: String, default: null
    },
    readonly: {
      type: Boolean, default: false
    },
    pickerClass:{
      type: String, default: ''
    }
  },
  data() {
    return {
      date: this.value,
      menu: false
    }
  },
  computed: {
    computedDateFormatted () {
      return this.formatDate(this.date)
    },
  },
  watch: {
    computedDateFormatted: {
      immediate: true,
      handler(val) {
        this.$emit('input', val)
      }
    },
  },
  methods: {
    formatDate (date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },
    save() {
      this.$refs.menu.save(this.date)
      this.menu = false
    }
  }
}
</script>
