export {
	CAP_STYLE_HOOKS,
	CAPThemeProvider,
} from "./components/CAPThemeProvider";

// TODO(david): these exist because some modules are mistakenly trying to import them
// from our package. This fixes the build problem, but the correct fix is really to
// update those import statements to point to fluentui.
export { getIntrinsicElementProps, slot } from "@fluentui/react-utilities";
export {
	motionTokens,
	makeStyles,
	mergeClasses,
} from "@fluentui/react-components";

// Component exports
export * from "./components/react-accordion";
export * from "./components/react-avatar";
export * from "./components/react-badge";
export * from "./components/react-breadcrumb";
export * from "./components/react-button";
export * from "./components/react-card";
export * from "./components/react-carousel";
export * from "./components/react-checkbox";
export * from "./components/react-combobox";
export * from "./components/react-dialog";
// Divider has no CAP customizations - use directly from @fluentui/react-components. Leaving this comment temporarily for visibility.
// export * from "./components/react-divider";
export * from "./components/react-drawer";
export * from "./components/react-header";
export * from "./components/react-image";
export * from "./components/react-infolabel";
export * from "./components/react-input";
export * from "./components/react-label";
export * from "./components/react-link";
export * from "./components/react-menu";
export * from "./components/react-overflow";
export * from "./components/react-popover";
export * from "./components/react-radio";
export * from "./components/react-search";
export * from "./components/react-switch";
export * from "./components/react-table";
export * from "./components/react-tabs";
export * from "./components/react-tag";
export * from "./components/react-textarea";
export * from "./components/react-toolbar";
export * from "./components/react-tooltip";

// Tokens and design system utilities
export * from "./components/tokens";
