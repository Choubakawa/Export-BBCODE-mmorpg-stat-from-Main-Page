// ==UserScript==
// @name         Export TOP/FLOP mmorpg-stat from Main Page
// @namespace    https://www.mmorpg-stat.eu/base.php
// @version      0.1
// @description  Generate an export in BBOCDE from the TOP/FLOP for forum.
// @author       Choubakawa (Ogame.fr uni Fornax)
// @match        https://www.mmorpg-stat.eu/base.php*
// @supportURL   https://github.com/Choubakawa/Export-BBCODE-mmorpg-stat-from-Main-Page/issues
// @updateURL    https://openuserjs.org/meta/Choubakawa/Export-BBCODE-mmorpg-stat-from-Main-Page.meta.js
// @downloadURL  https://openuserjs.org/install/Choubakawa/Export-BBCODE-mmorpg-stat-from-Main-Page.user.js
// @license MIT
// ==/UserScript==

var value = { "tops" : [], "flops" : [] };
var parentButtonDiv;

function addButtonExport() {
    var buttonExport = document.querySelector("img[src='img/export.png']");

    if( buttonExport != null && buttonExport != 'undefined' ) {

        var spanButtonExport = buttonExport.closest( 'span' );
        parentButtonDiv = spanButtonExport.parentNode;
        let spanToAdd = document.createElement("span");
        spanToAdd.setAttribute( 'style', 'float: left;margin: 3px 0px 0px 10px ' );
        let spanToAdd2 = document.createElement("span");
        spanToAdd2.setAttribute( 'style', 'float: left;margin: 3px 0px 0px 10px ' );
        spanToAdd2.setAttribute( 'id', 'spanTextCopied' );

        let aToAdd = document.createElement("a");
        aToAdd.setAttribute('class', 'tooltip_new1');
        aToAdd.setAttribute('id', 'exportButtonAdded');
        aToAdd.setAttribute('style', 'cursor:pointer');

        let imgToAdd = document.createElement("img");
        imgToAdd.setAttribute('src', 'img/list_plus.png');
        imgToAdd.setAttribute('id', 'imgButtonAdded');
        imgToAdd.setAttribute('width', '16px');
        imgToAdd.setAttribute('height', '14px');
        imgToAdd.setAttribute('border', '0');
        imgToAdd.setAttribute('align', 'absmiddle');

        let tooltip = document.createElement("em");
        let textTool = document.createElement("center");

        textTool.append( "Copier export BBCODE " );
        tooltip.append( textTool );
        aToAdd.append( imgToAdd );
        aToAdd.append( tooltip );
        spanToAdd.append( aToAdd );

        parentButtonDiv.insertBefore(spanToAdd, spanButtonExport.nextSibling);
        parentButtonDiv.insertBefore(spanToAdd2, spanToAdd.nextSibling);

        return true;
    } else {
        return false;
    }
}

function getTopFLop() {
    let top = {
        "position":"",
        "pseudo":"",
        "alliance":"",
        "points":"",
        "progression":"",
        "pourcentage":""
    }
    let tops = [];
    let flop = {
        "position":"",
        "pseudo":"",
        "alliance":"",
        "points":"",
        "progression":"",
        "pourcentage":""
    }
    let flops = [];

    let tableTopFlop = parentButtonDiv.parentNode.parentNode.parentNode.parentNode.previousElementSibling.previousElementSibling;
    var tableInfo = Array.prototype.map.call( tableTopFlop.getElementsByTagName( 'tr' ), function(tr) {
        return Array.prototype.map.call( tr.querySelectorAll('td'), function(td) {
            return td.lastChild;
        });
    });
    for(let i=0; i<tableInfo.length; i++){
        top = {
            "position" : tableInfo[i][1].textContent.trimEnd(),
            "pseudo" : tableInfo[i][2].textContent.trimEnd(),
            "alliance" : tableInfo[i][3].textContent.trimEnd(),
            "points" : tableInfo[i][4].textContent.trimEnd(),
            "progression" : tableInfo[i][5].textContent.trimEnd(),
            "pourcentage" : tableInfo[i][6].textContent.trimEnd(),
        }
       value.tops.push( top );
       flop = {
            "position" : tableInfo[i][8].textContent.trimEnd(),
            "pseudo" : tableInfo[i][9].textContent.trimEnd(),
            "alliance" : tableInfo[i][10].textContent.trimEnd(),
            "points" : tableInfo[i][11].textContent.trimEnd(),
            "progression" : tableInfo[i][12].textContent.trimEnd(),
            "pourcentage" : tableInfo[i][13].textContent.trimEnd(),
        }
       value.flops.push( flop );
    }

    return value;
}

function generateBBCODE( values ) {

    let titleTop = document.getElementsByClassName( 'titre_accueil_top' )[0].textContent.toUpperCase().trim();
    let titleFlop = document.getElementsByClassName( 'titre_accueil_top' )[1].textContent.toUpperCase().trim();
    let type = document.getElementsByClassName( 'titre_accueil_top' )[0].nextElementSibling.textContent.toLowerCase().trim();
    let info = Array.prototype.map.call( document.getElementById( 'cbp-hrmenu' ).getElementsByTagName( 'li' ), function(li) {
        return li.firstChild.nextSibling.textContent.trim();
    });
    let country = info[1].replace( 'OGAME.', '' ).toLowerCase();
    let universe = info[2].charAt(0).toUpperCase() + info[2].slice(1).toLowerCase();
    let date = document.getElementsByTagName( 'table' )[0].getElementsByTagName( 'td' )[1].getElementsByTagName( 'table' )[0].getElementsByTagName( 'td' )[6].getElementsByTagName( 'table' )[0].getElementsByTagName( 'td' )[1].getElementsByTagName( 'span' )[0].innerHTML;
    let day = date.substring( date.indexOf( '>' ) + 1, date.indexOf( '&' ) ).trim();
    let update = date.replace( '<br>', ' ' ).replace( '&nbsp;', ' ' ).trim();

    let bbcode = '[center][size=11][b]' + titleTop + ' / ' + titleFlop + ' ' + universe + ' [' + country + '][/b][/size][/center]\n';
    bbcode += '[center][size=11][b]' + type + ' ' + day + '[/b][/size][/center]\n';
    bbcode += '[center][table]\n';
    for(let i=0; i<values.tops.length; i++){
        if( values.tops[i].pseudo.length > 0 ) {
            bbcode += '[tr style=][td][size=10]' + values.tops[i].position + '[/size][/td]\n';
            bbcode += '[td][size=12][b][color=#17B4FF]' + values.tops[i].pseudo + ' [/color][/b][/size] [size=10][color=#8AD9FF][i]' + values.tops[i].alliance + ' [/i][/color][/size][/td]\n';
            bbcode += '[td][size=10]' + values.tops[i].points + '[/size][/td]\n';
            bbcode += '[td][color=#00cc00][size=11][b]' + values.tops[i].progression + ' [/b][/size][/color][/td]\n';
            bbcode += '[td][size=8](' + values.tops[i].pourcentage + ')[/size][/td]\n';
            bbcode += '[/tr]\n\n';
        }
    }
    bbcode += '[tr style=][td][/td]\n';
    bbcode += '[td][/td]\n';
    bbcode += '[td][/td]\n';
    bbcode += '[td][/td]\n';
    bbcode += '[td][/td]\n';
    bbcode += '[/tr]\n\n';
    for(let i=0; i<values.flops.length; i++){
        if( values.flops[i].pseudo.length > 0 ) {
            bbcode += '[tr style=][td][size=10]' + values.flops[i].position + '[/size][/td]\n';
            bbcode += '[td][size=12][b][color=#17B4FF]' + values.flops[i].pseudo + ' [/color][/b][/size] [size=10][color=#8AD9FF][i]' + values.flops[i].alliance + ' [/i][/color][/size][/td]\n';
            bbcode += '[td][size=10]' + values.flops[i].points + '[/size][/td]\n';
            bbcode += '[td][color=#FF0000][size=11][b]' + values.flops[i].progression + ' [/b][/size][/color][/td]\n';
            bbcode += '[td][size=8](' + values.flops[i].pourcentage + ')[/size][/td]\n';
            bbcode += '[/tr]\n\n';
        }
    }
    bbcode += '[/table][/center]\n';
    bbcode += '[center][size=8]By www.mmorpg-stat.eu [color=#aaaaaa]' + update + '[/color][/size][/center]';

    return bbcode;
}

if( addButtonExport() ) {

    $("#exportButtonAdded").click(function () {

        let bbcode = generateBBCODE( getTopFLop() );
        console.log( bbcode );
        var $temp = $("<input>");
        $("body").append($temp);
        $temp.val(bbcode).select();
        document.execCommand("copy");
        $temp.remove();
        let spanToAdd = document.createElement("span");
        spanToAdd.setAttribute( 'style', 'float: left;margin: 3px 0px 0px 10px ' );
        $( '#spanTextCopied' ).text( 'Copié !' );
        setTimeout(function () {
            $( '#spanTextCopied' ).text( '' );
        }, 3000);
    });
}


