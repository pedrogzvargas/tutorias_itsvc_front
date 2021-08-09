import Service from '../../Service'

const resource = 'academy/university/'

export default {
    get () {
        return Service.get(resource)
    },
}
