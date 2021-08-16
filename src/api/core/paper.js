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

  getById(teacherNo) {
    return request({
      url: '/admin/core/paper/list/' + teacherNo,
      method: 'get'
    })
  },
  removeById(teacherNo) {
    return request({
      url: '/admin/core/paper/remove/' + teacherNo,
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
