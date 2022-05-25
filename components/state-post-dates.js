import create from 'zustand'

const useStore = create(set => ({

    call:false,
    setCall:v=>set( state=>({call:v}) ),

    id:'',
    setId:v=>set( state=>({id:v}) ),

    price:'',
    setPrice:v=>set(state=>({ price:v })),

    status:'',
    setStatus:v=>set( state=>({status:v}) )
  
}))

export {useStore}