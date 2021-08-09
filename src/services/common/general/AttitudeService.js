import Service from '../../Service'

const resource = 'common/attitude/'

export default {
    get () {
        return Service.get(resource)
    },
}
