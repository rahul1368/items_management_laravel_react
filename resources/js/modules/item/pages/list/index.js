// import libs
import { connect } from 'react-redux'
import Item from '../../Item'

// import components
import Page from './Page'

const mapStateToProps = state => {
  const {data, ...meta} = state.items
  
  return {
    items: data.map((item) => new Item(item)),
    meta: Object.assign({}, meta)
  }
}

export default connect(mapStateToProps)(Page)
