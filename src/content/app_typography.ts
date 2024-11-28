import { NamingHelper, CSSHelper, ColorFormat, StringCase, ColorHelper } from "@supernovaio/export-helpers"
import { ColorToken, DimensionToken, Token, TokenGroup ,TypographyToken} from "@supernovaio/sdk-exporters"

export function createAppTypographyContentLight(token: TypographyToken): string {

    var name = token.name.replaceAll(" ","")
    name = name.replaceAll("-","_")
  
    var lineHeight = parseFloat((token.value.lineHeight?.measure ?? 0).toString()) / parseFloat(token.value.fontSize.measure.toString())
  
    return `  ${token.name.charAt(0).toLowerCase() + token.name.slice(1)} : TextStyle(
      fontFamily: "${token.value.fontFamily.text}",
      fontWeight: FontWeight.w${token.value.fontWeight.text},
      fontSize: ${token.value.fontSize.measure},
      height: ${lineHeight < 1 ? 1 : lineHeight.toFixed(2)},
      color: lightAppColors.textPrimary),\n`
  }
  export function createAppTypographyContentDark(token: TypographyToken): string {
  
    var name = token.name.replaceAll(" ","")
    name = name.replaceAll("-","_")
  
    var lineHeight = parseFloat((token.value.lineHeight?.measure ?? 0).toString()) / parseFloat(token.value.fontSize.measure.toString())
  
    return `  ${token.name.charAt(0).toLowerCase() + token.name.slice(1)} : TextStyle(
      fontFamily: "${token.value.fontFamily.text}",
      fontWeight: FontWeight.w${token.value.fontWeight.text},
      fontSize: ${token.value.fontSize.measure},
      height: ${lineHeight < 1 ? 1 : lineHeight.toFixed(2)},
      color: darkAppColors.textPrimary),\n`
  }
  
  export function createAppTypographyContent1(token: TypographyToken): string {
  
    var name = token.name.replaceAll(" ","")
    name = name.replaceAll("-","_")
  
    var lineHeight = parseFloat((token.value.lineHeight?.measure ?? 0).toString()) / parseFloat(token.value.fontSize.measure.toString())
  
    return `    required this.${token.name.charAt(0).toLowerCase() + token.name.slice(1)},\n`
  }
  export function createAppTypographyContent2(token: TypographyToken): string {
  
    var name = token.name.replaceAll(" ","")
    name = name.replaceAll("-","_")
  
    var lineHeight = parseFloat((token.value.lineHeight?.measure ?? 0).toString()) / parseFloat(token.value.fontSize.measure.toString())
  
    return ` final TextStyle ${token.name.charAt(0).toLowerCase() + token.name.slice(1)};\n`
  }
  export function createAppTypographyContent3(token: TypographyToken): string {
  
    var name = token.name.replaceAll(" ","")
    name = name.replaceAll("-","_")
  
    var lineHeight = parseFloat((token.value.lineHeight?.measure ?? 0).toString()) / parseFloat(token.value.fontSize.measure.toString())
  
    return ` TextStyle? ${token.name.charAt(0).toLowerCase() + token.name.slice(1)},\n`
  }
  export function createAppTypographyContent4(token: TypographyToken): string {
  
    var name = token.name.replaceAll(" ","")
    name = name.replaceAll("-","_")
  
    var lineHeight = parseFloat((token.value.lineHeight?.measure ?? 0).toString()) / parseFloat(token.value.fontSize.measure.toString())
  
    return ` ${token.name.charAt(0).toLowerCase() + token.name.slice(1)}: ${token.name.charAt(0).toLowerCase() + token.name.slice(1)} ?? this.${token.name.charAt(0).toLowerCase() + token.name.slice(1)},\n`
  }
  export function createAppTypographyContent5(token: TypographyToken): string {
  
    var name = token.name.replaceAll(" ","")
    name = name.replaceAll("-","_")
  
    var lineHeight = parseFloat((token.value.lineHeight?.measure ?? 0).toString()) / parseFloat(token.value.fontSize.measure.toString())
  
    return ` ${token.name.charAt(0).toLowerCase() + token.name.slice(1)}:
    TextStyle.lerp(${token.name.charAt(0).toLowerCase() + token.name.slice(1)}, other.${token.name.charAt(0).toLowerCase() + token.name.slice(1)}, t)!,\n`
  }