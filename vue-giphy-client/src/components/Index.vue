<template>
    <div>
        <b-button to="search">
            Search
        </b-button>
        <div v-if="loading">
            <img src="../assets/loading.gif" alt="loading"/>
        </div>
        <div class="images-list">
            <image-card
                    v-for="(item, index) in gifObjects"
                    :key="index"
                    :id="item.id"
                    :url="item.images['original'].url"
                    :placeholder="item.images['original_still'].url"
                    :title="item.title"/>
        </div>
    </div>
</template>

<script>
import api from './../api'
import ImageCard from './ImageCard'
import bButton from 'bootstrap-vue/es/components/button/button'

export default {
  name: 'Index',
  components: {
    ImageCard,
    bButton
  },
  data: () => ({
    gifObjects: [],
    loading: true
  }),
  methods: {
    fetchData () {
      api.getTrending().then(
        res => {
          this.$data.gifObjects.push.apply(this.$data.gifObjects, res.data.data)
          this.$data.loading = false
        }
      ).catch(err => {
        console.log(err)
        this.$data.loading = false
      })
    }
  },
  created () {
    this.fetchData()
  }
}
</script>

<style scoped>
.images-list{
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: center;
}
</style>
