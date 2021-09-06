import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
// 基础-路由设置
export const constantRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    meta: {
      icon: 'dashboard'
    },
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: { title: '主页', icon: 'dashboard', noCache: true }
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  }
]
export const asyncRoutes = [
  {
    path: '/student',
    component: Layout,
    redirect: 'noRedirect',
    meta: {
      title: '学生信息管理',
      icon: 'el-icon-postcard',
      roles: ['admin', 'teacher'] // you can set roles in root nav
    },
    alwaysShow: true,
    children: [
      {
        path: 'list',
        name: 'studentList',
        component: () => import('@/views/core/student/studentList'),
        meta: {
          title: '学生信息列表',
          icon: 'el-icon-sunrise',
          affix: true
        },
        hidden: false
      }
    ]
  },
  {
    path: '/score',
    component: Layout,
    redirect: 'noRedirect',
    meta: {
      title: '学生成绩信息管理',
      icon: 'el-icon-postcard',
      roles: ['admin', 'teacher'] // 角色
    },
    alwaysShow: true,
    children: [
      {
        path: 'list',
        name: 'scoreList',
        component: () => import('@/views/core/score/scoreList'),
        meta: {
          title: '学生成绩列表',
          icon: 'el-icon-sunrise'
        },
        hidden: false
      }
    ]
  },
  {
    path: '/dormitory',
    component: Layout,
    redirect: 'noRedirect',
    meta: {
      title: '宿舍管理',
      icon: 'el-icon-postcard',
      // if do not set roles, means: this page does not require permission
      roles: ['admin', 'student', 'teacher'] // 角色
    },
    alwaysShow: true,
    children: [
      {
        path: 'list',
        name: 'dormitoryList',
        component: () => import('@/views/core/dormitory/dormitoryList'),
        meta: {
          title: '宿舍信息列表',
          icon: 'el-icon-sunrise',
          affix: true
        },
        hidden: false
      }
    ]
  },
  {
    path: '/volunteer',
    component: Layout,
    redirect: 'noRedirect',
    meta: {
      title: '志愿者管理',
      icon: 'el-icon-postcard',
      roles: ['admin', 'student', 'teacher'] // 角色
    },
    alwaysShow: true,
    children: [
      {
        path: 'list',
        name: 'volunteerList',
        component: () => import('@/views/core/volunteer/volunteerList'),
        meta: {
          title: '志愿者信息列表',
          icon: 'el-icon-sunrise',
          affix: true
        },
        hidden: false
      }
    ]
  },
  {
    path: '/grade',
    component: Layout,
    redirect: 'noRedirect',
    meta: {
      title: '年级专业管理',
      icon: 'el-icon-postcard',
      roles: ['admin']
    },
    alwaysShow: true,
    children: [
      {
        path: 'list',
        name: 'gradeList',
        component: () => import('@/views/core/grade/grade'),
        meta: {
          title: '年级专业信息列表',
          icon: 'el-icon-sunrise',

          affix: true
        },
        hidden: false
      }
    ]
  },
  {
    path: '/party',
    component: Layout,
    redirect: 'noRedirect',
    meta: {
      title: '预备党员管理',
      roles: ['admin'],
      icon: 'el-icon-postcard'
    },
    alwaysShow: true,
    children: [
      {
        path: 'list',
        name: 'partyList',
        component: () => import('@/views/core/party/party'),
        meta: {
          title: '.预备党员信息列表',
          icon: 'el-icon-sunrise',

          affix: true
        },
        hidden: false
      }
    ]
  },
  {
    path: '/paper',
    component: Layout,
    redirect: 'noRedirect',
    meta: {
      title: '发表论文管理',
      roles: ['admin'],
      icon: 'el-icon-postcard'
    },
    alwaysShow: true,
    children: [
      {
        path: 'list',
        name: 'paperList',
        component: () => import('@/views/core/paper/paper'),
        meta: {
          title: '发表论文信息列表',
          icon: 'el-icon-sunrise',
          affix: true
        },
        hidden: false
      }
    ]
  },
  {
    path: '/teacher',
    component: Layout,
    redirect: 'noRedirect',
    meta: {
      title: '教师管理',
      icon: 'el-icon-postcard',
      roles: ['admin']
    },
    alwaysShow: true,
    children: [
      {
        path: 'list',
        name: 'teacherList',
        component: () => import('@/views/core/teacher/teacher'),
        meta: {
          title: '教师信息列表',
          icon: 'el-icon-sunrise',

          affix: true
        },
        hidden: false
      }
    ]
  },

  {
    path: '/attendance',
    component: Layout,
    redirect: 'noRedirect',
    meta: {
      title: '日常考勤',
      icon: 'el-icon-postcard',
      roles: ['admin', 'student']
    },
    alwaysShow: true,
    children: [
      {
        path: 'list',
        name: 'addendanceList',
        component: () => import('@/views/core/attendance/attendance'),
        meta: {
          title: '考勤信息列表',
          icon: 'el-icon-sunrise',
          // affix：用于指定当前路由记录是否默认固定显示在 tagsView 上
          affix: true
        },
        hidden: false
      }
    ]
  },
  {
    path: '/external-link',
    component: Layout,
    children: [
      {
        path: 'http://www.humc.edu.cn/',
        meta: { title: '外链', icon: 'link' }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]
// 教师动态路由权限表
export const TeacherRoutes = [
  {
    path: '/score',
    component: Layout,
    redirect: 'noRedirect',
    meta: {
      title: '学生成绩信息管理',
      icon: 'el-icon-postcard',
      roles: ['teacher'] // 角色
    },
    alwaysShow: true,
    children: [
      {
        path: 'list',
        name: 'scoreList',
        component: () => import('@/views/core/score/scoreList'),
        meta: {
          title: '学生成绩列表',
          icon: 'el-icon-sunrise',
          roles: ['teacher']
        },
        hidden: false
      }
    ]
  },
  {
    path: '/dormitory',
    component: Layout,
    redirect: 'noRedirect',
    meta: {
      title: '宿舍管理',
      icon: 'el-icon-postcard',
      // if do not set roles, means: this page does not require permission
      roles: ['teacher'] // 角色
    },
    alwaysShow: true,
    children: [
      {
        path: 'list',
        name: 'dormitoryList',
        component: () => import('@/views/core/dormitory/dormitoryList'),
        meta: {
          title: '宿舍信息列表',
          icon: 'el-icon-sunrise'
        },
        hidden: false
      }
    ]
  },
  {
    path: '/volunteer',
    component: Layout,
    redirect: 'noRedirect',
    meta: {
      title: '志愿者管理',
      icon: 'el-icon-postcard',
      roles: ['teacher'] // 角色
    },
    alwaysShow: true,
    children: [
      {
        path: 'list',
        name: 'volunteerList',
        component: () => import('@/views/core/volunteer/volunteerList'),
        meta: {
          title: '志愿者信息列表',
          icon: 'el-icon-sunrise'
        },
        hidden: false
      }
    ]
  },
  {
    path: '/party',
    component: Layout,
    redirect: 'noRedirect',
    meta: {
      title: '预备党员管理',
      roles: ['teacher'],
      icon: 'el-icon-postcard'
    },
    alwaysShow: true,
    children: [
      {
        path: 'list',
        name: 'partyList',
        component: () => import('@/views/core/party/party'),
        meta: {
          title: '.预备党员信息列表',
          icon: 'el-icon-sunrise'
        },
        hidden: false
      }
    ]
  },
  {
    path: '/paper',
    component: Layout,
    redirect: 'noRedirect',
    meta: {
      title: '发表论文管理',
      roles: ['teacher'],
      icon: 'el-icon-postcard'
    },
    alwaysShow: true,
    children: [
      {
        path: 'list',
        name: 'paperList',
        component: () => import('@/views/core/paper/paper'),
        meta: {
          title: '发表论文信息列表',
          icon: 'el-icon-sunrise'
        },
        hidden: false
      }
    ]
  },
  {
    path: '/external-link',
    component: Layout,
    children: [
      {
        path: 'http://www.humc.edu.cn/',
        meta: { title: '外链', icon: 'link' }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

// 学生动态路由权限表
export const StudentRoutes = [
  {
    path: '/attendance',
    component: Layout,
    redirect: 'noRedirect',
    meta: {
      title: '日常考勤',
      icon: 'el-icon-postcard',
      roles: ['student']
    },
    alwaysShow: true,
    children: [
      {
        path: 'list',
        name: 'addendanceList',
        component: () => import('@/views/core/attendance/attendance'),
        meta: {
          title: '考勤信息列表',
          icon: 'el-icon-sunrise',
          // affix：用于指定当前路由记录是否默认固定显示在 tagsView 上
          affix: true
        },
        hidden: false
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

//重置路由
const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
