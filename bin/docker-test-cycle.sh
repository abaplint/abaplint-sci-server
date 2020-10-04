#!/bin/bash
bin/docker-build.sh
if [ $? != 0 ]; then
    echo "Build failed"
    exit 1
fi

bin/docker-run.sh -d
sleep 2s

bin/docker-test.sh
docker stop $(docker ps -a -q)
