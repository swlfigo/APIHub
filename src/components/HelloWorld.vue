<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button @click="addrouter">lalal</button>

    <el-table
    :data="apiArray"
    style="width: 100%">
    <el-table-column
      label="ID"
      width="180">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.id }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="姓名"
      width="180">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.name }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="路由"
      width="180">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.router }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="Method"
      width="180">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.method }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="JSON"
      width="180">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.json }}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
import request from '@/utils/request';
export default {
  
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      apiArray:[]
    }
  },
  mounted:function(){
    request({
      url:'/getrouter',
      method:"get"
    }).then(response=>{
      if(response.data.state == 'success'){
          this.apiArray = response.data.data
          console.log(response.data.data)
        }else{

        }
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
        // console.log(response.data)
        
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
