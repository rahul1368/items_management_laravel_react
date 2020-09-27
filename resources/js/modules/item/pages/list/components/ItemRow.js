import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const displayName = 'ItemRow'
const propTypes = {
  index: PropTypes.number.isRequired,
  item: PropTypes.object.isRequired,
  togglePublish: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
}

const ItemRow = ({ index, item, togglePublish, handleRemove }) => {
  return (<tr key={index}>
    <th scope="row">{index+1}</th>
    <td>{item.title}</td>
    <td>{item.description}</td>
    <td>{item.createdAt && item.createdAt.format('MMMM, DD YYYY')}</td>
    <td>{item.updatedAt && item.updatedAt.format('MMMM, DD YYYY')}</td>
    <td>{item.publishedAt && item.publishedAt.format('MMMM, DD YYYY')}</td>
    <td>
      <div className="btn-group" role="group" aria-label="Actions">
        {
          item.published
          ? <button className="btn btn-warning" onClick={() => togglePublish(item.id)}>Un Published</button>
          : <button className="btn btn-success" onClick={() => togglePublish(item.id)}>Publish</button>
        }
        <Link className="btn btn-primary" to={`items/${item.id}/edit`}>Edit</Link>
        <button className="btn btn-danger" onClick={() => handleRemove(item.id)}>Delete</button>
      </div>
    </td>
  </tr>)
}

ItemRow.displayName = displayName
ItemRow.propTypes = propTypes

export default ItemRow