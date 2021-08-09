import Service from '../../Service'

const resource = 'common/gender/'

export default {
    get () {
        return Service.get(resource)
    },
}
