import { useState, useCallback } from "react";

const useHttp = function () {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const sendHttpRequest = useCallback(async (request, errorMessage) => {
		setLoading(true);
		setError("");

		try {
			const res = await fetch(request.url, request.params);
			if (!res.ok) throw new Error(errorMessage);

			const data = await res.json();
			return data;
		} catch (err) {
			setError(errorMessage);
		} finally {
			setLoading(false);
		}
	}, []);

	return { loading, error, sendHttpRequest };
};

export default useHttp;
