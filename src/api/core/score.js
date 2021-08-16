import request from '@/utils/request'

export default {
  // 学生成绩分页列表
  scoreListPage(currentPage, pageSize) {
    const page = { currentPage: currentPage, pageSize: pageSize }
    return request({
      url: '/admin/core/score/listPage',
      methods: 'get',
      params: page
      //  data:''
    })
  },

  // 学生成绩列表
  scoreList() {
    return request({
      url: '/admin/core/score/list',
      methods: 'get'
      //  data:''
    })
  },

  getById(studentNo) {
    return request({
      url: '/admin/core/score/list/' + studentNo,
      method: 'get'
    })
  },

  save(score) {
    return request({
      url: '/admin/core/score/save',
      method: 'post',
      data: score
    })
  },

  update(score) {
    return request({
      url: '/admin/core/score/update',
      method: 'put',
      data: score
    })
  },

  removeById(studentNo) {
    return request({
      url: '/admin/core/score/remove/' + studentNo,
      method: 'delete'
    })
  }
}
