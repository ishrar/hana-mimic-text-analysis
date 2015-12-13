var headText = '<html lang="en"><head><title>Search MIMIC 2.6 Clinical Notes</title><meta content="text/html; charset=UTF-8" http-equiv="Content-Type">';
headText += '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css" integrity="sha512-dTfge/zgoMYpP7QbHy4gWMEGsbsdZeCXz7irItjcC3sPUFtf0kuFbDz/ixG7ArTxmDjLXDmezHubeNikyKGVyQ==" crossorigin="anonymous">';
headText += '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap-theme.min.css" integrity="sha384-aUGj/X2zp5rLCbBxumKTCw2Z50WgIr1vs/PFN4praOTvYXWlVyh2UtNUU0KAUhAX" crossorigin="anonymous">';
headText += '<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/s/bs-3.3.5/jqc-1.11.3,dt-1.10.10,b-1.1.0,sc-1.4.0,se-1.1.0/datatables.min.css"/>';
headText += '</head>';

var bodyText = '<body>';
bodyText += '<div class="container">';
bodyText += '<div class="row"><h1>Search Clinical Notes in MIMIC 2.6</h1>';
bodyText += '<form role="form" id="search_notes">';
bodyText += '<div class="form-group">';
bodyText += '  <label class="sr-only" for="sid">Subject ID:</label>';
bodyText += '  <input type="text" class="form-control" id="s_id" placeholder="Enter Subject ID">';
bodyText += '</div>';
bodyText += '<div class="form-group">';
bodyText += '  <label class="sr-only" for="h_id">Hospital Admission ID:</label>';
bodyText += '  <input type="text" class="form-control" id="h_id" placeholder="Enter Hospital Admission ID">';
bodyText += '</div>';
bodyText += '<div class="form-group">';
bodyText += '</div>';
bodyText += '<div class="form-group form-inline">';
bodyText += '  <label class="sr-only" for="n_type">Note Category:</label>';
bodyText += '  <select class="form-control" id="n_type">';
bodyText += '<option value="" disabled selected>Select note category</option>';
var conn = $.hdb.getConnection();
var rs = conn.executeQuery('select distinct "CATEGORY" as "CAT" from "ISHRAR"."noteevents" order by "CATEGORY"');
var row;
for (row in rs)
	bodyText += '<option value="' + rs[row].CAT + '">' + rs[row].CAT.replace("_"," ") + '</option>';
bodyText += '  </select>';
bodyText += '  <label class="sr-only" for="tsearch">Text Search:</label>';
bodyText += '  <input type="text" class="form-control" id="tsearch" placeholder="Enter a phrase to search">';
bodyText += '  <div class="checkbox">';
bodyText += '    <label><input type="checkbox" id="psearch" name="psearch" value="true"> Partial Search</label>';
bodyText += '  </div>';
bodyText += '</div>';
bodyText += '<button type="submit" class="btn btn-primary">Search</button> ';
bodyText += '<button type="reset" class="btn btn-danger">Reset</button>';
bodyText += '</form>';

bodyText += '</div>';

var tableHeaders = ["SUBJECT_ID", "HADM_ID", "ICUSTAY_ID", "CHARTTIME", "CGID", "CUID", "CATEGORY", "TITLE", "View"];

bodyText += '<div class="row"><table class="table table-striped table-hover table-bordered nowrap" id="notelist">';
bodyText += '<thead>';
bodyText += '<tr>';

var i;
for (i = 0; i < tableHeaders.length; i++) 
	bodyText += '<th>'+tableHeaders[i]+'</th>';

bodyText += '</tr>';
bodyText += '</thead>';
bodyText += '<tbody>';
bodyText += '</tbody>';
bodyText += '<tfoot>';
bodyText += '</tfoot>';
bodyText += '</table>';

bodyText += '</div>';
bodyText += '</div>';

var scripts = '<script src="http://jhyl00543023a.amer.global.corp.sap:8000/ishrar/AnnotationViewer/js/jquery-1.11.1.min.js" type="text/javascript"></script><script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js" integrity="sha512-K1qjQ+NcF2TYO/eI3M6v8EiNYZfA95pQumfvcVrTHtwQVDG+aHRqLi/ETn2uB+1JqwYqVG3LIvdm9lj6imS/pQ==" crossorigin="anonymous"></script>';
scripts += '<script type="text/javascript" src="https://cdn.datatables.net/s/bs-3.3.5/jqc-1.11.3,dt-1.10.10,b-1.1.0,sc-1.4.0,se-1.1.0/datatables.min.js"></script>';
scripts += '<script type="text/javascript">$(document).ready(function(){var notesTable = $(\'#notelist\').DataTable({"serverSide": true,"ajax": { "url" : "list_notes.xsjs" },"searching": false,"lengthChange": false,"columns": [ { "data": "'+tableHeaders[0]+'" }';
for (i = 1; i < tableHeaders.length; i++)
	scripts += ', { "data": "'+tableHeaders[i]+'" } ],';
scripts += '"columnDefs": [ { "targets": [ 0 ], "searchable": true }, { "targets": [ 1 ], "searchable": true }, { "targets": [ 2 ], "visible": false, "searchable": false }, { "targets": [ 3 ], "searchable": false }, { "targets": [ 4 ], "visible": false, "searchable": false }, { "targets": [ 5 ], "visible": false, "searchable": false } ], "scrollY" : 300, "deferRender" : true, "scroller" : { "loadingIndicator" : true }});$("#search_notes").on("submit", function (e) {notesTable.ajax.url("list_notes.xsjs?noteType=" + $("#n_type").val()+ "&s_id=" + $("#s_id").val()+ "&h_id=" + $("#h_id").val()+ ( ( $("#tsearch").val()!=\'\' ) ? ( "&" + ( ( $("#psearch").is(":checked") ) ? ( "psearch=" + encodeURIComponent($("#tsearch").val()).replace(/\'/g,"%27").replace(/"/g,"%22") ) : ( "tsearch=" + encodeURIComponent($("#tsearch").val()).replace(/\'/g,"%27").replace(/"/g,"%22") ) ) ) : "" )).load(); return false; }); $("#search_notes").on("reset", function (e) { notesTable.ajax.url("list_notes.xsjs").load(); return true; }); $("#search_notes").trigger("reset"); }); </script>';
scripts += '</body></html>';

conn.close();
$.response.contentType = "text/html";
$.response.setBody(headText + bodyText + scripts);
