import { useState, useCallback } from "react";

const useHttp = function () {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const sendHttpRequest = useCallback(async (url, params, errorMsg) => {
		setLoading(true);
		setError("");

		try {
			const res = await fetch(url, params);
			if (!res.ok) throw new Error(errorMsg);

			const data = await res.json();
			return data;
		} catch (err) {
			setError(errorMsg);
		} finally {
			setLoading(false);
		}
	}, []);

	return [loading, error, sendHttpRequest];
};

export default useHttp;
