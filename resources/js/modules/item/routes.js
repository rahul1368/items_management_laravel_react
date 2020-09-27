// import lib
import { lazy } from 'react'

export default [
  {
    path: '/items',
    exact: true,
    auth: true,
    component: lazy(() => import('./pages/list/index')),
  }
]
