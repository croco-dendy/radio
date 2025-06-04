#!/bin/bash

docker stop rtmp-server || true
docker rm rtmp-server || true
docker run -d -p 1935:1935 -p 8069:8069 --name rtmp-server rtmp
