/**
 * Service offerings shown in the WorkWithMe section.
 *
 * `iconName` must match a key in the icon registry inside
 * [components/WorkWithMe.tsx](../components/WorkWithMe.tsx). Adding a new
 * icon means editing both this file and that registry.
 */
export type ServiceIcon = "Brain" | "Cpu" | "Code" | "Rocket";

export type Service = {
  /** Stable id used as React key. */
  id: string;
  /** Translation key for the localized service title. */
  titleKey: string;
  /** Translation key for the localized service description. */
  descriptionKey: string;
  /** lucide-react icon identifier — see `ServiceIcon`. */
  iconName: ServiceIcon;
  /** Tailwind gradient suffix used for the icon backdrop. */
  color: string;
};

export const services: Service[] = [
  {
    id: "ai-development",
    titleKey: "aiDevelopment",
    descriptionKey: "aiDevelopmentDesc",
    iconName: "Brain",
    color: "from-space-cyan to-blue-500",
  },
  {
    id: "robotics-engineering",
    titleKey: "roboticsEngineering",
    descriptionKey: "roboticsEngineeringDesc",
    iconName: "Cpu",
    color: "from-purple-500 to-pink-500",
  },
  {
    id: "ml-solutions",
    titleKey: "mlSolutions",
    descriptionKey: "mlSolutionsDesc",
    iconName: "Code",
    color: "from-orange-500 to-red-500",
  },
  {
    id: "consulting-mentoring",
    titleKey: "consultingMentoring",
    descriptionKey: "consultingMentoringDesc",
    iconName: "Rocket",
    color: "from-green-500 to-teal-500",
  },
];
