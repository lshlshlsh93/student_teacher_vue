<template>
  <div>
    <div class="app-container">
      <div slot="header">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-input placeholder="请输入内容" size="medium">
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </el-col>
          <el-col :span="15">
            <el-button type="primary" size="medium" @click="addVolunteer">
              添加志愿者信息
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
        :data="volunteerList"
        :v-loading="loading"
        style="width: 100%;margin-top: 15px;"
        border
        scripe
      >
        <el-table-column
          header-align="center"
          align="center"
          sortable
          type="index"
          label="#"
        ></el-table-column>
        <el-table-column
          header-align="center"
          align="center"
          sortable
          prop="studentNo"
          label="学号"
        ></el-table-column>
        <el-table-column
          header-align="center"
          align="center"
          sortable
          prop="major"
          label="专业"
        ></el-table-column>
        <el-table-column
          align="center"
          sortable
          prop="volunteerName"
          label="志愿者姓名"
        ></el-table-column>
        <el-table-column
          align="center"
          sortable
          prop="volunteerActivity"
          label="志愿者活动类型"
        ></el-table-column>
        <el-table-column
          header-align="center"
          align="center"
          sortable
          prop="date"
          label="日期"
          width="180"
          :formatter="dateFormat"
        ></el-table-column>

        <el-table-column
          header-align="center"
          align="center"
          sortable
          prop="activityLevel"
          label="活动级别"
        ></el-table-column>
        <el-table-column header-align="center" align="center" label="操作">
          <template slot-scope="scope">
            <el-tooltip effect="dark" content="编辑" placement="top">
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                @click="editDialog(scope.row)"
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
      title="添加志愿者"
      :visible.sync="saveDialogVisible"
      width="40%"
      @close="addDialogClose"
    >
      <el-form
        :model="addVolunteerForm"
        :rules="addVolunteerFormRules"
        ref="addVolunteerFormRef"
        label-width="100px"
        label-position="right"
        :status-icon="true"
      >
        <el-form-item label="学号" prop="studentNo">
          <el-input
            v-model="addVolunteerForm.studentNo"
            placeholder="请输入学号"
            type="number"
          ></el-input>
        </el-form-item>
        <el-form-item label="专业" prop="major">
          <el-input
            v-model="addVolunteerForm.major"
            placeholder="请输入专业"
          ></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="volunteerName">
          <el-input
            v-model="addVolunteerForm.volunteerName"
            placeholder="请输入志愿者姓名"
          ></el-input>
        </el-form-item>
        <el-form-item label="活动类型" prop="volunteerActivity">
          <el-select
            v-model="addVolunteerForm.volunteerActivity"
            placeholder="请选择志愿者活动类型"
            clearable
          >
            <el-option label="校内活动" value="校级活动"></el-option>
            <el-option label="校外活动" value="省级活动"></el-option>
            <el-option label="社团活动" value="社团活动"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动级别" prop="activityLevel">
          <el-select
            v-model="addVolunteerForm.activityLevel"
            placeholder="请选择活动级别"
            clearable
          >
            <el-option label="校级活动" value="校级活动"></el-option>
            <el-option label="省级活动" value="省级活动"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期" prop="date">
          <el-date-picker
            v-model="addVolunteerForm.date"
            type="datetime"
            placeholder="选择日期"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
          ></el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="saveDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addSumit">
          确 定
        </el-button>
      </span>
    </el-dialog>
    <!-- 编辑 -->
    <el-dialog
      title="编辑志愿者信息"
      :visible.sync="editDialogVisible"
      width="40%"
      @close="editDialogClose"
    >
      <el-form
        :model="editVolunteerForm"
        :rules="editVolunteerFormRules"
        ref="editVolunteerFormRef"
        label-width="100px"
        label-position="right"
        :status-icon="true"
      >
        <el-form-item label="学号" prop="studentNo">
          <el-input
            v-model="editVolunteerForm.studentNo"
            placeholder="请输入学号"
            type="number"
          ></el-input>
        </el-form-item>
        <el-form-item label="专业" prop="major">
          <el-input
            v-model="editVolunteerForm.major"
            placeholder="请输入专业"
          ></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="volunteerName">
          <el-input
            v-model="editVolunteerForm.volunteerName"
            placeholder="请输入志愿者姓名"
          ></el-input>
        </el-form-item>
        <el-form-item label="活动类型" prop="volunteerActivity">
          <el-select
            v-model="editVolunteerForm.volunteerActivity"
            placeholder="请选择志愿者活动类型"
            clearable
          >
            <el-option label="校内活动" value="校级活动"></el-option>
            <el-option label="校外活动" value="省级活动"></el-option>
            <el-option label="社团活动" value="社团活动"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动级别" prop="activityLevel">
          <el-select
            v-model="editVolunteerForm.activityLevel"
            placeholder="请选择活动级别"
            clearable
          >
            <el-option label="校级活动" value="校级活动"></el-option>
            <el-option label="省级活动" value="省级活动"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期" prop="date">
          <el-date-picker
            v-model="editVolunteerForm.date"
            type="datetime"
            placeholder="选择日期"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
          ></el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editSumbMit">
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
            :action="BASE_API + '/admin/core/dictVolunteer/import'"
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
import volunteerApi from '@/api/core/volunteer'
export default {
  data() {
    var checkStudentNo = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('学号不能为空'))
      }
      setTimeout(() => {
        if (value < 0) {
          callback(new Error('学号格式不合法'))
        } else {
          callback()
        }
      }, 100)
    }
    return {
      BASE_API: process.env.VUE_APP_BASE_API,
      uploadDialogVisible: false,
      loading: true,
      total: 0,
      queryInfo: {
        currentPage: 1,
        pagesize: 5
      },
      volunteerList: [],
      saveDialogVisible: false,
      editDialogVisible: false,
      addVolunteerForm: {
        studentNo: '',
        major: '',
        volunteerName: '',
        volunteerActivity: '',
        activityLevel: '',
        date: null
      },
      editVolunteerForm: {
        studentNo: '',
        major: '',
        volunteerName: '',
        volunteerActivity: '',
        activityLevel: '',
        date: null
      },
      editVolunteerFormRules: {},
      addVolunteerFormRules: {
        studentNo: [
          {
            validator: checkStudentNo,
            required: true,
            trigger: 'blur',
            message: '学号不能为空'
          }
        ],
        major: [{ required: true, trigger: 'blur', message: '专业不能为空' }],
        volunteerName: [
          { required: true, trigger: 'blur', message: '志愿者姓名不能为空' }
        ],
        volunteerActivity: [
          { required: true, trigger: 'blur', message: '活动类型不能为空' }
        ],
        activityLevel: [
          { required: true, trigger: 'blur', message: '活动类型不能为空' }
        ],
        date: []
      }
    }
  },
  created() {
    this.fetchData()
  },
  mounted() {},
  computed: {},
  methods: {
    fetchData() {
      volunteerApi
        .fetchData(this.queryInfo.currentPage, this.queryInfo.pagesize)
        .then(response => {
          // console.log(response)
          this.volunteerList = response.data.records
          this.total = response.data.total
          this.$message.success(response.message)
          this.loading = false
        })
        .catch(() => {
          return this.$message.error('获取数据列表失败')
        })
    },
    fetchDataNoMessage() {
      volunteerApi
        .fetchData(this.queryInfo.currentPage, this.queryInfo.pagesize)
        .then(response => {
          // console.log(response)
          this.volunteerList = response.data.records
          this.total = response.data.total
          this.loading = false
        })
        .catch(() => {
          return this.$message.error('获取数据列表失败')
        })
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
    addVolunteer() {
      this.saveDialogVisible = true
    },
    addSumit() {
      this.$refs.addVolunteerFormRef.validate(valid => {
        if (!valid) return
        const newVolunteer = this.addVolunteerForm
        volunteerApi
          .add(newVolunteer)
          .then(response => {
            this.$message.success(response.message)
            this.saveDialogVisible = false
            this.fetchDataNoMessage()
          })
          .catch(err => {
            return this.$message.error(err.message)
          })
      })
    },
    addDialogClose() {
      this.$refs.addVolunteerFormRef.resetFields()
    },
    remove(value) {
      // console.log(value)
      this.$confirm('此操作将永久删除该志愿者信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          return volunteerApi.removeById(value.studentNo)
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
    editDialog(value) {
      volunteerApi
        .getById(value.studentNo)
        .then(response => {
          console.log(response)
          this.editVolunteerForm = response.data.volunteer
          this.editVolunteerForm.date = response.data.volunteer.date
          this.editDialogVisible = true
        })
        .catch(err => {
          return this.$message.error(err.message)
        })
    },
    editDialogClose() {
      this.$refs.editVolunteerFormRef.resetFields()
    },
    editSumbMit() {
      this.$refs.editVolunteerFormRef.validate(valid => {
        if (!valid) return
        const volunteer = this.editVolunteerForm
        volunteerApi
          .update(volunteer)
          .then(response => {
            this.$message.success(response.message)
            this.fetchDataNoMessage()
            this.editDialogVisible = false
          })
          .catch(err => {
            return this.$message.error(err.message)
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
      window.location.href = this.BASE_API + '/admin/core/dictVolunteer/export'
    },
    // 时间格式化方法
    dateFormat: function(row) {
      var t = new Date(row.date) // row 表示一行数据, createTime 表示要格式化的字段名称
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
