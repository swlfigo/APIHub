<template>
  <div>
    <h1 align="center">{{ msg }}</h1>
    <el-button class="marginClass" @click="showaddrouterdialog">新增路由</el-button>
    <el-table :data="apiArray" style="width: 100%;text-align: center;">
      <el-table-column label="ID" type="index">
        <!-- <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row }}</span>
        </template>-->
      </el-table-column>
      <el-table-column label="姓名">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="路由">
        <template slot-scope="scope">
          <span>{{ scope.row.router }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Method">
        <template slot-scope="scope">
          <span>{{ scope.row.method }}</span>
        </template>
      </el-table-column>
      <el-table-column label="JSON">
        <template slot-scope="scope">
          <span>{{ scope.row.json }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- dialog -->
    <el-dialog title="收货地址" :visible.sync="addRouterTableVisible">
      <el-form :model="form">
        <el-form-item label="描述" :label-width=formLabelWidth>
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="路由地址" :label-width=formLabelWidth>
          <el-input v-model="form.router" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动区域" :label-width="formLabelWidth">
          <el-select v-model="form.method" placeholder="选择Method">
            <el-option label="Get" value="get"></el-option>
            <el-option label="Post" value="post"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addRouterTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRouterTableVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import request from "@/utils/request";
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      apiArray: [],
      addRouterTableVisible: false,
      form:{

      },
      oriform: {
        name: "",
        // 路由默认Get
        router: "",
        method: "get",
        jsonStr: ""
      },
      formLabelWidth: '120px'
    };
  },
  mounted: function() {
    request({
      url: "/getrouter",
      method: "get"
    }).then(response => {
      if (response.data.state == "success") {
        this.apiArray = response.data.data;
      } else {
      }
    });
  },
  methods: {
    showaddrouterdialog(){
      this.form = this.oriform
      this.addRouterTableVisible=true
    },
    handleDelete(index) {
      console.log(index);
      request({
        url: "/deleterouter",
        method: "post",
        data: this.apiArray[index]
      }).then(response => {
        if (response.data.state == "success") {
          let obj = this.apiArray.splice(index, 1);
          console.log(obj);
          console.log(response.data.data);
        } else {
        }
      });
    },
    handleEdit(index) {
      // console.log(index)
      this.form = this.apiArray[index]
      console.log(this.form)
      this.addRouterTableVisible = true
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
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
.marginClass {
  margin-left: 40px;
  margin-bottom: 40px;
}
.addrouterClass {
  margin-bottom: 40px;
}
</style>
