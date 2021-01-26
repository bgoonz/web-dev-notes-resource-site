var cb_volume = [ "barrel (petroleum) (bbl, bo)", "bushel (UK) (bu)", "bushel (US dry) (bu)", "centiliter (cl)", "cubic centimeter (cc, cm<sup>3</sup>)", "cubic decimeter (dm<sup>3</sup>)", "cubic foot (ft<sup>3</sup>, cu ft)", "cubic inch (in<sup>3</sup>, cu in) ", "cubic meter (m<sup>3</sup>)", "cubic millimeter (mm<sup>3</sup>)", "cubic yard (yd<sup>3</sup>)", "dekaliter (dal)", "fluid dram (fl dr)", "fluid ounce (fl oz)", "fluid ounce (UK) (fl oz)", "gallon (fluid) (gal)", "gallon (UK) (gal)", "gill (gi)", "hectoliter (hl)", "liter (l)", "microliter (Âµl)", "milliliter (ml)", "minim (min)", "peck (US dry) (pk)", "pint (fluid) (pt)", "pint (UK) (pt)", "pint (US dry) (pt)", "quart (fluid) (qt)", "quart (UK) (qt)", "quart (US dry) (qt)" ],
  factors_volume = [ 6.2898107704321, 27.496156037386, 28.377593258402, 1e5, 1e6, 1e3, 35.314666721489, 61023.744094732, 1, 1e9, 1.3079506193144, 100, 270512.18161474, 33814.022701843, 35195.079727854, 264.17205235815, 219.96924829909, 8453.5056754608, 10, 1e3, 1e9, 1e6, 16230730.896885, 113.51037303361, 2113.3764188652, 1759.7539863927, 1816.1659685377, 1056.6882094326, 879.87699319635, 908.08298426886 ];

function fix_volume( e ) {
  if ( !isFinite( e ) ) return "";
  if ( 0 == e ) return "0";
  if ( st = "" + e, epos = st.indexOf( "E" ), -1 == epos && ( epos = st.indexOf( "e" ) ), sdigi = Math.log( Math.abs( e ) ) / Math.LN10, sdigif = Math.floor( sdigi ), -1 == epos ) return adjust = Math.pow( 10, sdigif - 12 ), faqs = Math.round( e / adjust ), norst = "" + faqs, sdigif < 12 ? ( adjust2 = Math.pow( 10, 12 - sdigif ), faqs / adjust2 ) : faqs * adjust;
  for ( zo = e * Math.pow( 10, 12 - sdigif ), szo = String( Math.round( zo ) ), inse = -1, "-" == szo.charAt( 0 ) ? inse = 2 : inse = 1, rest = szo.substring( inse, szo.length ), i = rest.length - 1; 0 <= i && "0" == rest.charAt( i ); ) i--;
  return rest = rest.substring( 0, i + 1 ), rou = szo.substring( 0, inse ), 0 < rest.length && ( rou += "." + rest ), sdigif < 0 ? sa = rou + "E" : sa = rou + "E+", snow = sa + sdigif, vanow = Math.abs( parseFloat( snow ) ), faqsvab = Math.abs( e ), 0 <= sdigif ? vanow > 5 * faqsvab ? snow = sa + String( sdigif - 1 ) : vanow < faqsvab / 5 && ( snow = sa + String( sdigif + 1 ) ) : 0 <= sdigif && ( vanow > 5 * faqsvab ? snow = sa + String( sdigif + 1 ) : vanow < faqsvab / 5 && ( snow = sa + String( sdigif - 1 ) ) ), vanow = parseFloat( snow ), vanow > 1.1 * e || vanow < .9 * e ? e : snow
}

function convert_volume() {


  from_select_index = $( "#select_from" ).val();

  to_select_index = $( "#select_to" ).val();
  from_input = $( "#amount_inp" ).val();
  faqsorg = factors_volume[ to_select_index ] / factors_volume[ from_select_index ];
  resfaqs = from_input * faqsorg;

  from_select_html = $( "#select_from option:selected" ).text();

  record_activity( 'tool_used', t_n, ' Weight Converter From ' + from_input + ' ' + from_select_html + ' Executed' );


  $( "#from_title" ).html( cb_volume[ from_select_index ] );
  $( "#to_title" ).html( cb_volume[ to_select_index ] );
  if ( isNaN( parseFloat( resfaqs ) ) ) {
    $( "#amount_ans" ).val( "" );
  } else {
    $( "#amount_ans" ).val( fix_volume( parseFloat( resfaqs ) ) + " " );
  }
}
$( document ).ready( function () {
  convert_volume();
} )
