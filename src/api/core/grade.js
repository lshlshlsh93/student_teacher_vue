import request from '@/utils/request'

export default {
  fetchData(currentPage, pageSize) {
    const page = { currentPage: currentPage, pageSize: pageSize }
    return request({
      url: '/admin/core/grade/listPage',
      method: 'get',
      params: page
    })
  },

  getById(classNo) {
    return request({
      url: '/admin/core/grade/list/' + classNo,
      method: 'get'
    })
  },
  removeById(classNo) {
    return request({
      url: '/admin/core/grade/remove/' + classNo,
      method: 'delete'
    })
  },
  update(grade) {
    return request({
      url: '/admin/core/grade/update',
      method: 'put',
      data: grade
    })
  },
  add(grade) {
    return request({
      url: '/admin/core/grade/save',
      method: 'post',
      data: grade
    })
  }
}
