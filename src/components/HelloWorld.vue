<template>
  <div>
    <h1 align="center">{{ msg }}</h1>
    <el-button class="marginClass" @click="showaddrouterdialog">新增路由</el-button>
    <el-table :data="apiArray" style="width: 100%">
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
      <el-form :model="form" :rules="rules" status-icon ref="modifyForm">
        <el-form-item label="描述" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="路由地址" :label-width="formLabelWidth" prop="router">
          <el-input v-model="form.router" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Method" :label-width="formLabelWidth" prop="method">
          <el-select v-model="form.method" placeholder="选择Method">
            <el-option label="Get" value="get"></el-option>
            <el-option label="Post" value="post"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addRouterTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrUpdateMethod('modifyForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import request from "@/utils/request";
export default {
  name: "HelloWorld",
  data() {
    // 路由唯一验证
    let vaildRouter = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入路由"));
        return;
      }
      console.log(value);
      request({
        url: "/queryrouterapi",
        method: "post",
        data: { router: value }
      }).then(response => {
        if (response.data.state == "success") {
          if (response.data.data.length > 0) {
            callback(new Error("存在相应路由"));
          } else {
            callback();
          }
        } else {
          callback(new Error("数据库出错"));
        }
      });
    };
    return {
      msg: "Welcome to Your Vue.js App",
      apiArray: [],
      addRouterTableVisible: false,
      form: {},
      oriform: {
        id: "",
        name: "",
        // 路由默认Get
        router: "",
        method: "get",
        jsonStr: ""
      },
      formLabelWidth: "120px",
      //校验规则
      rules: {
        router: [{ required: true, message: "请输入路由", trigger: "blur" }],
        method: [
          {
            required: true,
            message: "请选择Method",
            trigger: ["change", "blur"]
          }
        ]
      }
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
    showaddrouterdialog() {
      this.form = {};
      console.log(this.oriform);
      this.showeditarea();
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
      this.form = this.apiArray[index];
      
      this.showeditarea();
    },
    showeditarea() {
      this.addRouterTableVisible = true;
    },
    addOrUpdateMethod(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let _this = this
          console.log("vail success");
          console.log(this.$refs[formName])
          request({
            url: "/queryrouterapi",
            method: "post",
            data: { router: this.$refs[formName].router }
          }).then(response => {
            if (response.data.state == "success") {
              if (response.data.data.length > 0) {
                this.$message({
                  message: "存在相应路由",
                  type: "warning"
                });
              } else {
                this.addRouterTableVisible = false;
              }
            } else {
              his.$message.error("数据库出错");
            }
          });
        } else {
          console.log("vail fail");
        }
      });
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
