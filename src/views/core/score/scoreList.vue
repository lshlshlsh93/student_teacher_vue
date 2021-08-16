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
            <el-button
              type="primary"
              size="medium"
              @click="showSaveDialogVisible"
            >
              添加成绩信息
            </el-button>
            <el-button type="primary" size="medium" @click="exportData">
              导出Excel
            </el-button>
          </el-col>
        </el-row>
      </div>

      <el-table
        :data="scoreList"
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
        ></el-table-column>
        <el-table-column
          header-align="center"
          align="center"
          prop="studentNo"
          label="学号"
        ></el-table-column>
        <el-table-column
          header-align="center"
          align="center"
          prop="courseName"
          label="课程号"
        ></el-table-column>
        <el-table-column
          header-align="center"
          align="center"
          prop="team"
          label="开课学期"
        ></el-table-column>
        <el-table-column
          header-align="center"
          align="center"
          prop="score"
          label="成绩"
        ></el-table-column>

        <el-table-column
          header-align="center"
          align="center"
          prop="academicWarning"
          label="学业预警"
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
                @click="removeDialogVisible(scope.row)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 添加 -->
    <el-dialog
      title="添加成绩"
      :visible.sync="saveDialogVisible"
      width="50%"
      @close="closeSaveDialog"
    >
      <el-form
        :model="saveScoreForm"
        :rules="saveScoreFormRules"
        ref="saveScoreFormRef"
        label-width="80px"
      >
        <el-form-item label="学号" prop="studentNo">
          <el-input v-model="saveScoreForm.studentNo"></el-input>
        </el-form-item>
        <el-form-item label="课程号" prop="courseName">
          <el-input v-model="saveScoreForm.courseName"></el-input>
        </el-form-item>
        <el-form-item label="开课学期">
          <el-input v-model="saveScoreForm.team"></el-input>
        </el-form-item>
        <el-form-item label="成绩">
          <el-input v-model="saveScoreForm.score" type="number"></el-input>
        </el-form-item>
        <el-form-item label="学业预警">
          <el-input v-model="saveScoreForm.academicWarning"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="saveDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="save">
          确 定
        </el-button>
      </span>
    </el-dialog>
    <!-- 编辑 -->
    <el-dialog
      title="编辑"
      :visible.sync="editDialogVisible"
      width="50%"
      label-width="100px"
    >
      <el-form
        :model="editScoreForm"
        :rules="editScoreFormRules"
        ref="editScoreFormRef"
      >
        <el-form-item label="学号">
          <el-input v-model="editScoreForm.studentNo"></el-input>
        </el-form-item>
        <el-form-item label="课程号">
          <el-input v-model="editScoreForm.courseName"></el-input>
        </el-form-item>
        <el-form-item label="开课学期">
          <el-input v-model="editScoreForm.team"></el-input>
        </el-form-item>
        <el-form-item label="成绩">
          <el-input v-model="editScoreForm.score" type="number"></el-input>
        </el-form-item>
        <el-form-item label="学业预警">
          <el-input v-model="editScoreForm.academicWarning"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateScore">
          确 定
        </el-button>
      </span>
    </el-dialog>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.currentPage"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="queryInfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>
<script>
import scoreApi from '@/api/core/score'

export default {
  data() {
    var checkstudentNo = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('学号不能为空'))
      }
      setTimeout(() => {
        if (value.length < 10) {
          callback(new Error('学号不能少于十位'))
        } else {
          callback()
        }
      }, 1000)
    }
    var validateValue = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('值不能为空'))
      }
      callback()
    }

    return {
      BASE_API: process.env.VUE_APP_BASE_API,
      loading: true,
      scoreList: [],
      total: 0,
      queryInfo: {
        currentPage: 1,
        pagesize: 5
      },
      saveScoreForm: {
        studentNo: '',
        courseName: '',
        team: '',
        score: '',
        academicWarning: ''
      },
      saveScoreFormRules: {
        studentNo: [
          { validator: checkstudentNo, trigger: 'blur', required: true }
        ],
        courseName: [
          { validator: validateValue, trigger: 'blur', required: true }
        ]
      },
      saveDialogVisible: false,
      editDialogVisible: false,
      editScoreForm: {
        studentNo: '',
        courseName: '',
        team: '',
        score: '',
        academicWarning: ''
      },
      editScoreFormRules: {}
    }
  },
  created() {
    this.fetchData()
  },
  mounted() {},
  computed: {},
  methods: {
    fetchData() {
      scoreApi
        .scoreListPage(this.queryInfo.currentPage, this.queryInfo.pagesize)
        .then(response => {
          // console.log(response)
          this.scoreList = response.data.records
          this.total = response.data.total
          this.queryInfo.pagesize = response.data.size
          this.$message.success(response.message)
          this.loading = false
        })
        .catch(err => {
          // console.log(err)
          return this.$message.error('获取数据列表失败')
        })
    },
    // 监听pageSize改变的事件
    handleSizeChange(newSize) {
      // console.log(newSize)
      this.queryInfo.pagesize = newSize
      this.fetchData()
    },
    // 监听页码的改变
    handleCurrentChange(newPage) {
      // debugger
      // console.log(newPage)
      this.queryInfo.currentPage = newPage
      this.fetchData()
    },

    showSaveDialogVisible() {
      this.saveDialogVisible = true
    },
    closeSaveDialog() {
      this.$refs.saveScoreFormRef.resetFields()
    },
    save() {
      this.$refs.saveScoreFormRef.validate(valid => {
        // console.log(valid)
        if (!valid) return
        scoreApi.save(this.saveScoreForm).then(response => {
          //  console.log(response)
          this.$message.success(response.message)
          this.fetchData()
          this.saveDialogVisible = false
        })
      })
    },
    fetchDataById(row) {
      // console.log(row)
      scoreApi.getById(row.studentNo).then(response => {
        this.editStudentForm = response.data.record
      })
    },
    editDialog(score) {
      this.fetchDataById(score)
      this.editDialogVisible = true
    },
    updateScore() {
      this.$refs.editScoreFormRef.validate(valid => {
        if (!valid) return
        scoreApi
          .update(this.editStudentForm)
          .then(response => {
            this.$message.success(response.message)
            this.fetchData()
            this.editDialogVisible = false
          })
          .catch(err => {
            this.$message.error(err)
          })
      })
    },
    removeDialogVisible(score) {
      this.$confirm('此操作将永久删除该成绩信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          return scoreApi.removeById(score.studentNo)
        })
        .then(response => {
          this.$message.success(response.message)
          this.fetchData()
        })
        .catch(error => {
          if (error === 'cancel') {
            this.$message.info('已取消删除')
          }
        })
    },
    exportData() {
      window.location.href = this.BASE_API + '/admin/core/dictScore/export'
    }
  }
}
</script>
<style scoped></style>
