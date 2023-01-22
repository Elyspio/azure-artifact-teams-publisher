export type ModalState = "editConfig";

export type WorkflowState = {
	modals: Record<ModalState, boolean>;
};
