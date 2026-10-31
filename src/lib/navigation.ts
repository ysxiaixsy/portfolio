// How deep a route sits in the site: the home page < a project.
// Navigating to a deeper route slides forward; to a shallower one, back.
export function routeDepth(pathname: string) {
  return pathname.startsWith("/projects/") ? 1 : 0;
}

export function transitionTypesFor(from: string, to: string) {
  const delta = routeDepth(to) - routeDepth(from);
  if (delta > 0) return ["nav-forward"];
  if (delta < 0) return ["nav-back"];
  return undefined;
}
