import { Breadcrumb as FluentBreadcrumb } from "@fluentui/react-breadcrumb";
import type { BreadcrumbProps } from "@fluentui/react-breadcrumb";
import type { ForwardRefComponent } from "@fluentui/react-utilities";

/**
 * Breadcrumb is a to navigate through a hierarchy.
 *
 * @example
 * ```tsx
 * <Breadcrumb>
 *   <BreadcrumbItem>
 *     <BreadcrumbButton href='#'>Home</BreadcrumbButton>
 *   </BreadcrumbItem>
 *    <BreadcrumbDivider />
 *   <BreadcrumbItem>
 *     <BreadcrumbButton href='#/contact-us' current>Contact us</BreadcrumbButton>
 *   </BreadcrumbItem>
 * </Breadcrumb>
 * ```
 * @alpha
 */
export const Breadcrumb: ForwardRefComponent<BreadcrumbProps> =
	FluentBreadcrumb;

Breadcrumb.displayName = "Breadcrumb";
