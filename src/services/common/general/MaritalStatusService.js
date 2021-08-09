import Service from '../../Service'

const resource = 'common/marital-status/'

export default {
    get () {
        return Service.get(resource)
    },
}
