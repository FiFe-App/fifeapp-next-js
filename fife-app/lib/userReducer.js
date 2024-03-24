"use client"
import { createSlice } from '@reduxjs/toolkit'

export const userReducer = createSlice({
  name: 'user',
  initialState: {
    uid: null,
    name: null,
    userData: null,
    unreadMessage: [],
    settings: {
      randomTalk: false,
      fancyText: false,
      snowFall: true,
      messages: {}
    },
    help: {
      messenger: true
    },
    bugData: null,
    tempData: null
  },
  reducers: {
    init : async (state) => {
      if (!state.uid) {
        const uid = await localStorage.getItem('uid')
        console.log('async loaded uid',uid);
        if (uid) state.uid = uid
      }
    },
    login: (state,action) => {
      if (state.uid == null) 
        localStorage.setItem('loginAt',Date.now())
      state.uid = action.payload
      localStorage.setItem('uid',action.payload.toString())

      console.log('logged in as', action.payload.toString());
    },
    logout: (state,action) => {
      localStorage.setItem('uid',null)
      console.log('logged out',state);
      //router.replace('bejelentkezes')
      return userReducer.getInitialState();
    },
    setUserData: (state,action) => {
      state.userData = action.payload;
    },
    setSettings: (state,action) => {
      state.settings = action.payload
    },
    emptyUnreadMessages: (state) => {
      state.unreadMessage = [];
    },
    setUnreadMessage: (state,action) => {
      if (!state.unreadMessage.includes(action.payload))
        state.unreadMessage.push(action.payload.toString())
    },
    removeUnreadMessage: (state,action) => {
      let arr = state.unreadMessage
      if (arr?.length)
        state.unreadMessage = arr.filter(function(item) {
          return item !== action.payload
        })
    },
    setName: (state,action) => {
      state.name = action.payload
    },
    removeHelp: (state,action) => {
      state.help[action.payload] = false
    },
    setSettings: (state,action) => {
      state.settings = action.payload
    },
    setBugData: (state,action) => {
      state.bugData = action.payload
    },
    setTempData: (state,action) => {
      state.tempData = action.payload
    },
    seenMessage: (state,action) => {
      if (state.settings.messages){
      if (!state.settings.messages[action.payload])
        state.settings.messages[action.payload] = true;
      } else state.settings.messages = {[action.payload]:true}
    }
  }
})

export const { init, login, logout, setName, setUserData, emptyUnreadMessages, setUnreadMessage, removeUnreadMessage, setSettings, removeHelp, setBugData, setTempData, seenMessage} = userReducer.actions

export default userReducer.reducer