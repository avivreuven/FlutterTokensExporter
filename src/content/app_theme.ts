import { NamingHelper, CSSHelper, ColorFormat, StringCase, ColorHelper } from "@supernovaio/export-helpers"
import { ColorToken, DimensionToken, Token, TokenGroup ,TypographyToken} from "@supernovaio/sdk-exporters"

export function createAppThemeExtensionContent(token: ColorToken, mappedTokens: Map<string, Token>, tokenGroups: Array<TokenGroup>): string {
    // First creating the name of the token, using helper function which turns any token name / path into a valid variable name
    // const name = tokenVariableName(token, tokenGroups)
    var parent = tokenGroups.find((group) => group.id === token.parentGroupId)!.name
    var name = token.name.replaceAll(" ","")
    name = NamingHelper.codeSafeVariableName(name,StringCase.capitalCase)
    name = name.replaceAll(" ","")
    console.log(name)
  
    if (parent.startsWith(name.replaceAll(/[0-9]/g, "")) && name.replaceAll(/[0-9]/g, "") != ""){
      parent = ""
    }
    var isReference = false
  
    // Then creating the value of the token, using another helper function
    var value = CSSHelper.colorTokenValueToCSS(token.value, mappedTokens, {
      allowReferences: true,
      decimals: 3,
      colorFormat: ColorFormat.hex8,
      tokenToVariableRef: (t) => {
        var poo = tokenGroups.find((group) => group.id === t.parentGroupId)!.name.toLowerCase()
        var noo = t.name.replaceAll(" ","")
        if (poo.startsWith(noo.replaceAll(/[0-9]/g, "")) && noo.replaceAll(/[0-9]/g, "") != ""){
          poo = ""
        }
        isReference = true
        return `AppColors.${poo}${noo}`
      },
    })
    var editedName = `${parent.toLowerCase()}${name}`
  
    return isReference? `${editedName}: ${value},\n`:``
  }


  /* 
  var themes = await sdk.tokens.getTokenThemes(remoteVersionIdentifier)
  var appThemeExtensionColorsContentLight = ``;
  var appThemeExtensionColorsContentDark = ``;
  var appThemeExtensionTextStyleContentLight = ``;
  var appThemeExtensionTextStyleContentDark = ``;
  // Ensure themes is an array and has elements before accessing indices
if (Array.isArray(themes) && themes.length > 0) {
  console.log(themes[3]?.name);
  

  var lightThemeIndex = themes.findIndex((theme) => theme.name === "Light Theme");
  var darkThemeIndex = themes.findIndex((theme) => theme.name === "Mobile Dark Theme");

  // Ensure lightThemeIndex and darkThemeIndex are valid before using them
  if (lightThemeIndex !== -1 && darkThemeIndex !== -1) {
    try {
      let lightTokens = await sdk.tokens.computeTokensByApplyingThemes(tokens, themes);
    } catch (error) {
      console.log("Error applying light theme to tokens. Error: ", error);
    }
    // var lightTokens = await sdk.tokens.computeTokensByApplyingThemes(tokens, [themes[lightThemeIndex]]);
    // var darkTokens = await sdk.tokens.computeTokensByApplyingThemes(tokens, [themes[darkThemeIndex]]);

    appThemeExtensionColorsContentLight = ``;
    // Uncomment and ensure lightTokens is iterable
    // if (Array.isArray(lightTokens)) {
    //   appThemeExtensionColorsContentLight = lightTokens
    //     .filter((t) => t.tokenType === TokenType.color)
    //     .map((token) => createAppThemeExtensionContent(token as ColorToken, mappedTokens, tokenGroups))
    //     .join("");
    // }

    appThemeExtensionColorsContentDark = ``;
    // Uncomment and ensure darkTokens is iterable
    // if (Array.isArray(darkTokens)) {
    //   appThemeExtensionColorsContentDark = darkTokens
    //     .filter((t) => t.tokenType === TokenType.color)
    //     .map((token) => createAppThemeExtensionContent(token as ColorToken, mappedTokens, tokenGroups))
    //     .join("");
    // }

    appThemeExtensionTextStyleContentLight = ``;
    // Uncomment and ensure tokens is iterable
    // if (Array.isArray(tokens)) {
    //   appThemeExtensionTextStyleContentLight = tokens
    //     .filter((t) => t.tokenType === TokenType.typography)
    //     .map((token) => createAppTypographyContentLight(token as TypographyToken))
    //     .join("");
    // }

    appThemeExtensionTextStyleContentDark = ``;
    // Uncomment and ensure tokens is iterable
    // if (Array.isArray(tokens)) {
    //   appThemeExtensionTextStyleContentLight = tokens
    //     .filter((t) => t.tokenType === TokenType.typography)
    //     .map((token) => createAppTypographyContentLight(token as TypographyToken))
    //     .join("");
    // }
  } else {
    console.error("Light Theme or Mobile Dark Theme not found in themes.");
  }
} else {
  console.error("Themes is not an array or is empty.");
}

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
  */