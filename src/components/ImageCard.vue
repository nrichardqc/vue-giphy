<template>
    <b-card :title="title"
            :img-src="url"
            img-alt="Image"
            img-top
            style="max-width: 20rem;"
            class="mb-2">
    </b-card>
</template>

<script>
import bCard from 'bootstrap-vue/es/components/card/card'

export default {
  name: 'image-card',
  components: {
    bCard
  },
  props: ['url', 'title'],
  data: () => ({
    isLoading: true
  })
}
</script>

<style scoped>

</style>
