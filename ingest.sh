#!/bin/bash

INGESTOR_CONFIGS_DIR="./ingestor/datasets"

echo "Ingestor"
echo

INGEST_LIST="$@"
if [ -z "$INGEST_LIST" ]; then
  INGEST_LIST="*RUN ALL*"
fi

echo "Ingest list: $INGEST_LIST"
for ingest_item in "$INGEST_LIST"; do
  if [ ! -f "$INGESTOR_CONFIGS_DIR/$ingest_item/config.json" ]; then
    echo "No dataset config for $ingest_item"
    continue
  fi

  echo "START INGEST: $ingest_item"
  ./ingestor/ingestor.js $INGESTOR_CONFIGS_DIR/$ingest_item/config.json
  echo "END INGEST: $ingest_item"
done
