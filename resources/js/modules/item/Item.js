import moment from 'moment'
import Model from '../../utils/Model'
import User from '../user/User'

class Item extends Model {
  constructor(props) {
    super(props)

    this.initialize(props)
  }

  initialize(props) {
    super.initialize(props)

    this.slug = props.slug || ''
    this.title = props.title || ''
    this.listName = props.listName || ''
    this.isSelected = props.isSelected || false
    this.createdAt = props.createdAt ? moment(props.createdAt) : null

    // relate user model
    this.user = props.user ? new User(props.user) : null
  }
}

export default Item
