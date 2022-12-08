import { bindActionCreators } from "redux";
import { useAppDispatch } from "../../store";
import { useMemo } from "react";

export function useActions<T>(actions: T): T {
	const dispatch = useAppDispatch();

	return useMemo(() => bindActionCreators(actions as any, dispatch) as any, [dispatch]);
}
