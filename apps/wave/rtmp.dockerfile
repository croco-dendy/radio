FROM tiangolo/nginx-rtmp

COPY src/conf/nginx.conf /etc/nginx/nginx.conf

# Create directories for HLS
RUN mkdir -p /home/croco/radio/hls

VOLUME ["/home/croco/radio/hls"]

# Expose RTMP and HTTP ports
EXPOSE 1935 8069
