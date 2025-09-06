#!/bin/bash

docker build -t rtmp -f rtmp.dockerfile .

docker stop rtmp-server || true
docker rm rtmp-server || true

docker run -d \
  -p 1935:1935 \
  -p 8069:8069 \
  -v /home/croco/radio/audio:/data/audio \
  --name rtmp-server \
  --restart unless-stopped \
  rtmp
