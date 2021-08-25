import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from './store'
import axios from 'axios'
import Cookie from 'universal-cookie'

const cookie = new Cookie()

export const fetchAsyncGetMyProf = createAsyncThunk(
  'myProfile/get',
  async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/myprofile/`,
      {
        headers: {
          Authorization: `JWT ${cookie.get('token')}`,
        },
      }
    )
    return res.data[0]
  }
)

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    myProfile: {
      id: '',
      nickName: '',
      userProfile: '',
      created_at: '',
      img: null,
    },
  },
  reducers: {
    resetMyProfile(state) {
      state.myProfile = {
        id: '',
        nickName: '',
        userProfile: '',
        created_at: '',
        img: null,
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncGetMyProf.fulfilled, (state, action) => {
      state.myProfile = action.payload
    })
  },
})

export const { resetMyProfile } = authSlice.actions
export const selectMyProfile = (state: RootState) => state.auth.myProfile
export default authSlice.reducer
