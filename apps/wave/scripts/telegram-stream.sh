#!/bin/bash

# Telegram Stream Manager Script
# Usage: ./telegram-stream.sh [start|stop|restart|status|config]

# Configuration
RTMP_URL="rtmps://dc4-1.rtmp.t.me/s/"
STREAM_KEY="3018999425:AeNfd0UEE2q5j2lc1PjFbg"
INPUT_URL="rtmp://localhost:1935/live/test"
QUALITY="medium"
PID_FILE="/tmp/telegram-stream.pid"
LOG_FILE="/tmp/telegram-stream.log"

# Quality presets
case $QUALITY in
  "low")
    VIDEO_BITRATE="800k"
    AUDIO_BITRATE="64k"
    ;;
  "medium")
    VIDEO_BITRATE="1500k"
    AUDIO_BITRATE="128k"
    ;;
  "high")
    VIDEO_BITRATE="2500k"
    AUDIO_BITRATE="192k"
    ;;
  *)
    VIDEO_BITRATE="1500k"
    AUDIO_BITRATE="128k"
    ;;
esac

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logging function
log() {
    echo -e "${GREEN}[$(date '+%Y-%m-%d %H:%M:%S')]${NC} $1" | tee -a "$LOG_FILE"
}

error() {
    echo -e "${RED}[$(date '+%Y-%m-%d %H:%M:%S')] ERROR:${NC} $1" | tee -a "$LOG_FILE"
}

warning() {
    echo -e "${YELLOW}[$(date '+%Y-%m-%d %H:%M:%S')] WARNING:${NC} $1" | tee -a "$LOG_FILE"
}

info() {
    echo -e "${BLUE}[$(date '+%Y-%m-%d %H:%M:%S')] INFO:${NC} $1" | tee -a "$LOG_FILE"
}

# Check if FFmpeg is installed
check_ffmpeg() {
    if ! command -v ffmpeg &> /dev/null; then
        error "FFmpeg is not installed. Please install FFmpeg first."
        exit 1
    fi
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

# Start streaming
start_stream() {
    if is_running; then
        warning "Telegram stream is already running (PID: $(cat $PID_FILE))"
        return 0
    fi

    log "Starting Telegram stream..."
    log "Input: $INPUT_URL"
    log "Output: ${RTMP_URL}${STREAM_KEY}"
    log "Quality: $QUALITY (${VIDEO_BITRATE} video, ${AUDIO_BITRATE} audio)"

    # Build FFmpeg command
    FFMPEG_CMD="ffmpeg -i '$INPUT_URL' \
        -c:v copy -c:a copy \
        -b:v $VIDEO_BITRATE -b:a $AUDIO_BITRATE \
        -preset ultrafast -tune zerolatency \
        -f flv '${RTMP_URL}${STREAM_KEY}'"

    # Start FFmpeg in background
    nohup bash -c "$FFMPEG_CMD" > "$LOG_FILE" 2>&1 &
    local pid=$!

    # Save PID
    echo "$pid" > "$PID_FILE"

    # Wait a moment to see if it starts successfully
    sleep 2

    if kill -0 "$pid" 2>/dev/null; then
        log "✅ Telegram stream started successfully (PID: $pid)"
        log "Logs: tail -f $LOG_FILE"
        return 0
    else
        error "❌ Failed to start Telegram stream"
        rm -f "$PID_FILE"
        return 1
    fi
}

# Stop streaming
stop_stream() {
    if ! is_running; then
        warning "Telegram stream is not running"
        return 0
    fi

    local pid=$(cat "$PID_FILE")
    log "Stopping Telegram stream (PID: $pid)..."

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
    log "✅ Telegram stream stopped"
}

# Restart streaming
restart_stream() {
    log "Restarting Telegram stream..."
    stop_stream
    sleep 2
    start_stream
}

# Show status
show_status() {
    echo -e "\n${BLUE}📊 Telegram Stream Status${NC}"
    echo "=========================="
    
    if is_running; then
        local pid=$(cat "$PID_FILE")
        local uptime=$(ps -o etime= -p "$pid" 2>/dev/null || echo "N/A")
        
        echo -e "Status: ${GREEN}🟢 Running${NC}"
        echo "PID: $pid"
        echo "Uptime: $uptime"
        echo "Log file: $LOG_FILE"
        
        # Show recent logs
        echo -e "\n${BLUE}Recent logs:${NC}"
        tail -n 10 "$LOG_FILE" 2>/dev/null || echo "No logs yet"
    else
        echo -e "Status: ${RED}🔴 Stopped${NC}"
    fi

    echo -e "\n${BLUE}Configuration:${NC}"
    echo "Input URL: $INPUT_URL"
    echo "RTMP URL: $RTMP_URL"
    echo "Stream Key: ${STREAM_KEY:0:8}..."
    echo "Quality: $QUALITY"
    echo "Video Bitrate: $VIDEO_BITRATE"
    echo "Audio Bitrate: $AUDIO_BITRATE"
}

# Show configuration
show_config() {
    echo -e "\n${BLUE}⚙️ Current Configuration${NC}"
    echo "=========================="
    echo "RTMP_URL: $RTMP_URL"
    echo "STREAM_KEY: $STREAM_KEY"
    echo "INPUT_URL: $INPUT_URL"
    echo "QUALITY: $QUALITY"
    echo "VIDEO_BITRATE: $VIDEO_BITRATE"
    echo "AUDIO_BITRATE: $AUDIO_BITRATE"
}

# Update configuration
update_config() {
    local key="$1"
    local value="$2"
    
    case $key in
        "rtmp_url")
            RTMP_URL="$value"
            log "Updated RTMP_URL to: $value"
            ;;
        "stream_key")
            STREAM_KEY="$value"
            log "Updated STREAM_KEY to: $value"
            ;;
        "input_url")
            INPUT_URL="$value"
            log "Updated INPUT_URL to: $value"
            ;;
        "quality")
            QUALITY="$value"
            log "Updated QUALITY to: $value"
            # Recalculate bitrates
            case $QUALITY in
                "low")
                    VIDEO_BITRATE="800k"
                    AUDIO_BITRATE="64k"
                    ;;
                "medium")
                    VIDEO_BITRATE="1500k"
                    AUDIO_BITRATE="128k"
                    ;;
                "high")
                    VIDEO_BITRATE="2500k"
                    AUDIO_BITRATE="192k"
                    ;;
            esac
            log "Updated bitrates: ${VIDEO_BITRATE} video, ${AUDIO_BITRATE} audio"
            ;;
        *)
            error "Unknown configuration key: $key"
            return 1
            ;;
    esac
}

# Show logs
show_logs() {
    if [ -f "$LOG_FILE" ]; then
        echo -e "\n${BLUE}📋 Recent Logs${NC}"
        echo "=============="
        tail -n 50 "$LOG_FILE"
    else
        echo "No log file found"
    fi
}

# Main function
main() {
    local command="$1"
    local subcommand="$2"
    local value="$3"

    # Check FFmpeg
    check_ffmpeg

    case $command in
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
            case $subcommand in
                "show")
                    show_config
                    ;;
                "set")
                    if [ -z "$subcommand" ] || [ -z "$value" ]; then
                        error "Usage: $0 config set <key> <value>"
                        error "Available keys: rtmp_url, stream_key, input_url, quality"
                        exit 1
                    fi
                    update_config "$subcommand" "$value"
                    ;;
                *)
                    error "Usage: $0 config <show|set>"
                    exit 1
                    ;;
            esac
            ;;
        "logs")
            show_logs
            ;;
        "help"|*)
            echo -e "\n${BLUE}🎥 Telegram Stream Manager${NC}"
            echo "========================="
            echo "Usage: $0 <command> [options]"
            echo ""
            echo "Commands:"
            echo "  start                    Start the Telegram stream"
            echo "  stop                     Stop the Telegram stream"
            echo "  restart                  Restart the Telegram stream"
            echo "  status                   Show current status and configuration"
            echo "  config show              Show current configuration"
            echo "  config set <key> <value> Update configuration"
            echo "  logs                     Show recent logs"
            echo "  help                     Show this help message"
            echo ""
            echo "Configuration Keys:"
            echo "  rtmp_url     - Telegram RTMP server URL"
            echo "  stream_key   - Your stream key"
            echo "  input_url    - Source RTMP URL"
            echo "  quality      - Stream quality: low, medium, high"
            echo ""
            echo "Examples:"
            echo "  $0 start"
            echo "  $0 status"
            echo "  $0 config set quality high"
            echo "  $0 config show"
            ;;
    esac
}

# Handle script exit
cleanup() {
    log "Shutting down gracefully..."
    stop_stream
    exit 0
}

# Set up signal handlers
trap cleanup SIGINT SIGTERM

# Run main function
main "$@"
