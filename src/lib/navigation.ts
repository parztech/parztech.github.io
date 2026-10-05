/** Whether a nav link should be highlighted for the current path */
export function isActivePath(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}
