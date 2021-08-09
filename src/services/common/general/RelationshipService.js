import Service from '../../Service'

const resource = 'common/relationship/'

export default {
    get () {
        return Service.get(resource)
    },
}
