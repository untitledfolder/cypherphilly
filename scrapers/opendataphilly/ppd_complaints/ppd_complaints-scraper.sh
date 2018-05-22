#!/bin/bash

jq -c '.rows | .[] | {cartodb_id: .cartodb_id, the_geom: .the_geom, the_geom_webmercator: .the_geom_webmercator, cap_number: .cap_number, date_received: .date_received, dist_occurrence: .dist_occurrence, general_cap_classification: .general_cap_classification, summary: .summary}'
