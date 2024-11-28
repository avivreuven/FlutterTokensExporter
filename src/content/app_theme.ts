import { NamingHelper, CSSHelper, ColorFormat, StringCase, ColorHelper } from "@supernovaio/export-helpers"
import { ColorToken, DimensionToken, Token, TokenGroup ,TypographyToken} from "@supernovaio/sdk-exporters"

export function createAppThemeExtensionContent(token: ColorToken, mappedTokens: Map<string, Token>, tokenGroups: Array<TokenGroup>): string {
    // First creating the name of the token, using helper function which turns any token name / path into a valid variable name
    // const name = tokenVariableName(token, tokenGroups)
    var parent = tokenGroups.find((group) => group.id === token.parentGroupId)!.name
    var name = token.name.replaceAll(" ","")
    name = NamingHelper.codeSafeVariableName(name,StringCase.capitalCase)
    name = name.replaceAll(" ","")
  
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