<template>
  <div>
      <button type="button" class="btn btn-info btn-circle btn-xl">
        <span class="glyphicon glyphicon-arrow-left"></span>
      </button>
      <button type="button" class="btn btn-info btn-circle btn-xl">
        <span class="glyphicon glyphicon-screenshot"></span>
      </button>
      <button type="button" class="btn btn-info btn-circle btn-xl">
        <span class="glyphicon glyphicon-arrow-right"></span>
      </button>
        <p>{{ count }}</p>
      <button @click="increment">+</button>
      <button @click="decrement">-</button>
    </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data () {
    return {
      // count: this.$store.state.count
    }
  },
  methods: {
    ...mapMutations([
      'increment',
      'decrement'
    ])
  },
  computed: mapState({
    count: state => state.count
  })
}
</script>
<style scoped>

.btn-circle {
  width: 30px;
  height: 30px;
  text-align: center;
  padding: 6px 0;
  font-size: 12px;
  line-height: 1.428571429;
  border-radius: 15px;
}
.btn-circle.btn-lg {
  width: 50px;
  height: 50px;
  padding: 10px 16px;
  font-size: 18px;
  line-height: 1.33;
  border-radius: 25px;
}
.btn-circle.btn-xl {
  width: 70px;
  height: 70px;
  padding: 10px 16px;
  font-size: 24px;
  line-height: 1.33;
  border-radius: 35px;
}
</style>
