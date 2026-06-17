/**
 * On-page content hubs for internal linking (SEO Nivå 3).
 * Maps section anchors on the home page.
 */
export const YACHT_SECTIONS = [
  { id: "fakta", label: "Snabb fakta", path: "/#fakta" },
  { id: "arvet", label: "Arvet", path: "/#arvet" },
  { id: "ombord", label: "Livet ombord", path: "/#ombord" },
  { id: "galleri", label: "Galleri", path: "/#galleri" },
  { id: "specifikation", label: "Specifikation", path: "/#specifikation" },
] as const;

export function sectionPath(hash: string, onHome: boolean): string {
  return onHome ? hash : `/${hash}`;
}
