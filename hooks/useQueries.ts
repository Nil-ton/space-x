import { create } from "zustand";

type props = {
    queries: SearchOptions
    setQueries(item:SearchOptions):void
    clearQueries(value: string):void
}

export const useQueries = create<props>((set) => {
    return {
        queries: {name: '', type: ''},
        clearQueries: (item) => set((state) => {
            if(item === '' && state.queries.name !== '') {
                return {queries:{name: '', type: ''}}
            } return state
        } ),
        setQueries: (item) => set({queries: item})
    }
})