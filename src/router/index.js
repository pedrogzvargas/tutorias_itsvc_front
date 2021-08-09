// Imports
import Vue from 'vue'
import Router from 'vue-router'
import { trailingSlash } from '@/util/helpers'
import store from '../store'
import {
  layout,
  route,
} from '@/util/routes'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: (to, from, savedPosition) => {
    if (to.hash) return { selector: to.hash }
    if (savedPosition) return savedPosition

    return { x: 0, y: 0 }
  },
  routes: [
    layout('Default', [
      route('Dashboard'),
      route('Dash', null, 'components/dash'),

      // Pages
      route('UserProfile', null, 'student/profile', { requiresAuth: true }),
      route('AcademicInformation', null, 'student/academic-information', { requiresAuth: true }),
      route('GeneralInformation', null, 'student/general-information', { requiresAuth: true }),
      route('Address', null, 'student/address', { requiresAuth: true }),
      route('FamilyInformation', null, 'student/family', { requiresAuth: true }),
      route('Login', null, 'components/login'),
      route('Tutors', null, 'tutors'),
      route('TutorGroups', null, 'tutor/groups'),
      route('TutorSubjects', null, 'tutor/subjects'),
      route('TaughtSubject', null, 'tutor/subject/detail/:id'),
      route('AdvisedGroup', null, 'tutor/group/detail/:id'),

      // Components
      route('Notifications', null, 'components/notifications'),
      route('Icons', null, 'components/icons'),
      route('Typography', null, 'components/typography'),

      // Tables
      route('Regular Tables', null, 'tables/regular'),

      // Maps
      route('Google Maps', null, 'maps/google'),
    ]),
  ],
})

router.beforeEach(async (to, from, next) => {
  // return to.path.endsWith('/') ? next() : next(trailingSlash(to.path))
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const user = await store.getters['user/userData']
  if (requiresAuth && !user.token) {
    next('/')
  } else if (to.name === 'Login' && user.token) {
    next('/')
  } else {
    next()
  }
})

export default router
