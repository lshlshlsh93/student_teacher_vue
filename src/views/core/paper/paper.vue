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
            <el-button type="primary" size="medium" @click="add">
              添加发表论文信息
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
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column
          prop="studentNo"
          label="学生学号"
          header-align="center"
          align="center"
          sortable
        ></el-table-column>
        <el-table-column
          prop="studentName"
          header-align="center"
          align="center"
          label="学生姓名"
          sortable
        ></el-table-column>
        <el-table-column
          prop="paperTitle"
          label="论文名称"
          header-align="center"
          align="center"
          sortable
        ></el-table-column>
        <el-table-column
          prop="paperInformation"
          label="刊物的信息"
          header-align="center"
          align="center"
          sortable
        ></el-table-column>
        <el-table-column
          prop="paperTime"
          label="发表时间"
          header-align="center"
          align="center"
          :formatter="dateFormat"
          sortable
        ></el-table-column>
        <el-table-column
          prop="paperLevel"
          label="等级"
          header-align="center"
          sortable
          align="center"
        ></el-table-column>
        <el-table-column
          header-align="center"
          align="center"
          label="操作"
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
      title=" 添加发表论文信息"
      :visible.sync="saveDialgVisible"
      width="30%"
      @close="handleSaveClose"
    >
      <el-form
        :model="saveForm"
        :rules="saveFormRules"
        ref="saveFormRef"
        label-width="100px"
      >
        <el-form-item label="学生学号" prop="studentNo">
          <el-input
            v-model="saveForm.studentNo"
            type="number"
            clearable
            placeholder="请输入学生学号"
          ></el-input>
        </el-form-item>
        <el-form-item label="学生姓名" prop="studentName">
          <el-input
            v-model="saveForm.studentName"
            minlength="1"
            clearable
            placeholder="请输入学生姓名"
          ></el-input>
        </el-form-item>
        <el-form-item label="论文名称" prop="paperTitle">
          <el-input
            v-model="saveForm.paperTitle"
            placeholder="请输入论文名称"
            minlength="1"
            type="textarea"
            :rows="2"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item
          label="刊物的信息
        "
          prop="paperInformation"
        >
          <el-input
            v-model="saveForm.paperInformation"
            minlength="1"
            type="textarea"
            :rows="2"
            clearable
            placeholder="请输入刊物的信息"
          ></el-input>
        </el-form-item>
        <el-form-item label="发表时间" prop="paperTime">
          <el-date-picker
            v-model="saveForm.paperTime"
            type="datetime"
            placeholder="选择日期"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="等级" prop="paperLevel">
          <el-select
            v-model="saveForm.paperLevel"
            placeholder="请选择等级"
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
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="saveDialgVisible = false">取 消</el-button>
        <el-button type="primary" @click="addSubmit">
          确 定
        </el-button>
      </span>
    </el-dialog>
    <!-- 编辑 -->
    <el-dialog
      title="编辑"
      :visible.sync="editDialogVisible"
      width="30%"
      @close="handleEditClose"
    >
      <el-form
        :model="editForm"
        :rules="editFormRules"
        ref="editFormRef"
        label-width="100px"
      >
        <el-form-item label="学生学号" prop="studentNo">
          <el-input
            v-model="editForm.studentNo"
            type="number"
            clearable
            :disabled="true"
            placeholder="请输入学生学号"
          ></el-input>
        </el-form-item>
        <el-form-item label="学生姓名" prop="studentName">
          <el-input
            v-model="editForm.studentName"
            minlength="1"
            clearable
            placeholder="请输入学生姓名"
          ></el-input>
        </el-form-item>
        <el-form-item label="论文名称" prop="paperTitle">
          <el-input
            v-model="editForm.paperTitle"
            placeholder="请输入论文名称"
            minlength="1"
            type="textarea"
            :rows="2"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item
          label="刊物信息
        "
          prop="paperInformation"
        >
          <el-input
            v-model="editForm.paperInformation"
            minlength="1"
            clearable
            type="textarea"
            :rows="2"
            placeholder="请输入刊物的信息"
          ></el-input>
        </el-form-item>
        <el-form-item label="发表时间" prop="paperTime">
          <el-date-picker
            v-model="editForm.paperTime"
            type="datetime"
            placeholder="选择日期"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="等级" prop="paperLevel">
          <el-select
            v-model="editForm.paperLevel"
            placeholder="请选择等级"
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
            :action="BASE_API + '/admin/core/dictPaper/import'"
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
import paperApi from '@/api/core/paper'
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
      saveDialgVisible: false,
      editDialogVisible: false,
      saveForm: {
        studentNo: '',
        studentName: '',
        paperTitle: '',
        paperInformation: '',
        paperTime: null,
        paperLevel: ''
      },
      editForm: {
        studentNo: '',
        studentName: '',
        paperTitle: '',
        paperInformation: '',
        paperTime: null,
        paperLevel: ''
      },
      saveFormRules: {
        studentNo: [{ required: true, message: '不能为空' }],
        studentName: [{ required: true, message: '不能为空' }],
        paperTitle: [{ required: true, message: '不能为空' }],
        paperInformation: [{ required: true, message: '不能为空' }],
        paperLevel: [{ required: true, message: '不能为空' }],
        paperTime: []
      },
      editFormRules: {
        studentNo: [{ required: true, message: '不能为空' }],
        studentName: [{ required: true, message: '不能为空' }],
        paperTitle: [{ required: true, message: '不能为空' }],
        paperInformation: [{ required: true, message: '不能为空' }],
        paperLevel: [{ required: true, message: '不能为空' }],
        paperTime: []
      },
      options: [
        {
          value: '优秀',
          label: '优秀'
        },
        {
          value: '良好',
          label: '良好'
        },
        {
          value: '中等',
          label: '中等'
        }
      ],
      value: ''
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
    fetchData() {
      console.log(this.$store.getters.roles[0])
      paperApi
        .fetchData(this.queryInfo.currentPage, this.queryInfo.pageSize)
        .then(response => {
          this.tableData = response.data.records
          this.queryInfo.currentPage = response.data.pageCurrent
          this.queryInfo.pageSize = response.data.size
          this.total = response.data.total
          this.loading = false
          this.$message.success(response.message)
        })
    },
    fetchDataNoMessage() {
      paperApi
        .fetchData(this.queryInfo.currentPage, this.queryInfo.pageSize)
        .then(response => {
          this.tableData = response.data.records
          this.queryInfo.currentPage = response.data.pageCurrent
          this.queryInfo.pageSize = response.data.size
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
      window.location.href = this.BASE_API + '/admin/core/dictPaper/export'
    },
    add() {
      this.saveDialgVisible = true
    },
    edit(value) {
      paperApi
        .getById(value.studentNo)
        .then(response => {
          // console.log(response)
          this.$message.success(response.message)
          this.editForm = response.data.paper
          this.editDialogVisible = true
        })
        .catch(() => {
          return this.$message.error('获取失败')
        })
    },
    handleEditClose() {
      this.$refs.editFormRef.resetFields()
    },
    editSubmit() {
      this.$refs.editFormRef.validate(valid => {
        if (!valid) return
        const update = this.editForm
        paperApi
          .update(update)
          .then(response => {
            this.$message.success(response.message)
            this.editDialogVisible = false
            this.fetchDataNoMessage()
          })
          .catch(err => {
            return this.$message.error(err.message)
          })
      })
    },
    addSubmit() {
      this.$refs.saveFormRef.validate(valid => {
        if (!valid) return
        const add = this.saveForm
        paperApi
          .add(add)
          .then(response => {
            this.$message.success(response.message)
            this.saveDialgVisible = false
            this.fetchDataNoMessage()
          })
          .catch(err => {
            return this.$message.error(err.message)
          })
      })
    },
    handleSaveClose() {
      this.$refs.saveFormRef.resetFields()
    },
    remove(value) {
      this.$confirm('此操作将永久删除该论文信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          return paperApi.removeById(value.studentNo)
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
      // row 表示一行数据, paperTime 表示要格式化的字段名称
      var t = new Date(row.paperTime)
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
