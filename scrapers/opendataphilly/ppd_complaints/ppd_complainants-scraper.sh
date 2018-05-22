#!/bin/bash

jq -c '.rows | .[] | {cartodb_id: .cartodb_id, the_geom: .the_geom, the_geom_webmercator: .the_geom_webmercator, cap_number: .cap_number, complainant_sex: .complainant_sex, complainant_race: .complainant_race, complainant_age: .complainant_age, complainant_initials: .complainant_initials}'
