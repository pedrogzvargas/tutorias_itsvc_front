import Service from '../../Service'

const resource = 'common/school-cycle/'

export default {
    get () {
        return Service.get(resource)
    },
}
