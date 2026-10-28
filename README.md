# Jan Aushadhi Mobile Web Application

An intuitive mobile-first web application for **Pradhan Mantri Bharatiya Janaushadhi Pariyojana (PMBJP)**, designed to make affordable generic medicines accessible to everyone.

## Features

- **Medicine Search & Price Comparison**: Search by brand name, generic salt, or symptom to discover low-cost Jan Aushadhi alternatives with transparent MRP vs. Jan Aushadhi price comparisons and savings calculations.
- **Prescription Upload & Extraction**: Upload prescription images/camera photos with auto-extraction of prescribed medicines directly into the cart.
- **Smart Cart & Bill Details**: Live cart summary with medicine counts, pack sizes, quantity adjustments, itemized regular market MRP, Jan Aushadhi savings, and total payable amount with "Pay at Store" support.
- **Interactive Store Locator**: Discover nearby Jan Aushadhi Kendras with live stock availability for your cart, distance sorting, opening hours, owner details, one-tap calling, and Google Maps directions.
- **Pickup Scheduling & Confirmation**: Select pickup date and time slots, preview store information, and confirm orders with interactive confirmation modals and booking receipt generation.
- **Mobile-First Design**: Optimized iOS/Android mobile frame with consistent UX4G design tokens, typography, and responsive touch interactions without intrusive scrollbars.

## Tech Stack

- **HTML5** & semantic markup
- **CSS3** (Mobile frame, Flexbox/Grid, custom variables, responsive animations)
- **Vanilla JavaScript (ES6+)**
- **SVG Vector Graphics** & high-fidelity assets

## Running Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/livia-17/Jan-Aushadhi.git
   cd Jan-Aushadhi
   ```

2. Serve using any static HTTP server (e.g., Python or Node.js):
   ```bash
   # Using Python
   python -m http.server 3000

   # Using Node.js npx
   npx serve .
   ```

3. Open `http://localhost:3000` in your browser.
