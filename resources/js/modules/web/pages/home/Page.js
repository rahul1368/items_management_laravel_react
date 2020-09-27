import React, { useLayoutEffect } from "react"
import PropTypes from "prop-types"

// import components
import Header from "./components/Header"
import Items from "../../../item/pages/list/index"


export default function Page({ dispatch }) {

  return <div>
    <Header/>
    <h3 style={{textAlign:"center",margin:"50px",color:"red"}}>You need to be logged in to interact with the application.After successfull login, <b>Items</b> link will become active in navbar.</h3>
  </div>
}

Page.displayName = 'HomePage'
Page.propTypes = {
  dispatch: PropTypes.func.isRequired,
}
