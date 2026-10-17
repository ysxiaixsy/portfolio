// How deep a route sits in the site: main pages < project list < a project.
// Navigating to a deeper route slides forward; to a shallower one, back.
export function routeDepth(pathname: string) {
  if (pathname.startsWith("/projects/")) return 2;
  if (pathname === "/projects") return 1;
  return 0;
}

export function transitionTypesFor(from: string, to: string) {
  const delta = routeDepth(to) - routeDepth(from);
  if (delta > 0) return ["nav-forward"];
  if (delta < 0) return ["nav-back"];
  return undefined;
}
