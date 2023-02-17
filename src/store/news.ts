import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './'
import { getHeadlines } from '../api/news'
import { useQuery } from 'react-query'
import { Headline } from '../types'
import { addIdToHeadlines } from '../utils/helpers'




// Define a type for the slice state
interface NewsState {
  headlines: Headline[],
  searchResult: Headline[],
}

// Define the initial state using that type
const initialState: NewsState = {
  headlines: [],
  searchResult: [],
}

export const newsSlicer = createSlice({
  name: 'news',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {

    appendHeadlines: (state, action: PayloadAction<Headline[]>) => {
      if(action.payload && action.payload.length > 0) 
        state.headlines.push(...addIdToHeadlines(action.payload))
      else 
      state.headlines = addIdToHeadlines(action.payload)

    },
    appendSearchResult: (state, action: PayloadAction<Headline[]>) => {
      if(action.payload && action.payload.length > 0)
        state.searchResult.push(...addIdToHeadlines(action.payload))
      else 
        state.searchResult = addIdToHeadlines(action.payload)
    },

    clearSearchResult: (state) => {
      state.searchResult = []
      state.headlines = []
    }

  },
})

export const {  appendSearchResult, appendHeadlines, clearSearchResult } = newsSlicer.actions

// Other code such as selectors can use the imported `RootState` type
export const selectArticle = (state: RootState) => (id: number) =>  state.news.headlines.find((article) => article.id === id)


export default newsSlicer.reducer