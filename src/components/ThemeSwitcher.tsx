import { useTheme } from "#/theme/ThemeContext";

const themes = [
  { id: "viking" as const, label: "Viking" },
  { id: "synthwave" as const, label: "Synthwave" },
  { id: "hugo-boss" as const, label: "Hugo Boss" },
  { id: "royal" as const, label: "Royal" },
  { id: "caesar" as const, label: "Caesar" },
];

export function ThemeSwitcher() {
  const { theme: currentTheme, setTheme } = useTheme();

  return (
    <div className="flex items-center justify-center mt-3">
      <select
        value={currentTheme}
        onChange={(e) => setTheme(e.target.value as typeof themes[number]["id"])}
        className="px-3 py-1.5 text-xs rounded-md bg-stone-800/60 text-parchment border border-stone-700 hover:border-stone-600 focus:border-amber-600 focus:outline-none transition-colors cursor-pointer"
        aria-label="Select theme"
      >
        {themes.map((theme) => (
          <option key={theme.id} value={theme.id}>
            {theme.label}
          </option>
        ))}
      </select>
    </div>
  );
}
