import request from '@/utils/request'

export default {
  fetchData(currentPage, pageSize) {
    const page = { currentPage: currentPage, pageSize: pageSize }
    return request({
      url: '/admin/core/volunteer/volunteerListPage',
      method: 'get',
      params: page
    })
  },
  getById(studentNo) {
    return request({
      url: '/admin/core/volunteer/list/' + studentNo,
      method: 'get'
    })
  },
  removeById(studentNo) {
    return request({
      url: '/admin/core/volunteer/remove/' + studentNo,
      method: 'delete'
    })
  },
  update(volunteer) {
    return request({
      url: '/admin/core/volunteer/update',
      method: 'put',
      data: volunteer
    })
  },
  add(volunteer) {
    return request({
      url: '/admin/core/volunteer/save',
      method: 'post',
      data: volunteer
    })
  }
}
