var cb_length = [ "angstrom", "astronomical unit (au)", "centimeter (cm)", "chain", "decimeter (dm)", "fathom", "foot (ft)", "furlong", "inch (in)", "kilometer (km)", "league", "light year", "meter (m)", "mile (mi)", "millimeter (mm)", "micron (&mu;)", "nanometer (nm)", "nautical mile", "parsec", "rod", "yard (yd)" ],
  factors_length = [ 1e10, 66845871226706e-25, 100, .049709695378987, 10, .54680664916885, 3.2808398950131, .0049709695378987, 39.370078740157, .001, .00020712373074577, 10570008340246e-29, 1, .00062137119223733, 1e3, 1e6, 1e9, .00053995680345572, 32407792896393e-30, .19883878151595, 1.0936132983377 ];

function fix_length( e ) {
  if ( !isFinite( e ) ) return "";
  if ( 0 == e ) return "0";
  if ( st = "" + e, epos = st.indexOf( "E" ), -1 == epos && ( epos = st.indexOf( "e" ) ), sdigi = Math.log( Math.abs( e ) ) / Math.LN10, sdigif = Math.floor( sdigi ), -1 == epos ) return adjust = Math.pow( 10, sdigif - 12 ), faqs = Math.round( e / adjust ), norst = "" + faqs, sdigif < 12 ? ( adjust2 = Math.pow( 10, 12 - sdigif ), faqs / adjust2 ) : faqs * adjust;
  for ( zo = e * Math.pow( 10, 12 - sdigif ), szo = String( Math.round( zo ) ), inse = -1, "-" == szo.charAt( 0 ) ? inse = 2 : inse = 1, rest = szo.substring( inse, szo.length ), i = rest.length - 1; 0 <= i && "0" == rest.charAt( i ); ) i--;
  return rest = rest.substring( 0, i + 1 ), rou = szo.substring( 0, inse ), 0 < rest.length && ( rou += "." + rest ), sdigif < 0 ? sa = rou + "E" : sa = rou + "E+", snow = sa + sdigif, vanow = Math.abs( parseFloat( snow ) ), faqsvab = Math.abs( e ), 0 <= sdigif ? vanow > 5 * faqsvab ? snow = sa + String( sdigif - 1 ) : vanow < faqsvab / 5 && ( snow = sa + String( sdigif + 1 ) ) : 0 <= sdigif && ( vanow > 5 * faqsvab ? snow = sa + String( sdigif + 1 ) : vanow < faqsvab / 5 && ( snow = sa + String( sdigif - 1 ) ) ), vanow = parseFloat( snow ), vanow > 1.1 * e || vanow < .9 * e ? e : snow
}

function convert_length() {
  from_select_index = $( "#select_from" ).val();
  to_select_index = $( "#select_to" ).val();
  from_input = $( "#amount_inp" ).val();
  from_select_html = $( "#select_from option:selected" ).text();
  record_activity( 'tool_used', t_n, ' Weight Converter From ' + from_input + ' ' + from_select_html + ' Executed' );
  faqsorg = factors_length[ to_select_index ] / factors_length[ from_select_index ];
  resfaqs = from_input * faqsorg;
  $( "#from_title" ).html( cb_length[ from_select_index ] );
  $( "#to_title" ).html( cb_length[ to_select_index ] );
  if ( isNaN( parseFloat( resfaqs ) ) ) {
    $( "#amount_ans" ).val( "" )
  } else {
    $( "#amount_ans" ).val( fix_length( parseFloat( resfaqs ) ) + " " )
  }
}
$( document ).ready( function () {
  convert_length();
} )
