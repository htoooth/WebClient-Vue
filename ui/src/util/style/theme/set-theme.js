import EventBus from "../../vue-types/event-bus";
import themeFactory from "./theme.json";
import { dealWithTheme, ThemeStyleParams } from "../color/serialColors";

export const setTheme = (themeStyle = {}) => {
  let acceptedThemeStyle = themeStyle;
  if (typeof themeStyle === "string") {
    acceptedThemeStyle =
      themeFactory.find(item => item.label === themeStyle) || themeFactory[1];
  }
  const nextThemeData = dealWithTheme(acceptedThemeStyle);
  const nextTheme = {
    ...nextThemeData.themeStyle
  };
  if (
    themeStyle &&
    (typeof themeStyle === "string" || "componentBackground" in themeStyle)
  ) {
    nextTheme.background = nextTheme.componentBackground;
  }
  EventBus.$options.theme = nextTheme;
  EventBus.$emit("change-theme", nextTheme);
};
