/* ============
 * Actions for the item module
 * ============
 *
 * The actions that are available on the
 * item module.
 */

import {
    ITEM_ADD,
    ITEM_UPDATE,
    ITEM_REMOVE,
    ITEM_LIST,
  } from './action-types';
  
  export function add(payload) {
    return {
      type: ITEM_ADD,
      payload
    }
  }
  
  export function update(payload) {
    return {
      type: ITEM_UPDATE,
      payload
    }
  }
  
  export function remove(payload) {
    return {
      type: ITEM_REMOVE,
      payload
    }
  }
  
  export function list(payload) {
    return {
      type: ITEM_LIST,
      payload
    }
  }