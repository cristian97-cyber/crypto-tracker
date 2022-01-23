import { useState, useCallback } from "react";

const useHttp = function () {
	const [loading, setLoading] = useState(false);

	const sendHttpRequest = useCallback(async (url, params) => {
		setLoading(true);

		try {
			const res = await fetch(url, params);
			const data = await res.json();

			return data;
		} catch (err) {
			console.log(err);
		} finally {
			setLoading(false);
		}
	}, []);

	return [loading, sendHttpRequest];
};

export default useHttp;
