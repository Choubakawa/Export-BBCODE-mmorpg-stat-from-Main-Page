// ==UserScript==
// @name         Export BBCODE mmorpg-stat from Main Page
// @namespace    https://www.mmorpg-stat.eu/base.php
// @version      1.1
// @description  Generate the export of TOP/FLOP in BBOCDE from the main page of mmorpg-stat.eu.
// @author       Choubakawa (Ogame.fr uni Fornax)
// @match        https://www.mmorpg-stat.eu/base.php*
// @supportURL   https://github.com/Choubakawa/Export-BBCODE-mmorpg-stat-from-Main-Page/issues
// @updateURL    https://openuserjs.org/meta/Choubakawa/Export_BBCODE_mmorpg-stat_from_Main_Page.meta.js
// @downloadURL  https://openuserjs.org/install/Choubakawa/Export_BBCODE_mmorpg-stat_from_Main_Page.user.js
// @license MIT
// ==/UserScript==

var value = { "tops" : [], "flops" : [] };
var parentButtonDiv;

function addButtonExport() {
    var buttonExport = document.querySelector("img[src='img/export.png']");

    if( buttonExport !== null && buttonExport != 'undefined' ) {

       var spanButtonExport = buttonExport.closest( 'span' );
        parentButtonDiv = spanButtonExport.parentNode;
        let spanNewButtonBoardFR = document.createElement("span");
        spanNewButtonBoardFR.setAttribute( 'style', 'float: left;margin: 3px 0px 0px 10px ' );
        let spanNewButtonBoard = document.createElement("span");
        spanNewButtonBoard.setAttribute( 'style', 'float: left;margin: 3px 0px 0px 10px ' );
        let spanNewButtonFA = document.createElement("span");
        spanNewButtonFA.setAttribute( 'style', 'float: left;margin: 3px 0px 0px 10px ' );
        let spanTextCP = document.createElement("span");
        spanTextCP.setAttribute( 'style', 'float: left;margin: 3px 0px 0px 10px ' );
        spanTextCP.setAttribute( 'id', 'spanTextCopied' );

        let aButtonBoardFR = document.createElement("a");
        aButtonBoardFR.setAttribute('class', 'tooltip_new1');
        aButtonBoardFR.setAttribute('id', 'exportButtonBoardFR');
        aButtonBoardFR.setAttribute('style', 'cursor:pointer');

        let aButtonBoard = document.createElement("a");
        aButtonBoard.setAttribute('class', 'tooltip_new1');
        aButtonBoard.setAttribute('id', 'exportButtonBoard');
        aButtonBoard.setAttribute('style', 'cursor:pointer');

        let aButtonFA = document.createElement("a");
        aButtonFA.setAttribute('class', 'tooltip_new1');
        aButtonFA.setAttribute('id', 'exportButtonFA');
        aButtonFA.setAttribute('style', 'cursor:pointer');

        let imgButtonBoardFR = document.createElement("img");
        imgButtonBoardFR.setAttribute('src', 'img/list_plus.png');
        imgButtonBoardFR.setAttribute('id', 'imgButtonBoardFR');
        imgButtonBoardFR.setAttribute('width', '16px');
        imgButtonBoardFR.setAttribute('height', '14px');
        imgButtonBoardFR.setAttribute('border', '0');
        imgButtonBoardFR.setAttribute('align', 'absmiddle');
        imgButtonBoardFR.setAttribute('style', 'background: blue');

        let imgButtonBoard = document.createElement("img");
        imgButtonBoard.setAttribute('src', 'img/list_plus.png');
        imgButtonBoard.setAttribute('id', 'imgButtonBoard');
        imgButtonBoard.setAttribute('width', '16px');
        imgButtonBoard.setAttribute('height', '14px');
        imgButtonBoard.setAttribute('border', '0');
        imgButtonBoard.setAttribute('align', 'absmiddle');
        imgButtonBoard.setAttribute('style', 'background: #7d7d7d');

        let imgButtonFA = document.createElement("img");
        imgButtonFA.setAttribute('src', 'img/list_plus.png');
        imgButtonFA.setAttribute('id', 'imgButtonFA');
        imgButtonFA.setAttribute('width', '16px');
        imgButtonFA.setAttribute('height', '14px');
        imgButtonFA.setAttribute('border', '0');
        imgButtonFA.setAttribute('align', 'absmiddle');
        imgButtonFA.setAttribute('style', 'background: red');

        let tooltipBoardFR = document.createElement("em");
        let textToolBoardFR = document.createElement("center");

        let tooltipBoard = document.createElement("em");
        let textToolBoard = document.createElement("center");

        let tooltipFA = document.createElement("em");
        let textToolFA = document.createElement("center");

        textToolBoardFR.append( "Export BBCODE (forum ogame [center])" );
        tooltipBoardFR.append( textToolBoardFR );
        aButtonBoardFR.append( imgButtonBoardFR );
        aButtonBoardFR.append( tooltipBoardFR );
        spanNewButtonBoardFR.append( aButtonBoardFR );

        textToolBoard.append( "Export BBCODE (forum ogame [align])" );
        tooltipBoard.append( textToolBoard );
        aButtonBoard.append( imgButtonBoard );
        aButtonBoard.append( tooltipBoard );
        spanNewButtonBoard.append( aButtonBoard );

        textToolFA.append( "Export BBCODE ForumActif" );
        tooltipFA.append( textToolFA );
        aButtonFA.append( imgButtonFA );
        aButtonFA.append( tooltipFA );
        spanNewButtonFA.append( aButtonFA );

        parentButtonDiv.insertBefore(spanNewButtonBoardFR, spanButtonExport.nextSibling);
        parentButtonDiv.insertBefore(spanNewButtonBoard, spanNewButtonBoardFR.nextSibling);
        parentButtonDiv.insertBefore(spanNewButtonFA, spanNewButtonBoard.nextSibling);
        parentButtonDiv.insertBefore(spanTextCP, spanNewButtonFA.nextSibling);

        return true;
    } else {
        return false;
    }
}

function getTopFLop() {
    value.tops = [];
    value.flops = [];
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

function generateBBCODE( values, forumCible, alignType ) {

    let baliseCenter = "center";
    let closeBaliseCenter = "center";
    let verySmall = "8";
    let small = "10";
    let medium = "11";
    let big = "12";

    if( alignType === "align" ) {
        baliseCenter = "align=center";
        closeBaliseCenter= "align";
    }

    if( forumCible === "BOARD" ) {
        verySmall = "8";
        small = "8";
        medium = "8";
        big = "8";
    }

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

    let bbcode = '[' + baliseCenter + '][size=' + medium + '][b]' + titleTop + ' / ' + titleFlop + ' ' + universe + ' [' + country + '][/b][/size][/' + closeBaliseCenter + ']\n';
    bbcode += '[' + baliseCenter + '][size=' + medium + '][b]' + type + ' ' + day + '[/b][/size][/' + closeBaliseCenter + ']\n';
    bbcode += '[' + baliseCenter + '][table][tr]\n';
    if( forumCible === "BOARD" ) {
        if( values.tops[0].pseudo.length > 0 ) {
            bbcode += '[td]\n';
            for(let i=0; i<values.tops.length; i++){
                if( values.tops[i].pseudo.length > 0 ) {
                    bbcode += '[align=left][size=' + small + ']' + values.tops[i].position + '[/size] [size=' + big + '][b][color=#17B4FF]' + values.tops[i].pseudo + ' [/color][/b][/size] [size=' + small + '][color=#8AD9FF][i]' + values.tops[i].alliance + ' [/i][/color][/size] [size=' + small + ']' + values.tops[i].points + '[/size] [color=#00cc00][size=' + medium + '][b]' + values.tops[i].progression + ' [/b][/size][/color] [size=' + verySmall + '](' + values.tops[i].pourcentage + ')[/size][/align]\n' ;
                }
            }
            bbcode += '[/td]\n';
        }
        if( values.flops[0].pseudo.length > 0 ) {
            bbcode += '[td]\n';
            for(let i=0; i<values.flops.length; i++){
                if( values.flops[i].pseudo.length > 0 ) {
                    bbcode += '[align=left][size=' + small + ']' + values.flops[i].position + '[/size] [size=' + big + '][b][color=#17B4FF]' + values.flops[i].pseudo + ' [/color][/b][/size] [size=' + small + '][color=#8AD9FF][i]' + values.flops[i].alliance + ' [/i][/color][/size] [size=' + small + ']' + values.flops[i].points + '[/size] [color=#FF0000][size=' + medium + '][b]' + values.flops[i].progression + ' [/b][/size][/color] [size=' + verySmall + '](' + values.flops[i].pourcentage + ')[/size][/align]\n' ;
                }
            }
            bbcode += '[/td]\n';
        }
    } else {
        if( values.tops[0].pseudo.length > 0 ) {
            bbcode += '[td][table]\n';
            for(let i=0; i<values.tops.length; i++){
                if( values.tops[i].pseudo.length > 0 ) {
                    bbcode += '[tr][td][size=' + small + ']' + values.tops[i].position + '[/size][/td]\n';
                    bbcode += '[td][size=' + big + '][b][color=#17B4FF]' + values.tops[i].pseudo + ' [/color][/b][/size] [size=10][color=#8AD9FF][i]' + values.tops[i].alliance + ' [/i][/color][/size][/td]\n';
                    bbcode += '[td][size=' + small + ']' + values.tops[i].points + '[/size][/td]\n';
                    bbcode += '[td][color=#00cc00][size=11][b]' + values.tops[i].progression + ' [/b][/size][/color][/td]\n';
                    bbcode += '[td][size=8](' + values.tops[i].pourcentage + ')[/size][/td]\n';
                    bbcode += '[/tr]\n\n';
                }
            }
            bbcode += '[/table][/td]\n';
        }
        if( values.flops[0].pseudo.length > 0 ) {
            bbcode += '[td][table]\n';
            for(let i=0; i<values.flops.length; i++){
                if( values.flops[i].pseudo.length > 0 ) {
                    bbcode += '[tr][td][size=' + small + ']' + values.flops[i].position + '[/size][/td]\n';
                    bbcode += '[td][size=' + big + '][b][color=#17B4FF]' + values.flops[i].pseudo + ' [/color][/b][/size] [size=' + small + '][color=#8AD9FF][i]' + values.flops[i].alliance + ' [/i][/color][/size][/td]\n';
                    bbcode += '[td][size=' + small + ']' + values.flops[i].points + '[/size][/td]\n';
                    bbcode += '[td][color=#FF0000][size=' + medium + '][b]' + values.flops[i].progression + ' [/b][/size][/color][/td]\n';
                    bbcode += '[td][size=' + verySmall + '](' + values.flops[i].pourcentage + ')[/size][/td]\n';
                    bbcode += '[/tr]\n\n';
                }
            }
            bbcode += '[/table][/td]\n';
        }
    }
    bbcode += '[/tr][/table][/' + closeBaliseCenter + ']\n';
    bbcode += '[' + baliseCenter + '][size=' + verySmall + ']By www.mmorpg-stat.eu [color=#aaaaaa]' + update + '[/color][/size][/' + closeBaliseCenter + ']\n';
    bbcode += '[' + baliseCenter + '][size=' + verySmall + ']with [url=https://openuserjs.org/scripts/Choubakawa/Export_BBCODE_mmorpg-stat_from_Main_Page]Export BBCODE mmorpg-stat from Main Page[/url] by [url=https://twitter.com/Choubakawa]Choubakawa[/url][/size][/' + closeBaliseCenter + ']';

    return bbcode;
}

function copy( bbcode ) {

    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val(bbcode).select();
    document.execCommand("copy");
    $temp.remove();
    let spanText = document.createElement("span");
    spanText.setAttribute( 'style', 'float: left;margin: 3px 0px 0px 10px ' );
    $( '#spanTextCopied' ).text( 'Copié !' );
    setTimeout(function () {
        $( '#spanTextCopied' ).text( '' );
    }, 3000);
}

if( addButtonExport() ) {

    $("#exportButtonBoardFR").click(function () {

        let bbcode = generateBBCODE( getTopFLop(), "BOARD", "center" );
        copy( bbcode );
    });

    $("#exportButtonBoard").click(function () {

        let bbcode = generateBBCODE( getTopFLop(), "BOARD", "align" );
        copy( bbcode );
    });

    $("#exportButtonFA").click(function () {

        let bbcode = generateBBCODE( getTopFLop(), "FORUMACTIF", "center" );
        copy( bbcode );
    });
}
