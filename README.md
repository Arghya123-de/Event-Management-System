# Institute of Engineering and Management (IEM) - College Event Management System

An interactive, responsive, and feature-rich **College Event Management System** built exclusively for the **Institute of Engineering and Management (IEM)** with **HTML5, CSS3, and Modern Vanilla JavaScript (ES6+)**. Designed specifically for campus fests, technical symposiums, sports leagues, guest lectures, and student club activities.

---

## 🌟 Key Features

### 🎓 1. Student Portal & Event Discovery
- **Live Search & Multi-Filters**: Instant search by event name, organizing club, venue, or keywords. Filter by Category (*Technical, Cultural, Workshops, Sports, Social*), Timeline (*Upcoming, This Week, Past*), Entry Fee (*Free vs Paid*), and Sorting (*Date, Popularity, Alphabetical*).
- **View Toggle**: Switch seamlessly between **Grid View** and **List View**.
- **Interactive Event Details**: Modal dialog showing complete event description, timings, venue, organizer details, agenda schedule, tags, and real-time seat availability progress bar.
- **Seat Capacity Indicator**: Dynamic progress bar that automatically shifts from normal to warning and danger as spots fill up or reach "Sold Out" status.

### 🎟️ 2. Digital Entry Pass & Ticket Generation
- **One-Click Registration**: Validation-backed student registration form (Name, College Roll/ID, Email, Phone, Branch, Academic Year, Participation type).
- **Realistic Digital Pass**: Boarding-pass styled ticket with perforated tear-off notch design, unique Ticket ID (`TKT-2026-XXXX`), simulated vector QR code, and barcode.
- **Print / PDF Ready**: Dedicated `@media print` CSS stylesheet allowing students to print or save their digital pass as a clean PDF without browser clutter.
- **My Tickets Passbook**: Dedicated student dashboard to view all active passes, check check-in status, and cancel bookings (which restores the seat to the event capacity in real-time).

### ⏱️ 3. Nearest Event Digital Clock & Live Countdown Timer
- **Automatic Nearest Event Detection**: Dynamically queries the event schedule to spotlight whichever event is next to occur.
- **Live Campus Digital Clock**: Real-time digital clock displaying hours, minutes, and seconds synced with local campus time.
- **LED-Style Segment Countdown**: High-contrast glowing digital boxes displaying `DAYS : HOURS : MINUTES : SECONDS` ticking in real-time.
- **Interactive Spotlight Card**: Features the nearest event title, venue, category badge, and one-click "Register Now" / "Event Details" buttons.
- **Smart Lifecycle Tracking**: Automatically flips to "Happening Now" while an event is in session, and advances to the next nearest event once concluded.
- **Navbar Clock**: Compact live digital clock widget embedded directly in the main header actions.

### 📅 4. Interactive Schedule & Calendar
- **Month-at-a-Glance**: Interactive calendar widget highlighting dates with scheduled events.
- **Day Inspector**: Click any calendar day to inspect all campus activities happening on that specific date.
- **Month Navigation**: Easily traverse upcoming and past academic months.

### 🛠️ 5. Organizer & Faculty Hub
- **Executive Metrics**: Real-time stats on Total Events, Total Attendees, Average Capacity Utilization %, and Collected Registration Fees.
- **Host / Edit Events**: Full form to create new events or update existing ones, including 1-click theme presets (*Tech, Cultural, Seminar, Sports, Workshop*).
- **Attendee Roster & Gate Check-in**:
  - Filter registered attendees by name, roll number, or department.
  - Interactive **Check-in Toggle** (*Checked In* vs *Pending*) for real-time gate entry management.
  - **Export to CSV**: Download real `.csv` spreadsheet file with one click for faculty records and attendance marking.
  - **Print Roster**: Print attendance sheets directly.
- **Event Lifecycle Controls**: Edit or delete events with safe confirmation dialogs.
- **Data Backup**: Export complete event and registration data as a timestamped JSON file.

### 🎨 6. Modern UI / UX & Utilities
- **Dark & Light Mode**: Instant toggle with theme persistence in `localStorage`.
- **Role Switcher**: Toggle between *Student View* and *Organizer Mode* with intuitive visual cues.
- **100% Client-Side Persistence**: All event modifications, registrations, and theme choices persist across browser refreshes via `localStorage`.
- **Demo Data Reset**: Instant "Reset Demo Data" button to restore rich, realistic sample events for evaluators and viva demonstrations.
- **Responsive Layout**: Designed mobile-first, adapting smoothly to smartphones, tablets, and wide desktop displays.

---

## 📂 Project Structure

```text
college_project/
│
├── iem_logo.png     # Official Institute of Engineering and Management (IEM) emblem
├── index.html       # Semantic HTML5 markup, accessible modal structures & layout
├── style.css        # CSS3 custom properties, glassmorphism, responsive grid & print styling
├── script.js        # Vanilla JS modular controller, state management & storage engine
└── README.md        # Comprehensive documentation and viva presentation guide
```

---

## 🚀 How to Run the Project

1. **No Installation or Server Required**: The project uses pure client-side web technologies.
2. Open the project folder `college_project`.
3. Double-click [index.html](file:///C:/Users/Arghyadeep/OneDrive/Desktop/college_project/index.html) to launch it in any modern browser (Chrome, Edge, Firefox, Brave, Safari).
4. Alternatively, you can use VS Code's "Live Server" extension or Python's built-in server:
   ```bash
   python -m http.server 3000
   ```
   and navigate to `http://localhost:3000`.

---

## 💡 Quick Demo Walkthrough for Evaluators

1. **Explore Events**:
   - Scroll down to the Explore Events section.
   - Use the category pills (*e.g., Technical, Cultural*) or type "AI" in the search bar.
   - Toggle between Grid and List view.
2. **Register for an Event**:
   - Click **"Register"** on any upcoming event (e.g., *HackCampus 2026*).
   - Enter student details and submit.
   - Notice the instant generation of the **Digital Event Pass** with a unique QR code.
   - Click **"Print / Save Pass"** to preview the PDF print layout.
3. **Check "My Tickets"**:
   - Navigate to the **My Tickets** tab to review the booked pass.
4. **Switch to Organizer Hub**:
   - Click the **"Student View"** button on the navbar to switch to **"Organizer Mode"**.
   - Navigate to the **Organizer Hub** section.
   - View the overall analytics cards.
   - Click **"Attendees"** on any event to see the registered student roster.
   - Click the check-in button to mark attendance.
   - Click **"Export to CSV"** to download the roster as an Excel-compatible file.
5. **Host a New Event**:
   - Click **"Host Event"**, select a category preset, fill in the details, and hit **"Save & Publish"**.
   - The event immediately appears across the catalog and the calendar.
6. **Dark Mode Toggle**:
   - Click the moon/sun icon in the header to switch between light and dark themes.

---

## 🎓 College Viva / Interview Questions & Answers

### Q1: What architecture does this project use?
> **Answer**: It follows a clean Model-View-Controller (MVC) pattern in pure client-side JavaScript. The central `state` object manages events, registrations, filters, and UI preferences. Whenever state changes (e.g. registration submitted, event edited), dedicated render functions update the DOM and synchronize with the browser's `localStorage`.

### Q2: How is data persisted without a backend database like MySQL or MongoDB?
> **Answer**: Data is stored using the HTML5 `localStorage` Web Storage API. When the page initializes, `loadState()` checks `localStorage`. If data exists, it parses the JSON strings; if first opened, it bootstraps realistic default sample events and registrations. Updates are saved atomically via `saveEvents()` and `saveRegistrations()`.

### Q3: How is the dynamic digital pass and QR code created?
> **Answer**: The pass is constructed dynamically in the DOM using ticket metadata (unique ticket ID, attendee roll number, event title). The QR code is rendered via a lightweight, scalable SVG vector graphic that scales crisply and works 100% offline without third-party network dependencies.

### Q4: How does the CSV export work in pure JavaScript?
> **Answer**: The attendee data array is transformed into comma-separated values (CSV) format. JavaScript builds a `data:text/csv;charset=utf-8` URI using `encodeURI()`, creates a virtual `<a>` download element programmatically, triggers a click event, and downloads the spreadsheet directly to the user's computer.

### Q5: How does the print functionality isolate only the ticket?
> **Answer**: In `style.css`, a dedicated `@media print` media query sets `visibility: hidden` for `body *`, and isolates `#printableTicket, #printableTicket *` with `visibility: visible`. This ensures that when the student or examiner clicks Print, only the pass is formatted for paper or PDF export.
