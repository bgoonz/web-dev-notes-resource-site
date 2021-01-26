var value, orig1, orig2, dv, panes = 2,
  highlight = true,
  connect = "align",
  collapse = false;

function initUI() {
  if ( value == null ) return;
  var target = document.getElementById( "view" );
  target.innerHTML = "";
  dv = CodeMirror.MergeView( target, {
    value: value,
    origLeft: null,
    orig: orig2,
    lineNumbers: true,
    mode: "text/html",
    highlightDifferences: highlight,
    connect: null,
    collapseIdentical: collapse,
    allowEditingOriginals: true,
    theme: 'mdn-like',
  } );
}
window.onload = function () {
  value = document.documentElement.innerHTML;
  orig1 = "<!doctype html>\n\n" + value.replace( /\.\.\//g, "codemirror/" ).replace( "yellow", "orange" );
  orig2 = value.replace( /\u003cscript/g, "\u003cscript type=text/javascript " ).replace( "white", "purple;\n      font: comic sans;\n      text-decoration: underline;\n      height: 15em" );
  initUI();
  resize( dv )
  let d = document.createElement( "div" );
  d.style.cssText = "width: 50px; margin: 7px; height: 14px";
  dv.editor().addLineWidget( 57, d )
};

function mergeViewHeight( mergeView ) {
  function editorHeight( editor ) {
    if ( !editor ) return 0;
    return 600;
  }
  return Math.max( editorHeight( mergeView.leftOriginal() ), editorHeight( mergeView.editor() ), editorHeight( mergeView.rightOriginal() ) );
}

function resize( mergeView ) {
  let height = mergeViewHeight( mergeView );
  for ( ;; ) {
    if ( mergeView.leftOriginal() )
      mergeView.leftOriginal().setSize( null, height );
    mergeView.editor().setSize( null, height );
    if ( mergeView.rightOriginal() )
      mergeView.rightOriginal().setSize( null, height );
    var newHeight = mergeViewHeight( mergeView );
    if ( newHeight >= height ) break;
    else height = newHeight;
  }
  mergeView.wrap.style.height = height + "px";
}
