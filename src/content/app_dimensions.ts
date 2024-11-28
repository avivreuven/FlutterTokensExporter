import { NamingHelper, CSSHelper, ColorFormat, StringCase, ColorHelper } from "@supernovaio/export-helpers"
import { ColorToken, DimensionToken, Token, TokenGroup ,TypographyToken} from "@supernovaio/sdk-exporters"

export function createAppDimensionsGroups(groupName: String): string {
    var capitalCaseName = groupName.charAt(0).toUpperCase() + groupName.slice(1);
    return `  static ${capitalCaseName}SE ${groupName} = ${capitalCaseName}SE();\n`
  }
  
  export function createAppDimensionsContent(token: DimensionToken, tokenGroup: TokenGroup): string {
    var name = token.name.replaceAll(" ","")
    name = name.replaceAll("-","_")
    return token.parentGroupId == tokenGroup.id ?`  double get ${name} => ${token.value.measure};\n`:``
  }