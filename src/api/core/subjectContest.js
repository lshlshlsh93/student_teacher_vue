import request from '@/utils/request'

export default {
  fetchData(currentPage, pageSize) {
    const page = { currentPage: currentPage, pageSize: pageSize }
    return request({
      url: '/admin/core/SubjectContest/listPages',
      method: 'get',
      params: page
    })
  },
  // 通过学号和比赛名称获取学科竞赛信息
  getById(studentNo, contestName) {
    return request({
      url: '/admin/core/SubjectContest/list/' + studentNo + '/' + contestName,
      method: 'get'
    })
  },
  // 通过学号和比赛名称获取学科竞赛信息
  removeById(studentNo, contestName) {
    return request({
      url: '/admin/core/SubjectContest/remove/' + studentNo + '/' + contestName,
      method: 'delete'
    })
  },
  update(subjectContest) {
    return request({
      url: '/admin/core/SubjectContest/update',
      method: 'put',
      data: subjectContest
    })
  },
  add(subjectContest) {
    return request({
      url: '/admin/core/SubjectContest/save',
      method: 'post',
      data: subjectContest
    })
  }
}
