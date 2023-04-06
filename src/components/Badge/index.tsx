import classNames from "classnames";

type BadgeColors = "default" | "purple" | "green" | "indigo" | "teal" | "rose" | "pink" | "cyan" | "sky" | "emerald" | "yellow";

interface IBadgeProps {
  children: React.ReactNode;
  color?: BadgeColors;
}

export default function Badge({ children, color = "default" }: IBadgeProps) {
  const colorHandler: { [K in BadgeColors]: string } = {
    default: "bg-fuchsia-blue-600 text-fuchsia-blue-100 dark:text-gray-300",
    green: "bg-green-600 text-green-100 dark:text-gray-300",
    purple: "bg-purple-600 text-purple-100 dark:text-gray-300",
    cyan: "bg-cyan-600 text-cyan-100 dark:text-gray-300",
    emerald: "bg-emerald-600 text-emerald-100 dark:text-gray-300",
    indigo: "bg-indigo-600 text-indigo-100 dark:text-gray-300",
    pink: "bg-pink-600 text-pink-100 dark:text-gray-300",
    rose: "bg-rose-600 text-rose-100 dark:text-gray-300",
    sky: "bg-sky-600 text-sky-100 dark:text-gray-300",
    teal: "bg-teal-600 text-teal-100 dark:text-gray-300",
    yellow: "bg-yellow-600 text-yellow-100 dark:text-gray-300",
  };

  return <span className={classNames("text-xs font-medium mr-2 px-2.5 py-0.5 rounded", colorHandler[color])}>{children}</span>;
}
