<template>
   <div>
    <canvas ref="canvas"
            id="canvas"
            height="400"
            width="300"></canvas>
   </div>
</template>
<script>
export default {
  mounted () {
    this.canvas = this.$refs.canvas
    this.context = this.$refs.canvas.getContext('2d')
    this.x = Math.floor(this.canvas.clientWidth / 2)
    this.y = this.canvas.clientHeight / 2
    setInterval(this.draw, 100)
    this.drawPaddle()
  },
  methods: {
    draw () {
      this.context.clearRect(0, 0, this.canvas.clientWidth, this.canvas.clientHeight - this.paddleHeight)
      this.drawBall()
      if (this.x + this.dX > this.canvas.clientWidth || this.x + this.dX < 0) {
        this.dX = -this.dX
      } else if (this.y + this.dY < 0 || this.y + this.dY > this.canvas.clientHeight - this.canvas.clientHeight * 0.5) {
        this.dY = -this.dY
      } else {
        this.x += this.dX
        this.y += this.dY
      }
    },
    drawBall () {
      this.context.beginPath()
      this.context.arc(this.x, this.y, 10, 0, Math.PI * 2)
      this.context.fillStyle = '#0095DD'
      this.context.fill()
      this.context.closePath()
    },
    drawPaddle () {
      var paddlePositionX = (this.canvas.clientWidth - this.paddleWidth) / 2
      this.context.beginPath()
      this.context.rect(paddlePositionX, this.canvas.clientHeight - this.paddleHeight, this.paddleWidth, this.paddleHeight)
      this.context.fillStyle = 'purple'
      this.context.fill()
      this.context.closePath()
    }
  },
  data () {
    return {
      paddleHeight: 10,
      paddleWidth: 75,
      x: 0,
      y: 0,
      dX: 4,
      dY: -4,
      canvas: {},
      context: {}
    }
  }
}
</script>
<style scoped>
canvas {
  display: block;
  position: absolute;
  top: 20%;
  border:  2px solid black;
}
</style>
