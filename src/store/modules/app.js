// Pathify
import { make } from 'vuex-pathify'

// Data
const state = {
  drawer: null,
  drawerImage: true,
  mini: false,
  items: [
    {
      title: 'Dash',
      icon: 'mdi-view-dashboard',
      to: '/components/dash/',
    },
    {
      title: 'Dashboard',
      icon: 'mdi-view-dashboard',
      to: '/',
    },
    {
      title: 'Perfil',
      icon: 'mdi-account',
      to: '/student/profile/',
    },
    {
      title: 'Información académica',
      icon: 'mdi-school',
      to: '/student/academic-information/',
    },
    {
      title: 'Información general',
      icon: 'mdi-book-account',
      to: '/student/general-information/',
    },
    {
      title: 'Información domiciliaria',
      icon: 'mdi-home-circle',
      to: '/student/address/',
    },
    {
      title: 'Información familiar',
      icon: 'mdi-home-heart',
      to: '/student/family/',
    },
    {
      title: 'Login',
      icon: 'mdi-home-heart',
      to: '/components/login/',
    },
    {
      title: 'Tutores',
      icon: 'mdi-account-multiple',
      to: '/tutors/',
    },
    {
      title: 'Materias impartidas',
      icon: 'mdi-school',
      to: '/tutor/subjects/',
    },
    {
      title: 'Grupos asesorados',
      icon: 'mdi-account-group',
      to: '/tutor/groups/',
    },
    // {
    //   title: 'Regular Tables',
    //   icon: 'mdi-clipboard-outline',
    //   to: '/tables/regular/',
    // },
    // {
    //   title: 'Typography',
    //   icon: 'mdi-format-font',
    //   to: '/components/typography/',
    // },
    // {
    //   title: 'Icons',
    //   icon: 'mdi-chart-bubble',
    //   to: '/components/icons/',
    // },
    // {
    //   title: 'Google Maps',
    //   icon: 'mdi-map-marker',
    //   to: '/maps/google/',
    // },
    // {
    //   title: 'Notifications',
    //   icon: 'mdi-bell',
    //   to: '/components/notifications/',
    // },
  ],
}

const mutations = make.mutations(state)

const actions = {
  ...make.actions(state),
  init: async ({ dispatch }) => {
    //
  },
}

const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
