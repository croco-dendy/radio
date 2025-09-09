# 📡 API Documentation

Complete API documentation for the Radio Streaming Platform.

## 🚀 Quick Start

The Radio Streaming Platform provides a comprehensive REST API for managing streaming operations, track management, and system monitoring.

### Base URLs
- **Development**: `http://localhost:6970`
- **Production**: `https://wave.adoo.one`

### Authentication
Currently, the API does not require authentication. All endpoints are publicly accessible.

## 📚 API Reference

### [📡 Streaming API](streaming.md)
Complete reference for all streaming-related endpoints:
- **Stream Control**: Telegram and RTMP stream management
- **Configuration Management**: Service configuration updates
- **RTMP Server**: RTMP server start/stop/restart
- **Telegram Integration**: Telegram streaming controls with daemon management
- **Service Monitoring**: Real-time service status and health

### [🔌 WebSocket API](websocket.md)
Real-time communication endpoints:
- **Connection Management**: WebSocket connection handling
- **Event Types**: Real-time event specifications
- **Message Format**: WebSocket message structure
- **Error Handling**: WebSocket error management

### [📊 Monitoring API](monitoring.md)
System monitoring and status endpoints:
- **Service Monitoring**: Real-time service status and health
- **Performance Metrics**: System performance data
- **Resource Usage**: CPU, memory, network metrics
- **Log Management**: System and service logs
- **Process Status**: External process monitoring

## 🎯 Key Features

### RESTful API
- **Consistent Interface**: Standard HTTP methods and status codes
- **JSON Responses**: All responses in JSON format
- **Error Handling**: Comprehensive error responses
- **CORS Support**: Cross-origin request support

### Real-time Updates
- **WebSocket Support**: Real-time communication
- **Event Broadcasting**: Automatic status updates
- **Client Synchronization**: Multi-client state sync
- **Connection Management**: Robust connection handling

### Comprehensive Coverage
- **Streaming Operations**: Complete streaming control
- **Track Management**: Full CRUD operations
- **Server Management**: RTMP and Telegram control
- **System Monitoring**: Health and performance monitoring

## 🔧 Usage Examples

### JavaScript/TypeScript
```typescript
class StreamingAPI {
  constructor(baseURL = 'http://localhost:6970') {
    this.baseURL = baseURL;
  }

  async request(endpoint: string, options: RequestInit = {}) {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return response.json();
  }

  // Monitoring operations
  async getMonitoringData() {
    return this.request('/api/monitoring/');
  }

  async getSystemHealth() {
    return this.request('/api/monitoring/health');
  }

  // Stream control operations
  async startTelegramStream() {
    return this.request('/api/stream/telegram/start', { method: 'POST' });
  }

  async getTelegramConfig() {
    return this.request('/api/stream/telegram/config');
  }
}
```

### cURL Examples
```bash
# Get monitoring data
curl http://localhost:6970/api/monitoring/

# Get system health
curl http://localhost:6970/api/monitoring/health

# Start Telegram stream
curl -X POST http://localhost:6970/api/stream/telegram/start

# Get Telegram configuration
curl http://localhost:6970/api/stream/telegram/config

# Start RTMP server
curl -X POST http://localhost:6970/api/stream/rtmp/start
```

### WebSocket Example
```javascript
const ws = new WebSocket('ws://localhost:6971');

ws.onopen = () => {
  console.log('Connected to WebSocket');
};

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log('Received:', data);
  
  switch (data.type) {
    case 'status_update':
      // Handle status update
      break;
    case 'track_change':
      // Handle track change
      break;
    case 'error':
      // Handle error
      break;
  }
};
```

## 📊 Response Format

### Success Response
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation completed successfully"
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message",
  "code": "ERROR_CODE"
}
```

## 🚨 Error Handling

### HTTP Status Codes
- `200` - Success
- `400` - Bad Request
- `404` - Not Found
- `500` - Internal Server Error

### Error Types
- `INVALID_MODE` - Invalid streaming mode
- `TRACK_NOT_FOUND` - Track not found
- `STREAM_ERROR` - Streaming error
- `RTMP_ERROR` - RTMP server error
- `TELEGRAM_ERROR` - Telegram stream error

## 🔄 Rate Limiting

Currently, there are no rate limits implemented. All endpoints are accessible without restrictions.

## 📈 Monitoring

### Health Checks
- **API Health**: `GET /health`
- **Monitoring Data**: `GET /api/monitoring/`
- **System Health**: `GET /api/monitoring/health`
- **Telegram Status**: `GET /api/monitoring/telegram`
- **RTMP Status**: `GET /api/monitoring/rtmp`

### Metrics
- **Response Time**: Average response time per endpoint
- **Error Rate**: Error rate per endpoint
- **Request Count**: Total requests per endpoint
- **Active Connections**: Number of active WebSocket connections

## 🔧 Development

### Testing the API
```bash
# Health check
curl http://localhost:6970/health

# Get monitoring data
curl http://localhost:6970/api/monitoring/

# Test WebSocket
wscat -c ws://localhost:6971
```

### API Documentation
- **OpenAPI Spec**: Available at `/api/docs` (future feature)
- **Interactive Docs**: Swagger UI integration (future feature)
- **Postman Collection**: Available in repository (future feature)

## 🎯 Best Practices

### Request Handling
- **Use HTTPS**: Always use HTTPS in production
- **Handle Errors**: Implement proper error handling
- **Validate Input**: Validate all input data
- **Rate Limiting**: Implement client-side rate limiting

### Response Processing
- **Check Status**: Always check HTTP status codes
- **Parse JSON**: Properly parse JSON responses
- **Handle Errors**: Implement error handling
- **Cache Responses**: Cache frequently accessed data

### WebSocket Usage
- **Connection Management**: Handle connection lifecycle
- **Error Handling**: Implement error handling
- **Reconnection**: Implement automatic reconnection
- **Message Validation**: Validate incoming messages

## 🔄 Versioning

### API Versioning
- **Current Version**: v1
- **Version Header**: `X-API-Version: v1`
- **Backward Compatibility**: Maintained for stable versions
- **Deprecation Policy**: 6-month deprecation notice

### Changelog
- **v1.0.0**: Initial API release
- **v1.1.0**: Added Telegram integration
- **v1.2.0**: Added RTMP server management
- **v1.3.0**: Enhanced error handling

## 🚀 Future Enhancements

### Planned Features
- **Authentication**: JWT-based authentication
- **Rate Limiting**: API rate limiting
- **API Versioning**: Proper API versioning
- **OpenAPI Spec**: Complete OpenAPI specification
- **GraphQL**: GraphQL endpoint support

### Performance Improvements
- **Response Compression**: Gzip compression
- **Caching Headers**: HTTP caching headers
- **Connection Pooling**: Database connection pooling
- **Load Balancing**: Multiple backend instances

---

**Next**: [Setup Guide](../setup/README.md) | [Architecture Overview](../docs/architecture.md)
