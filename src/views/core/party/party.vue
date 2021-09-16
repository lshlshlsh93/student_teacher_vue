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
            <el-button type="primary" size="medium" @click="save">
              添加预备党员信息
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
      <!-- 表格区域 -->
      <el-table
        :data="tableData"
        style="width: 100%;margin-top: 15px;"
        border
        scripe
        :v-loading="loading"
      >
        <el-table-column
          type="index"
          label="#"
          width="width"
          header-align="center"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="studentNo"
          label="学号"
          header-align="center"
          align="center"
          width="width"
          sortable
        ></el-table-column>
        <el-table-column
          prop="studentName"
          label="学生姓名"
          header-align="center"
          align="center"
          width="width"
          sortable
        ></el-table-column>
        <el-table-column
          prop="partyTime"
          header-align="center"
          align="center"
          label="入党申请书递交时间"
          width="width"
          sortable
          :formatter="dateFormat"
        ></el-table-column>
        <el-table-column
          prop="transferPartyTime"
          header-align="center"
          align="center"
          label="转预备党员时间"
          width="width"
          sortable
          :formatter="dateFormat2"
        ></el-table-column>
        <el-table-column
          prop="courseName"
          label="入党介绍人"
          width="width"
          header-align="center"
          align="center"
        ></el-table-column>

        <el-table-column
          header-align="center"
          align="center"
          label="操作"
          v-if="this.$store.getters.roles[0] === 'admin'"
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
    <el-dialog
      title="添加预备党员信息"
      :visible.sync="savaDialogVisible"
      width="30%"
    >
      <el-form
        :model="saveForm"
        :rules="saveFormRules"
        ref="saveFormRef"
        label-width="150px"
      >
        <el-form-item label="学号" prop="studentNo">
          <el-input
            v-model="saveForm.studentNo"
            placeholder="请输入学号"
          ></el-input>
        </el-form-item>
        <el-form-item label="学生姓名" prop="studentName" label-width="150px">
          <el-input
            v-model="saveForm.studentName"
            placeholder="请输入学生姓名"
          ></el-input>
        </el-form-item>
        <el-form-item label="入党介绍人" prop="courseName">
          <el-input
            placeholder="请输入入党介绍人"
            v-model="saveForm.courseName"
          ></el-input>
        </el-form-item>
        <el-form-item label="递交时间" prop="partyTime" label-width="150px">
          <el-date-picker
            v-model="saveForm.partyTime"
            type="datetime"
            placeholder="选择日期"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
          ></el-date-picker>
        </el-form-item>
        <el-form-item
          label="转预备党员时间"
          prop="transferPartyTime"
          label-width="150px"
        >
          <el-date-picker
            v-model="saveForm.transferPartyTime"
            type="datetime"
            placeholder="选择日期"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
          ></el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="savaDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveSubmit">
          确 定
        </el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="编辑预备党员信息"
      :visible.sync="editDialogVisible"
      width="30%"
    >
      <el-form :model="editForm" :rules="editFormRules" ref="editFormRef">
        <el-form-item label="学号" prop="studentNo" label-width="150px">
          <el-input v-model="editForm.studentNo" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="学生姓名" prop="studentName" label-width="150px">
          <el-input v-model="editForm.studentName"></el-input>
        </el-form-item>
        <el-form-item label="入党介绍人" prop="courseName" label-width="150px">
          <el-input v-model="editForm.courseName"></el-input>
        </el-form-item>
        <el-form-item label="递交时间" prop="partyTime" label-width="150px">
          <el-date-picker
            v-model="editForm.partyTime"
            type="datetime"
            placeholder="选择日期"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
          ></el-date-picker>
        </el-form-item>
        <el-form-item
          label="转预备党员时间"
          prop="transferPartyTime"
          label-width="150px"
        >
          <el-date-picker
            v-model="editForm.transferPartyTime"
            type="datetime"
            placeholder="选择日期"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
          ></el-date-picker>
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
            :action="BASE_API + '/admin/core/dictParty/import'"
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
      :page-sizes="[5, 10, 15, 20, 25, 50]"
      :page-size="queryInfo.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>
<script>
import store from '@/store/index'
import partyApi from '@/api/core/party'
export default {
  data() {
    return {
      BASE_API: process.env.VUE_APP_BASE_API,
      uploadDialogVisible: false,
      loading: true,
      // 表格数据
      tableData: [],
      queryInfo: {
        currentPage: 1,
        pageSize: 5
      },
      total: 0,
      editDialogVisible: false,
      editForm: {
        partyTime: null,
        transferPartyTime: null,
        studentNo: '',
        courseName: '',
        studentName: ''
      },
      editFormRules: {
        partyTime: [],
        studentNo: [{ required: true, message: '不能为空', trigger: 'blur' }],
        studentName: [{ required: true, message: '不能为空', trigger: 'blur' }],
        courseName: [{ required: true, message: '不能为空', trigger: 'blur' }]
      },
      savaDialogVisible: false,
      saveForm: {
        partyTime: null,
        transferPartyTime: null,
        studentNo: '',
        courseName: ''
      },
      saveFormRules: {
        partyTime: [],
        studentNo: [{ required: true, message: '不能为空', trigger: 'blur' }],
        studentName: [{ required: true, message: '不能为空', trigger: 'blur' }],
        courseName: [{ required: true, message: '不能为空', trigger: 'blur' }]
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
    fetchData() {
      partyApi
        .fetchData(this.queryInfo.currentPage, this.queryInfo.pageSize)
        .then(response => {
          // console.log(response)
          this.tableData = response.data.records
          this.queryInfo.currentPage = response.data.pageCurrent
          this.queryInfo.pageSize = response.data.size
          this.total = response.data.total
          this.loading = false
          this.$message.success(response.message)
        })
    },
    fetchDataNoMessage() {
      partyApi
        .fetchData(this.queryInfo.currentPage, this.queryInfo.pageSize)
        .then(response => {
          // console.log(response)
          this.tableData = response.data.records
          this.queryInfo.currentPage = response.data.pageCurrent
          // this.queryInfo.pageSize = response.data.size
          this.total = response.data.total
          this.loading = false
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
      window.location.href = this.BASE_API + '/admin/core/dictParty/export'
    },
    save() {
      this.savaDialogVisible = true
    },
    saveSubmit() {
      const add = this.saveForm
      this.$refs.saveFormRef.validate(valid => {
        if (!valid) return
        partyApi
          .add(add)
          .then(response => {
            this.$message.success(response.message)
            this.fetchDataNoMessage()
            this.savaDialogVisible = false
          })
          .catch(() => {
            return this.$message.error('新增失败')
          })
      })
    },
    edit(value) {
      partyApi
        .getById(value.studentNo)
        .then(response => {
          this.editForm = response.data.partyRecord
          this.$message.success(response.message)
          this.editDialogVisible = true
        })
        .catch(() => {
          return this.$message.error('获取失败')
        })
    },
    editSubmit() {
      //  const update = this.editForm
      this.$refs.editFormRef.validate(valid => {
        if (!valid) return
        partyApi
          .update(this.editForm)
          .then(response => {
            this.$message.success(response.message)
            this.editDialogVisible = false
            this.fetchDataNoMessage()
          })
          .catch(() => {
            return this.$message.error('更新失败')
          })
      })
    },
    remove(value) {
      // console.log(value)
      this.$confirm('此操作将永久删除该预备党员信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          return partyApi.removeById(value.studentNo)
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
    // 时间格式化方法
    dateFormat: function(row) {
      var t = new Date(row.partyTime) // row 表示一行数据, partyTime 表示要格式化的字段名称
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
    // 时间格式化方法
    dateFormat2: function(row) {
      var t = new Date(row.transferPartyTime) // row 表示一行数据, partyTime 表示要格式化的字段名称
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
  },
  computed: {}
}
</script>
<style scoped></style>
