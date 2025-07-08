# 📝 MERN Blog Management System

A full-featured blog management web application built with the **MERN Stack** (MongoDB, Express.js, React.js, Node.js) and styled with **Chakra UI**. The app allows users to register, log in, create, view, edit, and delete blog posts with a responsive and modern UI.

---

## 📚 Features

### 🔐 Authentication
- JWT-based secure login and registration
- React Hook Form + Yup for client-side validation
- Terms and Conditions checkbox (required)
- Profile image upload using base64 (with preview)
- Redirection if user is already logged in

### 📝 Blog Functionality
- Add blog with title, short description, full content, and image
- View all blogs publicly and inside dashboard
- Filter between "All Blogs" and "My Blogs"
- Edit or Delete only blogs created by the logged-in user
- Blog detail page (with login requirement to access)
- Read More → navigates correctly based on auth status

### 🌐 UI / UX
- 3 blogs per row using Chakra UI `SimpleGrid`
- Styled blog cards with image, avatar, name, and date
- Sticky navbar with theme toggle (Light/Dark Mode)
- Custom fonts, shadows, and button animations
- Toast notifications for all actions
- Dark mode compatible on all pages
- Custom file upload preview UI for images

---

## 🔧 Tech Stack

| Layer       | Tools & Libraries                                     |
|-------------|--------------------------------------------------------|
| **Frontend** | React.js, Chakra UI, Axios, React Hook Form, Yup      |
| **Backend**  | Node.js, Express.js, JWT                              |
| **Database** | MongoDB Atlas                                         |
| **Auth**     | JSON Web Tokens (JWT)                                 |
| **Styling**  | Chakra UI (Dark/Light theme, responsive grid layout)  |
| **Utilities**| country-state-city (dropdowns), FileReader API (img)  |

---

## 📁 Project Structure

```
mern-blog/
├── client/                  # React frontend
│   ├── src/
│   │   ├── pages/           # Home, Register, Login, Dashboard, etc.
│   │   ├── components/      # Navbar, BlogCard, etc.
│   │   ├── context/         # AuthContext for global token access
│   │   ├── theme.js         # Chakra theme config
│   │   └── App.js
│   └── public/
├── server/                  # Express backend
│   ├── controllers/         # authController, blogController
│   ├── models/              # User.js, Blog.js
│   ├── routes/              # authRoutes.js, blogRoutes.js
│   ├── middleware/          # auth.js (JWT middleware)
│   ├── config/              # db.js
│   └── index.js             # Entry point
└── README.md
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/mern-blog.git
cd mern-blog
```

### 2️⃣ Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in the `server/` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection
JWT_SECRET=your_secure_jwt_secret
```

Start the server:

```bash
npm run dev
```

### 3️⃣ Frontend Setup

```bash
cd ../client
npm install
npm start
```

---

## 📌 Upcoming Features

- ❤️ Like button per blog
- 💬 Comment system
- 🔗 Blog sharing (copy link / social media)
- 📈 Dynamic SEO meta tags
- 👤 User profile page
- ☁️ Optional Cloudinary/S3 image hosting

---

## 🧑‍💻 Author

Built by a passionate MERN stack developer from scratch  
📫 Feel free to fork, use, contribute or reach out!

---

## 📜 License

This project is open-source under the [MIT License](LICENSE).
