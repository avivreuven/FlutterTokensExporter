import { FileHelper } from "@supernovaio/export-helpers"
import { Supernova, PulsarContext, RemoteVersionIdentifier, AnyOutputFile, TokenType, ColorToken, TokenGroup, DimensionToken, TypographyToken, Token } from "@supernovaio/sdk-exporters"
import { ExporterConfiguration } from "../config"
import { createAppColorContent, createAppColorExtansionConstractorContent, createAppColorExtansionFinalsContent, createAppColorExtansionVars2Content, createAppColorExtansionVars3Content, createAppColorExtansionVarsContent } from "./content/app_colors"
import { createAppDimensionsContent, createAppDimensionsGroups } from "./content/app_dimensions"
import { createAppTypographyContent1, createAppTypographyContent2, createAppTypographyContent3, createAppTypographyContent4, createAppTypographyContent5, createAppTypographyContentDark, createAppTypographyContentLight } from "./content/app_typography"
import { createAppThemeExtensionContent } from "./content/app_theme"

Pulsar.export(async (sdk: Supernova, context: PulsarContext): Promise<Array<AnyOutputFile>> => {
  const remoteVersionIdentifier: RemoteVersionIdentifier = {
    designSystemId: context.dsId,
    versionId: context.versionId,
  }

  let tokens = await sdk.tokens.getTokens(remoteVersionIdentifier)
  let tokenGroups = await sdk.tokens.getTokenGroups(remoteVersionIdentifier)

  if (context.brandId) {
    tokens = tokens.filter((token) => token.brandId === context.brandId)
    tokenGroups = tokenGroups.filter((tokenGroup) => tokenGroup.brandId === context.brandId)
  }

  if (context.themeId) {
    const themes = await sdk.tokens.getTokenThemes(remoteVersionIdentifier)
    const theme = themes.find((theme) => theme.id === context.themeId)
    if (theme) {
      tokens = await sdk.tokens.computeTokensByApplyingThemes(tokens, [theme])
    } else {
      throw new Error("Unable to apply theme which doesn't exist in the system.")
    }
  }

  const mappedTokens = new Map(tokens.map((token) => [token.id, token]))

  /// ******* App Colors *******

  // Convert all color tokens to Dart variables
  let appColorsContentVariables = tokens
    .filter((t) => t.tokenType === TokenType.color)
    .map((token) => createAppColorContent(token as ColorToken, mappedTokens, tokenGroups))
    .join("  ")

  let appColorsExtensionContentVariables1 = tokens
    .filter((t) => t.tokenType === TokenType.color)
    .map((token) => createAppColorExtansionConstractorContent(token as ColorToken, mappedTokens, tokenGroups))
    .join("")

  let appColorsExtensionContentVariables2 = tokens
    .filter((t) => t.tokenType === TokenType.color)
    .map((token) => createAppColorExtansionFinalsContent(token as ColorToken, mappedTokens, tokenGroups))
    .join("")

  let appColorsExtensionContentVariables3 = tokens
    .filter((t) => t.tokenType === TokenType.color)
    .map((token) => createAppColorExtansionVarsContent(token as ColorToken, mappedTokens, tokenGroups))
    .join("  ")

  let appColorsExtensionContentVariables4 = tokens
    .filter((t) => t.tokenType === TokenType.color)
    .map((token) => createAppColorExtansionVars2Content(token as ColorToken, mappedTokens, tokenGroups))
    .join("")

  let appColorsExtensionContentVariables5 = tokens
    .filter((t) => t.tokenType === TokenType.color)
    .map((token) => createAppColorExtansionVars3Content(token as ColorToken, mappedTokens, tokenGroups))
    .join("")

  // Create app_colors.dart file content
  let appColorsContent = 
  `import 'package:flutter/material.dart';

  class AppColors {
  ${appColorsContentVariables}\n}`

  
// Create app_colors_extension.dart file content
  let appColorsExtensionContent = 
  `import 'package:flutter/material.dart';

  class AppColorsExtension extends ThemeExtension<AppColorsExtension> {
    AppColorsExtension(
        {${appColorsExtensionContentVariables1}});

    ${appColorsExtensionContentVariables2}

    @override
  ThemeExtension<AppColorsExtension> copyWith(
      {${appColorsExtensionContentVariables3}}) {
        return AppColorsExtension(
          ${appColorsExtensionContentVariables4}
        );
      }

      @override
  ThemeExtension<AppColorsExtension> lerp(
    covariant ThemeExtension<AppColorsExtension>? other,
    double t,
  ) {
    if (other is! AppColorsExtension) {
      return this;
    }
    return AppColorsExtension(
      ${appColorsExtensionContentVariables5}
    );
  }
    }`

  /// ******* ******** *******

  /// ******* App Dimensions *******

  var dimensionsTypes = new Array<String>()
  dimensionsTypes.push(TokenType.borderWidth,TokenType.space,TokenType.border,TokenType.radius,TokenType.size,TokenType.dimension)

  var dimensionTokensGroups = new Array<TokenGroup>()
  tokens.forEach(token => {
    if (dimensionsTypes.includes(token.tokenType)) {
      tokenGroups.forEach(group => {
        if (group.id == token.parentGroupId && !dimensionTokensGroups.includes(group)) {
          dimensionTokensGroups.push(group)
        }
      });
    }
  });

  var dimensionTokensGroupsContent = ""
  let appDimensionsContentVariables = ""
  dimensionTokensGroups.forEach(group => {
    dimensionTokensGroupsContent = dimensionTokensGroupsContent + createAppDimensionsGroups(group.name)
    appDimensionsContentVariables = appDimensionsContentVariables + `class ${group.name.charAt(0).toUpperCase() + group.name.slice(1)}SE {\n`
    var content = tokens
    .filter((t) => t.tokenType === group.tokenType)
    .map((token) => createAppDimensionsContent(token as DimensionToken, group))
    .join("")
    appDimensionsContentVariables += content + `}\n`
  });

   

    let appDimensionsContent = 
  `import 'package:flutter/material.dart';
  
  class AppDimensions {
    ${dimensionTokensGroupsContent}}
    ${appDimensionsContentVariables}`

  /// ******* ******** *******

  /// ******* App Text Style *******

  let appTextStyleContent1 = tokens
  .filter((t) => t.tokenType === TokenType.typography)
  .map((token) => createAppTypographyContent1(token as TypographyToken))
  .join("")

  let appTextStyleContent2 = tokens
  .filter((t) => t.tokenType === TokenType.typography)
  .map((token) => createAppTypographyContent2(token as TypographyToken))
  .join("")

  let appTextStyleContent3 = tokens
  .filter((t) => t.tokenType === TokenType.typography)
  .map((token) => createAppTypographyContent3(token as TypographyToken))
  .join("")

  let appTextStyleContent4 = tokens
  .filter((t) => t.tokenType === TokenType.typography)
  .map((token) => createAppTypographyContent4(token as TypographyToken))
  .join("")

  let appTextStyleContent5 = tokens
  .filter((t) => t.tokenType === TokenType.typography)
  .map((token) => createAppTypographyContent5(token as TypographyToken))
  .join("")

  // Create app_text_style_extension.dart file content
let appTextStyleExtensionContent = 
`import 'package:flutter/material.dart';

class AppTextStyleExtension extends ThemeExtension<AppTextStyleExtension> {
  AppTextStyleExtension(
      {${appTextStyleContent1}});

  ${appTextStyleContent2}

  @override
ThemeExtension<AppTextStyleExtension> copyWith(
    {${appTextStyleContent3}}) {
      return AppTextStyleExtension(
        ${appTextStyleContent4}
      );
    }

    @override
ThemeExtension<AppTextStyleExtension> lerp(
  covariant ThemeExtension<AppTextStyleExtension>? other,
  double t,
) {
  if (other is! AppTextStyleExtension) {
    return this;
  }
  return AppTextStyleExtension(
    ${appTextStyleContent5}
  );
}
  }`

  /// ******* ******** *******

  /// ******* App Themes *******

  var themes = await sdk.tokens.getTokenThemes(remoteVersionIdentifier)
  var appThemeExtensionColorsContentLight = ``;
  var appThemeExtensionColorsContentDark = ``;
  var appThemeExtensionTextStyleContentLight = ``;
  var appThemeExtensionTextStyleContentDark = ``;
  

  var lightThemeIndex = themes.findIndex((theme) => theme.name === "Light Theme");
  var darkThemeIndex = themes.findIndex((theme) => theme.name === "Mobile Dark Theme");
    

   
    var lightTokens = await sdk.tokens.computeTokensByApplyingThemes(tokens, [themes[lightThemeIndex]]);
    var darkTokens = await sdk.tokens.computeTokensByApplyingThemes(tokens, [themes[darkThemeIndex]]);

    appThemeExtensionColorsContentLight = appThemeExtensionColorsContentLight = lightTokens
    .filter((t) => t.tokenType === TokenType.color)
    .map((token) => createAppThemeExtensionContent(token as ColorToken, mappedTokens, tokenGroups))
    .join("");

    appThemeExtensionColorsContentDark = appThemeExtensionColorsContentDark = darkTokens
    .filter((t) => t.tokenType === TokenType.color)
    .map((token) => createAppThemeExtensionContent(token as ColorToken, mappedTokens, tokenGroups))
    .join("");

    appThemeExtensionTextStyleContentLight = appThemeExtensionTextStyleContentLight = tokens
    .filter((t) => t.tokenType === TokenType.typography)
    .map((token) => createAppTypographyContentLight(token as TypographyToken))
    .join("");

    appThemeExtensionTextStyleContentDark = appThemeExtensionTextStyleContentLight = tokens
    .filter((t) => t.tokenType === TokenType.typography)
    .map((token) => createAppTypographyContentLight(token as TypographyToken))
    .join("");
  
  // Create app_theme_extension.dart file content
  let appThemeExtensionContent = 
`import 'package:flutter/material.dart';

import 'app_colors.dart';
import 'app_colors_extension.dart';
import 'app_text_style_extension.dart';

class AppThemeExtensions {
  
  static final lightAppColors = AppColorsExtension(
   ${appThemeExtensionColorsContentLight}
  );

  static final darkAppColors = AppColorsExtension(
    ${appThemeExtensionColorsContentDark}
   );

   static final lightAppTextStyle = AppTextStyleExtension(
     ${appThemeExtensionTextStyleContentLight}
    );

    static final darkAppTextStyle = AppTextStyleExtension(
      ${appThemeExtensionTextStyleContentDark}
     );
}`
  /// ******* ******** *******

  if (exportConfiguration.generateDisclaimer) {
    appColorsContent = `/* This file was generated by Supernova, don't change by hand */\n${appColorsContent}`
    appColorsExtensionContent = `/* This file was generated by Supernova, don't change by hand */\n${appColorsExtensionContent}`
    appDimensionsContent = `/* This file was generated by Supernova, don't change by hand */\n${appDimensionsContent}`
    appTextStyleExtensionContent = `/* This file was generated by Supernova, don't change by hand */\n${appTextStyleExtensionContent}`
    appThemeExtensionContent = `/* This file was generated by Supernova, don't change by hand */\n${appThemeExtensionContent}`
  }


  return [
    FileHelper.createTextFile({
      relativePath: "./",
      fileName: "app_colors.dart",
      content: appColorsContent,
    }),
    FileHelper.createTextFile({
      relativePath: "./",
      fileName: "app_colors_extension.dart",
      content: appColorsExtensionContent,
    }),
    FileHelper.createTextFile({
      relativePath: "./",
      fileName: "app_dimensions.dart",
      content: appDimensionsContent,
    }),
    FileHelper.createTextFile({
      relativePath: "./",
      fileName: "app_text_style_extension.dart",
      content: appTextStyleExtensionContent,
    }),
    FileHelper.createTextFile({
      relativePath: "./",
      fileName: "app_theme_extensions.dart",
      content: appThemeExtensionContent,
    }),
  ]
})

export const exportConfiguration = Pulsar.exportConfig<ExporterConfiguration>()

