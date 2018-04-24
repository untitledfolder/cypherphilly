#!/bin/bash

SCRAPERS="./scrapers"

if [ -n "$1" ]; then
  SCRAPERS="$1"
  shift
fi

for scraper in `find $SCRAPERS -type f -iname "*-scraper.sh"`; do
  echo "Scraper: $scraper"
done
