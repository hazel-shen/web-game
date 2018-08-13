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
    this.initFood()
    this.initPaddle()
  },
  methods: {
    draw () {
      this.context.clearRect(this.ballX - 25, this.ballY - 25, 100, 100)
      this.drawBall()
      this.setBallWay()
    },
    drawBall () {
      var ball = new Image()
      ball.src = 'http://res.pokemon.name/common/pokemon/pgl/007.00.png'
      var sourceX = 0
      var sourceY = 0
      var sourceWidth = ball.width - 1 // you're in the bounds
      var sourceHeight = ball.height - 1
      var destX = this.ballX
      var destY = this.ballY
      var destWidth = 50
      var destHeight = 50

      ball.onload = () => {
        this.context.drawImage(ball, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight)
      }
    },
    drawBeacaFood () {
      this.foodInterval = setInterval(() => {
        this.context.clearRect(this.foodX, this.foodY, 30, 30)
        var food = new Image()
        food.src = 'http://mail.wcjs.tc.edu.tw/~aher/uploads/tad_book3/image/scratch/pokemon-ball.png'
        food.onload = () => {
          this.context.drawImage(food, this.foodX, this.foodY, this.foodImageHeight, this.foodImageHeight)
        }
        this.isFoodCrush()
        this.setFoodWay()
        this.isEaten()
      }, 500)
    },
    initFood () {
      var food = new Image()
      food.src = 'http://mail.wcjs.tc.edu.tw/~aher/uploads/tad_book3/image/scratch/pokemon-ball.png'
      this.foodX = (this.canvas.clientWidth - this.foodImageHeight) / 2
      this.foodY = this.canvas.clientHeight - this.foodImageHeight * 1.5
      food.onload = () => {
        this.context.drawImage(food, this.foodX, this.foodY, this.foodImageHeight, this.foodImageHeight)
      }
    },
    initPaddle () {
      var paddlePositionX = (this.canvas.clientWidth - this.paddleWidth) / 2
      this.setPaddleX(paddlePositionX)
      this.drawPaddle(paddlePositionX)
    },
    setFoodWay () {
      if (this.foodX + this.dFoodX > this.canvas.clientWidth - this.foodImageHeight || this.foodX + this.dFoodX < 0) {
        this.dFoodX = -this.dFoodX
      } else if (this.foodY + this.dFoodY < 0 || this.foodY + this.dFoodY > this.canvas.clientHeight) {
        this.dFoodY = -this.dFoodY
      } else {
        this.foodX += this.dFoodX
        this.foodY += this.dFoodY
      }
    },
    setBallWay () {
      if (this.ballX + this.dBallX > this.canvas.clientWidth - this.ballImageHeight || this.ballX + this.dBallX < 0) {
        this.dBallX = -this.dBallX
      } else if (this.ballY + this.dBallY < 0 || this.ballY + this.dBallY > this.canvas.clientHeight - this.canvas.clientHeight * 0.5) {
        this.dBallY = -this.dBallY
      } else {
        this.ballX += this.dBallX
        this.ballY += this.dBallY
      }
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
    isFoodCrush () {
      if (this.foodX > this.$store.state.paddleX - this.paddleWidth/2 && 
          this.foodX < this.$store.state.paddleX + this.paddleWidth &&
          this.foodY === this.canvas.clientHeight - this.foodImageHeight*1.5) {
        this.dFoodY = -this.dFoodY                              
      } else if (
      (this.foodX < this.$store.state.paddleX || this.foodX > this.$store.state.paddleX + this.paddleWidth) &&
      this.foodY > this.canvas.clientHeight - this.foodImageHeight*1.5) {
        this.clearAllIntervals()
        alert('crush')            
      }
    },
    isEaten () {
      if (this.foodX > this.ballX - this.eatDistance &&
          this.foodX < this.ballX + this.eatDistance &&
          this.foodY > this.ballY - this.eatDistance &&
          this.foodY < this.ballY + this.eatDistance) {
        this.clearAllIntervals()
        alert('Eaten!')        
      }
    },
    clearAllIntervals () {
      clearInterval(this.foodInterval)
      clearInterval(this.ballInterval)
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
      this.drawPaddle(e)
    },
    'isLaunch': function () {
      this.context.clearRect(this.foodX, this.foodY, 30, 30)      
      this.foodX += this.dFoodX
      this.foodY += this.dFoodY
      this.drawBeacaFood()
    }
  },
  data () {
    return {
      ballInterval: {},
      foodInterval: {},
      ballImageHeight: 30,
      foodImageHeight: 30,
      paddleHeight: 10,
      paddleWidth: 60,
      foodHeight: 10,
      foodWidth: 10,
      ballRadius: 10,
      ballX: 0,
      ballY: 0,
      dBallX: 25,
      dBallY: -25,
      foodX: 30,
      foodY: 40,
      dFoodX: 20,
      dFoodY: -20,
      eatDistance: 15,
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
  background-image: url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOzgjOO1ujShtqjvN_7h0i2KWzIAgw4e7wlA_dLivT8JEShxMl');
}
</style>
