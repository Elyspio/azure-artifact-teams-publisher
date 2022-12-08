import React, { useCallback } from "react";

/**
 *
 * @param defaultState initial state of modal (open or not)
 */
export function useModal(defaultState: boolean = false) {
	const [state, setOpen] = React.useState<boolean>(defaultState);

	const open = useCallback((e?: any) => {
		e?.stopPropagation();
		setOpen(true);
	}, []);
	const close = useCallback((e?: any) => {
		e?.stopPropagation();
		setOpen(false);
	}, []);

	return {
		open: state,
		setOpen: open,
		setClose: close,
	};
}
