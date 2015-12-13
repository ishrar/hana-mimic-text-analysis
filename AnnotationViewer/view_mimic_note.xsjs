var noteId = $.request.parameters.get("noteid");

var headText = '<html lang="en"><head><title>MIMIC 2.6 Clinical Text</title><meta content="text/html; charset=UTF-8" http-equiv="Content-Type">';
headText += '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css" integrity="sha512-dTfge/zgoMYpP7QbHy4gWMEGsbsdZeCXz7irItjcC3sPUFtf0kuFbDz/ixG7ArTxmDjLXDmezHubeNikyKGVyQ==" crossorigin="anonymous">';
headText += '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap-theme.min.css" integrity="sha384-aUGj/X2zp5rLCbBxumKTCw2Z50WgIr1vs/PFN4praOTvYXWlVyh2UtNUU0KAUhAX" crossorigin="anonymous">';
headText += '<link href="css/bootstrap-multiselect.css" media="screen" rel="stylesheet" type="text/css">';
headText += '<style>.hilite {background: yellow;} .find-hilite {background: pink;} span[class*="med_SECTION"] {font-weight: bold;} .affix {top: 20px;} .vscroll {max-height:300px; overflow-y:scroll;}</style></head>';

var bodyText = '<body>';
bodyText += '<div class="container">';
bodyText += '<div class="row"><h1>Clinical Notes in MIMIC 2.6</h1>';

var conn = $.hdb.getConnection();
var rs = conn.executeQuery('select "SUBJECT_ID", "HADM_ID", "ICUSTAY_ID", "CHARTTIME", "CATEGORY", "TITLE"  from "ISHRAR"."noteevents" where "NOTE_ID" = ?', noteId);
var row;

bodyText += '<h2>Category: <em>'+rs[0]['CATEGORY'].replace("_"," ")+'</em></h2>';
bodyText += '<h3>Subject ID: <em>'+rs[0]['SUBJECT_ID']+'</em><br />Date: <em>'+rs[0]['CHARTTIME']+'</em></h2>';
bodyText += '</div>';

rs = conn.executeQuery('SELECT replace("TA_TYPE",\'\/\',\'__\') as "TYPE" FROM "ISHRAR"."$TA_NOTEEVENTS_INDEX" WHERE "NOTE_ID" = ? AND "TA_TYPE" like \'med_%\' group by "TA_TYPE" order by "TA_TYPE"', noteId);

bodyText += '<div class="row">';
bodyText += '<div class="col-sm-12 col-md-4 col-md-push-8"><div class="form-group" id="ann_labels" data-spy="affix" data-offset-top="205"><label for="umls">Select UMLS Concept Types:</label><br /><select id="umls" class="form-control" name="umls" multiple>';

for (row in rs)
	bodyText += '<option value="' + rs[row]['TYPE'] + '">' + rs[row]['TYPE'] + '</option>';

bodyText += '</select></div></div>';
bodyText += '<div class="col-sm-12 col-md-8 col-md-pull-4" id="note_body"><p>';

var fnHL = conn.loadProcedure('ISHRAR', 'HIGHLIGHT_ENTITIES');
var result = fnHL(noteId, 'med_%');
var result_text = result['o_result'].replace(/<\/br>\s*([a-z])/g,' $1');
result_text = result_text.replace(/<\/br>\s*(<span class=\"med_SECTION)/g,'</p><p>$1');
result_text = result_text.replace(/<\/br>\s*([0-9]+\.\s+<span class=\"med_SECTION)/g,'</p><p>$1');
result_text = result_text.replace(/<\/br>\s*(<\/?\w+((\s+\w+(\s*=\s*(?:".*?"|'.*?'|[^'">\s]+))?)+\s*|\s*)\/?>[a-z])/g,' $1');
conn.close();

bodyText += result_text;
bodyText += '</p></div>';
bodyText += '</div>';
bodyText += '</div></div>';

var scripts = '<script src="js/jquery-1.11.1.min.js" type="text/javascript"></script><script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js" integrity="sha512-K1qjQ+NcF2TYO/eI3M6v8EiNYZfA95pQumfvcVrTHtwQVDG+aHRqLi/ETn2uB+1JqwYqVG3LIvdm9lj6imS/pQ==" crossorigin="anonymous"></script>';
scripts += '<script src="js/bootstrap-multiselect.js" type="text/javascript"></script>';
scripts += '<script type="text/javascript">$(document).ready(function(){';
scripts += "$.getparams = function(param){var results = new RegExp('[\\?&]' + param + '=([^&#]*)').exec(window.location.href);if (results==null){return null;}else{return results[1] || 0;}};var search_text = decodeURIComponent($.getparams('search_text').replace(/\\+/g,  \" \")); var noteHtml = $('#note_body').html();if (search_text!=null && search_text!='null' && search_text!='') { var search_re = new RegExp('('+search_text+')', 'gi'); noteHtml = noteHtml.replace(search_re,'<span class=\\\'find-hilite\\\'>$1<\/span>');} $('#note_body').html(noteHtml);";
scripts += '$(\'#umls\').multiselect({enableFiltering: true, maxHeight: 300, enableCaseInsensitiveFiltering: true, includeSelectAllOption: true, onChange: function(option, checked, select) {$("span").removeClass("hilite");$("span").popover(\'destroy\');$(\'#umls option:selected\').each(function() {var item = $( this ).text(); jQuery(document.getElementsByClassName(item)).addClass(\'hilite\');jQuery(document.getElementsByClassName(item)).popover({html: true,trigger: "hover",animation: false,placement: "bottom"});});}, onSelectAll: function(option, checked, select) {$("span").removeClass("hilite");$("span").popover(\'destroy\');$(\'#umls option:selected\').each(function() {var item = $( this ).text(); jQuery(document.getElementsByClassName(item)).addClass(\'hilite\');jQuery(document.getElementsByClassName(item)).popover({html: true,trigger: "hover",animation: false,placement: "bottom"});});}});});</script>';
scripts += '</body></html>';

$.response.contentType = "text/html";
$.response.setBody(headText + bodyText + scripts);
