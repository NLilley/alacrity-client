import { VisualizationQuality } from "../app/enums/client/visualizationQuality";
import { tabletBreakPoint } from "../shared/constants";
import { roundTo } from "./humanizeUtil";

interface QualitySettings {
  usePerspective: boolean,
  useBlur: boolean,
  useRightTransform: boolean,
  useBackgroundImage: boolean
}

const highQualitySettings: QualitySettings = {
  usePerspective: true,
  useBlur: true,
  useRightTransform: true,
  useBackgroundImage: true
};

const lowQualitySettings: QualitySettings = {
  usePerspective: false,
  useBlur: true,
  useRightTransform: false,
  useBackgroundImage: true
};

const disabledQualitySettings: QualitySettings = {
  usePerspective: false,
  useBlur: false,
  useRightTransform: false,
  useBackgroundImage: false
};

const root = document.querySelector(":root") as any;
const body = document.querySelector("body") as any;
let visualizationQuality = VisualizationQuality.High;
export const setPerspectiveVisualizationQuality = (quality: VisualizationQuality) => {
  visualizationQuality = quality;

  const settings = quality === VisualizationQuality.Disabled ? disabledQualitySettings :
    quality === VisualizationQuality.Low ? lowQualitySettings :
      highQualitySettings;

  root.style.setProperty("--perspective", settings.usePerspective ? "2500px" : "unset");
  root.style.setProperty("--backdrop-blur", settings.useBlur ? "blur(32px)" : "unset");
  root.style.setProperty("--backdrop-background", settings.useBlur ? "transparent" : "var(--color-bg-main)");
  root.style.setProperty("--right-transform", settings.useRightTransform ? "scale(1.02) rotateY(-15deg)" : "unset");
  body.style.setProperty("background-image", settings.useBackgroundImage ? "var(--background-image)" : "unset");
}

export const scrollPerspective = () => {
  if (window.innerWidth <= tabletBreakPoint || visualizationQuality != VisualizationQuality.High)
    return; // Perspective effects are only applied in Desktop mode

  const pages = document.getElementsByClassName('rotate-root');
  if (pages.length === 0)
    return;

  // Normalize the page's vanishing point to the center of the window.
  // This simulates the effect of the viewer delving/elevating as they scroll
  const viewHeights = roundTo((0.5 + (window.scrollY / window.innerHeight)) * 100, 4);

  for (let i = 0; i < pages.length; i++) {
    pages[i].setAttribute("style", `perspective-origin: 50% ${viewHeights}vh;`);
  }
};