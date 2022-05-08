import create from 'zustand'

const useStore = create(set => ({
  viewBoxClick:false,
  setViewBoxClick:v=>set(state=>({viewBoxClick:v})),

  markerClick:false,
  setMarkerClick:v=>set(state=>({markerClick:v})),

  callData: false,
  setCallData:v=>set(state=>({ callData:v })),

  itemsData:[],
  setItemsData:v=>set( state=>({itemsData:v}) ),

}))

export {useStore}