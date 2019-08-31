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
      <el-table-column label="路由备注">
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
          <!-- <span>{{ scope.row.json }}</span> -->
          <!-- <el-row v-for="json in JSON.parse(scope.row.json)" :key="json">
               {{json}}
          </el-row>-->
          <span>{{JSON.parse(scope.row.json)}}</span>
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
    <el-dialog
      title="路由编辑器"
      :visible.sync="addRouterTableVisible"
      @close="dialogClose('modifyForm')"
    >
      <el-form :model="form" :rules="rules" status-icon ref="modifyForm">
        <el-form-item label="描述" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="路由地址" :label-width="formLabelWidth" prop="router">
          <el-input v-model="form.router" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Method" :label-width="formLabelWidth" prop="method">
          <el-select v-model="form.method" placeholder="选择Method">
            <el-option label="GET" value="GET"></el-option>
            <el-option label="POST" value="POST"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="JSON" :label-width="formLabelWidth" prop="json">
          <el-input v-model="form.json" type="textarea" :rows="15"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelMethod('modifyForm')">取 消</el-button>
        <el-button type="primary" @click="addOrUpdateMethod('modifyForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import request from "@/utils/request";
let _ = require('lodash')
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      apiArray: [],
      addRouterTableVisible: false,
      form: {},
      formLabelWidth: "120px",
      //校验规则
      rules: {
        router: [
          {
            required: true,
            type: "string",
            message: "请输入路由",
            trigger: "blur"
          },
          {
            validator(rule, value, callback, source, options) {
              const errors = [];
              var pattern = new RegExp(
                "[`~!@#$^&*=|{}':;',\\[\\]<>《》?~！@#￥……&*|{}【】‘；：”“'。，、？' ']"
              );
              if (pattern.test(value)) {
                errors.push("输入合适的路由");
              }
              if(value.length>0){
                if(value[0] !== '/'){
                  errors.push("请输入 / 开头的路由地址");
                }
              }
              callback(errors);
            }
          }
        ],
        method: [
          {
            required: true,
            message: "请选择Method",
            trigger: ["change", "blur"]
          }
        ],
        json: [
          { required: false, message: "请输入JSON", trigger: "blur" },
          {
            validator(rule, value, callback, source, options) {
              const error = [];
              if (typeof value == "string") {
                try {
                  var obj = JSON.parse(value);
                  if (typeof obj == "object" && obj) {
                    callback();
                  } else {
                    callback("请输入正确格式JSON");
                  }
                } catch (e) {
                  callback("请输入正确格式JSON");
                }
              } else {
                callback("非字符");
              }
            }
          }
        ]
      }
    };
  },
  mounted: function() {
    this.requestRouter();
  },
  methods: {
    requestRouter() {
      request({
        url: "/getrouter",
        method: "get"
      }).then(response => {
        if (response.data.state == "success") {
          this.apiArray = response.data.data;
        } else {
          this.$message.error("服务器后端似乎没有连接上");
        }
      });
    },
    showaddrouterdialog() {
      let cloneObj = _.cloneDeep({})
      this.form = cloneObj
      this.showeditarea();
    },
    handleDelete(index) {
      request({
        url: "/deleterouter",
        method: "post",
        data: this.apiArray[index]
      }).then(response => {
        if (response.data.state == "success") {
          let obj = this.apiArray.splice(index, 1);
          this.$message({
              message: "删除路由成功",
              type: "success"
            });
        } else {
          this.$message.error("路由无法删除");
        }
      });
    },
    handleEdit(index, row) {
      let cloneObj = _.cloneDeep(row)
      this.form = cloneObj;
      this.showeditarea();
    },
    showeditarea() {
      this.addRouterTableVisible = true;
    },
    addOrUpdateMethod(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.form.id === undefined) {
            //新增路由
            request({
              url: "/queryrouterapi",
              method: "post",
              data: this.form
            }).then(response => {
              if (response.data.state == "success") {
                if (response.data.data.length > 0) {
                  this.$message({
                    message: "存在相应路由",
                    type: "warning"
                  });
                } else {
                  this.addRouterMethod("modifyForm");
                }
              } else {
                console.log(response);
                this.$message.error("数据库出错");
              }
            });
          } else {
            //更新数据
            this.addRouterMethod("modifyForm");
          }
        } else {
          this.$message.error("请填写必要部分");
        }
      });
    },
    addRouterMethod(formName) {
      if (this.form === {}) {
        return;
      }
      request({
        url: "/addrouter",
        method: "post",
        data: this.form
      }).then(response => {
        if (response.data.state == "success") {
          if (this.form.id === undefined) {
            this.$message({
              message: "插入路由成功",
              type: "success"
            });
          } else {
            this.$message({
              message: "更新路由成功",
              type: "success"
            });
          }
          this.form = {};
          this.addRouterTableVisible = false;
          this.$refs[formName].resetFields();
          this.requestRouter();
        } else {
          this.$message.error("插入失败");
        }
      });
    },

    cancelMethod(formName) {
      this.addRouterTableVisible = false;
    },
    dialogClose(formName) {
      this.form = {};
      this.$refs[formName].resetFields();
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
