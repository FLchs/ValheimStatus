import { useTheme } from "#/theme/ThemeContext";

const themes = [
  { id: "medieval" as const, label: "Medieval", icon: "⚔️" },
  { id: "synthwave" as const, label: "Synthwave", icon: "🌆" },
  { id: "hugo-boss" as const, label: "Boss", icon: "👔" },
  { id: "royal" as const, label: "Royal", icon: "👑" },
  { id: "caesar" as const, label: "Caesar", icon: "🏛️" },
];

export function ThemeSwitcher() {
  const { theme: currentTheme, setTheme } = useTheme();

  return (
    <div className="flex items-center justify-center gap-1 mt-3 flex-wrap">
      {themes.map((theme) => (
        <button
          key={theme.id}
          type="button"
          onClick={() => setTheme(theme.id)}
          className={`px-2 py-1 text-xs rounded-md transition-all duration-200 ${
            currentTheme === theme.id
              ? "bg-amber-600/80 text-white font-medium"
              : "bg-stone-800/60 text-parchment/50 hover:text-parchment/70 hover:bg-stone-700/60"
          }`}
          aria-label={`Switch to ${theme.label} theme`}
          title={theme.label}
        >
          <span className="mr-1">{theme.icon}</span>
          {theme.label}
        </button>
      ))}
    </div>
  );
}
