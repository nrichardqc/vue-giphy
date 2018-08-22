<template>
    <div class="index">
        <form class="index--form" @submit.prevent="search">
            <p>
                <label for="keywords">Keywords</label>
                <input type="text" id="keywords" name="keywords" v-model="keywords">
            </p>
            <input type="submit"/>
        </form>
        <div v-if="loading">
            <img src="../assets/loading.gif" alt="loading"/>
        </div>
        <div class="images-list">
            <image-card v-for="(item, index) in gifObjects" :key="index" :url="item.images.downsized.url" :title="item.title"/>
        </div>
    </div>
</template>

<script>
import api from './../api'
import ImageCard from './ImageCard'

export default {
  name: 'Index',
  components: {
    ImageCard
  },
  data: () => ({
    gifObjects: [],
    keywords: '',
    loading: true
  }),
  methods: {
    search () {
      const {keywords} = this
      this.keywords = ''
      console.log(keywords)
    },
    fetchData () {
      api.getTrending().then(
        res => {
          this.$data.gifObjects.push.apply(this.$data.gifObjects, res.data.data)
          this.$data.loading = false
        }
      )
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
