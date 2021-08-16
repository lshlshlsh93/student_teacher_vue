import request from '@/utils/request'
export default {
  // 获取学生信息的成员方法
  list(currentPage, pageSize) {
    // ajax
    const page = { currentPage: currentPage, pageSize: pageSize }
    return request({
      url: '/admin/core/student/listPage',
      method: 'get',
      params: page
    })
  },

  // 删除学生信息
  removeById(id) {
    return request({
      url: '/admin/core/student/remove/' + id,
      method: 'delete'
    })
  },

  // 保存学生信息
  save(student) {
    return request({
      url: '/admin/core/student/save',
      method: 'post',
      data: student // 新增学生信息
    })
  },

  // 根据学号获取学生信息
  getstudentById(studentNo) {
    return request({
      url: '/admin/core/student/list/' + studentNo,
      method: 'get'
    })
  },

  // 更新
  updateStudent(student) {
    return request({
      url: '/admin/core/student/update',
      method: 'put',
      // 编辑学生信息
      data: student
    })
  }
}
