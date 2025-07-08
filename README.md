📝 MERN Blog Management System

A full-stack blog application built with the **MERN Stack**:  
MongoDB, Express.js, React.js, Node.js — with clean UI using **Chakra UI**, robust authentication, and modern developer features.

---

## 🚀 Features

### 🔐 Authentication
- User Registration with:
  - Username, Email, Password, Confirm Password
  - Country / State / City (powered by `country-state-city`)
  - Phone number, Profession
  - Profile Image upload with preview (Base64)
  - Terms and Conditions checkbox (with validation)
- Secure Login with JWT
- Auth-protected routes

### 🖼 Blog Functionality
- Add new blogs with:
  - Title, Short Description, Full Content
  - Blog image (base64 with preview)
- View All Blogs (public + dashboard view)
- Filter "My Blogs" vs "All Blogs" in dashboard
- Edit / Delete only your own blogs
- 3 blogs per row (responsive grid layout)

### 🧭 Navigation & UI
- Sticky Navbar with:
  - Auth-aware links (Login/Register or Dashboard/Logout)
  - Dark/Light mode toggle (Chakra UI built-in)
- Fully responsive design (mobile, tablet, desktop)
- Clean toast notifications for feedback
- Read More → BlogDetails page

### 🌙 Theming & Styling
- Chakra UI theming with custom fonts and colors
- Full Light/Dark mode support
- Styled file input for profile and blog image uploads
- Avatar + timestamp in blog cards
- Password fields with eye toggle (show/hide)

---

## 📦 Tech Stack

| Layer       | Tech Used                                 |
|-------------|--------------------------------------------|
| Frontend    | React.js, Chakra UI, React Hook Form, Yup |
| Backend     | Node.js, Express.js                       |
| Database    | MongoDB Atlas                             |
| Auth        | JWT (JSON Web Token)                      |
| HTTP Client | Axios                                     |
| Forms       | React Hook Form + Yup                     |
| Image Upload| Base64 encoded via FileReader             |
| Location    | `country-state-city` npm package          |

---

## 📁 Folder Structure

mern-blog/
├── client/ # React frontend
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── context/AuthContext.js
│ │ └── App.js, index.js, theme.js
│ └── public/
├── server/ # Node.js + Express backend
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── middleware/auth.js
│ ├── config/db.js
│ └── index.js
└── README.md


## 🔧 Setup Instructions

### 🚀 Backend

```bash
cd server
npm install

# Add your MongoDB URI and JWT secret to .env
npm start
💻 Frontend

bash
cd client
npm install
npm start

🛠 .env Example
In /server/.env:
env
PORT=5000
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_super_secret_key

📌 Future Enhancements

❤️ Like button per blog

💬 Comments system with auth

🔗 Social sharing or copy blog link

🧠 SEO meta tags for each blog

👤 User profile page

📥 Optional Cloudinary/S3 for image uploads

👨‍💻 Author
Built by a passionate developer learning MERN stack the right way ✅
Feel free to fork, use, and improve!

🧠 License
This project is open source and available under the MIT License.



Would you like me to also:
- ✅ Generate a project banner?
- 🧪 Add a test strategy section?
- 📦 Include deployment instructions (Vercel/Render/Netlify)?

Let me know and I’ll expand it for production use.
