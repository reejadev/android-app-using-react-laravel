import { useTheme } from "@/context/ThemeContext";
import {colors} from "@/constants/colors";

export const useThemeColors = () => {
  const { currentTheme } = useTheme();

  return colors[currentTheme]; // Fallback to dark theme if currentTheme is not defined
}