#!/bin/bash

DEBUG_INGESTOR=false

WORKING_DIR="$(dirname $BASH_SOURCE[0])"
INGESTOR_CONFIGS_DIR="$WORKING_DIR/ingestor/datasets"

echo "Ingestor"
echo

ADDITIONAL_PARAMS=""

while [[ $1 == -* ]]; do
  ADDITIONAL_PARAMS="$ADDITIONAL_PARAMS $1"
  shift
done

function debug_message {
  if [[ $DEBUG_INGESTOR == true ]]; then
    echo "DEBUG: $@"
  fi
}
debug_message "Working dir: $WORKING_DIR"

INGEST_LIST="$@"
if [ -z "$INGEST_LIST" ]; then
  for ingestor in $(find ingestor/datasets/ -type f); do
    filtered=${ingestor##*/}
    filtered=${filtered%.json}
    INGEST_LIST="$INGEST_LIST $filtered"
  done
fi

debug_message "Ingest list: $INGEST_LIST"
for ingest_item in $INGEST_LIST; do
  if [ ! -f "$INGESTOR_CONFIGS_DIR/$ingest_item.json" ]; then
    echo "No dataset config for $ingest_item"
    continue
  fi

  debug_message "START INGEST: $ingest_item"
  debug_message
  $WORKING_DIR/ingestor/ingestor.js $ADDITIONAL_PARAMS $ingest_item $INGESTOR_CONFIGS_DIR/$ingest_item.json
  debug_message
  debug_message "END INGEST: $ingest_item"
done
