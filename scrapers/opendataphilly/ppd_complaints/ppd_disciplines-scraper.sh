#!/bin/bash

API_URL='https://phl.carto.com/api/v2/sql?q=SELECT%20*%20FROM%20ppd_complaint_disciplines'
if [[ -n "$1" ]] && [[ "upload" == "$1" ]]; then
  UPLOAD_DATA="true"
fi

if [ "true" == "$UPLOAD_DATA" ]; then
  curl $API_URL | jq -c '.rows | .[] | {cartodb_id: .cartodb_id, the_geom: .the_geom, the_geom_webmercator: .the_geom_webmercator, cap_number: .cap_number, po_initials: .po_initials, po_race: .po_race, po_sex: .po_sex, allegations_investigated: .allegations_investigated, investigative_findings: .investigative_findings, disciplinary_findings: .disciplinary_findings}' | $(dirname $BASH_SOURCE)/create_or_update_ppd_disciplines.js
else
  curl $API_URL | jq -c '.rows | .[] | {cartodb_id: .cartodb_id, the_geom: .the_geom, the_geom_webmercator: .the_geom_webmercator, cap_number: .cap_number, po_initials: .po_initials, po_race: .po_race, po_sex: .po_sex, allegations_investigated: .allegations_investigated, investigative_findings: .investigative_findings, disciplinary_findings: .disciplinary_findings}'
fi
