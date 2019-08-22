<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button @click="addrouter"></button>
  </div>
</template>

<script>
import request from '@/utils/request';
export default {
  
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted:function(){
    request({
      url:'/get',
      method:"get"
    }).then(response=>{
      console.log(response)
    })
  },
  methods:{
    addrouter(){
      const dataObj = {
        'name':'test',
        'dest':'dest',
      }
      request({
        url:'/addrouter',
        method:'post',
        data:dataObj
      }).then(response=>{
        console.log(response.data)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
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
