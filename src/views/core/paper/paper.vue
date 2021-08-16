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
            <el-button type="primary" size="medium" @click="add">
              添加发表论文信息
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
          prop="teacherNo"
          label="教师工号"
          header-align="center"
          align="center"
          sortable
        ></el-table-column>
        <el-table-column
          prop="teacherName"
          header-align="center"
          align="center"
          label="教师姓名"
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
        <el-table-column header-align="center" align="center" label="操作">
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
        <el-form-item label="教师工号" prop="teacherNo">
          <el-input
            v-model="saveForm.teacherNo"
            type="number"
            clearable
            placeholder="请输入教师工号"
          ></el-input>
        </el-form-item>
        <el-form-item label="教师姓名" prop="teacherName">
          <el-input
            v-model="saveForm.teacherName"
            minlength="1"
            clearable
            placeholder="请输入教师姓名"
          ></el-input>
        </el-form-item>
        <el-form-item label="论文名称" prop="paperTitle">
          <el-input
            v-model="saveForm.paperTitle"
            placeholder="请输入论文名称"
            minlength="1"
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
          <el-input
            v-model="saveForm.paperLevel"
            minlength="1"
            clearable
            placeholder="请输入等级"
          ></el-input>
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
      title="编辑教师信息"
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
        <el-form-item label="教师工号" prop="teacherNo">
          <el-input
            v-model="editForm.teacherNo"
            type="number"
            clearable
            placeholder="请输入教师工号"
          ></el-input>
        </el-form-item>
        <el-form-item label="教师姓名" prop="teacherName">
          <el-input
            v-model="editForm.teacherName"
            minlength="1"
            clearable
            placeholder="请输入教师姓名"
          ></el-input>
        </el-form-item>
        <el-form-item label="论文名称" prop="paperTitle">
          <el-input
            v-model="editForm.paperTitle"
            placeholder="请输入论文名称"
            minlength="1"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item
          label="刊物的信息
        "
          prop="paperInformation"
        >
          <el-input
            v-model="editForm.paperInformation"
            minlength="1"
            clearable
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
          <el-input
            v-model="editForm.paperLevel"
            minlength="1"
            clearable
            placeholder="请输入等级"
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
import paperApi from '@/api/core/paper'
export default {
  data() {
    return {
      BASE_API: process.env.VUE_APP_BASE_API,
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
        teacherNo: '',
        teacherName: '',
        paperTitle: '',
        paperInformation: '',
        paperTime: null,
        paperLevel: ''
      },
      editForm: {
        teacherNo: '',
        teacherName: '',
        paperTitle: '',
        paperInformation: '',
        paperTime: null,
        paperLevel: ''
      },
      saveFormRules: {
        teacherNo: [{ required: true, message: '不能为空' }],
        teacherName: [{ required: true, message: '不能为空' }],
        paperTitle: [{ required: true, message: '不能为空' }],
        paperInformation: [{ required: true, message: '不能为空' }],
        paperLevel: [{ required: true, message: '不能为空' }],
        paperTime: []
      },
      editFormRules: {
        teacherNo: [{ required: true, message: '不能为空' }],
        teacherName: [{ required: true, message: '不能为空' }],
        paperTitle: [{ required: true, message: '不能为空' }],
        paperInformation: [{ required: true, message: '不能为空' }],
        paperLevel: [{ required: true, message: '不能为空' }],
        paperTime: []
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      paperApi
        .fetchData(this.queryInfo.currentPage, this.queryInfo.pageSize)
        .then(response => {
          console.log(response)
          this.tableData = response.data.records
          console.log(this.tableData)
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
    exportData() {
      window.location.href = this.BASE_API + '/admin/core/dictPaper/export'
    },
    add() {
      this.saveDialgVisible = true
    },
    edit(value) {
      paperApi
        .getById(value.teacherNo)
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
          return paperApi.removeById(value.teacherNo)
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
  },
  computed: {}
}
</script>
<style scoped></style>
