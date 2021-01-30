"use strict";
var __createBinding = ( this && this.__createBinding ) || ( Object.create ? ( function ( o, m, k, k2 ) {
  if ( k2 === undefined ) k2 = k;
  Object.defineProperty( o, k2, {
    enumerable: true,
    get: function () {
      return m[ k ];
    }
  } );
} ) : ( function ( o, m, k, k2 ) {
  if ( k2 === undefined ) k2 = k;
  o[ k2 ] = m[ k ];
} ) );
var __setModuleDefault = ( this && this.__setModuleDefault ) || ( Object.create ? ( function ( o, v ) {
  Object.defineProperty( o, "default", {
    enumerable: true,
    value: v
  } );
} ) : function ( o, v ) {
  o[ "default" ] = v;
} );
var __importStar = ( this && this.__importStar ) || function ( mod ) {
  if ( mod && mod.__esModule ) return mod;
  var result = {};
  if ( mod != null )
    for ( var k in mod )
      if ( k !== "default" && Object.prototype.hasOwnProperty.call( mod, k ) ) __createBinding( result, mod, k );
  __setModuleDefault( result, mod );
  return result;
};
Object.defineProperty( exports, "__esModule", {
  value: true
} );
exports.FileItem = void 0;
const fs = __importStar( require( "fs" ) );
const path = __importStar( require( "path" ) );
const vscode_1 = require( "vscode" );

function assertTargetPath( targetPath ) {
  if ( targetPath === undefined ) {
    throw new Error( "Missing target path" );
  }
}
class FileItem {
  constructor( sourcePath, targetPath, IsDir = false ) {
    this.IsDir = IsDir;
    this.SourcePath = this.toUri( sourcePath );
    if ( targetPath !== undefined ) {
      this.TargetPath = this.toUri( targetPath );
    }
  }
  get name() {
    return path.basename( this.SourcePath.path );
  }
  get path() {
    return this.SourcePath;
  }
  get targetPath() {
    return this.TargetPath;
  }
  get exists() {
    if ( this.targetPath === undefined ) {
      return false;
    }
    return fs.existsSync( this.targetPath.fsPath );
  }
  get isDir() {
    return this.IsDir;
  }
  async move() {
    assertTargetPath( this.targetPath );
    const edit = new vscode_1.WorkspaceEdit();
    edit.renameFile( this.path, this.targetPath, {
      overwrite: true
    } );
    await vscode_1.workspace.applyEdit( edit );
    this.SourcePath = this.targetPath;
    return this;
  }
  async duplicate() {
    assertTargetPath( this.targetPath );
    await vscode_1.workspace.fs.copy( this.path, this.targetPath, {
      overwrite: true
    } );
    return new FileItem( this.targetPath, undefined, this.isDir );
  }
  async remove() {
    const edit = new vscode_1.WorkspaceEdit();
    edit.deleteFile( this.path, {
      recursive: true,
      ignoreIfNotExists: true
    } );
    await vscode_1.workspace.applyEdit( edit );
    return this;
  }
  async create( mkDir ) {
    assertTargetPath( this.targetPath );
    if ( this.exists ) {
      await vscode_1.workspace.fs.delete( this.targetPath, {
        recursive: true
      } );
    }
    if ( mkDir === true || this.isDir ) {
      await vscode_1.workspace.fs.createDirectory( this.targetPath );
    } else {
      await vscode_1.workspace.fs.writeFile( this.targetPath, new Uint8Array() );
    }
    return new FileItem( this.targetPath, undefined, this.isDir );
  }
  toUri( uriOrString ) {
    return uriOrString instanceof vscode_1.Uri ? uriOrString : vscode_1.Uri.file( uriOrString );
  }
}
exports.FileItem = FileItem;
