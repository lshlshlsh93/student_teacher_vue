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
              添加年级专业信息
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
        style="margin-top: 15px;"
        border
        scripe
        :v-loading="loading"
      >
        <el-table-column type="index" label="#"></el-table-column>

        <el-table-column
          prop="classNo"
          label="年级编号"
          header-align="center"
          align="center"
          width="width"
          sortable
        ></el-table-column>
        <el-table-column
          prop="grade"
          header-align="center"
          align="center"
          label="年级"
          width="width"
          sortable
        ></el-table-column>
        <el-table-column
          prop="professionNo"
          label="专业号"
          width="width"
          header-align="center"
          align="center"
          sortable
        ></el-table-column>
        <el-table-column
          prop="teacherNo"
          label="辅导员工号"
          header-align="center"
          align="center"
          width="width"
          sortable
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
    <!-- 编辑对话框 -->
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
        <el-form-item label="年级编号" prop="classNo">
          <el-input
            :disabled="true"
            v-model="editForm.classNo"
            size="medium"
            minlength="1"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="年级">
          <el-select
            v-model="editForm.grade"
            placeholder="请选择年级"
            clearable
            size="medium"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="专业号" prop="professionNo">
          <el-input
            v-model="editForm.professionNo"
            clearable
            size="medium"
          ></el-input>
        </el-form-item>
        <el-form-item label="辅导员工号" prop="teacherNo">
          <el-input
            v-model="editForm.teacherNo"
            size="medium"
            minlength="1"
            clearable
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
    <!-- 添加对话框 -->
    <el-dialog
      title="添加年级专业信息"
      :visible.sync="saveDialogVisible"
      width="30%"
      @close="handleClose()"
    >
      <el-form
        :model="saveForm"
        :rules="saveFormRules"
        ref="saveFormRef"
        label-width="100px"
      >
        <el-form-item label="年级编号" prop="classNo">
          <el-input
            v-model="saveForm.classNo"
            size="medium"
            placeholder="请输入年级编号"
            minlength="1"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="年级">
          <el-select
            v-model="saveForm.grade"
            placeholder="请选择年级"
            clearable
            size="medium"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="专业号" prop="professionNo">
          <el-input
            v-model="saveForm.professionNo"
            clearable
            size="medium"
            placeholder="请输入专业号"
          ></el-input>
        </el-form-item>
        <el-form-item label="辅导员工号" prop="teacherNo">
          <el-input
            v-model="saveForm.teacherNo"
            size="medium"
            minlength="1"
            placeholder="请输入辅导员工号"
            clearable
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="saveDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addSubmit">
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
            :action="BASE_API + '/admin/core/dictGrade/import'"
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
import gradeApi from '@/api/core/grade'
export default {
  data() {
    return {
      BASE_API: process.env.VUE_APP_BASE_API,
      // 用户搜索输入的关键字
      keyWords: '',
      loading: true,
      // 表格数据
      tableData: [],
      queryInfo: {
        currentPage: 1,
        pageSize: 5
      },
      total: 0,
      editDialogVisible: false,
      saveDialogVisible: false,
      uploadDialogVisible: false,
      editForm: {
        classNo: '',
        grade: '',
        professionNo: '',
        teacherNo: 0
      },
      saveForm: {},
      saveFormRules: {
        classNo: [{ required: true, message: '不能为空' }],
        professionNo: [{ required: true, message: '不能为空' }],
        teacherNo: [{ required: true, message: '不能为空' }]
      },
      // 选中的值
      value: '',
      options: [
        {
          value: '2016级',
          label: '2016级'
        },
        {
          value: '2017级',
          label: '2017级'
        },
        {
          value: '2018级',
          label: '2018级'
        },
        {
          value: '2019级',
          label: '2019级'
        },
        {
          value: '2020级',
          label: '2020级'
        },
        {
          value: '2021级',
          label: '2021级'
        }
      ],
      editFormRules: {
        classNo: [{ required: true, message: '不能为空' }],
        professionNo: [{ required: true, message: '不能为空' }],
        dormitoryNo: [{ required: true, message: '不能为空' }]
      }
    }
  },
  created() {
    this.fetchData()
  },
  mounted() {},
  computed: {
    // 获取用户角色
    getRole() {
      return store.state.user.roles[0]
    }
  },
  methods: {
    fetchData() {
      console.log(store.state.user.roles[0])
      gradeApi
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
      gradeApi
        .fetchData(this.queryInfo.currentPage, this.queryInfo.pageSize)
        .then(response => {
          // console.log(response)
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
      window.location.href = this.BASE_API + '/admin/core/dictGrade/export'
    },
    edit(value) {
      gradeApi.getById(value.classNo).then(response => {
        // console.log(response)
        this.editForm = response.data.record
      })
      this.editDialogVisible = true
    },
    handleEditClose() {
      this.$refs.editFormRef.resetFields()
    },
    editSubmit() {
      this.$refs.editFormRef.validate(valid => {
        if (!valid) return
        const edit = this.editForm
        gradeApi
          .update(edit)
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
    remove(value) {
      this.$confirm('此操作将永久删除该专业信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          return gradeApi.removeById(value.classNo)
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
    add() {
      this.saveDialogVisible = true
    },
    handleClose() {
      this.$refs.saveFormRef.resetFields()
    },
    addSubmit() {
      this.$refs.saveFormRef.validate(valid => {
        if (!valid) return
        const add = this.saveForm
        gradeApi
          .add(add)
          .then(response => {
            this.$message.success(response.message)
            this.fetchData()
            this.saveDialogVisible = false
          })
          .catch(() => {
            return this.$message.error('新增失败')
          })
      })
    }
  }
}
</script>
<style scoped></style>
