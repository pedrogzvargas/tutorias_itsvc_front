import Service from '../../Service'

const resource = 'common/housing-type/'

export default {
  get () {
    return Service.get(resource)
  },
}
