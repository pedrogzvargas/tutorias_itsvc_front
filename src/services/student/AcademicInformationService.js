import Service from '../Service'

import store from '../../store'

const resource = 'students'

export default {
    get (StudentId) {
        return Service.get(`${resource}/${StudentId}/academic-information/`, {
          headers: {
            Authorization: `token ${store.getters['user/userToken']}`,
          },
        })
    },
    post (StudentId, academicInformationId, payload) {
      return Service.post(`${resource}/${StudentId}/academic-information/`, payload, {
        headers: {
          Authorization: `token ${store.getters['user/userToken']}`,
        },
      })
    },
    put (StudentId, academicInformationId, payload) {
        return Service.put(`${resource}/${StudentId}/academic-information/${academicInformationId}/`, payload, {
          headers: {
            Authorization: `token ${store.getters['user/userToken']}`,
          },
        })
    },
}
