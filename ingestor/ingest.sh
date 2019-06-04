#!/bin/bash

DEBUG_INGESTOR=false

WORKING_DIR="$(dirname $BASH_SOURCE[0])"
INGESTOR_CONFIGS_DIR="$WORKING_DIR/../datasets"

echo "Ingestor"
echo

ADDITIONAL_PARAMS=""

while [[ $1 == -* ]]; do
  if [ "-d" == "$1" ]; then
    shift
    INGESTOR_CONFIGS_DIR="$1"
  else
    ADDITIONAL_PARAMS="$ADDITIONAL_PARAMS $1"
  fi

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
  for ingestor in $(find $INGESTOR_CONFIGS_DIR -type f); do
    filtered=${ingestor##*/}
    echo $filtered
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
  node $WORKING_DIR/ingestor.js $ADDITIONAL_PARAMS $ingest_item $INGESTOR_CONFIGS_DIR/$ingest_item.json &
done

wait
