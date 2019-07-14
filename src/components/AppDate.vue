<template>
  <span :title="timeStamp | niceDate">
    {{timeStamp | difference}}
  </span>
</template>

<script>
import {format, distanceInWordsToNow} from 'date-fns'
export default {
  props: {
    timeStamp: {
      required: true,
      type: Number
    }
  },

  filters: {
    niceDate (date) {
      return format(
        new Date(date),
        'MMM. Do, YYYY @ h:mm aa'
      )
    },
    difference (date) {
      return distanceInWordsToNow(
        new Date(date),
        {addSuffix: true}
      )
    }
  }
}
</script>

<style>

</style>
