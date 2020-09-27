// import libs
import React, { Component } from 'react'
import PropTypes, { func } from 'prop-types'
import { itemListRequest, itemUpdateRequest, itemRemoveRequest,itemAddRequest } from '../../service'


class Page extends Component {
  static displayName = 'ItemsPage'
  static propTypes = {
    meta: PropTypes.object.isRequired,
    items: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
  }
  
  constructor(props) {
    super(props)
    this.state={
      items:[],
      currentItemTitle:null,
      selectedItem:null,
      preselectedItem:null,
    }
  }
  itemConstructor = function(title){
    this.title = title;
  }
  componentCleanup = () => {
    const { dispatch } = this.props
    if(this.state.items instanceof Array && this.state.items.length > 0){
      let itemsToBeUpdated = this.state.items.filter(item => {
        if(item.isSelected || item.listName == "right"){
          return item;
        }
      });
      for(const item of itemsToBeUpdated){
        dispatch(itemUpdateRequest(item));
      }
      if(this.state.preselectedItem){
        let item = this.state.items && this.state.items.find(item=>item.id == this.state.preselectedItem.id)
        if(item){
          dispatch(itemUpdateRequest(item))
        }

      }
    }
  }
  componentDidMount() {
    window.addEventListener('beforeunload', this.componentCleanup);
    const { dispatch } = this.props
    dispatch(itemListRequest({}))
  }
  componentWillUnmount() {
    this.componentCleanup();
    window.removeEventListener('beforeunload', this.componentCleanup); // remove the event handler for normal unmounting  
  }
  
  componentWillReceiveProps(nextProps){
    if(nextProps.items && this.props.items != nextProps.items){
      if(nextProps.items instanceof Array && nextProps.items.length > 0){
        let selectedItem = nextProps.items.find(item => item.isSelected == true)
        this.setState({items:this.sortItems(nextProps.items),selectedItem,preselectedItem:selectedItem})
      }
    }
  }
  
  sortItems=(items)=>{
    if(items){
      return items.sort((a,b)=>a.id-b.id);
    }
    return [];
  }
  onChangeHandler =({target})=>{
    let {value} = target;
    this.setState({currentItemTitle:value});
  }
  addItem=({target})=>{
    let newItem = new this.itemConstructor(this.state.currentItemTitle);
    newItem.isSelected = false;
    newItem.listName = "left";
    this.props.dispatch(itemAddRequest(newItem))
    this.setState(state => {
      return {items:this.sortItems([...state.items,newItem]),currentItemTitle:null}
    })
  }
  
  shiftItem = ({target})=>{
    let name = target.getAttribute("data-id");
    let selectedItem = Object.assign({},this.state.selectedItem);
    if(this.state.selectedItem){
      if(name == "leftToright"){
        selectedItem.listName = "right";
      }else{
        selectedItem.listName = "left";
      }
      let updatedItems = this.state.items.filter(item => {if(item.id != selectedItem.id) return item})
      this.setState({
        items:this.sortItems([...updatedItems,selectedItem]),selectedItem
      });
    }
  }
  selectItem = ({target})=>{
    let selectedId = target.getAttribute("data-id");
    let selectedItem = this.state.items.find(item => item.id == selectedId);
    selectedItem.isSelected = true;
    let updatedItems = this.state.items.filter(item => {if(item.id != selectedItem.id) {item.isSelected = false;return item}})

    this.setState({selectedItem,items:this.sortItems([...updatedItems,selectedItem])});
  }
  render() {
    return<div className="container"> <main className="col-sm-9 ml-sm-auto col-md-10 pt-3" role="main">
      <h1>Items Management Page</h1>
      
        <div className="row">
          <input style={{width:"250px"}} value={this.state.currentItemTitle || ""} placeholder="Enter Item Name and Click Add" type="text" name="title" onChange={this.onChangeHandler} />
          <button style={{marginLeft:"1px"}} type="button" onClick={this.addItem}>Add</button>
        </div>
        <div className="row">
          <div className='col-md-5' style={{border:"1px solid black",top:"10px"}}>
            <ul>
              {
                this.state.items && this.state.items.filter(item => item.listName == "left").map((item, index) => {
                  return <li className={item.isSelected?"active-item":""} style={{listStyle:"none",cursor:"pointer",margin:"2px",marginBottom:"4px",borderBottomColor:"2px solid black",padding:"4px"}} onClick={this.selectItem} data-id={item.id} key={index}>{item.title}</li>
                })
              }
            </ul>
          </div>
          <div className="col-md-2" style={{top:"10px"}}>
            <button className="btn btn-default" style={{backgroundColor:"#456778",marginBottom:"1px"}} type="button" data-id="leftToright" onClick={this.shiftItem}> <span data-id="leftToright">&#62;</span></button>
            <span className="clearfix"></span>
            <button className="btn btn-default" style={{backgroundColor:"#456778"}} type="button" data-id="rightToleft" onClick={this.shiftItem}> <span data-id="rightToleft">&#60;</span></button>
          </div>
          <div className='col-md-5' style={{border:"1px solid black",top:"10px"}}>
            <h2>Selected Items</h2>
            <ul>
              {
                this.state.items && this.state.items.filter(item => item.listName == "right").map((item, index) => {
                  return <li className={item.isSelected?"active-item":""} style={{listStyle:"none",cursor:"pointer",margin:"2px",padding:"4px",marginBottom:"4px"}} onClick={this.selectItem} data-id={item.id} key={index}>{item.title}</li>
                })
              }
            </ul>
          </div>
        </div>
      </main>
      </div>
  }
}

export default Page
