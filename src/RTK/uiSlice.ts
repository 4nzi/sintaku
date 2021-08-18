import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './store'

export const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    openSignIn: false,
    openSignUp: false,
    openCrop: false,
    openBurger: false,
    isAuthenticated: false,
    searchQuery: '',
  },
  reducers: {
    setOpenSignIn(state) {
      state.openSignIn = true
    },
    resetOpenSignIn(state) {
      state.openSignIn = false
    },
    setOpenSignUp(state) {
      state.openSignUp = true
    },
    resetOpenSignUp(state) {
      state.openSignUp = false
    },
    setOpenCrop(state) {
      state.openCrop = true
    },
    resetOpenCrop(state) {
      state.openCrop = false
    },
    setOpenBurger(state) {
      state.openBurger = true
    },
    resetOpenBurger(state) {
      state.openBurger = false
    },
    setIsAuthenticated(state) {
      state.isAuthenticated = true
    },
    resetIsAuthenticated(state) {
      state.isAuthenticated = false
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload
    },
  },
})

export const {
  setOpenSignIn,
  resetOpenSignIn,
  setOpenSignUp,
  resetOpenSignUp,
  setOpenCrop,
  resetOpenCrop,
  setOpenBurger,
  resetOpenBurger,
  setIsAuthenticated,
  resetIsAuthenticated,
  setSearchQuery,
} = uiSlice.actions

export const selectOpenSignIn = (state: RootState) => state.ui.openSignIn
export const selectOpenSignUp = (state: RootState) => state.ui.openSignUp
export const selectOpenCropt = (state: RootState) => state.ui.openCrop
export const selectOpenBurger = (state: RootState) => state.ui.openBurger
export const selectIsAuthenticated = (state: RootState) =>
  state.ui.isAuthenticated
export const selectSearchQuery = (state: RootState) => state.ui.searchQuery

export default uiSlice.reducer
