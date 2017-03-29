<template>
  <div id="app">
    <h1>{{title}}</h1>
    <br>
    <br>
    <br>
    <div id="demo"></div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      title : '分页插件demo'
    }
  },
  mounted(){
    this.$choosePages('demo',function(index){
              console.log('我的选中的页面是',index);
            },
            {
              listsNum:40,
              itemsNum:5,
              btnNum :5
            })
  }

}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
h1{
  font-weight: normal;
}
a{
  text-decoration:none
}
</style>
