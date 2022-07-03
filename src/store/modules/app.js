// Pathify
import { make } from 'vuex-pathify'

const usersMenu = {
  student: [
    {
      title: 'Perfil',
      icon: 'mdi-account',
      to: '/profile/',
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
      title: 'Entrevista persona',
      icon: 'mdi-account-question',
      to: '/student/interview/',
    },
    {
      title: 'Entrevista aprendizaje',
      icon: 'mdi-chair-school',
      to: '/student/study-interview/',
    },
  ],
  tutor: [
    {
      title: 'Perfil',
      icon: 'mdi-account',
      to: '/profile/',
    },
    {
      title: 'Mis materias impartidas',
      icon: 'mdi-school',
      to: '/tutor/subjects/',
    },
    {
      title: 'Mis grupos asesorados',
      icon: 'mdi-account-group',
      to: '/tutor/groups/',
    },
  ],
  admin: [
    {
      title: 'Perfil',
      icon: 'mdi-account',
      to: '/profile/',
    },
    {
      title: 'Alumnos',
      icon: 'mdi-account-multiple',
      to: '/students/',
    },
    {
      title: 'Tutores',
      icon: 'mdi-account-tie',
      to: '/tutors/',
    },
    {
      title: 'Materias impartidas',
      icon: 'mdi-school',
      to: '/subjects/',
    },
    {
      title: 'Grupos asesorados',
      icon: 'mdi-account-group',
      to: '/groups/',
    },
  ],
}

function getMapValue (obj, key) {
  console.info(key)
  // eslint-disable-next-line no-prototype-builtins
  if (obj.hasOwnProperty(key)) {
    return obj[key]
  }
  throw new Error('Invalid map key.')
}

// Data
const state = {
  drawerSide: false,
  drawer: null,
  drawerImage: true,
  mini: false,
}

const mutations = make.mutations(state)

const actions = {
  ...make.actions(state),
  init: async ({ dispatch }) => {
    //
  },
}

const getters = {
  sideMenuItems: (state) => (userType) => {
    return getMapValue(usersMenu, userType)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
