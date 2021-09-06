<template>
  <div class="app-container">
    <div slot="header">
      <div>
        <el-form
          label-width="50px"
          :rules="addStudentFormRules"
          ref="addStudnetRef"
          :model="addStudentForm"
          align="center"
        >
          <el-form-item label="学号" prop="studentNo" label-width="1000px">
            <el-input v-model="addStudentForm.studentNo"></el-input>
          </el-form-item>
          <el-form-item
            label="学生姓名"
            prop="studentName"
            label-width="1000px"
          >
            <el-input v-model="addStudentForm.studentName"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="sex" label-width="1000px">
            <el-input v-model="addStudentForm.sex"></el-input>
          </el-form-item>
          <el-form-item label="联系方式" prop="email" label-width="1000px">
            <el-input v-model="addStudentForm.email"></el-input>
          </el-form-item>
          <el-form-item
            label="家庭地址"
            prop="homeAddress"
            label-width="1000px"
          >
            <el-input v-model="addStudentForm.homeAddress"></el-input>
          </el-form-item>
          <el-form-item label="家长姓名" prop="parentName" label-width="1000px">
            <el-input v-model="addStudentForm.parentName"></el-input>
          </el-form-item>
          <el-form-item
            label="家长联系方式"
            prop="parentContact"
            label-width="1000px"
          >
            <el-input v-model="addStudentForm.parentContact"></el-input>
          </el-form-item>
          <el-form-item
            label="辅导员姓名"
            prop="counselorInformation"
            label-width="1000px"
          >
            <el-input v-model="addStudentForm.counselorInformation"></el-input>
          </el-form-item>
          <!-- <el-form-item
            label="领导姓名"
            prop="leadershipInformation"
            label-width="80px"
          >
            <el-input v-model="addStudentForm.leadershipInformation"></el-input>
          </el-form-item> -->
        </el-form>
        <el-button
          type="primary"
          @click="saveDataSubmit"
          align="center"
          :disabled="saveBtnDisabled"
        >
          保存
        </el-button>
      </div>
    </div>
  </div>
</template>
<script>
import studentApi from '@/api/core/student.js'
export default {
  data() {
    return {
      saveBtnDisabled: false, //是否禁用保存按钮，防止表单重复提交
      student: {}, // 学生对象
      addStudentForm: {
        studentNo: '',
        studentName: '',
        sex: '',
        email: '',
        homeAddress: '',
        parentName: '',
        parentContact: '',
        counselorInformation: '',
        leadershipInformation: ''
      },
      addStudentFormRules: {
        studentName: [
          { required: true, message: '请输入学生姓名', trigger: 'blur' },
          { min: 1, max: 5, message: '长度在 1 到 10 个字符', trigger: 'blur' }
        ],
        studentNo: [
          { required: true, message: '请输入学号', trigger: 'blur' },
          { min: 10, max: 10, message: '长度在10字符', trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '请输入性别', trigger: 'blur' },
          { min: 1, max: 1, message: '长度在1个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入联系方式', trigger: 'blur' },
          {
            min: 10,
            max: 20,
            message: '长度在 10 到 20个字符',
            trigger: 'blur'
          }
        ],
        homeAddress: [
          { required: true, message: '请输入家庭地址', trigger: 'blur' },
          {
            min: 15,
            max: 25,
            message: '长度在 15 到 25 个字符',
            trigger: 'blur'
          }
        ],
        parentName: [
          { required: true, message: '请输入家长姓名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        parentContact: [
          { required: true, message: '请输入家长联系方式', trigger: 'blur' },
          {
            min: 10,
            max: 20,
            message: '长度在 10 到 20 个字符',
            trigger: 'blur'
          }
        ],
        counselorInformation: [
          { required: true, message: '请输入辅导员姓名', trigger: 'blur' }
        ],
        leadershipInformation: [
          { required: true, message: '请输入领导姓名', trigger: 'blur' }
        ]
      },
      saveBtnDisabled: false
    }
  },
  methods: {
    saveDataSubmit() {
      this.$refs.addStudnetRef.validate(valid => {
        // console.log(valid)
        if (!valid) return
        const stu = this.addStudentForm
        studentApi
          .save(stu)
          .then(response => {
            this.$message.success(response.message)
            this.saveBtnDisabled = true
            this.$router.push('/core/student/list')
          })
          .catch(err => err)
      })
    }
  }
}
</script>
<style scoped></style>
