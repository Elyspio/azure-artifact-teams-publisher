import { useEffect, useState } from "react";

export function useStoreState<T>(storeVal: T) {
	const [state, setState] = useState(storeVal);

	useEffect(() => setState(storeVal), [storeVal]);

	return [state, setState] as const;
}
