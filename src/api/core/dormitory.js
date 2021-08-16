import request from '@/utils/request'

export default {
  fetchData(currentPage, pageSize) {
    const page = { currentPage: currentPage, pageSize: pageSize }
    return request({
      url: '/admin/core/dormitory/listPage',
      method: 'get',
      params: page
    })
  },
  getById(dormitoryNo) {
    return request({
      url: '/admin/core/dormitory/list/' + dormitoryNo,
      method: 'get'
    })
  },

  add(dormitory) {
    return request({
      url: '/admin/core/dormitory/save',
      method: 'post',
      data: dormitory
    })
  },

  update(dormitory) {
    return request({
      url: '/admin/core/dormitory/update',
      method: 'put',
      data: dormitory
    })
  },

  removeById(dormitoryNo) {
    return request({
      url: '/admin/core/dormitory/remove/' + dormitoryNo,
      method: 'delete'
    })
  }
}
