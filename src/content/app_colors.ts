import { NamingHelper, CSSHelper, ColorFormat, StringCase, ColorHelper } from "@supernovaio/export-helpers"
import { ColorToken, DimensionToken, Token, TokenGroup ,TypographyToken} from "@supernovaio/sdk-exporters"

export function createAppColorContent(token: ColorToken, mappedTokens: Map<string, Token>, tokenGroups: Array<TokenGroup>): string {
  var parent = tokenGroups.find((group) => group.id === token.parentGroupId)!.name
  var  name = token.name.replaceAll(" ","")

  if (parent.startsWith(name.replaceAll(/[0-9]/g, "")) && name.replaceAll(/[0-9]/g, "") != ""){
    parent = ""
  }
  var isReference = false

  var value = CSSHelper.colorTokenValueToCSS(token.value, mappedTokens, {
    allowReferences: true,
    decimals: 3,
    colorFormat: ColorFormat.hex8,
    tokenToVariableRef: (t) => {
      var po = tokenGroups.find((group) => group.id === t.parentGroupId)!.name
      var no = t.name.replaceAll(" ","")
      if (po.startsWith(no.replaceAll(/[0-9]/g, "")) && no.replaceAll(/[0-9]/g, "") != ""){
        po = ""
      }
      isReference = true
      return ``
    },
  })
  parent = parent.toLowerCase();
  var editedValue = `${value.substring(6)}${value.substring(0,6)}`

  return !isReference? `  static Color ${parent}${name} = const Color(0x${editedValue.toUpperCase()});\n`:``
}

export function createAppColorExtansionConstractorContent(token: ColorToken, mappedTokens: Map<string, Token>, tokenGroups: Array<TokenGroup>): string {
  var parent = tokenGroups.find((group) => group.id === token.parentGroupId)!.name
  var name = token.name.replaceAll(" ","")
  name = NamingHelper.codeSafeVariableName(name,StringCase.capitalCase)
  name = name.replaceAll(" ","")

  if (parent.startsWith(name.replaceAll(/[0-9]/g, "")) && name.replaceAll(/[0-9]/g, "") != ""){
    parent = ""
  }
  var isReference = false

  var value = CSSHelper.colorTokenValueToCSS(token.value, mappedTokens, {
    allowReferences: true,
    decimals: 3,
    colorFormat: ColorFormat.hex8,
    tokenToVariableRef: (t) => {
      isReference = true
      return ``
    },
  })

  var editedName = `${parent.toLowerCase()}${name}`

  return isReference? `    required this.${editedName},\n`:``
}

export function createAppColorExtansionFinalsContent(token: ColorToken, mappedTokens: Map<string, Token>, tokenGroups: Array<TokenGroup>): string {
  var parent = tokenGroups.find((group) => group.id === token.parentGroupId)!.name
  var name = token.name.replaceAll(" ","")
  name = NamingHelper.codeSafeVariableName(name,StringCase.capitalCase)
  name = name.replaceAll(" ","")

  if (parent.startsWith(name.replaceAll(/[0-9]/g, "")) && name.replaceAll(/[0-9]/g, "") != ""){
    parent = ""
  }
  var isReference = false

  var value = CSSHelper.colorTokenValueToCSS(token.value, mappedTokens, {
    allowReferences: true,
    decimals: 3,
    colorFormat: ColorFormat.hex8,
    tokenToVariableRef: (t) => {
      isReference = true
      return ``
    },
  })

  var editedName = `${parent.toLowerCase()}${name}`

  return isReference? ` final Color ${editedName};\n`:``
}

export function createAppColorExtansionVarsContent(token: ColorToken, mappedTokens: Map<string, Token>, tokenGroups: Array<TokenGroup>): string {
  var parent = tokenGroups.find((group) => group.id === token.parentGroupId)!.name
  var name = token.name.replaceAll(" ","")
  name = NamingHelper.codeSafeVariableName(name,StringCase.capitalCase)
  name = name.replaceAll(" ","")

  if (parent.startsWith(name.replaceAll(/[0-9]/g, "")) && name.replaceAll(/[0-9]/g, "") != ""){
    parent = ""
  }
  var isReference = false

  var value = CSSHelper.colorTokenValueToCSS(token.value, mappedTokens, {
    allowReferences: true,
    decimals: 3,
    colorFormat: ColorFormat.hex8,
    tokenToVariableRef: (t) => {
      isReference = true
      return ``
    },
  })

  var editedName = `${parent.toLowerCase()}${name}`

  return isReference? ` Color? ${editedName},\n`:``
}

export function createAppColorExtansionVars2Content(token: ColorToken, mappedTokens: Map<string, Token>, tokenGroups: Array<TokenGroup>): string {
  var parent = tokenGroups.find((group) => group.id === token.parentGroupId)!.name
  var name = token.name.replaceAll(" ","")
  name = NamingHelper.codeSafeVariableName(name,StringCase.capitalCase)
  name = name.replaceAll(" ","")

  if (parent.startsWith(name.replaceAll(/[0-9]/g, "")) && name.replaceAll(/[0-9]/g, "") != ""){
    parent = ""
  }
  var isReference = false

  var value = CSSHelper.colorTokenValueToCSS(token.value, mappedTokens, {
    allowReferences: true,
    decimals: 3,
    colorFormat: ColorFormat.hex8,
    tokenToVariableRef: (t) => {
      isReference = true
      return ``
    },
  })

  var editedName = `${parent.toLowerCase()}${name}`

  return isReference? ` ${editedName}: ${editedName} ?? this.${editedName},\n`:``
}

export function createAppColorExtansionVars3Content(token: ColorToken, mappedTokens: Map<string, Token>, tokenGroups: Array<TokenGroup>): string {
  var parent = tokenGroups.find((group) => group.id === token.parentGroupId)!.name
  var name = token.name.replaceAll(" ","")
  name = NamingHelper.codeSafeVariableName(name,StringCase.capitalCase)
  name = name.replaceAll(" ","")

  if (parent.startsWith(name.replaceAll(/[0-9]/g, "")) && name.replaceAll(/[0-9]/g, "") != ""){
    parent = ""
  }
  var isReference = false

  var value = CSSHelper.colorTokenValueToCSS(token.value, mappedTokens, {
    allowReferences: true,
    decimals: 3,
    colorFormat: ColorFormat.hex8,
    tokenToVariableRef: (t) => {
      isReference = true
      return ``
    },
  })

  var editedName = `${parent.toLowerCase()}${name}`

  return isReference? ` ${editedName}:
  Color.lerp(${editedName}, other.${editedName}, t)!,\n`:``
}