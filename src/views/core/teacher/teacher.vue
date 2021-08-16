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
              添加教师信息
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
          width="width"
        ></el-table-column>
        <el-table-column
          prop="teacherName"
          header-align="center"
          align="center"
          label="教师姓名"
          width="width"
        ></el-table-column>
        <el-table-column
          prop="post"
          label="岗位"
          width="width"
          header-align="center"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="title"
          label="职称"
          header-align="center"
          align="center"
          width="width"
        ></el-table-column>
        <el-table-column
          prop="teacherContact"
          label="教师联系方式"
          header-align="center"
          align="center"
          width="width"
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
    <!-- 对话框区域 -->
    <!-- 添加 -->
    <el-dialog
      title="提交教师信息"
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
        <el-form-item label="岗位" prop="post">
          <el-input
            v-model="saveForm.post"
            placeholder="请输入岗位"
            minlength="1"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="职称" prop="title">
          <el-input
            v-model="saveForm.title"
            minlength="1"
            clearable
            placeholder="请输入职称"
          ></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="teacherContact">
          <el-input
            v-model="saveForm.teacherContact"
            minlength="1"
            clearable
            placeholder="请输入教师联系方式"
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
            clearable
            placeholder="请输入教师工号"
            type="number"
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
        <el-form-item label="岗位" prop="post">
          <el-input
            v-model="editForm.post"
            placeholder="请输入岗位"
            minlength="1"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="职称" prop="title">
          <el-input
            v-model="editForm.title"
            minlength="1"
            clearable
            placeholder="请输入职称"
          ></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="teacherContact">
          <el-input
            v-model="editForm.teacherContact"
            minlength="1"
            clearable
            placeholder="请输入教师联系方式"
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
import teacherApi from '@/api/core/teacher'
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
        post: '',
        title: '',
        teacherContact: ''
      },
      editForm: {
        teacherNo: '',
        teacherName: '',
        post: '',
        title: '',
        teacherContact: ''
      },
      saveFormRules: {
        teacherNo: [{ required: true, message: '不能为空' }],
        teacherName: [{ required: true, message: '不能为空' }],
        post: [{ required: true, message: '不能为空' }],
        title: [{ required: true, message: '不能为空' }],
        teacherContact: [{ required: true, message: '不能为空' }]
      },
      editFormRules: {
        teacherNo: [{ required: true, message: '不能为空' }],
        teacherName: [{ required: true, message: '不能为空' }],
        post: [{ required: true, message: '不能为空' }],
        title: [{ required: true, message: '不能为空' }],
        teacherContact: [{ required: true, message: '不能为空' }]
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      teacherApi
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
        .catch(() => {
          this.$message.error('获取失败')
        })
    },
    fetchDataNoMessage() {
      teacherApi
        .fetchData(this.queryInfo.currentPage, this.queryInfo.pageSize)
        .then(response => {
          // console.log(response)
          this.tableData = response.data.records
          this.queryInfo.currentPage = response.data.pageCurrent
          this.queryInfo.pageSize = response.data.size
          this.total = response.data.total
          this.loading = false
        })
        .catch(() => {
          this.$message.error('获取失败')
        })
    },
    handleSizeChange(newSize) {
      this.queryInfo.pageSize = newSize
      this.fetchData()
    },
    handleCurrentChange(newPage) {
      this.queryInfo.currentPage = newPage
      this.fetchData()
    },
    exportData() {
      window.location.href = this.BASE_API + '/admin/core/dictTeacher/export'
    },
    add() {
      this.saveDialgVisible = true
    },
    addSubmit() {
      this.$refs.saveFormRef.validate(valid => {
        if (!valid) return
        const add = this.saveForm
        teacherApi
          .add(add)
          .then(response => {
            this.$message.success(response.message)
            this.fetchDataNoMessage()
            this.saveDialgVisible = false
          })
          .catch(() => {
            this.$message.error('添加失败')
          })
      })
    },
    edit(value) {
      // console.log(value)
      teacherApi
        .getById(value.teacherNo)
        .then(response => {
          // console.log(response)
          this.editForm = response.data.teacher
          this.editDialogVisible = true
        })
        .catch(() => {
          this.$message.error('获取失败')
        })
    },
    editSubmit() {
      this.$refs.editFormRef.validate(valid => {
        if (!valid) return
        const update = this.editForm
        teacherApi
          .update(update)
          .then(response => {
            this.$message.success(response.message)
            this.fetchDataNoMessage()
            this.editDialogVisible = false
          })
          .catch(() => {
            this.$message.error('更新失败')
          })
      })
    },
    handleSaveClose() {
      this.$refs.saveFormRef.resetFields()
    },
    handleEditClose() {
      this.$refs.editFormRef.resetFields()
    },
    remove(value) {
      this.$confirm('此操作将永久删除该教师信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          return teacherApi.removeById(value.teacherNo)
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
    }
  },
  computed: {}
}
</script>
<style scoped></style>
