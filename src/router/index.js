import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/register',
    component: () => import('@/views/register/index'),
    hidden: true,
    meta: { title: '注册' }
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: { title: '主页', icon: 'dashboard' }
      }
    ]
  },
  {
    path: '/core/student',
    component: Layout,
    redirect: '/',
    meta: {
      title: '学生信息管理',
      icon: 'el-icon-postcard'
      // roles: ['admin', 'editor', 'teacher'] // 角色
    },
    alwaysShow: true,
    children: [
      {
        path: 'list',
        name: 'studentList',
        component: () => import('@/views/core/student/studentList'),
        meta: {
          title: '学生信息列表',
          icon: 'el-icon-sunrise'
        },
        hidden: false
      },
      {
        path: 'create',
        name: 'addstudentList',
        component: () => import('@/views/core/student/form'),
        meta: {
          title: '添加学生信息列表',
          icon: 'el-icon-sunrise'
        },
        hidden: true
      }
    ]
  },
  {
    path: '/core/score',
    component: Layout,
    redirect: '/',
    meta: {
      title: '学生成绩信息管理',
      icon: 'el-icon-postcard'
      // roles: ['admin', 'editor', 'teacher'] // 角色
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
    path: '/core/dormitory',
    component: Layout,
    redirect: '/',
    meta: {
      title: '宿舍管理',
      icon: 'el-icon-postcard'
      // roles: ['admin', 'editor', 'teacher'] // 角色
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
    path: '/core/volunteer',
    component: Layout,
    redirect: '/',
    meta: {
      title: '志愿者管理',
      icon: 'el-icon-postcard'
      // roles: ['admin', 'editor', 'teacher'] // 角色
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
    path: '/core/grade',
    component: Layout,
    redirect: '/core/grade',
    meta: {
      title: '年级专业管理',
      icon: 'el-icon-postcard'
    },
    alwaysShow: true,
    children: [
      {
        path: 'list',
        name: 'gradeList',
        component: () => import('@/views/core/grade/grade'),
        meta: {
          title: '年级专业信息列表',
          icon: 'el-icon-sunrise'
        },
        hidden: false
      }
    ]
  },
  {
    path: '/core/party',
    component: Layout,
    redirect: '/core/party',
    meta: {
      title: '预备党员管理',
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
    path: '/core/paper',
    component: Layout,
    redirect: '/core/paper',
    meta: {
      title: '发表论文管理',
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
    path: '/core/teacher',
    component: Layout,
    redirect: '/core/teacher',
    meta: {
      title: '教师管理',
      icon: 'el-icon-postcard'
    },
    alwaysShow: true,
    children: [
      {
        path: 'list',
        name: 'teacherList',
        component: () => import('@/views/core/teacher/teacher'),
        meta: {
          title: '教师信息列表',
          icon: 'el-icon-sunrise'
        },
        hidden: false
      }
    ]
  },

  {
    path: '/core/attendance',
    component: Layout,
    redirect: '/core/attendance',
    meta: {
      title: '日常考勤',
      icon: 'el-icon-postcard'
    },
    alwaysShow: true,
    children: [
      {
        path: 'list',
        name: 'addendanceList',
        component: () => import('@/views/core/attendance/attendance'),
        meta: {
          title: '考勤信息列表',
          icon: 'el-icon-sunrise'
        },
        hidden: false
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'http://www.humc.edu.cn/',
        meta: { title: '学校官网', icon: 'link' }
      }
    ]
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
