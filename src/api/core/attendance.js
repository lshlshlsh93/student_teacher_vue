import request from '@/utils/request'

export default {
  fetchData(currentPage, pageSize) {
    const page = { currentPage: currentPage, pageSize: pageSize }
    return request({
      url: '/admin/core/attendance/listPage',
      method: 'get',
      params: page
    })
  },

  getById(teacherNo) {
    return request({
      url: '/admin/core/attendance/list/' + teacherNo,
      method: 'get'
    })
  },
  removeById(teacherNo) {
    return request({
      url: '/admin/core/attendance/remove/' + teacherNo,
      method: 'delete'
    })
  },
  update(attendance) {
    return request({
      url: '/admin/core/attendance/update',
      method: 'put',
      data: attendance
    })
  },
  add(attendance) {
    return request({
      url: '/admin/core/attendance/add',
      method: 'post',
      data: attendance
    })
  }
}
