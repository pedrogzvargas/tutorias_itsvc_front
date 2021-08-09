import Service from '../Service'

const resource = 'users'

export default {
    get (id) {
        return Service.get(`${resource}/${id}/`)
    },
    create (data) {
        return Service.post(resource, data)
    },
    put (id, data) {
        return Service.put(`${resource}/${id}/`, data)
    },
    delete (id) {
        return Service.delete(resource, id)
    },
}
