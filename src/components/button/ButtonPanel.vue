<template>
  <div>
      <button type="button"
              class="btn btn-info btn-circle btn-xl"
              @click="movePaddleToLeft">
        <span class="glyphicon glyphicon-arrow-left"></span>
      </button>
      <button type="button"
              class="btn btn-info btn-circle btn-xl"
              @click="setLaunch">
        <span class="glyphicon glyphicon-screenshot"></span>
      </button>
      <button type="button"
              class="btn btn-info btn-circle btn-xl"
              @click="movePaddleToRight">
        <span class="glyphicon glyphicon-arrow-right"></span>
      </button>
      <button @click="send">send Message </button>
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      stepOfPaddle: 10
      
    }
  },
  computed: {
    ...mapState([
      'paddleX',
      'count',
      'isLaunch'
    ])
  },
  methods: {
    movePaddleToLeft () {
      return this.$store.commit('setPaddleX', this.$store.state.paddleX - this.stepOfPaddle)
    },
    movePaddleToRight () {
      return this.$store.commit('setPaddleX', this.$store.state.paddleX + this.stepOfPaddle)
    },
    setLaunch () {
      return this.$store.commit('setLaunch', !this.$store.state.isLaunch)
    },
    send() {
      liff.sendMessages([
        {
          type:'text',
          text:'恭喜捕獲神奇寶貝!'
        }
      ])
      .then(() => {
        console.log('message sent')
      })
      .catch((err) => {
        console.log('error', err)
      })
    }
  }
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
