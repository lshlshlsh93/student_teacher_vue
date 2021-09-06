import request from '@/utils/request'

export default {
  fetchData(currentPage, pageSize) {
    const page = { currentPage: currentPage, pageSize: pageSize }
    return request({
      url: '/admin/core/paper/listPage',
      method: 'get',
      params: page
    })
  },

  getById(studentNo) {
    return request({
      url: '/admin/core/paper/list/' + studentNo,
      method: 'get'
    })
  },
  removeById(studentNo) {
    return request({
      url: '/admin/core/paper/remove/' + studentNo,
      method: 'delete'
    })
  },
  update(paper) {
    return request({
      url: '/admin/core/paper/update',
      method: 'put',
      data: paper
    })
  },
  add(paper) {
    return request({
      url: '/admin/core/paper/add',
      method: 'post',
      data: paper
    })
  }
}
