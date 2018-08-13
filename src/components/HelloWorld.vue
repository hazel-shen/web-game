<template>
  <div class="hello">
   <h3> Grab the BeacaMon </h3>
   <div>
    <canvas-area> </canvas-area>
   </div>
    <buttonPanel id="buttonPanel"/>
  </div>
</template>

<script>
import ButtonPanel from './button/ButtonPanel'
import CanvasArea from './canvas/CanvasArea'
export default {
  components: {
    ButtonPanel,
    CanvasArea
  },
  name: 'HelloWorld'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

#buttonPanel {
  display: block;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 5%;
}
h1, h2, h3 {
  font-weight: normal;
  color: aliceblue;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
