<template>
    <div>
        <h2>Search</h2>
        <p>
            <input ref="keywords" type="text" v-model="keywords" placeholder="Keywords">
        </p>
        <div v-if="searching">
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
import debounce from 'lodash.debounce'

export default {
  name: 'Search',
  components: {
    ImageCard
  },
  data: () => ({
    gifObjects: [],
    keywords: '',
    searching: false
  }),
  watch: {
    keywords: function (newValue, oldValue) {
      // Inspired by https://vuejs.org/v2/guide/computed.html#Watchers
      this.searching = true
      this.gifObjects.length = 0
      this.debouncedSearch()
    }
  },
  created: function () {
    this.debouncedSearch = debounce(this.search, 500)
  },
  mounted: function () {
    this.$nextTick(() => this.$refs.keywords.focus())
  },
  methods: {
    search: function () {
      console.log('Searching for ' + this.keywords)

      api.search(this.keywords).then(
        res => {
          this.$data.gifObjects.push.apply(this.$data.gifObjects, res.data.data)
          this.$data.searching = false
        }
      ).catch(err => {
        console.log(err)
        this.$data.searching = false
      })
    }
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
