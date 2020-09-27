import { combineReducers } from 'redux'

import auth from '../modules/auth/store/reduer'
import user from '../modules/user/store/reducer'
import items from '../modules/item/store/reducer'

export default combineReducers({ auth, user, items })
