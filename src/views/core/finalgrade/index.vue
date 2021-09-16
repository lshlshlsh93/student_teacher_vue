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
            <el-button
              type="primary"
              size="medium"
              icon="el-icon-document-add"
              @click="add"
            >
              添加
            </el-button>
            <el-button
              type="primary"
              size="medium"
              @click="upload"
              icon="el-icon-upload"
            >
              导入
            </el-button>
            <el-button
              type="primary"
              size="medium"
              icon="el-icon-download"
              @click="exportData"
            >
              导出
            </el-button>
          </el-col>
        </el-row>
      </div>
      <el-table
        :data="List"
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
          prop="studentName"
          label="姓名"
        ></el-table-column>
        <el-table-column
          header-align="center"
          align="center"
          prop="finalgrade"
          label="综合成绩(学年)"
        ></el-table-column>
        <el-table-column
          header-align="center"
          align="center"
          prop="academicyear"
          label="学年"
        ></el-table-column>
        <el-table-column
          header-align="center"
          align="center"
          label="操作"
          v-if="getRole === 'admin'"
        >
          <template slot-scope="">
            <el-tooltip effect="dark" content="编辑" placement="top">
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
              ></el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="删除" placement="top">
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </div>
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
import store from '@/store/index'
export default {
  data() {
    return {
      List: [
        {
          studentNo: '123456789',
          studentName: 'WANG HAN',
          finalgrade: 99,
          academicyear: '2020-2021学年上学期'
        }
      ],
      // 总条数
      total: 0,
      queryInfo: {
        currentPage: 1,
        pagesize: 5
      },
      loading: true
    }
  },
  created() {},
  computed: {
    getRole() {
      return store.state.user.roles[0]
    }
  },
  methods: {
    add() {},
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
    },
    handleCurrentChange(newPage) {
      this.queryInfo.currentPage = newPage
    },
    // 上传
    upload() {},
    // 下载
    exportData() {}
  }
}
</script>
<style scoped></style>
