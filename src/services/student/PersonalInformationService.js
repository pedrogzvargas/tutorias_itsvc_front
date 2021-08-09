import Service from '../Service'

const resource = 'students'

export default {
    get (id) {
        return Service.get(
          `${resource}/${id}/personal-information/`,
          { headers: { Authorization: 'Token 2cbeee19e90e03d2296ba1607ad2884b6745cd88' } })
    },
    put (id, data) {
      return Service.put(
        `${resource}/${id}/personal-information/`,
        data,
        { headers: { Authorization: 'Token 2cbeee19e90e03d2296ba1607ad2884b6745cd88' } })
    },
    post (id, data) {
      return Service.post(
        `${resource}/${id}/personal-information/`,
        data,
        { headers: { Authorization: 'Token 2cbeee19e90e03d2296ba1607ad2884b6745cd88' } })
    },
}
