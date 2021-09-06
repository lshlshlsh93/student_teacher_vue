<template>
  <div>
    <div class="app-container">
      <!-- 头部区域 -->
      <span>当前角色：{{ getRole }}</span>
      <div slot="header">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-input placeholder="请输入内容" size="medium">
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </el-col>
          <el-col :span="15">
            <el-button
              type="primary"
              size="medium"
              @click="saveAttendanceDialog"
            >
              添加考勤信息
            </el-button>
            <el-button
              type="primary"
              @click="upload"
              icon="el-icon-upload"
              v-if="getRole === 'admin'"
            >
              导入Excel
            </el-button>
            <el-button
              type="primary"
              size="medium"
              @click="exportData"
              v-if="getRole === 'admin'"
            >
              导出Excel
            </el-button>
          </el-col>
        </el-row>
      </div>
      <!-- 表格区域 -->
      <el-table
        :data="attendanceList"
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
          sortable
          prop="attendanceLocation"
          label="考勤地点"
        ></el-table-column>
        <el-table-column
          header-align="center"
          align="center"
          prop="dormitoryNo"
          label="宿舍号"
          sortable
        ></el-table-column>
        <el-table-column
          header-align="center"
          align="center"
          prop="attendanceTime"
          label="考勤时间"
          :formatter="dateFormat"
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
      title=" 添加考勤信息"
      :visible.sync="saveDialog"
      width="30%"
      @close="whenClose"
    >
      <el-form
        ref="addAttendanceFormRef"
        :model="addAttendanceForm"
        label-width="80px"
        :rules="addAttendanceFormRules"
      >
        <el-form-item label="学生学号" prop="studentNo">
          <el-input
            :disabled="false"
            v-model="addAttendanceForm.studentNo"
            type="number"
            placeholder="请输入学生学号"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="考勤地点" prop="attendanceLocation">
          <el-input
            :disabled="false"
            v-model="addAttendanceForm.attendanceLocation"
            clearable
            placeholder="请输入考勤地点"
          ></el-input>
        </el-form-item>
        <el-form-item label="宿舍号" prop="dormitoryNo">
          <el-input
            :disabled="false"
            v-model="addAttendanceForm.dormitoryNo"
            type="number"
            clearable
            placeholder="请输入宿舍号"
          ></el-input>
        </el-form-item>
        <el-form-item label="考勤时间" required>
          <el-date-picker
            v-model="addAttendanceForm.attendanceTime"
            type="date"
            placeholder="选择日期"
            format="yyyy年MM月dd日"
            value-format="yyyy-MM-dd HH:mm:ss"
          ></el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="saveDialog = false">取 消</el-button>
        <el-button type="primary" @click="saveSubmit">
          确 定
        </el-button>
      </span>
    </el-dialog>
    <!-- 编辑对话框 -->
    <el-dialog
      title="编辑考勤信息"
      :visible.sync="editdDialogVisible"
      width="30%"
      @close="handleClose"
    >
      <el-form
        ref="editFormRef"
        :model="editForm"
        label-width="80px"
        :rules="editFormRules"
      >
        <el-form-item label="学生学号" prop="studentNo">
          <el-input
            :disabled="false"
            v-model="editForm.studentNo"
            type="number"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="考勤地点" prop="attendanceLocation">
          <el-input
            :disabled="false"
            v-model="editForm.attendanceLocation"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="宿舍号" prop="dormitoryNo">
          <el-input
            :disabled="false"
            v-model="editForm.dormitoryNo"
            type="number"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="考勤时间">
          <el-date-picker
            v-model="editForm.attendanceTime"
            type="date"
            placeholder="选择日期"
            format="yyyy年MM月dd日"
            value-format="yyyy-MM-dd HH:mm:ss"
          ></el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editdDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editSubmit" :disabled="btnDisabled">
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
            :action="BASE_API + '/admin/core/dictAttendance/import'"
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
import Cookies from 'js-cookie'
import attendanceApi from '@/api/core/attendance'
export default {
  data() {
    return {
      BASE_API: process.env.VUE_APP_BASE_API,
      attendanceList: [],
      loading: false,
      queryInfo: {
        currentPage: 1,
        pageSize: 5
      },
      total: 0,
      editdDialogVisible: false,
      uploadDialogVisible: false,
      editForm: {
        studentNo: '',
        attendanceLocation: '',
        dormitoryNo: '',
        attendanceTime: ''
      },
      editFormRules: {
        studentNo: [{ required: true, message: '请输入学号', trigger: 'blur' }],
        attendanceLocation: [
          { required: true, message: '请输入学号', trigger: 'blur' }
        ],
        dormitoryNo: [
          { required: true, message: '请输入学号', trigger: 'blur' }
        ]
      },
      btnDisabled: false,
      saveDialog: false,
      addAttendanceForm: {
        studentNo: '',
        attendanceLocation: '',
        dormitoryNo: '',
        attendanceTime: ''
      },
      addAttendanceFormRules: {
        studentNo: [
          { required: true, message: '教师工号不能为空', trigger: 'blur' }
        ],
        attendanceLocation: [
          { required: true, message: '考勤地点不能为空', trigger: 'blur' }
        ],
        dormitoryNo: [
          { required: true, message: '宿舍号不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.fetchData()
  },
  mounted() {},
  computed: {
    getRole() {
      // 获取当前角色
      return this.$store.getters.roles
    }
  },
  methods: {
    fetchData() {
      attendanceApi
        .fetchData(this.queryInfo.currentPage, this.queryInfo.pageSize)
        .then(response => {
          //  console.log(response)
          this.attendanceList = response.data.records
          this.queryInfo.currentPage = response.data.pageCurrent
          this.total = response.data.total
          this.loading = false
          return this.$message.success(response.message)
        })
        .catch(err => {
          return this.$message.error(err.message)
        })
    },
    fetchDataNoMessage() {
      attendanceApi
        .fetchData(this.queryInfo.currentPage, this.queryInfo.pageSize)
        .then(response => {
          //  console.log(response)
          this.attendanceList = response.data.records
          this.queryInfo.currentPage = response.data.pageCurrent
          this.total = response.data.total
          this.loading = false
        })
        .catch(err => {
          return this.$message.error(err.message)
        })
    },
    handleSizeChange(newSize) {
      this.queryInfo.pageSize = newSize
      this.fetchDataNoMessage()
    },
    handleCurrentChange(newPage) {
      this.queryInfo.currentPage = newPage
      this.fetchDataNoMessage()
    },
    edit(value) {
      console.log(value)
      attendanceApi
        .getById(value.studentNo)
        .then(response => {
          console.log(response)
          this.editForm = response.data.attendance
          // this.$message.success(response.message)
        })
        .catch(err => {
          return this.$message.error(err.message)
        })
      this.editdDialogVisible = true
    },
    editSubmit() {
      const attendance = this.editForm
      this.$refs.editFormRef.validate(valid => {
        if (!valid) return
        attendanceApi
          .update(attendance)
          .then(response => {
            this.fetchDataNoMessage()
            this.editdDialogVisible = false
            return this.$message.success(response.message)
          })
          .catch(err => {
            return this.$message.error(err.message)
          })
      })
    },
    // 编辑对话框关闭时重置表单
    handleClose() {
      this.$refs.editFormRef.resetFields()
    },
    remove(value) {
      //  console.log(value)
      this.$confirm('此操作将永久删除该考勤信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          return attendanceApi.removeById(value.studentNo)
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
    saveAttendanceDialog() {
      this.saveDialog = true
    },
    whenClose() {
      this.$refs.addAttendanceFormRef.resetFields()
    },
    saveSubmit() {
      this.$refs.addAttendanceFormRef.validate(valid => {
        if (!valid) return
        const newAttendance = this.addAttendanceForm
        attendanceApi
          .add(newAttendance)
          .then(response => {
            this.$message.success(response.message)
            this.fetchDataNoMessage()
            this.saveDialog = false
          })
          .catch(err => {
            return this.$message.error(err)
          })
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
      window.location.href = this.BASE_API + '/admin/core/dictAttendance/export'
    },
    // 时间格式化方法
    dateFormat: function(row) {
      var t = new Date(row.createTime) // row 表示一行数据, createTime 表示要格式化的字段名称
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
