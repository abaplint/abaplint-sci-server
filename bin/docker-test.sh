#!/bin/bash
RESPONSE=`curl -sS localhost:3000/healthz` || true
if [ "$RESPONSE" = "OK" ]; then
    echo "healthz is OK"
    exit 0
else
    echo "healthz failed: $RESPONSE"
    exit 1
fi
