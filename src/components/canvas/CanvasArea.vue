<template>
   <div>
    <canvas ref="canvas"
            id="canvas"
            ></canvas>
   </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  mounted () {
    this.canvas = this.$refs.canvas
    this.context = this.$refs.canvas.getContext('2d')
    this.context.canvas.width = window.innerWidth * 0.8
    this.context.canvas.height = window.innerHeight * 0.6
    this.ballX = Math.floor(this.canvas.clientWidth / 2)
    this.ballY = this.canvas.clientHeight / 2
    this.ballInterval = setInterval(this.draw, 500)
    // this.drawBeacaFood()
    this.initPaddle()
  },
  methods: {
    draw () {
      this.context.clearRect(this.ballX - 10, this.ballY - 10, 100, 100)
      this.drawBall()
      if (this.ballX + this.dBallX > this.canvas.clientWidth || this.ballX + this.dBallX < 0) {
        this.dBallX = -this.dBallX
      } else if (this.ballY + this.dBallY < 0 || this.ballY + this.dBallY > this.canvas.clientHeight - this.canvas.clientHeight * 0.5) {
        this.dBallY = -this.dBallY
      } else {
        this.ballX += this.dBallX
        this.ballY += this.dBallY
      }
    },
    drawBall () {
      console.log(this.ballY)
      this.ball.src = 'http://res.pokemon.name/common/pokemon/pgl/007.00.png'
      var sourceX = 0
      var sourceY = 0
      var sourceWidth = this.ball.width - 1 // you're in the bounds
      var sourceHeight = this.ball.height - 1
      var destX = this.ballX
      var destY = this.ballY
      var destWidth = 50
      var destHeight = 50

      this.ball.onload = () => {
        this.context.drawImage(this.ball, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight)
      }
    },
    drawBeacaFood () {
      this.foodInterval = setInterval(() => {
        this.context.clearRect(this.foodX - 10, this.foodY - 10, 30, 30)
        this.food.src = 'http://mail.wcjs.tc.edu.tw/~aher/uploads/tad_book3/image/scratch/pokemon-ball.png'
        this.food.onload = () => {
          this.context.drawImage(this.food, this.foodX, this.foodY, 20, 20)
        }
        if (this.foodX + this.dFoodX > this.canvas.clientWidth || this.foodX + this.dFoodX < 0) {
          this.dFoodX = -this.dFoodX
        } else if (this.foodY + this.dFoodY < 0 || this.foodY + this.dFoodY > this.canvas.clientHeight) {
          this.dFoodY = -this.dFoodY
        } else {
          this.foodX += this.dFoodX
          this.foodY += this.dFoodY
        }
        this.isEaten()
      }, 500)
    },
    initPaddle () {
      var paddlePositionX = (this.canvas.clientWidth - this.paddleWidth) / 2
      this.setPaddleX(paddlePositionX)
      this.drawPaddle(paddlePositionX)
    },
    drawPaddle (paddlePositionX) {
      this.context.clearRect(0, this.canvas.clientHeight - this.paddleHeight, this.canvas.clientWidth, this.paddleHeight)
      this.context.beginPath()
      this.context.rect(paddlePositionX, this.canvas.clientHeight - this.paddleHeight, this.paddleWidth, this.paddleHeight)
      this.context.fillStyle = 'purple'
      this.context.fill()
      this.context.closePath()
    },
    setPaddleX (paddleX) {
      return this.$store.commit('setPaddleX', paddleX)
    },
    isEaten () {
      console.log(this.foodX + ' ' + this.foodY + ' ' + this.ballX + ' ' + this.ballY)
      if (this.foodX > this.ballX - 50 && this.foodX < this.ballX + 50 && this.foodY > this.ballY - 50 && this.foodY < this.ballY + 50) {
        alert('Eaten!')
        clearInterval(this.foodInterval)
        clearInterval(this.ballInterval)
      }
    }
  },
  computed: {
    ...mapState([
      'count',
      'paddleX',
      'isLaunch'
    ])
  },
  watch: {
    'paddleX': function (e) {
      console.log(e)
      this.drawPaddle(e)
    },
    'isLaunch': function () {
      this.drawBeacaFood()
    }
  },
  data () {
    return {
      ballInterval: {},
      foodInterval: {},
      ball: new Image(),
      food: new Image(),
      paddleHeight: 10,
      paddleWidth: 60,
      foodHeight: 10,
      foodWidth: 10,
      ballRadius: 10,
      ballX: 0,
      ballY: 0,
      dBallX: 4,
      dBallY: -4,
      foodX: 30,
      foodY: 40,
      dFoodX: 8,
      dFoodY: -8,
      canvas: {},
      context: {}
    }
  }
}
</script>
<style scoped>
canvas {
  display: block;
  position: relative;
  margin: auto;
  top: 20%;
  border:  2px solid black;
}
</style>
