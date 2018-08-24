<template>
    <div>
        <h2>Search</h2>
        <p>
            <input type="text" id="keywords" name="keywords" v-on:input="search" placeholder="Keywords">
        </p>
        <div v-if="searching">
            <img src="../assets/loading.gif" alt="loading"/>
        </div>
        <div class="images-list">
            <image-card
                    v-for="(item, index) in gifObjects"
                    :key="index"
                    :url="item.images['fixed_width'].url"
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
    searching: false
  }),
  methods: {
    search: debounce(function (e) {
      this.searching = true
      this.gifObjects.length = 0
      console.log('Searching for ' + e.target.value)

      api.search(e.target.value).then(
        res => {
          this.$data.gifObjects.push.apply(this.$data.gifObjects, res.data.data)
          this.$data.searching = false
        }
      )
    }, 500)
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
