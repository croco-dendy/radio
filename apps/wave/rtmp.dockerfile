FROM tiangolo/nginx-rtmp

COPY src/conf/nginx.conf /etc/nginx/nginx.conf

# Create directories for HLS and audio
RUN mkdir -p /data/hls /data/audio

# Add health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:8069/health || exit 1

# Expose RTMP and HTTP ports
EXPOSE 1935 8069
