import React, { useState } from "react";

const SearchContext = React.createContext({
	coins: [],
	setCoins: coins => {},
});

const SearchContextProvider = function (props) {
	const [coins, setCoins] = useState([]);

	const ctxValue = {
		coins,
		setCoins,
	};

	return (
		<SearchContext.Provider value={ctxValue}>
			{props.children}
		</SearchContext.Provider>
	);
};

export default SearchContextProvider;
export { SearchContext };
