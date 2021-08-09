import Service from '../Service'

const resource = 'users/login/'

export default {
    create (data) {
        return Service.post(resource, data)
    },
}
