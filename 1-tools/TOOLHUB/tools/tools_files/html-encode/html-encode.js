function html_decode() {
  let e = $( "#input-text" ).val();
  let encoded_html = checkEncodedChars( e );
  if ( encoded_html != null ) {
    let a = $( "<div/>" ).html( e ).text();
    $( "#input-text" ).val( a );
  }
}

function encode_html() {
  let html_inp = $( '#input-text' ).val();
  let encoded_html = checkEncodedChars( html_inp );
  if ( encoded_html == null ) {
    let a = $( "<div/>" ).text( html_inp ).html();
    $( '#input-text' ).val( a );
  }
}

function checkEncodedChars( e ) {
  return e.match( /(&nbsp)|(&iexcl)|(&cent)|(&pound)|(&curren)|(&yen)|(&brvbar)|(&sect)|(&uml)|(&copy)|(&ordf)|(&laquo)|(&not)|(&reg)|(&macr)|(&deg)|(&plusmn)|(&sup2)|(&sup3)|(&acute)|(&micro)|(&para)|(&middot)|(&cedil)|(&sup1)|(&ordm)|(&raquo)|(&frac14)|(&frac12)|(&frac34)|(&iquest)|(&Agrave)|(&Aacute)|(&Acirc)|(&Atilde)|(&Auml)|(&Aring)|(&AElig)|(&Ccedil)|(&Egrave)|(&Eacute)|(&Ecirc)|(&Euml)|(&Igrave)|(&Iacute)|(&Icirc)|(&Iuml)|(&ETH)|(&Ntilde)|(&Ograve)|(&Oacute)|(&Ocirc)|(&Otilde)|(&Ouml)|(&times)|(&Oslash)|(&Ugrave)|(&Uacute)|(&Ucirc)|(&Uuml)|(&Yacute)|(&THORN)|(&szlig)|(&agrave)|(&aacute)|(&acirc)|(&atilde)|(&auml)|(&aring)|(&aelig)|(&ccedil)|(&egrave)|(&eacute)|(&ecirc)|(&euml)|(&igrave)|(&iacute)|(&icirc)|(&iuml)|(&eth)|(&ntilde)|(&ograve)|(&oacute)|(&ocirc)|(&otilde)|(&ouml)|(&divide)|(&oslash)|(&ugrave)|(&uacute)|(&ucirc)|(&uuml)|(&yacute)|(&thorn)|(&yuml)|(&fnof)|(&Alpha)|(&Beta)|(&Gamma)|(&Delta)|(&Epsilon)|(&Zeta)|(&Eta)|(&Theta)|(&Iota)|(&Kappa)|(&Lambda)|(&Mu)|(&Nu)|(&Xi)|(&Omicron)|(&Pi)|(&Rho)|(&Sigma)|(&Tau)|(&Upsilon)|(&Phi)|(&Chi)|(&Psi)|(&Omega)|(&alpha)|(&beta)|(&gamma)|(&delta)|(&epsilon)|(&zeta)|(&eta)|(&theta)|(&iota)|(&kappa)|(&lambda)|(&mu)|(&nu)|(&xi)|(&omicron)|(&pi)|(&rho)|(&sigmaf)|(&sigma)|(&tau)|(&upsilon)|(&phi)|(&chi)|(&psi)|(&omega)|(&thetasym)|(&upsih)|(&piv)|(&bull)|(&hellip)|(&prime)|(&Prime)|(&oline)|(&frasl)|(&weierp)|(&image)|(&real)|(&trade)|(&alefsym)|(&larr)|(&uarr)|(&rarr)|(&darr)|(&harr)|(&crarr)|(&lArr)|(&uArr)|(&rArr)|(&dArr)|(&hArr)|(&forall)|(&part)|(&exist)|(&empty)|(&nabla)|(&isin)|(&notin)|(&ni)|(&prod)|(&sum)|(&minus)|(&lowast)|(&radic)|(&prop)|(&infin)|(&ang)|(&and)|(&or)|(&cap)|(&cup)|(&int)|(&there4)|(&sim)|(&cong)|(&asymp)|(&ne)|(&equiv)|(&le)|(&ge)|(&sub)|(&sup)|(&nsub)|(&sube)|(&supe)|(&oplus)|(&otimes)|(&perp)|(&sdot)|(&lceil)|(&rceil)|(&lfloor)|(&rfloor)|(&lang)|(&rang)|(&loz)|(&spades)|(&clubs)|(&hearts)|(&diams)|(&")|(&amp)|(&lt)|(&gt)|(&OElig)|(&oelig)|(&Scaron)|(&scaron)|(&Yuml)|(&circ)|(&tilde)|(&ndash)|(&mdash)|(&lsquo)|(&rsquo)|(&sbquo)|(&ldquo)|(&rdquo)|(&bdquo)|(&dagger)|(&Dagger)|(&permil)|(&lsaquo)|(&rsaquo)|(&euro)/gm );
}
