#!/bin/bash

# Stop all running
docker stop $(docker ps -a -q)

# Remove stoped
docker rm $(docker ps -qa --no-trunc --filter "status=exited")

# Remove untagged images (!all, careful with this)
docker image prune -f

# Remove exactly abalint built image
docker image rm abaplint-backend
