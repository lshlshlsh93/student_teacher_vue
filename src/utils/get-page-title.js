import defaultSettings from '@/settings'

// 设置标题
const title = defaultSettings.title || '学生教师信息管理系统'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
