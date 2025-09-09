# 🔄 Data Flow Documentation

This document describes the data flow patterns and information exchange within the Radio Streaming Platform.

## 🎯 Overview

The Radio Streaming Platform uses a combination of synchronous and asynchronous data flows to provide real-time streaming capabilities with comprehensive management features.

## 📊 Data Flow Patterns

### 1. Streaming Data Flow

```
Audio Source → RTMP Server → HLS Stream → Frontend Player
     ↓              ↓            ↓
Telegram Stream → Telegram → Telegram Channel
     ↓
Wave Backend → Admin Panel (Management)
```

#### Detailed Streaming Flow
1. **Audio Input**: External audio source (file, stream, microphone)
2. **RTMP Processing**: Docker-based RTMP server processes audio
3. **HLS Generation**: RTMP server generates HLS segments
4. **Stream Distribution**: 
   - HLS stream to player apps
   - Telegram stream to Telegram channels
5. **Management**: Wave backend coordinates all operations
6. **Monitoring**: Admin panel provides real-time management

### 2. API Request Flow

```
Client Request → Wave Backend → Service Layer → External Services
     ↓              ↓              ↓
Response ← JSON Response ← Service Response ← Process Result
```

#### Request Processing Steps
1. **Client Request**: HTTP request to API endpoint
2. **Route Handler**: Hono framework routes request
3. **Service Layer**: Appropriate service processes request
4. **External Integration**: Service interacts with external systems
5. **Response**: JSON response returned to client
6. **Real-time Update**: WebSocket broadcasts update (if applicable)

### 3. Real-time Updates Flow

```
System Change → Wave Backend → WebSocket Server → Connected Clients
     ↓              ↓              ↓
Status Update → Broadcast → Client Update → UI Refresh
```

#### Update Process
1. **System Change**: Streaming status, track change, error occurs
2. **Backend Detection**: Wave backend detects change
3. **WebSocket Broadcast**: Update sent to all connected clients
4. **Client Processing**: Clients receive and process update
5. **UI Update**: User interface updates automatically

## 🔄 Component Data Flow

### 1. Wave Backend Internal Flow

```
API Request → Route Handler → Service Layer → Data Layer
     ↓              ↓              ↓
Response ← JSON Response ← Service Response ← Data Response
```

#### Service Communication
- **StreamingService**: Main orchestrator
- **AudioTrackService**: Track management
- **TelegramStreamService**: Telegram integration
- **RtmpService**: RTMP server management

### 2. Admin Panel Data Flow

```
User Action → React Component → Custom Hook → API Service
     ↓              ↓              ↓
UI Update ← State Update ← Query Update ← API Response
```

#### React Query Integration
- **Query Hooks**: Data fetching and caching
- **Mutation Hooks**: Data modification operations
- **Cache Management**: Automatic cache invalidation
- **Background Refetch**: Data freshness maintenance

### 3. Frontend Data Flow

```
Audio Stream → HLS.js → Audio Element → Player Controls
     ↓              ↓            ↓
UI Update ← State Update ← Event Handler ← User Interaction
```

#### Audio Player Flow
- **HLS Stream**: HTTP Live Streaming source
- **HLS.js**: Stream processing and playback
- **Audio Element**: Browser audio handling
- **Player Controls**: User interaction handling

## 📡 API Data Flow

### 1. REST API Flow

```
Client → HTTP Request → Wave Backend → Service → External System
  ↓           ↓              ↓           ↓
Response ← JSON Response ← Service Response ← External Response
```

#### API Request Lifecycle
1. **Request Initiation**: Client sends HTTP request
2. **Route Processing**: Hono framework processes route
3. **Service Execution**: Appropriate service handles request
4. **External Integration**: Service interacts with external systems
5. **Response Generation**: Service generates response
6. **Client Delivery**: Response sent to client

### 2. WebSocket Flow

```
Client Connection → WebSocket Server → Event Handler → Broadcast
     ↓                    ↓              ↓
Client Update ← Message Processing ← Event Processing ← System Event
```

#### WebSocket Lifecycle
1. **Connection**: Client establishes WebSocket connection
2. **Event Detection**: System detects change
3. **Event Processing**: Backend processes event
4. **Message Broadcasting**: Update sent to all clients
5. **Client Processing**: Clients receive and process update
6. **UI Update**: User interface updates automatically

## 🗄️ Data Storage Flow

### 1. File-based Storage

```
Service Operation → Data Processing → File System → JSON Storage
     ↓                    ↓              ↓
Response ← Data Retrieval ← File Reading ← JSON Parsing
```

#### Storage Operations
- **Write Operations**: Data serialization and file writing
- **Read Operations**: File reading and data deserialization
- **Update Operations**: Data modification and file updating
- **Delete Operations**: Data removal and file cleanup

### 2. In-memory Storage

```
Service Operation → Memory Processing → Cache Update → State Management
     ↓                    ↓              ↓
Response ← Cache Retrieval ← Memory Access ← State Query
```

#### Memory Operations
- **Cache Updates**: Real-time data caching
- **State Management**: Application state maintenance
- **Session Data**: Temporary data storage
- **Process States**: External process state tracking

## 🔄 Real-time Data Flow

### 1. Status Updates

```
System Change → Status Detection → Update Generation → Client Broadcast
     ↓              ↓              ↓
UI Update ← Client Processing ← Message Reception ← WebSocket Message
```

#### Status Update Types
- **Streaming Status**: Active/inactive state changes
- **Track Changes**: Now playing updates
- **Error Notifications**: Error and warning messages
- **System Events**: Server events and notifications

### 2. Configuration Updates

```
Config Change → Validation → Storage Update → Service Update
     ↓              ↓              ↓
Client Update ← Broadcast ← Update Notification ← Service Notification
```

#### Configuration Flow
- **Input Validation**: Configuration data validation
- **Storage Update**: Configuration file updates
- **Service Update**: Service configuration updates
- **Client Notification**: Real-time client updates

## 📊 Monitoring Data Flow

### 1. Health Check Flow

```
Health Request → System Check → Status Collection → Response Generation
     ↓              ↓              ↓
Health Response ← Status Aggregation ← Component Status ← System Components
```

#### Health Check Components
- **API Health**: HTTP endpoint availability
- **Stream Health**: Streaming system status
- **RTMP Health**: RTMP server status
- **Telegram Health**: Telegram stream status

### 2. Metrics Collection

```
System Operation → Metrics Generation → Data Collection → Storage
     ↓              ↓              ↓
Analytics ← Data Processing ← Metrics Retrieval ← Storage System
```

#### Metrics Types
- **Performance Metrics**: Response times, throughput
- **Error Metrics**: Error rates, failure counts
- **Resource Metrics**: CPU, memory, network usage
- **Business Metrics**: Listener count, uptime

## 🔄 Error Handling Flow

### 1. Error Detection

```
Operation Failure → Error Detection → Error Classification → Error Handling
     ↓              ↓              ↓
Error Response ← Error Processing ← Error Recovery ← Recovery Action
```

#### Error Types
- **System Errors**: Internal system failures
- **Network Errors**: Connection and communication failures
- **Validation Errors**: Input validation failures
- **External Errors**: Third-party service failures

### 2. Error Recovery

```
Error Occurrence → Error Analysis → Recovery Strategy → Recovery Action
     ↓              ↓              ↓
System Recovery ← Recovery Execution ← Recovery Plan ← Error Assessment
```

#### Recovery Strategies
- **Automatic Recovery**: Automatic retry and recovery
- **Graceful Degradation**: Reduced functionality mode
- **Manual Recovery**: User-initiated recovery actions
- **System Restart**: Complete system restart

## 🔄 Data Synchronization

### 1. Cache Synchronization

```
Data Change → Cache Invalidation → Cache Update → Client Notification
     ↓              ↓              ↓
Client Update ← Cache Refresh ← Cache Query ← Client Request
```

#### Cache Management
- **Cache Invalidation**: Automatic cache clearing
- **Cache Updates**: Real-time cache updates
- **Cache Consistency**: Data consistency maintenance
- **Cache Performance**: Cache optimization

### 2. State Synchronization

```
State Change → State Update → State Broadcast → Client Sync
     ↓              ↓              ↓
Client State ← State Processing ← State Reception ← State Message
```

#### State Management
- **State Updates**: Real-time state changes
- **State Broadcasting**: Multi-client state sync
- **State Consistency**: State consistency maintenance
- **State Persistence**: State persistence and recovery

## 🎯 Performance Optimization

### 1. Data Flow Optimization

```
Request → Caching Layer → Service Layer → Response
     ↓              ↓              ↓
Response ← Cache Hit ← Service Response ← External System
```

#### Optimization Strategies
- **Caching**: Frequently accessed data caching
- **Compression**: Response data compression
- **Pagination**: Large dataset pagination
- **Lazy Loading**: On-demand data loading

### 2. Real-time Optimization

```
Event → Event Batching → Batch Processing → Batch Broadcast
     ↓              ↓              ↓
Client Update ← Batch Processing ← Batch Reception ← Batch Message
```

#### Real-time Optimization
- **Event Batching**: Multiple events in single message
- **Throttling**: Rate limiting for updates
- **Debouncing**: Delayed update processing
- **Prioritization**: Update priority management

## 🔄 Security Data Flow

### 1. Authentication Flow

```
Login Request → Authentication → Token Generation → Client Storage
     ↓              ↓              ↓
Authenticated Request ← Token Validation ← Token Verification ← Token Storage
```

#### Security Measures
- **Input Validation**: All inputs validated
- **Output Sanitization**: Safe output generation
- **Rate Limiting**: Request rate limiting
- **CORS Protection**: Cross-origin request protection

### 2. Data Protection

```
Sensitive Data → Encryption → Secure Storage → Secure Transmission
     ↓              ↓              ↓
Data Access ← Decryption ← Secure Retrieval ← Secure Reception
```

#### Protection Measures
- **Data Encryption**: Sensitive data encryption
- **Secure Transmission**: HTTPS/WSS protocols
- **Access Control**: Role-based access control
- **Audit Logging**: Security event logging

---

**Next**: [Architecture Overview](architecture.md) | [API Reference](../api/streaming.md)
