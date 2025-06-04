import 'dotenv/config';
import { Hono } from 'hono';
import { env } from '@/utils/env';
import { startWsServer } from './ws';

const app = new Hono();

app.get('/', (c) =>
  c.html(`
    <style>
      body {
        background-color: #111;
        color: #eee;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px;
        margin: 0;
      }

      h1 {
        margin-bottom: 20px;
        font-weight: 700;
        font-size: 1.8rem;
      }

      video {
        width: 80%;
        max-width: 90vw;
        border-radius: 10px;
        box-shadow: 0 0 15px rgba(0,0,0,0.8);
        background-color: black;
      }
    </style>
    <script src="https://cdn.jsdelivr.net/npm/hls.js@latest"></script>
    <h1>Вінілове Радіо</h1>
    <video id="video" controls autoplay></video>
    <span id="listeners">Слухають зараз: ...</span>
    <script>
      if(Hls.isSupported()) {
        var video = document.getElementById('video');
        var hls = new Hls();
        hls.loadSource('https://stream.adoo.one/hls/test.m3u8');
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, function() {
          video.play();
        });
      }
      else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = 'https://stream.adoo.one/hls/test.m3u8';
        video.addEventListener('loadedmetadata', function() {
          video.play();
        });
      }
    </script>
    <script>
      // Постав свою адресу (wss:// або ws://, залежно від того, що у тебе)
      const ws = new WebSocket("wss://ws.adoo.one");

      ws.onmessage = function(event) {
        try {
          const data = JSON.parse(event.data);
          if (typeof data.listeners === "number") {
            document.getElementById("listeners").textContent = "Слухають зараз: " + data.listeners;
          }
        } catch (e) {
          // нічого, просто проігноруй помилку
        }
      };
    </script>
  `),
);

Bun.serve({
  fetch: app.fetch,
  port: env.port,
});

startWsServer();

console.log(`✅ Hono API on: http://localhost:${env.port}`);
