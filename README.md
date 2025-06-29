💸 Financial Analytics Dashboard
A full-stack financial dashboard to analyze, visualize, and manage transactions with powerful filtering, charts, and CSV export capabilities.

🚀 Features
🔐 Authentication
JWT-based authentication

Secure protected routes

Session persistence with HTTP-only cookies

📊 Dashboard
Revenue vs Expense trend charts (monthly)

Category-wise breakdown (Pie chart)

Summary cards for Total Revenue, Expense, and Net Income

Dynamic table for all transactions

🔍 Transaction Table
Real-time search

Multi-field filters (date, amount, category, status, user)

Column-based sorting

Pagination for large datasets

📁 CSV Export
User-selectable columns

Exports filtered data

Instant browser download

🧰 Tech Stack
Frontend
React.js with TypeScript

Vite

TailwindCSS

Axios

Recharts (for charts)

React Router

Backend
Node.js + Express (with TypeScript)

MongoDB + Mongoose

JWT Authentication

json2csv for CSV export

📂 Project Structure
css
Copy
Edit
looper-ai-financial-dashboard-assi/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.tsx, main.tsx
├── server/                 # Express backend
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middlewares/
│   │   └── utils/
🛠️ Setup Instructions
1. Clone the Repository
bash
Copy
Edit
git clone https://github.com/your-username/financial-dashboard.git
cd financial-dashboard
2. Setup Backend
bash
Copy
Edit
cd server
npm install
cp .env.example .env  # add your MONGODB_URI and JWT_SECRET
npm run dev
3. Import Sample Transactions
bash
Copy
Edit
# Assuming transaction.json is in server/src/data/
npm run import:transactions
4. Setup Frontend
bash
Copy
Edit
cd ../client
npm install
npm run dev
🔐 API Routes
Method	Endpoint	Description
POST	/api/auth/signup	Register a new user
POST	/api/auth/login	Login and set JWT in cookie
GET	/api/auth/logout	Clear auth cookie
GET	/api/transactions	Get transactions (with filters)
GET	/api/transactions/export	Export filtered data as CSV
GET	/api/dashboard/charts	Get chart data (Revenue/Expense)

🧪 Sample Credentials
makefile
Copy
Edit
Email: test@example.com
Password: password123
📸 Preview
Insert screenshots or a GIF of the dashboard here if available.

📄 License
This project is licensed under the MIT License.
