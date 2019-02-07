#!/bin/bash

echo "Ingestor"
echo

INGEST_LIST="$@"
if [ -z "$INGEST_LIST" ]; then
  INGEST_LIST="*RUN ALL*"
fi

echo "Ingest list: $INGEST_LIST"
