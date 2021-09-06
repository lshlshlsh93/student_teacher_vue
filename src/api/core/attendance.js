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

  getById(studentNo) {
    return request({
      url: '/admin/core/attendance/list/' + studentNo,
      method: 'get'
    })
  },
  removeById(studentNo) {
    return request({
      url: '/admin/core/attendance/remove/' + studentNo,
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
