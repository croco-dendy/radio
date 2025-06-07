FROM tiangolo/nginx-rtmp

COPY src/conf/nginx.conf /etc/nginx/nginx.conf

# Create directories for HLS and DASH segments
RUN mkdir -p /home/croco/radio/hls /home/croco/radio/dash

# Set proper permissions
# RUN chown -R nginx:nginx /home/croco/radio

VOLUME ["/home/croco/radio/hls", "/home/croco/radio/dash"]

# Expose RTMP and HTTP ports
EXPOSE 1935 8069
