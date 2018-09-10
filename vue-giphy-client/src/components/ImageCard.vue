<template>
    <b-card :title="title"
            class="image-card"
            v-on:click="click"
            v-bind:class="{'bg-info': isFavorite, 'text-white': isFavorite}">

        <b-card-body class="image-card-body">
            <img class="loadingImage" :src="placeholder" :alt="title"/>
            <img class="overlay" :src="overlayUrl" :style="{opacity: overlayOpacity}"/>
        </b-card-body>
    </b-card>
</template>

<script>
import bCard from 'bootstrap-vue/es/components/card/card'
import bCardBody from 'bootstrap-vue/es/components/card/card-body'

export default {
  name: 'image-card',
  components: {
    bCard,
    bCardBody
  },
  props: [
    'id',
    'url',
    'title',
    'placeholder'
  ],
  data: function () {
    return {
      isFavorite: false,
      overlayOpacity: 0,
      overlayUrl: null
    }
  },
  created () {
  },
  mounted () {
    this.isFavorite = localStorage[this.id]

    // Progressive image loading, inspired by
    // https://codepen.io/philsanders/pen/VPYmYN
    let image = new Image()
    image.onload = () => {
      this.overlayUrl = this.url
      this.overlayOpacity = 1
    }
    image.src = this.url
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
    click: function () {
      this.isFavorite = !this.isFavorite
    }
  }
}
</script>

<style scoped>
.image-card {
    margin : 20px;
    max-width: 20rem;
}

.image-card-body {
    position: relative;
    overflow: hidden;
}

.image-card-body img {
    display: block;
}

.image-card-body .loadingImage {
    filter: blur(5px);
    width: 100%;
}

.image-card-body .overlay {
    position: absolute;
    top: 1.25rem;
    left: 1.25rem;
    opacity: 0;
    width: calc(100% - 2.5rem);
    transition: opacity 200ms ease-in;
}
</style>
