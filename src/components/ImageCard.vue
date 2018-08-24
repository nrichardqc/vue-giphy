<template>
    <b-card :title="title"
            :img-src="url"
            img-alt="Image"
            img-top
            style="max-width: 20rem;"
            class="image-card"
            v-on:click="click"
            v-bind:class="{'bg-info': isFavorite, 'text-white': isFavorite}">
    </b-card>
</template>

<script>
import bCard from 'bootstrap-vue/es/components/card/card'

export default {
  name: 'image-card',
  components: {
    bCard
  },
  props: [
    'id',
    'url',
    'title'
  ],
  data: function () {
    return {
      isFavorite: false
    }
  },
  mounted () {
    this.isFavorite = localStorage[this.id]
  },
  watch: {
    isFavorite (newValue) {
      if (newValue) {
        localStorage[this.id] = true
      } else {
        localStorage.removeItem(this.id)
      }
    }
  },
  methods: {
    click: function (event) {
      this.isFavorite = !this.isFavorite
    }
  }
}
</script>

<style scoped>
.image-card {
    margin : 20px;
}
</style>
