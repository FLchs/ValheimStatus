# Valheim Server Status Dashboard

A real-time monitoring dashboard for Valheim game servers.

## Features

- **Real-time monitoring** - Automatic updates every 5 seconds
- **Latency tracking** - Live latency graph with 30-second history
- **Player list** - See who is currently online
- **Connection instructions** - Steps for players to join the server
- **Error handling** - Clear status display when server is offline

## Quick Start

1. Clone the repository
2. Copy `example.env` to `.env` and configure:
   ```
   VITE_SERVER_ADDRESS=your.server.address
   VITE_API_URL=    # Leave empty for development (uses proxy)
   ```
3. Install dependencies: `bun install`
4. Start development server: `bun run dev`
5. Build for production: `bun run build`

## Configuration

Environment variables in `.env`:

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_SERVER_ADDRESS` | Server address displayed in UI | - |
| `VITE_API_URL` | API endpoint for status.json | (empty = use proxy) |

**Development**: Leave `VITE_API_URL` empty to use Vite's proxy (avoids CORS issues).

**Production**: Set `VITE_API_URL` to your API endpoint URL.

## License

[GNU General Public License v3.0](LICENSE)
