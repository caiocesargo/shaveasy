import "styled-components";
import theme from "./theme";

declare module "styled-components" {
  type CustomTheme = typeof theme;
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  type DefaultTheme = CustomTheme
}
