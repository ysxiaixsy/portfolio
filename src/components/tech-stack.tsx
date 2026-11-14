import { StackInventory } from "@/components/stack-inventory";
import { StackLogo } from "@/components/stack-logo";
import { projects } from "@/data/projects";
import { stacks } from "@/data/tech-stack";

// Every tool I use, grouped by kind, as one inventory: at rest it's all ink,
// and at most one slot, the picked one, lights up. Each item carries the
// projects that list it in their stack, shown when it's picked.
//
// The logos are drawn here, on the server, and handed to the inventory as
// elements, so the logo data (simple-icons, the pixel grids) stays out of
// the browser bundle.
export function TechStack() {
  return (
    <StackInventory
      groups={stacks.map((group) => ({
        title: group.title,
        items: group.items.map((item) => ({
          title: item.title,
          logo: <StackLogo item={item} />,
          usedIn: projects
            .filter((project) => project.tech.includes(item.title))
            .map(({ slug, title }) => ({ slug, title })),
        })),
      }))}
    />
  );
}
