import React, { useEffect, useState } from "react";

const LanguageContext = React.createContext({
	language: "",
});

const LanguageContextProvider = function (props) {
	const [language, setLanguage] = useState("en-US");

	useEffect(() => {
		setLanguage(navigator.language);
	}, []);

	return (
		<LanguageContext.Provider value={language}>
			{props.children}
		</LanguageContext.Provider>
	);
};

export default LanguageContextProvider;
export { LanguageContext };
