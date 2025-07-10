type Item = {
  depth: number;
  slug: string;
  text: string;
};

type TableOfContentProps = {
  items?: Item[];
};

const depthClasses: any = {
  2: "pl-0",
  3: "pl-4",
  4: "pl-8",
  5: "pl-12",
  6: "pl-16",
};

export default function TableOfContent({ items = [] }: TableOfContentProps) {
  return (
    <nav
      class="bg-gray-100 w-full h-full overflow-y-auto p-4"
      aria-label="Table of contents"
    >
      <ul class="space-y-1">
        {items.map((item: any) => {
          return (
            <li key={item.slug} class={depthClasses[item.depth] ?? "pl-0"}>
              <a
                href={`#${item.slug}`}
                class="block text-sm text-gray-800 hover:text-blue-600 transition-colors"
              >
                {item.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
