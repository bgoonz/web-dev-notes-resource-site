var cb_weight = [ "atomic mass unit (amu)", "carat (metric)", "cental", "centigram", "dekagram", "dram (dr)", "grain (gr)", "gram (g)", "hundredweight (UK)", "kilogram (kg)", "microgram (&mu;g)", "milligram (mg)", "newton (Earth)", "ounce (oz)", "pennyweight (dwt)", "pound (lb)", "quarter", "stone", "ton (UK, long)", "ton (US, short)", "tonne (t)", "troy ounce" ];
var factors_weight = [ 60221366516752e13, 5e3, .022046226218488, 1e5, 100, 564.38339119329, 15432.358352941, 1e3, .019684130552221, 1, 1e9, 1e6, 9.80665, 35.27396194958, 643.01493137256, 2.2046226218488, .078736522208885, .15747304441777, .00098420652761106, .0011023113109244, .001, 32.150746568628 ];

function fix_weight( e ) {
  if ( !isFinite( e ) ) return "";
  if ( 0 == e ) return "0";
  if ( st = "" + e, epos = st.indexOf( "E" ), -1 == epos && ( epos = st.indexOf( "e" ) ), sdigi = Math.log( Math.abs( e ) ) / Math.LN10, sdigif = Math.floor( sdigi ), -1 == epos ) return adjust = Math.pow( 10, sdigif - 12 ), faqs = Math.round( e / adjust ), norst = "" + faqs, sdigif < 12 ? ( adjust2 = Math.pow( 10, 12 - sdigif ), faqs / adjust2 ) : faqs * adjust;
  for ( zo = e * Math.pow( 10, 12 - sdigif ), szo = String( Math.round( zo ) ), inse = -1, "-" == szo.charAt( 0 ) ? inse = 2 : inse = 1, rest = szo.substring( inse, szo.length ), i = rest.length - 1; 0 <= i && "0" == rest.charAt( i ); ) i--;
  return rest = rest.substring( 0, i + 1 ), rou = szo.substring( 0, inse ), 0 < rest.length && ( rou += "." + rest ), sdigif < 0 ? sa = rou + "E" : sa = rou + "E+", snow = sa + sdigif, vanow = Math.abs( parseFloat( snow ) ), faqsvab = Math.abs( e ), 0 <= sdigif ? vanow > 5 * faqsvab ? snow = sa + String( sdigif - 1 ) : vanow < faqsvab / 5 && ( snow = sa + String( sdigif + 1 ) ) : 0 <= sdigif && ( vanow > 5 * faqsvab ? snow = sa + String( sdigif + 1 ) : vanow < faqsvab / 5 && ( snow = sa + String( sdigif - 1 ) ) ), vanow = parseFloat( snow ), vanow > 1.1 * e || vanow < .9 * e ? e : snow
}

function convert_weight() {
  from_select_index = $( "#select_from" ).val();
  to_select_index = $( "#select_to" ).val();
  from_input = $( "#amount_inp" ).val();
  faqsorg = factors_weight[ to_select_index ] / factors_weight[ from_select_index ];
  resfaqs = from_input * faqsorg;
  from_select_html = $( "#select_from option:selected" ).text();
  record_activity( 'tool_used', t_n, ' Weight Converter From ' + from_input + ' ' + from_select_html + ' Executed' );
  $( "#from_title" ).html( cb_weight[ from_select_index ] );
  $( "#to_title" ).html( cb_weight[ to_select_index ] );
  if ( isNaN( parseFloat( resfaqs ) ) ) {
    $( "#amount_ans" ).val( "" )
  } else {
    $( "#amount_ans" ).val( fix_weight( parseFloat( resfaqs ) ) + " " )
  }
}
$( document ).ready( function () {
  convert_weight();
} )
