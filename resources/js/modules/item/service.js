import Http from '../../utils/Http'
import Transformer from '../../utils/Transformer'
import * as itemActions from './store/actions'

function transformRequest(parms) {
  return Transformer.send(parms)
}

function transformResponse(params) {
  return Transformer.fetch(params)
}

export function itemAddRequest(params) {
  return dispatch => (
    new Promise((resolve, reject) => {
      Http.post('/items', params)
        .then(res => {
          dispatch(itemActions.add(transformResponse(res.data)))
          return resolve()
        })
        .catch((err) => {
          const statusCode = err.response.status;
          const data = {
            error: null,
            statusCode,
          };

          if (statusCode === 422) {
            const resetErrors = {
              errors: err.response.data,
              replace: false,
              searchStr: '',
              replaceStr: '',
            };
            data.error = Transformer.resetValidationFields(resetErrors);
          } else if (statusCode === 401) {
            data.error = err.response.data.message;
          }
          return reject(data);
        })
    })
  )
}

export function itemUpdateRequest(params) {
  return dispatch => (
    new Promise((resolve, reject) => {
      Http.patch(`items/${params.id}`, params)
        .then(res => {
          dispatch(itemActions.add(transformResponse(res.data)))
          return resolve()
        })
        .catch((err) => {
          const statusCode = err.response.status;
          const data = {
            error: null,
            statusCode,
          };

          if (statusCode === 422) {
            const resetErrors = {
              errors: err.response.data,
              replace: false,
              searchStr: '',
              replaceStr: '',
            };
            data.error = Transformer.resetValidationFields(resetErrors);
          } else if (statusCode === 401) {
            data.error = err.response.data.message;
          }
          return reject(data);
        })
    })
  )
}

export function itemRemoveRequest(id) {
  return dispatch => {
    Http.delete(`items/${id}`)
      .then(() => {
        dispatch(itemActions.remove(id))
      })
      .catch((err) => {
        // TODO: handle err
        console.error(err.response)
      })
  }
}

export function itemListRequest(params) {

  let { pageNumber = 1, url = '/items' } = params

  return dispatch => {
    if (pageNumber > 1) {
      url = url + `?page=${pageNumber}`
    }

    Http.get(url)
      .then((res) => {
        dispatch(itemActions.list(transformResponse(res.data)))
      })
      .catch((err) => {
        // TODO: handle err
        console.error(err.response)
      })
  }
}