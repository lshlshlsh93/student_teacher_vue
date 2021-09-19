<template>
  <div class="app-container">
    <!-- Backtop 回到顶部  -->
    <div style="width: 100%;height: 100%;">
      <el-backtop :bottom="60"></el-backtop>
    </div>
    <div slot="header">
      <el-row :gutter="20">
        <!-- <el-col :span="8">
          <el-input placeholder="请输入内容" clearable>
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col> -->
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
        width="75"
        sortable
      />
      <el-table-column
        label="性别"
        prop="sex"
        width="50"
        align="center"
        sortable
      />
      <el-table-column
        label="所属学院"
        prop="college"
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
      <el-table-column label="操作" align="center" v-if="getRole === 'admin'">
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

    <!-- 添加对话框 -->
    <el-dialog
      title="添加"
      style="overflow-y: auto"
      :visible.sync="savedDialogVisible"
      width="40%"
      @close="saveDialogClose"
    >
      <div style="overflow-y: auto;height: 70vh;">
        <el-form
          :model="addStudentForm"
          :rules="addStudentFormRules"
          ref="addStudentFormRef"
          label-width="120px"
        >
          <el-form-item label="学号" prop="studentNo">
            <el-input
              :disabled="false"
              v-model="addStudentForm.studentNo"
              type="number"
              placeholder="注意学号是学生信息的唯一凭证，请输入合理的学号，例如不重复学号"
            ></el-input>
          </el-form-item>
          <el-form-item label="学生姓名" prop="studentName">
            <el-input
              v-model="addStudentForm.studentName"
              placeholder="请输入学生姓名"
            ></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-select
              v-model="addStudentForm.sex"
              placeholder="请选择性别"
              clearable
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属学院" prop="college">
            <el-select
              v-model="addStudentForm.college"
              clearable
              placeholder="请选择学院"
            >
              <el-option
                v-for="item in collegeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="联系方式" prop="email">
            <el-input
              v-model="addStudentForm.email"
              placeholder="请输入联系方式"
            ></el-input>
          </el-form-item>
          <el-form-item label="家庭地址" prop="homeAddress">
            <el-input
              v-model="addStudentForm.homeAddress"
              placeholder="请输入家庭地址"
              type="textarea"
            ></el-input>
          </el-form-item>
          <el-form-item label="家长姓名" prop="parentName">
            <el-input
              v-model="addStudentForm.parentName"
              placeholder="请输入家长姓名"
            ></el-input>
          </el-form-item>
          <el-form-item label="家长联系方式" prop="parentContact">
            <el-input
              v-model="addStudentForm.parentContact"
              type="number"
              placeholder="请输入家长联系方式"
            ></el-input>
          </el-form-item>
          <el-form-item label="辅导员姓名" prop="counselorInformation">
            <el-input
              v-model="addStudentForm.counselorInformation"
              placeholder="请输入辅导员姓名"
            ></el-input>
          </el-form-item>
          <!-- <el-form-item label="领导姓名" prop="leadershipInformation">
          <el-input v-model="editStudentForm.leadershipInformation"></el-input>
        </el-form-item> -->
        </el-form>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="savedDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveDataSubmit">
          确 定
        </el-button>
      </span>
    </el-dialog>
    <!-- 编辑对话框 -->
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
            :disabled="true"
            v-model="editStudentForm.studentNo"
            type="number"
          ></el-input>
        </el-form-item>
        <el-form-item label="学生姓名" prop="studentName">
          <el-input v-model="editStudentForm.studentName"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select
            v-model="editStudentForm.sex"
            placeholder="请选择性别"
            clearable
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属学院" prop="college">
          <el-select
            v-model="editStudentForm.college"
            clearable
            placeholder="请选择学院"
          >
            <el-option
              v-for="item in collegeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="联系方式" prop="email">
          <el-input v-model="editStudentForm.email"></el-input>
        </el-form-item>
        <el-form-item label="家庭地址" prop="homeAddress">
          <el-input
            v-model="editStudentForm.homeAddress"
            type="textarea"
          ></el-input>
        </el-form-item>
        <el-form-item label="家长姓名" prop="parentName">
          <el-input v-model="editStudentForm.parentName"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="parentContact">
          <el-input
            v-model="editStudentForm.parentContact"
            type="number"
          ></el-input>
        </el-form-item>
        <el-form-item label="辅导员姓名" prop="counselorInformation">
          <el-input v-model="editStudentForm.counselorInformation"></el-input>
        </el-form-item>
        <!-- <el-form-item label="领导姓名" prop="leadershipInformation">
          <el-input v-model="editStudentForm.leadershipInformation"></el-input>
        </el-form-item> -->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editdDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveStudent()">
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
            :action="BASE_API + '/admin/core/dictStudent/import'"
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
      <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="uploadDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="uploadDialogVisible = false">
          确 定
        </el-button>
      </span> -->
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
import store from '@/store/index'
import studentApi from '@/api/core/student.js'
export default {
  data() {
    return {
      saveBtnDisabled: false, //是否禁用保存按钮，防止表单重复提交
      savedDialogVisible: false,
      addStudentForm: {
        studentNo: '',
        studentName: '',
        sex: '',
        email: '',
        homeAddress: '',
        parentName: '',
        parentContact: '',
        counselorInformation: '',
        college: ''
        //  leadershipInformation: ''
      },
      addStudentFormRules: {
        studentName: [
          { required: true, message: '请输入学生姓名', trigger: 'blur' },
          { min: 1, max: 5, message: '长度在 1 到 10 个字符', trigger: 'blur' }
        ],
        studentNo: [
          { required: true, message: '请输入学号', trigger: 'blur' },
          { min: 10, max: 10, message: '长度在10字符', trigger: 'blur' }
        ],
        sex: [{ required: true, message: '请输入性别', trigger: 'blur' }],
        email: [
          { required: true, message: '请输入联系方式', trigger: 'blur' },
          {
            min: 1,
            max: 30,
            message: '不能为空',
            trigger: 'blur'
          }
        ],
        homeAddress: [
          { required: true, message: '请输入家庭地址', trigger: 'blur' },
          {
            min: 1,
            max: 50,
            message: '长度在 1 到 50 个字符之间',
            trigger: 'blur'
          }
        ],
        parentName: [
          { required: true, message: '请输入家长姓名', trigger: 'blur' },
          { min: 1, max: 6, message: '长度在 1 到 6 个字符', trigger: 'blur' }
        ],
        parentContact: [
          { required: true, message: '请输入家长联系方式', trigger: 'blur' },
          {
            min: 1,
            max: 30,
            message: '长度在 1 到 30 个字符',
            trigger: 'blur'
          }
        ],
        counselorInformation: [
          { required: true, message: '请输入辅导员姓名', trigger: 'blur' }
        ]
      },

      BASE_API: process.env.VUE_APP_BASE_API, //从环境变量拿到后端接口地址
      queryInfo: {
        // 获取用户的参数对象
        // query: '',
        // 当前的页数
        currentPage: 1,
        pageSize: 5
      },
      //总记录数
      total: 0,
      options: [
        {
          value: '男',
          label: '男'
        },
        {
          value: '女',
          label: '女'
        }
      ],
      collegeOptions: [
        {
          value: '理工学院',
          label: '理工学院'
        },
        {
          value: '经济学院',
          label: '经济学院'
        },
        {
          value: '商学院',
          label: '商学院'
        },
        {
          value: '人文学院',
          label: '人文学院'
        },
        {
          value: '医学院',
          label: '医学院'
        },
        {
          value: '艺术学院',
          label: '艺术学院'
        },
        {
          value: '传媒学院',
          label: '传媒学院'
        },
        {
          value: '体育学院',
          label: '体育学院'
        }
      ],
      // 选中的性别
      value: '',
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
        // leadershipInformation: '',
        sex: '',
        parentName: '',
        parentContact: '',
        email: '',
        homeAddress: '',
        college: null
      },
      editStudentFormRules: {
        studentNo: [
          { required: true, message: '请输入学号', trigger: 'blur' }
          // { min: 10, max: 10, message: '学号长度应该为10位', trigger: 'blur' }
        ],
        studentName: [
          { required: true, message: '请输入学生姓名', trigger: 'blur' }
        ],
        sex: [{ required: true, message: '不能为空', trigger: 'blur' }],
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
        ]
      }
    }
  },
  created() {
    this.fetchData()
  },
  computed: {
    getRole() {
      // 获取当前角色
      return store.state.user.roles[0]
    }
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
    fetchDataNoMessage() {
      studentApi
        .list(this.queryInfo.currentPage, this.queryInfo.pagesize)
        .then(response => {
          // console.log(response)
          this.list = response.data.records
          this.total = response.data.total
          this.queryInfo.pageSize = response.data.size
          this.listLoading = false
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
      this.fetchDataNoMessage()
    },
    // 监听页码的改变
    handleCurrentChange(newPage) {
      // debugger
      this.queryInfo.currentPage = newPage
      this.fetchDataNoMessage()
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
          this.fetchDataNoMessage()
        })
        .catch(error => {
          if (error === 'cancel') {
            this.$message.info('已取消删除')
          }
        })
    },
    saveData() {
      // this.$router.push('/core/student/create')
      this.savedDialogVisible = true
    },
    saveDataSubmit() {
      this.$refs.addStudentFormRef.validate(valid => {
        // console.log(valid)
        if (!valid) return
        const stu = this.addStudentForm
        studentApi
          .save(stu)
          .then(response => {
            this.$message.success(response.message)
            this.saveBtnDisabled = true
            this.savedDialogVisible = false
            //this.$router.push('/core/student/list')
          })
          .catch(err => err)
      })
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
            this.fetchDataNoMessage()
            this.editdDialogVisible = false
          })
          .catch(err => err)
      })
    },
    // 监听关闭添加用户对话框的事件
    saveDialogClose() {
      // 重置表单
      this.$refs.addStudentFormRef.resetFields()
    },
    // 监听关闭编辑用户对话框的事件
    editDialogClose() {
      // 重置表单
      this.$refs.editStudentFormRef.resetFields()
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
    }
  }
}
</script>
<style scoped>
.classinput-with-button {
  width: 130px;
}
</style>
