import create from 'zustand'

const useStore = create(set => ({
  viewBoxClick:false,
  setViewBoxClick:v=>set(state=>({viewBoxClick:v})),

  markerClick:false,
  setMarkerClick:v=>set(state=>({markerClick:v}))
}))

export {useStore}