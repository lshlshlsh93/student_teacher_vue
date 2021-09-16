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
            <el-button type="primary" size="medium" @click="saveDialog">
              添加学科竞赛信息
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
        :data="subjectContestList"
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
          prop="contestName"
          label="比赛名称"
          sortable
        ></el-table-column>
        <el-table-column
          header-align="center"
          align="center"
          prop="organizer"
          label="主办单位"
          sortable
        ></el-table-column>
        <el-table-column
          header-align="center"
          align="center"
          prop="entryTime"
          label="参赛时间"
          :formatter="dateFormat"
          sortable
        ></el-table-column>
        <el-table-column
          header-align="center"
          align="center"
          prop="awardInformation"
          label="获奖信息"
          sortable
        ></el-table-column>
        <el-table-column
          header-align="center"
          align="center"
          label="操作"
          sortable
          v-if="getRole === 'admin'"
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
      width="30%"
      @close="handleSaveDialogClose"
    >
      <el-form
        ref="addFormRef"
        :model="addForm"
        label-width="80px"
        :rules="addFormRules"
      >
        <el-form-item label="学生学号" prop="studentNo">
          <el-input
            :disabled="false"
            v-model="addForm.studentNo"
            type="number"
            placeholder="请输入学生学号"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="学生姓名" prop="studentName">
          <el-input
            :disabled="false"
            v-model="addForm.studentName"
            clearable
            placeholder="请输入学生姓名"
          ></el-input>
        </el-form-item>
        <el-form-item label="比赛名称" prop="contestName">
          <el-input
            :disabled="false"
            v-model="addForm.contestName"
            clearable
            placeholder="请输入比赛名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="主办单位" prop="organizer">
          <el-input
            :disabled="false"
            v-model="addForm.organizer"
            clearable
            placeholder="请输入主办单位"
          ></el-input>
        </el-form-item>
        <el-form-item label="参赛时间" required>
          <el-date-picker
            v-model="addForm.entryTime"
            type="date"
            placeholder="选择参赛时间"
            format="yyyy年MM月dd日"
            value-format="yyyy-MM-dd HH:mm:ss"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="获奖信息" prop="awardInformation">
          <el-input
            type="textarea"
            :disabled="false"
            v-model="addForm.awardInformation"
            clearable
            placeholder="请输入获奖信息"
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
      width="40%"
      @close="handleEditDialogClose"
    >
      <el-form
        ref="editFormRef"
        :model="editForm"
        label-width="120px"
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
            clearable
            placeholder="请输入学生姓名"
          ></el-input>
        </el-form-item>
        <el-form-item label="比赛名称" prop="contestName">
          <el-input
            :disabled="false"
            v-model="editForm.contestName"
            clearable
            placeholder="请输入比赛名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="主办单位" prop="organizer">
          <el-input
            :disabled="false"
            v-model="editForm.organizer"
            clearable
            placeholder="请输入主办单位"
          ></el-input>
        </el-form-item>
        <el-form-item label="参赛时间" required>
          <el-date-picker
            v-model="editForm.entryTime"
            type="date"
            placeholder="选择参赛时间"
            format="yyyy年MM月dd日"
            value-format="yyyy-MM-dd HH:mm:ss"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="获奖信息" prop="awardInformation">
          <el-input
            type="textarea"
            autosize
            :disabled="false"
            v-model="editForm.awardInformation"
            clearable
            placeholder="请输入获奖信息"
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
            :action="BASE_API + '/admin/core/dictSubjectContest/import'"
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
import store from '@/store/index'
import subjectContestApi from '@/api/core/subjectContest'
export default {
  data() {
    return {
      // 后台地址
      BASE_API: process.env.VUE_APP_BASE_API,
      // 学科竞赛列表
      subjectContestList: [],
      loading: false,
      queryInfo: {
        currentPage: 1,
        pageSize: 5
      },
      // 总条数
      total: 0,
      // 显示上传对话框
      uploadDialogVisible: false,
      // 添加对话框
      saveDialogVisible: false,
      addForm: {
        studentNo: '',
        studentName: '',
        contestName: '',
        organizer: '',
        entryTime: null,
        awardInformation: ''
      },
      addFormRules: {
        studentNo: [{ required: true, message: '不能为空', trigger: 'blur' }],
        studentName: [{ required: true, message: '不能为空', trigger: 'blur' }],
        contestName: [{ required: true, message: '不能为空', trigger: 'blur' }],
        organizer: [{ required: true, message: '不能为空', trigger: 'blur' }],
        awardInformation: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        entryTime: []
      },
      editDialogVisible: false,
      editForm: {
        studentNo: '',
        studentName: '',
        contestName: '',
        organizer: '',
        entryTime: null,
        awardInformation: ''
      },
      editFormRules: {
        studentName: [{ required: true, message: '不能为空', trigger: 'blur' }],
        contestName: [{ required: true, message: '不能为空', trigger: 'blur' }],
        organizer: [{ required: true, message: '不能为空', trigger: 'blur' }],
        awardInformation: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        entryTime: []
      }
    }
  },
  created() {
    this.fetchData()
  },
  computed: {
    getRole() {
      return store.state.user.roles[0]
    }
  },
  methods: {
    // 获取数据展示信息
    fetchData() {
      subjectContestApi
        .fetchData(this.queryInfo.currentPage, this.queryInfo.pageSize)
        .then(response => {
          // console.log(response)
          if (response.code !== 0) return
          this.subjectContestList = response.data.list.records
          this.queryInfo.currentPage = response.data.list.pageCurrent
          this.total = response.data.list.total
          this.loading = false
          return this.$message.success(response.message)
        })
        .catch(err => {
          return this.$message.error(err.message)
        })
    },
    // 获取数据不展示信息
    fetchDataNoMessage() {
      subjectContestApi
        .fetchData(this.queryInfo.currentPage, this.queryInfo.pageSize)
        .then(response => {
          // console.log(response)
          if (response.code !== 0) return
          this.subjectContestList = response.data.list.records
          this.queryInfo.currentPage = response.data.list.pageCurrent
          this.total = response.data.list.total
          this.loading = false
        })
        .catch(err => {
          return this.$message.error(err.message)
        })
    },
    // 添加对话框
    saveDialog() {
      this.saveDialogVisible = true
    },
    // 点击添加对话框中的确定提交时触发的事件
    saveSubmit() {
      this.$refs.addFormRef.validate(valid => {
        if (!valid) return // window.alert('参数不合法')
        const obj = this.addForm
        subjectContestApi
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
    //编辑对话框
    edit(val) {
      // console.log(val)
      subjectContestApi
        .getById(val.studentNo, val.contestName)
        .then(response => {
          // console.log(response)
          this.editForm = response.data.subjectContest
        })
        .catch(err => {
          return this.$message.error(err.message)
        })
      this.editDialogVisible = true
    },
    // 编辑提交
    editSubmit() {
      this.$refs.editFormRef.validate(valid => {
        if (!valid) return
        const obj = this.editForm
        subjectContestApi
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
    // 关闭编辑对话框的事件
    handleEditDialogClose() {
      this.$refs.editFormRef.resetFields()
    },
    // 关闭添加对话框的事件
    handleSaveDialogClose() {
      this.$refs.addFormRef.resetFields()
    },
    // 删除
    remove(val) {
      // console.log(val)
      this.$confirm('此操作将永久删除该学科竞赛信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          return subjectContestApi.removeById(val.studentNo, val.contestName)
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
    exportData() {
      window.location.href =
        this.BASE_API + '/admin/core/dictSubjectContest/export'
    },
    // 时间格式化方法
    dateFormat: function(row) {
      var t = new Date(row.entryTime) // row 表示一行数据, attendanceTime 表示要格式化的字段名称
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
