#!/bin/bash

jq -c '.rows | .[] | {cartodb_id: .cartodb_id, the_geom: .the_geom, the_geom_webmercator: .the_geom_webmercator, cap_number: .cap_number, po_initials: .po_initials, po_race: .po_race, po_sex: .po_sex, allegations_investigated: .allegations_investigated, investigative_findings: .investigative_findings, disciplinary_findings: .disciplinary_findings}'
