#!/bin/bash

# Stream Manager Script for Radio Streaming
# Handles both live and radio mode streaming

# Configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DATA_DIR="$(dirname "$SCRIPT_DIR")/../data"
LOG_DIR="$(dirname "$SCRIPT_DIR")/../logs"
PID_FILE="$DATA_DIR/stream.pid"
LOG_FILE="$LOG_DIR/stream.log"
CONFIG_FILE="$DATA_DIR/stream-config.json"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logging functions
log() {
    echo -e "${BLUE}[$(date '+%Y-%m-%d %H:%M:%S')]${NC} $1" | tee -a "$LOG_FILE"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1" | tee -a "$LOG_FILE"
}

warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1" | tee -a "$LOG_FILE"
}

success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1" | tee -a "$LOG_FILE"
}

# Create necessary directories
create_directories() {
    mkdir -p "$DATA_DIR" "$LOG_DIR"
}

# Check if stream is running
is_running() {
    if [ -f "$PID_FILE" ]; then
        local pid=$(cat "$PID_FILE")
        if kill -0 "$pid" 2>/dev/null; then
            return 0
        else
            rm -f "$PID_FILE"
            return 1
        fi
    fi
    return 1
}

# Get current configuration
get_config() {
    if [ -f "$CONFIG_FILE" ]; then
        cat "$CONFIG_FILE"
    else
        echo '{"mode": "radio", "input_url": "https://stream.adoo.one/audio/money-for-nothing.mp3", "output_url": "rtmp://localhost:1935/live"}'
    fi
}

# Start live streaming
start_live_stream() {
    local config=$(get_config)
    local input_url=$(echo "$config" | jq -r '.input_url')
    local output_url=$(echo "$config" | jq -r '.output_url')
    
    log "Starting live stream..."
    log "Input: $input_url"
    log "Output: $output_url"
    
    # FFmpeg command for live streaming
    local ffmpeg_cmd="ffmpeg -i '$input_url' \
        -c:a aac \
        -b:a 128k \
        -ar 44100 \
        -ac 2 \
        -preset ultrafast \
        -tune zerolatency \
        -f flv '$output_url'"
    
    # Start FFmpeg in background
    nohup bash -c "$ffmpeg_cmd" > "$LOG_FILE" 2>&1 &
    local pid=$!
    
    # Save PID
    echo "$pid" > "$PID_FILE"
    
    # Wait a moment to see if it starts successfully
    sleep 2
    
    if kill -0 "$pid" 2>/dev/null; then
        success "Live stream started successfully (PID: $pid)"
        return 0
    else
        error "Failed to start live stream"
        rm -f "$PID_FILE"
        return 1
    fi
}

# Start radio streaming
start_radio_stream() {
    local config=$(get_config)
    local output_url=$(echo "$config" | jq -r '.output_url')
    local tracks_file="$DATA_DIR/audio-tracks.json"
    
    if [ ! -f "$tracks_file" ]; then
        error "No audio tracks file found"
        return 1
    fi
    
    # Create playlist from tracks
    local playlist_file="$DATA_DIR/playlist.m3u8"
    create_playlist "$tracks_file" "$playlist_file"
    
    log "Starting radio stream..."
    log "Playlist: $playlist_file"
    log "Output: $output_url"
    
    # FFmpeg command for radio streaming
    local ffmpeg_cmd="ffmpeg -f concat -safe 0 -i '$playlist_file' \
        -c:a aac \
        -b:a 128k \
        -ar 44100 \
        -ac 2 \
        -preset ultrafast \
        -f flv '$output_url'"
    
    # Start FFmpeg in background
    nohup bash -c "$ffmpeg_cmd" > "$LOG_FILE" 2>&1 &
    local pid=$!
    
    # Save PID
    echo "$pid" > "$PID_FILE"
    
    # Wait a moment to see if it starts successfully
    sleep 2
    
    if kill -0 "$pid" 2>/dev/null; then
        success "Radio stream started successfully (PID: $pid)"
        return 0
    else
        error "Failed to start radio stream"
        rm -f "$PID_FILE"
        return 1
    fi
}

# Create playlist from tracks
create_playlist() {
    local tracks_file="$1"
    local playlist_file="$2"
    
    log "Creating playlist from tracks..."
    
    # Create M3U8 playlist
    echo "#EXTM3U" > "$playlist_file"
    
    # Add tracks to playlist
    jq -r '.tracks[] | "#EXTINF:\(.duration // -1),\(.title)\n\(.url)"' "$tracks_file" >> "$playlist_file"
    
    log "Playlist created with $(jq '.tracks | length' "$tracks_file") tracks"
}

# Start streaming based on mode
start_stream() {
    if is_running; then
        warning "Stream is already running (PID: $(cat $PID_FILE))"
        return 0
    fi
    
    create_directories
    
    local config=$(get_config)
    local mode=$(echo "$config" | jq -r '.mode')
    
    case "$mode" in
        "live")
            start_live_stream
            ;;
        "radio")
            start_radio_stream
            ;;
        *)
            error "Unknown mode: $mode"
            return 1
            ;;
    esac
}

# Stop streaming
stop_stream() {
    if ! is_running; then
        warning "Stream is not running"
        return 0
    fi
    
    local pid=$(cat "$PID_FILE")
    log "Stopping stream (PID: $pid)..."
    
    # Try graceful shutdown first
    kill -TERM "$pid" 2>/dev/null
    sleep 2
    
    # Force kill if still running
    if kill -0 "$pid" 2>/dev/null; then
        warning "Force killing process..."
        kill -KILL "$pid" 2>/dev/null
        sleep 1
    fi
    
    # Clean up
    rm -f "$PID_FILE"
    success "Stream stopped"
}

# Restart streaming
restart_stream() {
    log "Restarting stream..."
    stop_stream
    sleep 2
    start_stream
}

# Show status
show_status() {
    echo -e "\n${BLUE}📊 Stream Status${NC}"
    echo "=================="
    
    if is_running; then
        local pid=$(cat "$PID_FILE")
        local config=$(get_config)
        local mode=$(echo "$config" | jq -r '.mode')
        
        success "Stream is RUNNING (PID: $pid)"
        echo "Mode: $mode"
        
        # Show uptime
        local start_time=$(stat -c %Y "$PID_FILE" 2>/dev/null || echo "0")
        local uptime=$(( $(date +%s) - start_time ))
        echo "Uptime: ${uptime}s"
        
        # Show recent logs
        echo -e "\n${BLUE}Recent logs:${NC}"
        tail -n 5 "$LOG_FILE" 2>/dev/null || echo "No logs available"
    else
        error "Stream is NOT RUNNING"
    fi
    
    echo ""
}

# Update configuration
update_config() {
    local new_config="$1"
    create_directories
    echo "$new_config" > "$CONFIG_FILE"
    success "Configuration updated"
}

# Main function
main() {
    case "${1:-help}" in
        "start")
            start_stream
            ;;
        "stop")
            stop_stream
            ;;
        "restart")
            restart_stream
            ;;
        "status")
            show_status
            ;;
        "config")
            if [ -n "$2" ]; then
                update_config "$2"
            else
                get_config
            fi
            ;;
        "help"|*)
            echo "Usage: $0 {start|stop|restart|status|config [json]}"
            echo ""
            echo "Commands:"
            echo "  start   - Start streaming"
            echo "  stop    - Stop streaming"
            echo "  restart - Restart streaming"
            echo "  status  - Show stream status"
            echo "  config  - Show or update configuration"
            echo ""
            echo "Configuration format:"
            echo '  {"mode": "live|radio", "input_url": "...", "output_url": "..."}'
            ;;
    esac
}

# Run main function with all arguments
main "$@"
