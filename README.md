# 🚌 SmartBus System

A real-time IoT-powered bus tracking platform built with the MERN stack. Passengers can search for buses by route, view live seat availability, and track passenger counts — all powered by ESP32 sensors on the bus.

---

## 🌐 Live Demo

| Service | URL |
|---|---|
| Frontend | [Netlify Deployment] |
| Backend API | https://bus-service-system.onrender.com |
| Support Tickets | https://ticketsupportsystem-rmo0.onrender.com |

---

## ✨ Features

- 🔍 Search buses by From / To location with voice input support
- 💺 Real-time seat availability with live capacity bar
- 📡 ESP32 IoT integration for live passenger counting
- 🔄 Auto-refresh every 10 seconds on bus detail card
- 🗺️ Bus location API ready for GPS integration
- 🎫 Support query / ticket submission system
- 🔐 Login & Sign Up pages
- 📱 Fully responsive design with glassmorphism UI
- 🌙 Dark theme throughout (blue / amber gradient)

---

## 🛠️ Tech Stack

### Frontend
| Tech | Purpose |
|---|---|
| React 19 | UI framework |
| Vite | Build tool |
| Tailwind CSS v4 | Styling |
| DaisyUI | UI components |
| React Router v7 | Client-side routing |
| Axios | HTTP requests |
| Lucide React | Icons |
| React Hot Toast | Notifications |

### Backend
| Tech | Purpose |
|---|---|
| Node.js | Runtime |
| Express v5 | REST API framework |
| MongoDB | Database |
| Mongoose | ODM |
| dotenv | Environment variables |
| CORS | Cross-origin requests |
| Nodemon | Dev auto-restart |

### Hardware
| Component | Purpose |
|---|---|
| ESP32 | IoT microcontroller on bus |
| Sensor | Passenger count detection |
| NEO-6M GPS *(planned)* | Live bus location |

---

## 📁 Project Structure

```
BusSerivesSystem/
├── Backend/
│   └── src/
│       ├── config/
│       │   └── db.js               # MongoDB connection
│       ├── Controllers/
│       │   └── Busdetails.js       # All API logic
│       ├── models/
│       │   ├── BusSchema.js        # Bus details schema
│       │   └── BusTimeSeries.js    # Passenger count time series
│       ├── Routes/
│       │   └── Bus_servies.js      # Express routes
│       └── index.js                # Entry point
│
└── Frontend/
    └── src/
        ├── Components/
        │   ├── Card.jsx            # Bus search + results
        │   ├── Header.jsx          # Navigation bar
        │   ├── Hero_Section.jsx    # Landing hero
        │   ├── Footer.jsx          # Footer
        │   └── VoiceSearch.jsx     # Voice input component
        └── Pages/
            ├── Home.jsx            # Landing page
            ├── Routes.jsx          # Bus search page
            ├── Detail.jsx          # Live bus detail card
            ├── About.jsx           # About page
            ├── Login.jsx           # Login page
            ├── SignIn.jsx          # Sign up page
            ├── Queries.jsx         # Support ticket form
            └── Distance_btw_buses.jsx  # Bus distance tracker
```

---

## 🔌 API Reference

Base URL: `https://bus-service-system.onrender.com`

### Bus Details

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/getBuses` | Add a new bus |
| `GET` | `/getBuses/:busnumber` | Get bus details + live passenger count |
| `GET` | `/getBuses/:from/:to` | Search buses by route |

### ESP32 IoT

| Method | Endpoint | Body | Description |
|---|---|---|---|
| `POST` | `/getBuses/personcount` | `{ Esp32id, personCount }` | Update passenger count from ESP32 |
| `POST` | `/getBuses/location` | `{ Esp32id, latitude, longitude, speed }` | Update live GPS location from ESP32 |
| `GET` | `/getBuses/location/:busnumber` | — | Get live location of a bus |

---

## 🗄️ Database Schemas

### BusDetails
```js
{
  BusNumber:    String,   // e.g. "AP28Z1234"
  FromLocation: String,   // e.g. "Hyderabad"
  ToLocation:   String,   // e.g. "Vijayawada"
  Esp32id:      Number,   // Unique ESP32 device ID
  No_of_seates: Number,   // Total seats on bus
  capacity:     Number,   // Max capacity
  timestamps:   true
}
```

### BusTimeSeries
```js
{
  time:         Date,
  meta: {
    BusNumber:  String,
    Esp32id:    Number
  },
  personCount:  Number    // Live passenger count from ESP32
}
```

---

## ⚙️ Local Setup

### Prerequisites
- Node.js >= 18
- MongoDB Atlas account or local MongoDB
- ESP32 device (optional for hardware features)

### 1. Clone the repo
```bash
git clone https://github.com/your-username/BusSerivesSystem.git
cd BusSerivesSystem
```

### 2. Backend setup
```bash
cd Backend
npm install
```

Create a `.env` file in `Backend/`:
```env
MONGO_URI=your_mongodb_connection_string
```

Start the backend:
```bash
npm run dev       # development
npm start         # production
```

### 3. Frontend setup
```bash
cd Frontend
npm install
```

Create a `.env` file in `Frontend/`:
```env
VITE_API_BASE_URL=http://localhost:3000
VITE_TICKET_API_URL=https://ticketsupportsystem-rmo0.onrender.com
```

Start the frontend:
```bash
npm run dev
```

---

## 🚀 Deployment

### Backend — Render
1. Connect your GitHub repo to [Render](https://render.com)
2. Set root directory to `Backend`
3. Build command: `npm install`
4. Start command: `npm start`
5. Add environment variable: `MONGO_URI`

### Frontend — Netlify
1. Connect your GitHub repo to [Netlify](https://netlify.com)
2. Set base directory to `Frontend`
3. Build command: `npm run build`
4. Publish directory: `Frontend/dist`
5. Add environment variables:
   - `VITE_API_BASE_URL`
   - `VITE_TICKET_API_URL`

> The `netlify.toml` and `public/_redirects` files are already configured to handle SPA routing (no 404 on page refresh).

---

## 📡 ESP32 Integration

The ESP32 on each bus sends POST requests to the backend:

**Passenger Count** (every few seconds):
```json
POST /getBuses/personcount
{
  "Esp32id": 1001,
  "personCount": 23
}
```

**GPS Location** (every 5 seconds):
```json
POST /getBuses/location
{
  "Esp32id": 1001,
  "latitude": 17.3850,
  "longitude": 78.4867,
  "speed": 45
}
```

---

## 🗺️ Roadmap

- [ ] Live GPS map with Leaflet.js
- [ ] ETA calculation using Haversine formula
- [ ] JWT authentication
- [ ] Push notifications (Firebase FCM)
- [ ] Bus stop schedule schema
- [ ] Case-insensitive location search
- [ ] Location autocomplete dropdown
- [ ] Conductor dashboard

---

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add your feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the ISC License.

---

> Built with ❤️ for smart village commuters
