FROM tiangolo/nginx-rtmp

COPY src/conf/nginx.conf /etc/nginx/nginx.conf

RUN mkdir -p /home/croco/radio/hls
VOLUME /home/croco/radio/hls
