<template>
  <v-btn v-bind="$attrs" icon v-on="$listeners">
    <v-icon v-bind="$attrs" :class="iconClass">
      {{ icon }}
    </v-icon>
  </v-btn>
</template>
<script>
export default {
  name: 'IconBtn',
  props: {
    icon: { type: String, required: true },
    iconClass: { type: String, default: ''}
  },
}
</script>
