<template>
  <div>
    <!-- Backtop 回到顶部  -->
    <div style="width: 100%;height: 100%;">
      <el-backtop :bottom="60"></el-backtop>
    </div>
    <div class="app-container">
      <div slot="header">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-input placeholder="请输入内容" size="medium">
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </el-col>
          <el-col :span="15">
            <el-button type="primary" size="medium" @click="saveDormitory">
              添加宿舍信息
            </el-button>
             <el-button type="primary" @click="upload" icon="el-icon-upload">
            导入Excel
          </el-button>
            <el-button type="primary" size="medium" @click="exportData">
              导出Excel
            </el-button>
          </el-col>
        </el-row>
      </div>

      <el-table
        :data="dormitoryList"
        style="margin-top: 15px;"
        :v-loading="loading"
        border
        scripe
      >
        <el-table-column
          header-align="center"
          align="center"
          type="index"
          label="#"
          sortable
        ></el-table-column>
        <el-table-column
          header-align="center"
          align="center"
          prop="dormitoryNo"
          label="编号"
          sortable
        ></el-table-column>
         <el-table-column
          header-align="center"
          align="center"
          prop="grade"
          label="年级"
          sortable
        ></el-table-column>
         <el-table-column
          header-align="center"
          align="center"
          prop="major"
          label="专业"
          sortable
        ></el-table-column>
        <el-table-column
          header-align="center"
          align="center"
          prop="buildingNo"
          label="楼号"
          sortable
        ></el-table-column>
        <el-table-column
          header-align="center"
          align="center"
          prop="houseNo"
          label="门牌号"
          sortable
        ></el-table-column>
        <el-table-column
          header-align="center"
          align="center"
          prop="dormitoryType"
          label="宿舍类别"
          sortable
        ></el-table-column>

        <el-table-column header-align="center" align="center" label="操作"  v-if="getRole === 'admin'">
          <template slot-scope="scope">
            <el-tooltip effect="dark" content="编辑" placement="top">
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                @click="edit(scope.row)"
              ></el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="删除" placement="top">
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="remove(scope.row)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 编辑对话框 -->
    <el-dialog
      title="编辑宿舍信息"
      :visible.sync="editdDialogVisible"
      width="30%"
      @close="editDialogClose"
    >
      <el-form
        :model="editDormitoryForm"
        :rules="editDormitoryFormRules"
        ref="editDormitoryFormRef"
        label-width="100px"
      >
        <el-form-item label="编号" prop="dormitoryNo">
          <el-input
            :disabled="true"
            v-model="editDormitoryForm.dormitoryNo"
            type="number"
          ></el-input>
        </el-form-item>
         <el-form-item label="年级" prop="grade">
       <el-select
            v-model="editDormitoryForm.grade"
            placeholder="请选择年级"
          >
            <el-option
              v-for="item in gradeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
         <el-form-item label="专业" prop="major">
          <el-input v-model="editDormitoryForm.major"></el-input>
        </el-form-item>
        <el-form-item label="楼号" prop="buildingNo">
          <el-input v-model="editDormitoryForm.buildingNo"></el-input>
        </el-form-item>
        <el-form-item label="门牌号" prop="houseNo">
          <el-input v-model="editDormitoryForm.houseNo"></el-input>
        </el-form-item>
        <el-form-item label="宿舍类别" prop="dormitoryType">
          <el-select
            v-model="editDormitoryForm.dormitoryType"
            placeholder="请选择宿舍类别"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editdDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editSubmit()">
          确 定
        </el-button>
      </span>
    </el-dialog>
    <!-- 添加宿舍信息对话框 -->
    <el-dialog
      title="添加宿舍信息"
      :visible.sync="saveDialogVisible"
      width="30%"
      @close="handleClose"
    >
      <!-- 添加表单 -->
      <el-form
        :model="saveDormitoryForm"
        :rules="saveDormitoryFormRules"
        ref="saveDormitoryFormRef"
        label-width="100px"
      >
        <el-form-item label="编号" prop="dormitoryNo">
          <el-input
            :disabled="false"
            v-model="saveDormitoryForm.dormitoryNo"
            placeholder="请输入编号"
            type="number"
          ></el-input>
        </el-form-item>
        <el-form-item label="楼号" prop="buildingNo">
          <el-input
            v-model="saveDormitoryForm.buildingNo"
            placeholder="请输入楼号"
          ></el-input>
        </el-form-item>
          <el-form-item label="年级" prop="grade">
           <el-select
            v-model="saveDormitoryForm.grade"
            placeholder="请选择年级"
          >
            <el-option
              v-for="item in gradeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
           </el-form-item>
         <el-form-item label="专业" prop="major">
          <el-input
            v-model="saveDormitoryForm.major"
            placeholder="请输入专业"
          ></el-input>
            </el-form-item>
        <el-form-item label="门牌号" prop="houseNo">
          <el-input
            v-model="saveDormitoryForm.houseNo"
            placeholder="请输入门牌号"
          ></el-input>
        </el-form-item>
        <el-form-item label="宿舍类别" prop="dormitoryType">
          <el-select
            v-model="saveDormitoryForm.dormitoryType"
            placeholder="请选择宿舍类别"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="saveDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="add()">
          确 定
        </el-button>
      </span>
    </el-dialog>
     <!-- 上传文件对话框 -->
    <el-dialog title="上传文件" :visible.sync="uploadDialogVisible" width="30%">
      <el-form>
        <el-form-item label="请选择Excel文件">
          <!-- name的名字要和后端一致，action为后端接口地址 -->
          <el-upload
            :auto-upload="true"
            :multiple="false"
            :limit="1"
            :on-exceed="handleExceed"
            :on-success="handleSuccess"
            :on-error="handleError"
            :action="BASE_API + '/admin/core/dictDormitory/import'"
            name="file"
            accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">
              支持xls和xlsx类型文件，注意一次只能上传一个文件
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 分页 -->
    <el-pagination
       style="margin-left: 15px;"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.currentPage"
      :page-sizes="[5, 10, 15, 20, 25, 50, 100]"
      :page-size="queryInfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>
<script>
import store from '@/store/index'
import dormitoryApi from '@/api/core/dormitory'

export default {
  data() {
    var checkstudentNo = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('学号不能为空'))
      }
      setTimeout(() => {
        if (value.length < 10) {
          callback(new Error('学号不能少于十位'))
        } else {
          callback()
        }
      }, 1000)
    }
    var validateValue = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('值不能为空'))
      }
      callback()
    }
    return {
      BASE_API: process.env.VUE_APP_BASE_API,
      loading: true,
      dormitoryList: [],
      total: 0,
      queryInfo: {
        query:'',
        currentPage: 1,
        pagesize: 5
      },
      editdDialogVisible: false,
      uploadDialogVisible: false,
      editDormitoryForm: {
        dormitoryNo: '',
        grade:'',
        major:'',
        buildingNo: '',
        houseNo: '',
        dormitoryType: ''
      },
      // 编辑表单验证规则
      editDormitoryFormRules: {
         dormitoryNo: [{ required: true, message: '不能为空' }],
         grade: [{ required: true, message: '不能为空' }],
         major: [{ required: true, message: '不能为空' }],
         buildingNo: [{ required: true, message: '不能为空' }],
         houseNo: [{ required: true, message: '不能为空' }]
      },
      options: [
        {
          value: '男寝',
          label: '男寝'
        },
        {
          value: '女寝',
          label: '女寝'
        }
      ],

       gradeOptions: [
        {
          value: '2018级',
          label: '2018级'
        },
         {
          value: '2019级',
          label: '2019级'
        },
         {
          value: '2020级',
          label: '2020级'
        },
        {
          value: '2021级',
          label: '2021级'
        },
        {
          value: '2022级',
          label: '2022级'
        }
      ],
     
      saveDialogVisible: false,
      // 新增宿舍信息列表
      saveDormitoryForm: {},
      // 表单验证规则
      saveDormitoryFormRules: {
         dormitoryNo: [{ required: true, message: '不能为空' }],
         grade: [{ required: true, message: '不能为空' }],
         major: [{ required: true, message: '不能为空' }],
         buildingNo: [{ required: true, message: '不能为空' }],
         houseNo: [{ required: true, message: '不能为空' }]
      },
     
    }
  },
  created() {
    this.fetchData()
  },
  mounted() {},
  computed: {
    getRole() {
      // 获取当前角色
      return store.state.user.roles[0]
    }
  },
  methods: {
    fetchData() {
      dormitoryApi
        .fetchData(this.queryInfo.currentPage,this.queryInfo.pagesize)
        .then(response => {
          // console.log(response)
          this.dormitoryList = response.data.records
          this.total = response.data.total
          this.currentPage = response.data.pageCurrent
          this.$message.success(response.message)
          this.loading = false
        })
        .catch(err => {
          // console.log(err)
          return this.$message.error('获取数据列表失败')
        })
    },
    fetchDataNoMessage() {
      dormitoryApi
        .fetchData(this.queryInfo.currentPage,this.queryInfo.pagesize)
        .then(response => {
          // console.log(response)
          this.dormitoryList = response.data.records
          this.total = response.data.total
          this.currentPage = response.data.pageCurrent
          this.loading = false
        })
        .catch(err => {
          // console.log(err)
          return this.$message.error('获取数据列表失败')
        })
    },
    edit(value) {
      this.editdDialogVisible = true
      dormitoryApi.getById(value.dormitoryNo).then(response => {
        // console.log(response)
        this.editDormitoryForm = response.data.record
        // console.log(this.editDormitoryForm)
      })
    },
    // 编辑宿舍信息提交
    editSubmit() {
      const dormitory = this.editDormitoryForm
      this.$refs.editDormitoryFormRef.validate(valid=>{
        if(!valid) return 
         dormitoryApi
        .update(dormitory)
        .then(response => {
          this.$message.success(response.message)
          this.fetchDataNoMessage()
          this.editdDialogVisible = false
        })
        .catch(err => {
          return this.$message.error(err)
        })
      })
    },
    // 编辑对话框关闭时重置表单
    editDialogClose() {
      this.$refs.editDormitoryFormRef.resetFields()
    },
    // 根据宿舍号删除宿舍信息
    remove(value) {
     //  console.log(value)
      this.$confirm('此操作将永久删除该宿舍信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          return dormitoryApi.removeById(value.dormitoryNo)
        })
        .then(response => {
          this.$message.success(response.message)
          this.fetchDataNoMessage()
        })
        .catch(error => {
          if (error === 'cancel') {
            this.$message.info('已取消删除')
          }
        })
    },
    saveDormitory() {
      this.saveDialogVisible = true
    },
    handleClose() {
      this.$refs.saveDormitoryFormRef.resetFields()
    },
    // 添加提交
    add() {
      this.$refs.saveDormitoryFormRef.validate(valid => {
        if (!valid) return
        const newDormitory = this.saveDormitoryForm
        dormitoryApi
          .add(newDormitory)
          .then(response => {
            this.$message.success(response.message)
            this.fetchData()
            this.saveDialogVisible = false
          })
          .catch(err => {
            return this.$message.error(err)
          })
      })
    },
    handleSizeChange(newsize) {
      this.queryInfo.pagesize = newsize
      this.fetchDataNoMessage()
    },
    handleCurrentChange(newPage) {
      this.queryInfo.currentPage = newPage
      this.fetchDataNoMessage()
    },
     // 上传Excel
    upload() {
      this.uploadDialogVisible = true
    },
    // 处理Excel上传成功 通信成功
    handleSuccess(response) {
      if (response.code === 0) {
        this.$message.success('数据导入成功')
        this.uploadDialogVisible = false
        this.fetchDataNoMessage()
      } else {
        // 业务失败
        this.$message.error(response.message)
      }
    },
    //  通信失败
    handleError(error) {
      this.$message.error('数据导入失败')
    },
    // 当上传多于一个文件时
    handleExceed() {
      this.$message.warning('只能选取一个文件')
    },
    exportData(){
      window.location.href = this.BASE_API + '/admin/core/dictDormitory/export'
    }
  }
}
</script>
<style scoped></style=>
