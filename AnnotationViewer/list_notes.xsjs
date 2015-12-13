var startOffset = $.request.parameters.get("start");
var limitResults = $.request.parameters.get("length");
var noteType = $.request.parameters.get("noteType");
var s_id = $.request.parameters.get("s_id");
var h_id = $.request.parameters.get("h_id");
var tsearch = $.request.parameters.get("tsearch");
var psearch = $.request.parameters.get("psearch");

if (startOffset == null || startOffset == 'null' || startOffset == '') startOffset = 0;
if (limitResults == null || startOffset == 'null' || startOffset == '') limitResults = 10;

var conn = $.hdb.getConnection();
var rs = conn.executeQuery('select COUNT(*) AS "TOTAL_REC" from "ISHRAR"."noteevents"');
var total = rs[0]['TOTAL_REC'];
var totalFlt = rs[0]['TOTAL_REC'];
var whrClause = '';

if (
	(noteType != null && noteType != '' && noteType != undefined && noteType != 'null')
	|| (s_id != null && s_id != '' && s_id != undefined && s_id != 'null')
	|| (h_id != null && h_id != '' && h_id != undefined && h_id != 'null')
	|| (tsearch != null && tsearch != '' && tsearch != undefined && tsearch != 'null')
	|| (psearch != null && psearch != '' && psearch != undefined && psearch != 'null')
) {

	var searchText = '';
	
	if (noteType != null && noteType != '' && noteType != undefined && noteType != 'null') {
		if(whrClause != '') whrClause += ' and ';
		whrClause += 'UPPER("CATEGORY") like \'%'+noteType.toUpperCase()+'%\'';
	}
	if (s_id != null && s_id != '' && s_id != undefined && s_id != 'null') {
		if(whrClause != '') whrClause += ' and ';
		whrClause += 'SUBJECT_ID = '+ s_id;
	}
	if (h_id != null && h_id != '' && h_id != undefined && h_id != 'null') {
		if(whrClause != '') whrClause += ' and ';
		whrClause += 'HADM_ID = '+ h_id;
	}
	if (tsearch != null && tsearch != '' && tsearch != undefined && tsearch != 'null') {
		searchText = '&search_text='+encodeURIComponent(tsearch.replace(/'/g,"%27").replace(/"/g,"%22"));
		if(whrClause != '') whrClause += ' and ';
		whrClause += '"NOTE_ID" IN (select distinct "NOTE_ID" from "ISHRAR"."$TA_NOTEEVENTS_INDEX" where upper("TA_TOKEN") = \''+tsearch.toUpperCase()+'\')';
	}
	if (psearch != null && psearch != '' && psearch != undefined && psearch != 'null') {
		searchText = '&search_text='+encodeURIComponent(psearch.replace(/'/g,"%27").replace(/"/g,"%22"));
		if(whrClause != '') whrClause += ' and ';
		whrClause += '"NOTE_ID" IN (select distinct "NOTE_ID" from "ISHRAR"."$TA_NOTEEVENTS_INDEX" where upper("TA_TOKEN") like \'%'+psearch.toUpperCase()+'%\')';
	}
	
	rs = conn.executeQuery('select COUNT(*) AS "TOTAL_FLT" from "ISHRAR"."noteevents" where '+whrClause);
	totalFlt = rs[0]['TOTAL_FLT'];
	rs = conn.executeQuery('select "SUBJECT_ID", "HADM_ID", "ICUSTAY_ID", TO_VARCHAR("CHARTTIME") AS "CHARTTIME", "CGID", "CUID", "CATEGORY", "TITLE", \'<a href="view_mimic_note.xsjs?noteid=\' || TO_VARCHAR("NOTE_ID") || \''+searchText+'">View</a>\' AS "View" from "ISHRAR"."noteevents" where ' + whrClause + ' ORDER BY "SUBJECT_ID", "HADM_ID", "ICUSTAY_ID", "CHARTTIME" LIMIT ? OFFSET ?',limitResults,startOffset);
} else {
	rs = conn.executeQuery('select "SUBJECT_ID", "HADM_ID", "ICUSTAY_ID", TO_VARCHAR("CHARTTIME") AS "CHARTTIME", "CGID", "CUID", "CATEGORY", "TITLE", \'<a href="view_mimic_note.xsjs?noteid=\' || TO_VARCHAR("NOTE_ID") || \'">View</a>\' AS "View" from "ISHRAR"."noteevents" ORDER BY "SUBJECT_ID", "HADM_ID", "ICUSTAY_ID", "CHARTTIME" LIMIT ? OFFSET ?',limitResults,startOffset);
}
var arr = [];
for(var x in rs) arr.push(rs[x]);

var outputArr = {};
//outputArr["draw"] = 1;
outputArr["recordsTotal"] = total;
outputArr["recordsFiltered"] = totalFlt;
outputArr["data"] = arr;

$.response.contentType = "application/json";
$.response.setBody(JSON.stringify(outputArr));
