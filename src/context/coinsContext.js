import React, { useState } from "react";

const CoinsContext = React.createContext({
	coins: [],
	setCoins: _ => {},
});

const CoinsContextProvider = function (props) {
	const [coins, setCoins] = useState([]);

	const contextValue = {
		coins,
		setCoins,
	};

	return (
		<CoinsContext.Provider value={contextValue}>
			{props.children}
		</CoinsContext.Provider>
	);
};

export default CoinsContextProvider;
export { CoinsContext };
