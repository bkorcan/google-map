import create from 'zustand'

const useStore = create(set => ({

  moveRight:false,
  setMoveRight:(v)=>set( state=>({ moveRight:v }) ),

  show:'none',
  setShow:(v)=> set( state=>({ show:v }) ),

  checkInText:'',
  setCheckInText:(v)=>set( state=>({ checkInText:v }) ),

  checkOutText:'',
  setCheckOutText:(v)=>set( state=>({ checkOutText:v }) ),

  disabled: {before:new Date()} ,
  setDisabled:(v)=>set( state=>({disabled:v}) ),

  focus:false,
  setFocus:v=>set(state=>({focus:v}) )
}))



export {useStore}