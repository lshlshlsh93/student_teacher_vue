import request from '@/utils/request'

export default {
  fetchData(currentPage, pageSize) {
    const page = { currentPage: currentPage, pageSize: pageSize }
    return request({
      url: '/admin/core/party/listPartyPage',
      method: 'get',
      params: page
    })
  },

  getById(studentNo) {
    return request({
      url: '/admin/core/party/listParty/' + studentNo,
      method: 'get'
    })
  },
  removeById(studentNo) {
    return request({
      url: '/admin/core/party/remove/' + studentNo,
      method: 'delete'
    })
  },
  add(party) {
    return request({
      url: '/admin/core/paper/save',
      method: 'post',
      data: party
    })
  },
  update(party) {
    return request({
      url: '/admin/core/paper/updateParty',
      method: 'put',
      data: party
    })
  }
}
