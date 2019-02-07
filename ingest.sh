#!/bin/bash

INGESTOR_COFNIGS_DIR="./ingestor/datasets/"

echo "Ingestor"
echo

INGEST_LIST="$@"
if [ -z "$INGEST_LIST" ]; then
  INGEST_LIST="*RUN ALL*"
fi

echo "Ingest list: $INGEST_LIST"
for ingest_item in "$INGEST_LIST"; do
  echo "Ingesting data for: $ingest_item"
done
