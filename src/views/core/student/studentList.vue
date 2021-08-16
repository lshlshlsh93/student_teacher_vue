<template>
  <div class="app-container">
    <div slot="header">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容" clearable>
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="15">
          <el-button type="primary" @click="saveData">添加学生信息</el-button>
          <el-button type="primary" @click="upload" icon="el-icon-upload">
            导入Excel
          </el-button>
          <el-button type="primary" icon="el-icon-upload2" @click="exportData">
            导出Excel
          </el-button>
        </el-col>
      </el-row>
    </div>

    <el-table
      :data="list"
      border
      scripe
      style="margin-top: 15px;"
      v-loading="listLoading"
    >
      <el-table-column label="学号" prop="studentNo" align="center" sortable />
      <el-table-column
        label="学生姓名"
        prop="studentName"
        width="70"
        sortable
      />
      <el-table-column
        label="性别"
        prop="sex"
        width="50"
        align="center"
        sortable
      />
      <el-table-column label="联系方式" prop="email" align="center" sortable />
      <el-table-column
        label="家庭地址"
        prop="homeAddress"
        align="center"
        sortable
      />
      <el-table-column
        label="家长姓名"
        prop="parentName"
        align="center"
        sortable
      />
      <el-table-column
        label="家长联系方式"
        prop="parentContact"
        align="center"
        sortable
      />
      <el-table-column
        label="辅导员姓名"
        prop="counselorInformation"
        align="center"
        sortable
      />
      <el-table-column
        label="领导姓名"
        prop="leadershipInformation"
        align="center"
        sortable
      />

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-tooltip
            effect="dark"
            content="编辑"
            placement="top"
            :enterable="false"
          >
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-edit"
              @click="editDialog(scope.row)"
            ></el-button>
          </el-tooltip>

          <el-tooltip
            effect="dark"
            content="删除"
            placement="top"
            :enterable="false"
          >
            <el-button
              type="danger"
              size="mini"
              icon="el-icon-delete"
              @click="removeById(scope.row)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      title="编辑学生信息"
      :visible.sync="editdDialogVisible"
      width="40%"
      @close="editDialogClose"
    >
      <el-form
        :model="editStudentForm"
        :rules="editStudentFormRules"
        ref="editStudentFormRef"
        label-width="100px"
      >
        <el-form-item label="学号" prop="studentNo">
          <el-input
            :disabled="false"
            v-model="editStudentForm.studentNo"
            type="number"
          ></el-input>
        </el-form-item>
        <el-form-item label="学生姓名" prop="studentName">
          <el-input v-model="editStudentForm.studentName"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-input v-model="editStudentForm.sex"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="email">
          <el-input v-model="editStudentForm.email"></el-input>
        </el-form-item>
        <el-form-item label="家庭地址" prop="homeAddress">
          <el-input v-model="editStudentForm.homeAddress"></el-input>
        </el-form-item>
        <el-form-item label="家长姓名" prop="parentName">
          <el-input v-model="editStudentForm.parentName"></el-input>
        </el-form-item>
        <el-form-item label="家长联系方式" prop="parentContact">
          <el-input
            v-model="editStudentForm.parentContact"
            type="number"
          ></el-input>
        </el-form-item>
        <el-form-item label="辅导员姓名" prop="counselorInformation">
          <el-input v-model="editStudentForm.counselorInformation"></el-input>
        </el-form-item>
        <el-form-item label="领导姓名" prop="leadershipInformation">
          <el-input v-model="editStudentForm.leadershipInformation"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editdDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveStudent()">
          确 定
        </el-button>
      </span>
    </el-dialog>
    <el-dialog title="提示" :visible.sync="uploadDialogVisible" width="30%">
      <el-form>
        <el-form-item label="请选择Excel文件">
          <el-upload>
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="uploadDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="uploadDialogVisible = false">
          确 定
        </el-button>
      </span>
    </el-dialog>
    <!-- 分页 -->
    <el-pagination
      style="margin-top: 15px;"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.currentPage"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="queryInfo.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>
<script>
import studentApi from '@/api/core/student.js'
export default {
  data() {
    return {
      BASE_API: process.env.VUE_APP_BASE_API,
      queryInfo: {
        // 获取用户的参数对象
        // query: '',
        // 当前的页数
        currentPage: 1,

        pageSize: 5
      },
      //总记录数
      total: 0,
      // 学生列表
      list: [],
      uploadDialogVisible: false,
      // 编辑对话框
      editdDialogVisible: false,
      listLoading: true,
      editStudentForm: {
        studentNo: '',
        studentName: '',
        counselorInformation: '',
        leadershipInformation: '',
        sex: '',
        parentName: '',
        parentContact: '',
        email: '',
        homeAddress: ''
      },
      editStudentFormRules: {
        studentNo: [
          { required: true, message: '请输入学号', trigger: 'blur' }
          // { min: 10, max: 10, message: '学号长度应该为10位', trigger: 'blur' }
        ],
        studentName: [
          { required: true, message: '请输入学生姓名', trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '请输入性别', trigger: 'blur' },
          { min: 1, max: 1, message: '性别长度应该为1位', trigger: 'blur' }
        ],
        email: [{ required: true, message: '请输入联系方式', trigger: 'blur' }],
        homeAddress: [
          { required: true, message: '请输入家庭地址', trigger: 'blur' }
        ],
        parentName: [
          { required: true, message: '请输入家长姓名', trigger: 'blur' }
        ],
        parentContact: [
          { required: true, message: '请输入家长联系方式', trigger: 'blur' }
        ],
        counselorInformation: [
          { required: true, message: '请输入辅导员姓名', trigger: 'blur' }
        ],
        leadershipInformation: [
          { required: true, message: '请输入领导姓名', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    // 获取学生信息列表
    fetchData() {
      studentApi
        .list(this.queryInfo.currentPage, this.queryInfo.pagesize)
        .then(response => {
          // console.log(response)
          this.list = response.data.records
          this.total = response.data.total
          this.queryInfo.pageSize = response.data.size
          this.listLoading = false
          this.$message.success(response.message)
        })
        .catch(err => err)
    },
    // 上传Excel
    upload() {
      this.uploadDialogVisible = true
    },
    exportData() {
      window.location.href = this.BASE_API + '/admin/core/dictStudent/export'
    },
    // 监听pageSize改变的事件
    handleSizeChange(newsize) {
      // console.log(newsize)
      this.queryInfo.pagesize = newsize
      this.fetchData()
    },
    // 监听页码的改变
    handleCurrentChange(newPage) {
      // debugger
      this.queryInfo.currentPage = newPage
      this.fetchData()
    },

    removeById(student) {
      this.$confirm('此操作将永久删除该学生信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          return studentApi.removeById(student.studentNo)
        })
        .then(response => {
          this.$message.success(response.message)
          this.fetchData()
        })
        .catch(error => {
          if (error === 'cancel') {
            this.$message.info('已取消删除')
          }
        })
    },
    saveData() {
      this.$router.push('/core/student/create')
    },

    fetchDataById(student) {
      // console.log(student)
      studentApi.getstudentById(student.studentNo).then(response => {
        this.editStudentForm = response.data.record
        console.log(this.editStudentForm)
      })
    },

    editDialog(student) {
      this.fetchDataById(student)
      this.editdDialogVisible = true
    },
    saveStudent() {
      this.$refs.editStudentFormRef.validate(valid => {
        if (!valid) return
        // 更新的学生对象
        const newStudent = this.editStudentForm
        // console.log(student)
        studentApi
          .updateStudent(newStudent)
          .then(response => {
            this.$message.success(response.message)
            this.fetchData()
            this.editdDialogVisible = false
          })
          .catch(err => err)
      })
    },
    // 监听关闭编辑用户对话框的事件
    editDialogClose() {
      // 重置表单
      this.$refs.editStudentFormRef.resetFields()
    }
  }
}
</script>
<style scoped>
.classinput-with-button {
  width: 130px;
}
</style>
