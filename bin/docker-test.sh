#!/bin/bash
RESPONSE=`curl -sS localhost:3000/healthz`
if [ "$RESPONSE" = "OK" ]; then
    echo "healthz is OK"
else
    echo "healthz failed: $RESPONSE"
    exit 1
fi

RESPONSE=`curl -sS localhost:3000/api/v1/ping`
if [ $? != 0 ]; then
    echo "ping failed: $RESPONSE"
    exit 1
else
    echo "ping OK: $RESPONSE"
    exit 0
fi
