import request from '@/utils/request'

export default {
  fetchData(currentPage, pageSize) {
    const page = { currentPage: currentPage, pageSize: pageSize }
    return request({
      url: '/admin/core/projectInformation/listPage',
      methos: 'get',
      params: page
    })
  },
  add(projectInformation) {
    return request({
      url: '/admin/core/projectInformation/save',
      method: 'post',
      data: projectInformation
    })
  },
  update(projectInformation) {
    return request({
      url: '/admin/core/projectInformation/update',
      method: 'put',
      data: projectInformation
    })
  },
  remove(studentNo, projectNo) {
    return request({
      method: 'delete',
      url:
        '/admin/core/projectInformation/remove/' + studentNo + '/' + projectNo
    })
  },
  getById(studentNo, projectNo) {
    return request({
      url: '/admin/core/projectInformation/list/' + studentNo + '/' + projectNo,
      method: 'get'
    })
  }
}
