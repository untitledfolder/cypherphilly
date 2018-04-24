#!/bin/bash

SCRAPERS="./"

if [[ -n "$1" ]] && [[ "-d" == "$1" ]] && [[ -n "$2" ]]; then
  shift
  SCRAPERS="$1"
  shift
fi

for scraper in `find $SCRAPERS -type f -iname "*-scraper.sh"`; do
  $scraper $@
done
