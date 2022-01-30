import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
	name: "search",
	initialState: {
		coins: [],
		query: "",
		results: [],
		loading: false,
	},
	reducers: {
		setCoins(state, action) {
			state.coins = action.payload;
		},
		setQuery(state, action) {
			state.query = action.payload;
		},
		setResults(state, action) {
			state.results = action.payload;
		},
		setLoading(state, action) {
			state.loading = action.payload;
		},
	},
});

export default searchSlice.reducer;
export const { setCoins, setQuery, setResults, setLoading } =
	searchSlice.actions;
