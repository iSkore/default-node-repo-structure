/** ****************************************************************************************************
 * File: build-html.js
 * Project: default-node-repo-structure
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 20-Oct-2017
 *******************************************************************************************************/
'use strict';

/**
 *     THIS FILE IS NOT PART OF THE DEFAULT FILES
 *     ONLY FOR BUILDING THE DOCS FOR THIS PROJECT
 */


const
    fs        = require( 'fs' ),
    {
        resolve,
        join
    }         = require( 'path' ),
    files     = [
        '.babelrc',
        '.editorconfig',
        '.gitignore',
        '.jshintrc',
        '.npmrc',
        'index.js',
        'package.json',
        '.gitmessage',
        'COMMIT_GUIDELINES.md',
        'ISSUE_TEMPLATE.md',
        'PULL_REQUEST_TEMPLATE.md'
    ],
    specialFiles = [
        '.gitmessage',
        'COMMIT_GUIDELINES.md',
        'ISSUE_TEMPLATE.md',
        'PULL_REQUEST_TEMPLATE.md'
    ],
    build     = [],
    dir       = '../',
    buildFile = resolve( './index.html' );

let html = '';

function readFile( f ) {
    return new Promise(
        ( res, rej ) => fs.readFile( resolve( f ),
            ( e, d ) => e ? rej( e ) : res( d )
        )
    );
}

function readDir( f ) {
    return new Promise(
        ( res, rej ) => fs.readdir( resolve( f ),
            ( e, d ) => e ? rej( e ) : res( d )
        )
    );
}

function writeFile( f, t ) {
    return new Promise(
        ( res, rej ) => fs.writeFile(
            resolve( f ), t,
            ( e, d ) => e ? rej( e ) : res( d )
        )
    );
}

function startFile( file ) {
    file = file || '';
    file += '<!DOCTYPE html><html><meta charset="utf-8"><meta http-equiv="X-UA-Compatible" content="IE=edge">';
    file += `<style>*{-webkit-tap-highlight-color:rgba(0,0,0,0);}html{-webkit-text-size-adjust:none;}body{font-family:-apple-system,Helvetica,Arial,sans-serif;margin:0;padding:20px;color:#333;word-wrap:break-word;}h1,h2,h3,h4,h5,h6{line-height:1.1;}hr{background-color:#ddd;border:0;height: 1px;margin: 15px 0;}</style>`;
    file += `<style>.blockit{margin:0;padding:10px;font-size:100%;word-break:normal;border-width:2px;border-style:solid;border-color:#FF0000;background-color:rgba(250,100,0,0.7);}</style>`;
    file += '<body><script>function copy(e){var tmp = document.createElement("input");tmp.id="123";document.body.append(tmp);tmp.value = document.getElementById(e).innerHTML;tmp = document.getElementById("123");tmp.select();document.execCommand("copy");tmp.remove();}</script>';
    file += '<h1><a name="top">default-node-repo-structure</a></h1>';
    return file;
}

function endFile( file ) {
    file = file || '';
    file += '</body></html>';
    return file;
}

function setHeader( file, id ) {
    if( specialFiles.includes( id ) ) {
        file += `<h1><pre><code><a name="${id}" href="#top">.github/${id}</a></code></pre></h1>`;
    } else {
        file += `<h1><pre><code><a name="${id}" href="#top">${id}</a></code></pre></h1>`;
    }
    
    file += `<button onclick="copy('${id}');">COPY</button>`;
    return file;
}

function wrapPreCode( file, id, text ) {
    file += `<pre class="blockit"><code class="code-cell" id="${id}">${text}</code></pre>`;
    return file;
}

html = startFile( html );

readDir( dir )
    .then( d => {
        html += '<ul>';
        
        d.map( file => {
            if( files.includes( file ) ) {
                if( specialFiles.includes( file ) ) {
                    html += `<li><a href="#${file}">.github/${file}</a></li>`;
                } else {
                    html += `<li><a href="#${file}">${file}</a></li>`;
                }
    
                build.push(
                    readFile( join( dir, file ) )
                        .then( data => ( { data, file } ) )
                        .catch( console.error )
                );
            }
        } );
        
        html += '</ul>';
        
        return Promise.all( build );
    } )
    .then(
        d => d.map( i => {
            html = setHeader( html, i.file );
            html = wrapPreCode( html, i.file, i.data.toString() );
        } )
    )
    .then( () => html = endFile( html ) )
    .then( () => writeFile( buildFile, html ) )
    .then( () => console.log( 'DONE' ) )
    .catch( console.error );