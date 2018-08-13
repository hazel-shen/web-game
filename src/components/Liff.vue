<template>
  <div>
    <h4>{{msg}}</h4>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      userName: '',
      msg: 'Welcome'
    }
  },
  mounted () {
    liff.init(
      data => {
        this.userName = data.context.userId
      },
      err => {
        // LIFF initialization failed
      }
    )
    this.getProfile()    
  },
  computed: {
    ...mapState([
      'message'
    ])
  },
  watch: {
    'message': function (msg) {
      this.msg = msg
    },
    'count': function () {
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
