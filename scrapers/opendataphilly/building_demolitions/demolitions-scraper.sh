#!/bin/bash

API_URL='https://phl.carto.com/api/v2/sql?q=SELECT%20*%20FROM%20li_demolitions'

if [[ -n "$1" ]] && [[ "upload" == "$1" ]]; then
  UPLOAD_DATA="true"
fi

if [ "true" == "$UPLOAD_DATA" ]; then
  curl $API_URL | jq -c '.rows | .[] | {cartodb_id: .cartodb_id, the_geom: .the_geom, the_geom_webmercator: .the_geom_webmercator, objectid: .objectid, addresskey: .addresskey, opa_account_num: .opa_account_num, address: .address, unit: .unit, zip: .zip, censustract: .censustract, ownername: .ownername, organization: .organization, caseorpermitnumber: .caseorpermitnumber, record_type: .record_type, typeofwork: .typeofwork, city_demo: .city_demo, start_date: .start_date, completed_date: .completed_date, permitstatus: .permitstatus, status: .status, applicantcapacity: .applicantcapacity, primarycontact: .primarycontact, contractorname: .contractorname, contractortype: .contractortype, contractoraddress1: .contractoraddress1, contractoraddress2: .contractoraddress2, contractorcity: .contractorcity, contractorstate: .contractorstate, contractorzip: .contractorzip, mostrecentinsp: .mostrecentinsp, geocode_x: .geocode_x, geocode_y: .geocode_y}' | $(dirname $BASH_SOURCE)/create_or_update_ppd_complaints.js
else
  curl $API_URL | jq -c '.rows | .[] | {cartodb_id: .cartodb_id, the_geom: .the_geom, the_geom_webmercator: .the_geom_webmercator, objectid: .objectid, addresskey: .addresskey, opa_account_num: .opa_account_num, address: .address, unit: .unit, zip: .zip, censustract: .censustract, ownername: .ownername, organization: .organization, caseorpermitnumber: .caseorpermitnumber, record_type: .record_type, typeofwork: .typeofwork, city_demo: .city_demo, start_date: .start_date, completed_date: .completed_date, permitstatus: .permitstatus, status: .status, applicantcapacity: .applicantcapacity, primarycontact: .primarycontact, contractorname: .contractorname, contractortype: .contractortype, contractoraddress1: .contractoraddress1, contractoraddress2: .contractoraddress2, contractorcity: .contractorcity, contractorstate: .contractorstate, contractorzip: .contractorzip, mostrecentinsp: .mostrecentinsp, geocode_x: .geocode_x, geocode_y: .geocode_y}'
fi
