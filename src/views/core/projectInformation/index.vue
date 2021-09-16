<template>
  <div>
    <!-- Backtop 回到顶部  -->
    <div style="width: 100%;height: 100%;">
      <el-backtop :bottom="60"></el-backtop>
    </div>
    <div class="app-container">
      <!-- 头部组件 -->
      <div slot="header">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-input placeholder="请输入内容" size="medium">
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </el-col>
          <el-col :span="15">
            <el-button type="primary" size="medium" @click="save()">
              添加项目信息
            </el-button>
            <el-button type="primary" icon="el-icon-upload" @click="upload">
              导入Excel
            </el-button>
            <el-button type="primary" size="medium" @click="exportData">
              导出Excel
            </el-button>
          </el-col>
        </el-row>
      </div>
      <el-table
        :data="proInfoList"
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
          prop="studentNo"
          label="学生学号"
          sortable
        ></el-table-column>
        <el-table-column
          header-align="center"
          align="center"
          prop="studentName"
          label="学生姓名"
          sortable
        ></el-table-column>
        <el-table-column
          header-align="center"
          align="center"
          prop="projectName"
          label="项目名称"
          sortable
        ></el-table-column>
        <el-table-column
          header-align="center"
          align="center"
          prop="projectNo"
          label="项目编号"
          sortable
        ></el-table-column>
        <el-table-column
          header-align="center"
          align="center"
          prop="director"
          label="负责人"
          sortable
        ></el-table-column>
        <el-table-column
          header-align="center"
          align="center"
          prop="major"
          label="所属专业"
          sortable
        ></el-table-column>
        <el-table-column
          header-align="center"
          align="center"
          prop="initiationDate"
          :formatter="dateFormat"
          label="立项日期"
          sortable
        ></el-table-column>
        <el-table-column
          header-align="center"
          align="center"
          prop="projectClassification"
          label="项目分类"
          sortable
        ></el-table-column>
        <el-table-column
          header-align="center"
          align="center"
          prop="closingTime"
          :formatter="dateFormat2"
          label="结项日期"
          sortable
        ></el-table-column>
        <el-table-column
          header-align="center"
          align="center"
          prop="ranking"
          label="排名"
          sortable
        ></el-table-column>
        <el-table-column
          header-align="center"
          align="center"
          label="操作"
          sortable
          width="130"
          v-if="getRoles === 'admin'"
        >
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
    <!-- 添加 -->
    <el-dialog
      title=" 添加"
      :visible.sync="saveDialogVisible"
      width="50%"
      @close="handleSaveDialogClose"
    >
      <el-form
        :inline="true"
        size="medium"
        ref="saveFormRef"
        :model="saveForm"
        label-width="110px"
        :rules="saveFormRules"
      >
        <el-form-item label="学生学号" prop="studentNo">
          <el-input
            :disabled="false"
            v-model="saveForm.studentNo"
            type="number"
            placeholder="请输入学生学号"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="学生姓名" prop="studentName">
          <el-input
            :disabled="false"
            v-model="saveForm.studentName"
            placeholder="请输入学生姓名"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="项目名称" prop="projectName">
          <el-input
            :disabled="false"
            v-model="saveForm.projectName"
            placeholder="请输入项目名称"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="项目编号" prop="projectNo">
          <el-input
            :disabled="false"
            v-model="saveForm.projectNo"
            type="number"
            placeholder="请输入项目编号"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="负责人" prop="director">
          <el-input
            :disabled="false"
            v-model="saveForm.director"
            placeholder="请输入负责人"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="所属专业" prop="major">
          <el-input
            :disabled="false"
            v-model="saveForm.major"
            placeholder="请输入所属专业"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="立项日期" required>
          <el-date-picker
            v-model="saveForm.initiationDate"
            type="date"
            placeholder="选择立项日期"
            label-width="110px"
            align="center"
            format="yyyy年MM月dd日"
            value-format="yyyy-MM-dd HH:mm:ss"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="项目分类" prop="projectClassification">
          <el-input
            :disabled="false"
            v-model="saveForm.projectClassification"
            placeholder="请输入项目分类"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="结项日期" required>
          <el-date-picker
            v-model="saveForm.closingTime"
            type="date"
            placeholder="选择结项日期"
            format="yyyy年MM月dd日"
            value-format="yyyy-MM-dd HH:mm:ss"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="排名" prop="ranking">
          <el-input
            :disabled="false"
            v-model="saveForm.ranking"
            placeholder="请输入排名"
            clearable
            type="number"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="saveDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveSubmit">
          确 定
        </el-button>
      </span>
    </el-dialog>
    <!-- 编辑 -->
    <el-dialog
      title=" 编辑"
      :visible.sync="editDialogVisible"
      width="50%"
      @close="handleEditDialogClose"
    >
      <el-form
        :inline="true"
        size="medium"
        ref="editFormRef"
        :model="editForm"
        label-width="110px"
        :rules="editFormRules"
      >
        <el-form-item label="学生学号" prop="studentNo">
          <el-input
            :disabled="true"
            v-model="editForm.studentNo"
            type="number"
            placeholder="请输入学生学号"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="学生姓名" prop="studentName">
          <el-input
            :disabled="false"
            v-model="editForm.studentName"
            placeholder="请输入学生姓名"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="项目名称" prop="projectName">
          <el-input
            :disabled="false"
            v-model="editForm.projectName"
            placeholder="请输入项目名称"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="项目编号" prop="projectNo">
          <el-input
            :disabled="false"
            v-model="editForm.projectNo"
            type="number"
            placeholder="请输入项目编号"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="负责人" prop="director">
          <el-input
            :disabled="false"
            v-model="editForm.director"
            placeholder="请输入负责人"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="所属专业" prop="major">
          <el-input
            :disabled="false"
            v-model="editForm.major"
            placeholder="请输入所属专业"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="立项日期" required>
          <el-date-picker
            v-model="editForm.initiationDate"
            type="date"
            placeholder="选择立项日期"
            label-width="110px"
            align="center"
            format="yyyy年MM月dd日"
            value-format="yyyy-MM-dd HH:mm:ss"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="项目分类" prop="projectClassification">
          <el-input
            :disabled="false"
            v-model="editForm.projectClassification"
            placeholder="请输入项目分类"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="结项日期" required>
          <el-date-picker
            v-model="editForm.closingTime"
            type="date"
            placeholder="选择结项日期"
            format="yyyy年MM月dd日"
            value-format="yyyy-MM-dd HH:mm:ss"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="排名" prop="ranking">
          <el-input
            :disabled="false"
            v-model="editForm.ranking"
            placeholder="请输入排名"
            clearable
            type="number"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editSubmit">
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
            :action="BASE_API + '/admin/core/dictProjectInformation/import'"
            name="file"
            accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">
              支持xlsx类型文件，注意一次只能上传一个文件
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
      :page-size="queryInfo.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>
<script>
// 导入store
import store from '@/store/index'
// api接口
import proInfoApi from '@/api/core/projectInformation'
export default {
  data() {
    return {
      // 后台地址
      BASE_API: process.env.VUE_APP_BASE_API,
      proInfoList: [],
      queryInfo: {
        currentPage: 1,
        pageSize: 5
      },
      total: 0,
      loading: true,
      uploadDialogVisible: false,
      saveDialogVisible: false,
      saveForm: {
        studentNo: '',
        studentName: '',
        projectName: '',
        projectNo: '',
        director: '',
        major: '',
        initiationDate: null,
        projectClassification: '',
        closingTime: null,
        ranking: ''
      },
      saveFormRules: {
        studentNo: [{ required: true, message: '不能为空', trigger: 'blur' }],
        studentName: [{ required: true, message: '不能为空', trigger: 'blur' }],
        projectName: [{ required: true, message: '不能为空', trigger: 'blur' }],
        projectNo: [{ required: true, message: '不能为空', trigger: 'blur' }],
        director: [{ required: true, message: '不能为空', trigger: 'blur' }],
        major: [{ required: true, message: '不能为空', trigger: 'blur' }],
        ranking: [{ required: true, message: '不能为空', trigger: 'blur' }],
        projectClassification: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        initiationDate: [],
        closingTime: []
      },
      editDialogVisible: false,
      editForm: {
        studentNo: '',
        studentName: '',
        projectName: '',
        projectNo: '',
        director: '',
        major: '',
        initiationDate: null,
        projectClassification: '',
        closingTime: null,
        ranking: ''
      },
      editFormRules: {
        studentName: [{ required: true, message: '不能为空', trigger: 'blur' }],
        projectName: [{ required: true, message: '不能为空', trigger: 'blur' }],
        projectNo: [{ required: true, message: '不能为空', trigger: 'blur' }],
        director: [{ required: true, message: '不能为空', trigger: 'blur' }],
        major: [{ required: true, message: '不能为空', trigger: 'blur' }],
        ranking: [{ required: true, message: '不能为空', trigger: 'blur' }],
        projectClassification: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        initiationDate: [],
        closingTime: []
      }
    }
  },
  created() {
    this.fetchData()
  },
  computed: {
    // 获取当前用户的角色
    getRoles() {
      return store.state.user.roles[0]
    }
  },
  methods: {
    fetchData() {
      proInfoApi
        .fetchData(this.queryInfo.currentPage, this.queryInfo.pageSize)
        .then(response => {
          this.proInfoList = response.data.list.projectInformation
          this.queryInfo.currentPage = response.data.list.pageCurrent
          this.total = response.data.list.total
          this.loading = false
          // return this.$message.success(response.message)
        })
        .catch(err => {
          return this.$message.error(err.message)
        })
    },
    fetchDataNoMessage() {
      proInfoApi
        .fetchData(this.queryInfo.currentPage, this.queryInfo.pageSize)
        .then(response => {
          this.proInfoList = response.data.list.projectInformation
          this.queryInfo.currentPage = response.data.list.pageCurrent
          this.total = response.data.list.total
          this.loading = false
        })
        .catch(err => {
          return this.$message.error(err.message)
        })
    },
    // 当分页大小发生变化
    handleSizeChange(newSize) {
      this.queryInfo.pageSize = newSize
      this.fetchDataNoMessage()
    },
    // 当当前页数发生变化
    handleCurrentChange(newPage) {
      this.queryInfo.currentPage = newPage
      this.fetchDataNoMessage()
    },
    handleSaveDialogClose() {
      this.$refs.saveFormRef.resetFields()
    },
    save() {
      this.saveDialogVisible = true
    },
    saveSubmit() {
      this.$refs.saveFormRef.validate(valid => {
        if (!valid) return
        const obj = this.saveForm
        proInfoApi
          .add(obj)
          .then(response => {
            this.$message.success(response.message)
            this.fetchDataNoMessage()
            this.saveDialogVisible = false
          })
          .catch(err => {
            return this.$message.error(err)
          })
      })
    },
    edit(val) {
      // console.log(val)
      proInfoApi
        .getById(val.studentNo, val.projectNo)
        .then(response => {
          // console.log(response)
          this.editForm = response.data.projectInformation
          this.editDialogVisible = true
        })
        .catch(err => {
          return this.$message.error(err.message)
        })
    },
    editSubmit() {
      this.$refs.editFormRef.validate(valid => {
        if (!valid) return
        const obj = this.editForm
        proInfoApi
          .update(obj)
          .then(response => {
            this.editDialogVisible = false
            this.fetchDataNoMessage()
            return this.$message.success(response.message)
          })
          .catch(err => {
            return this.$message.error(err.message)
          })
      })
    },
    handleEditDialogClose() {
      this.$refs.editFormRef.resetFields()
    },
    remove(val) {
      this.$confirm('此操作将永久删除该项目信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          return proInfoApi.remove(val.studentNo, val.projectNo)
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
        this.uploadDialogVisible = false
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
    exportData() {
      window.location.href =
        this.BASE_API + '/admin/core/dictProjectInformation/export'
    },
    // 时间格式化方法
    dateFormat: function(row) {
      var t = new Date(row.initiationDate) // row 表示一行数据, attendanceTime 表示要格式化的字段名称
      if (!t) {
        return ''
      }
      let year = t.getFullYear()
      let month = this.dateIfAddZero(t.getMonth() + 1)
      let day = this.dateIfAddZero(t.getDate())
      let hours = this.dateIfAddZero(t.getHours())
      let minutes = this.dateIfAddZero(t.getMinutes())
      let seconds = this.dateIfAddZero(t.getSeconds())
      return (
        year +
        '-' +
        month +
        '-' +
        day +
        ' ' +
        hours +
        ':' +
        minutes +
        ':' +
        seconds
      )
    },
    dateFormat2: function(row) {
      var t = new Date(row.closingTime) // row 表示一行数据, attendanceTime 表示要格式化的字段名称
      if (!t) {
        return ''
      }
      let year = t.getFullYear()
      let month = this.dateIfAddZero(t.getMonth() + 1)
      let day = this.dateIfAddZero(t.getDate())
      let hours = this.dateIfAddZero(t.getHours())
      let minutes = this.dateIfAddZero(t.getMinutes())
      let seconds = this.dateIfAddZero(t.getSeconds())
      return (
        year +
        '-' +
        month +
        '-' +
        day +
        ' ' +
        hours +
        ':' +
        minutes +
        ':' +
        seconds
      )
    },
    dateIfAddZero: function(time) {
      return time < 10 ? '0' + time : time
    }
  }
}
</script>
<style scoped></style>
