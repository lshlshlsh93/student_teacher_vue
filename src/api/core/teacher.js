import request from '@/utils/request'

export default {
  fetchData(currentPage, pageSize) {
    const page = { currentPage: currentPage, pageSize: pageSize }
    return request({
      url: '/admin/core/teacher/teacherListPage',
      method: 'get',
      params: page
    })
  },
  getById(teacherNo) {
    return request({
      url: '/admin/core/teacher/list/' + teacherNo,
      method: 'get'
    })
  },
  removeById(teacherNo) {
    return request({
      url: '/admin/core/teacher/remove/' + teacherNo,
      method: 'delete'
    })
  },
  update(teacher) {
    return request({
      url: '/admin/core/teacher/update',
      method: 'put',
      data: teacher
    })
  },
  add(teacher) {
    return request({
      url: '/admin/core/teacher/save',
      method: 'post',
      data: teacher
    })
  }
}
