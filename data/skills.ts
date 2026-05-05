/**
 * Skill categories shown in the About > Technical Arsenal grid.
 *
 * `categoryKey` resolves through `useLanguage().t(...)` against the
 * translations in `contexts/LanguageContext.tsx` (must exist in both en + ar).
 *
 * `items` are tech proper-nouns (Python, React, ROS, ...) and are NOT
 * translated — they render as-is regardless of language.
 *
 * `iconName` must match a key in the icon registry inside
 * [components/About.tsx](../components/About.tsx). Adding a new icon means
 * editing both this file and that registry.
 */
export type SkillIcon = "Cpu" | "Wrench" | "Eye" | "Zap" | "Code" | "Database";

export type SkillCategory = {
  /** Translation key for the localized category label. */
  categoryKey: string;
  /** lucide-react icon identifier — see `SkillIcon`. */
  iconName: SkillIcon;
  /** Tech proper-nouns shown as chips. NOT translated. */
  items: string[];
};

export const skillCategories: SkillCategory[] = [
  {
    categoryKey: "skillCatAi",
    iconName: "Cpu",
    items: ["Python", "AutoGluon", "TensorFlow", "CNN/RNN", "ViT", "YOLOv8", "Statistics", "Time Series"],
  },
  {
    categoryKey: "skillCatRobotics",
    iconName: "Wrench",
    items: ["ROS", "Jetson Nano", "Arduino", "Motor Control", "Sensors", "CV Pipelines"],
  },
  {
    categoryKey: "skillCatVision",
    iconName: "Eye",
    items: ["OpenCV", "YOLO", "Object Detection", "Lane Detection", "Emotion Recognition"],
  },
  {
    categoryKey: "skillCatMlops",
    iconName: "Zap",
    items: ["LangChain", "Whisper", "GPT Integration", "Streamlit", "n8n", "SQL"],
  },
  {
    categoryKey: "skillCatDev",
    iconName: "Code",
    items: ["React", "Next.js", "TypeScript", "TailwindCSS", "Git", "Linux"],
  },
  {
    categoryKey: "skillCatData",
    iconName: "Database",
    items: ["Pandas", "NumPy", "Power BI", "Jupyter", "Data Analysis", "Optimization"],
  },
];
