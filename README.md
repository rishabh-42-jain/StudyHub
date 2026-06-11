# 🎓 StudyHub: The Academic Resource Nexus

StudyHub is a dedicated, high-performance knowledge-sharing ecosystem built for modern campus communities. It provides a beautifully designed, secure platform for students and educators to upload, organize, and discover academic materials instantly.

🌍 **[Experience the Live Application Here](https://your-vercel-link.vercel.app)** ⚙️ **[Access the Backend API Here](https://studyhub-tzcr.onrender.com)**

---

## 📑 Table of Contents
1. [About the Project](#-about-the-project)
2. [Deep-Dive Features](#-deep-dive-features)
3. [System Architecture](#-system-architecture)
4. [Tech Stack](#-tech-stack)
5. [Local Development Setup](#-local-development-setup)
6. [Environment Variables](#-environment-variables)
7. [API Documentation](#-api-documentation)
8. [Project Roadmap](#-project-roadmap)
9. [Troubleshooting & FAQ](#-troubleshooting--faq)

---

## 📖 About the Project
Traditional campus file-sharing methods (email chains, messy shared drives) are highly inefficient. StudyHub solves this by offering a centralized, easily searchable, and highly visual repository for all academic assets. By leveraging Cloudinary for edge-network file delivery and MongoDB for scalable metadata storage, StudyHub guarantees millisecond retrieval times for critical study materials.

---

## ✨ Deep-Dive Features

### 🎨 The Frontend Experience
* **Zero-Latency Search:** A highly optimized React state architecture allows users to filter hundreds of documents by course code, department, or file name without ever refreshing the page.
* **Glassmorphism UI:** Built entirely with Tailwind CSS, the interface uses premium frosted-glass effects, dynamic shadow rendering, and smooth hover states.
* **Smart Tagging System:** Files automatically generate distinct, color-coded visual badges based on their academic department (e.g., Computer Science is blue, Humanities is rose) for rapid visual scanning.

### 🛡️ Backend & Security
* **Direct-to-Cloud Uploads:** Files bypass the Node.js memory limit and are streamed directly to Cloudinary, ensuring the backend never crashes from heavy PDF payloads.
* **Granular Access Control (CRUD):** Strict session validation ensures that users have absolute control over their data—they can only delete or modify the specific content they personally authored.
* **Orphaned File Prevention:** Deleting a file from the UI triggers a dual-delete protocol: wiping the document from the MongoDB database *and* permanently destroying the asset on Cloudinary to prevent cloud storage bloat.

---

## 🏗️ System Architecture

### 1. Data Flow Diagram
```text
[ Client Browser ] <══(HTTPS/REST)══> [ Node.js/Express API ]
       ║                                     ╠═══> [ MongoDB Atlas ] (Metadata)
       ╚════════(Asset Delivery)═════════════╣
                                             ╚═══> [ Cloudinary ] (File Storage & CDN)
```

### 2. Database Schema (Mongoose ODM)
```json
{
  "_id": "ObjectId (Auto-generated)",
  "fileName": "String (Original file name, required)",
  "fileUrl": "String (Secure Cloudinary URL, required)",
  "cloudinaryId": "String (Used for secure deletion, required)",
  "courseName": "String (e.g., 'MSO-102')",
  "department": "String (e.g., 'Computer Science')",
  "materialType": "String (e.g., 'Syllabus', 'Exam')",
  "uploadedBy": "String (Authenticated User Session)",
  "createdAt": "Timestamp (Default: Date.now)"
}
```

---

## 🛠️ Tech Stack

### Client-Side (The Face)
* **Framework:** React.js 18
* **Build Tool:** Vite (For HMR and optimized production builds)
* **Routing:** React Router DOM v6
* **Styling:** Tailwind CSS v3
* **Icons:** Lucide-React
* **HTTP Client:** Axios

### Server-Side (The Brain)
* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB & Mongoose
* **File Handling:** Multer (Memory Storage)
* **Cloud Storage:** Cloudinary API

---

## 🚀 Local Development Setup

### 1. Clone & Install
```bash
# Clone the repository
git clone [https://github.com/YOUR_USERNAME/StudyHub.git](https://github.com/YOUR_USERNAME/StudyHub.git)
cd StudyHub

# Install Backend Dependencies
cd backend
npm install

# Install Frontend Dependencies (in a new terminal)
cd ../frontend
npm install
```

### 2. Boot the Application
To run the full stack locally, you need two terminal windows:

**Terminal 1 (Backend):**
```bash
cd backend
npm start
# Server runs on http://localhost:5000
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
# Client runs on http://localhost:5174
```

---

## 🔐 Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file inside the `/backend` folder. 

| Variable | Description | Example |
| :--- | :--- | :--- |
| `PORT` | The port the backend runs on | `5000` |
| `MONGO_URI` | Your MongoDB connection string | `mongodb+srv://...` |
| `CLOUDINARY_CLOUD_NAME` | Your Cloudinary account name | `dxy123abc` |
| `CLOUDINARY_API_KEY` | Your public Cloudinary key | `83918239123` |
| `CLOUDINARY_API_SECRET` | Your private Cloudinary secret | `a1b2c3d4e5f6...` |

---

## 📡 API Documentation

### 1. Get All Resources
* **Route:** `/api/upload/all`
* **Method:** `GET`
* **Response Example (200 OK):**
```json
[
  {
    "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
    "fileName": "Machine_Learning_Notes.pdf",
    "courseName": "CS-401",
    "department": "Computer Science",
    "fileUrl": "[https://res.cloudinary.com/](https://res.cloudinary.com/)...",
    "uploadedBy": "test_user",
    "createdAt": "2026-06-11T10:00:00.000Z"
  }
]
```

### 2. Upload Resource
* **Route:** `/api/upload`
* **Method:** `POST`
* **Headers:** `Content-Type: multipart/form-data`
* **Body:** File object, `courseName`, `department`, `uploadedBy`

### 3. Delete Resource
* **Route:** `/api/upload/:id`
* **Method:** `DELETE`
* **Response Example (200 OK):**
```json
{
  "message": "File successfully deleted from database and cloud storage."
}
```

---

## 🗺️ Project Roadmap

- [x] Initial UI/UX Design & Tailwind Implementation
- [x] MongoDB Database Configuration
- [x] Cloudinary File Upload Integration
- [x] Live Search & Filtering Mechanism
- [x] Split-Stack Deployment (Vercel & Render)
- [ ] **Phase 2:** Implement JWT-based User Authentication
- [ ] **Phase 2:** Add "Like" and "Bookmark" functionality for files
- [ ] **Phase 3:** Admin Dashboard for global file moderation
- [ ] **Phase 3:** AI Auto-tagging for uploaded PDFs

---

## 🐛 Troubleshooting & FAQ

**Q: My frontend says "Network Error" when I try to upload.**
* **A:** Ensure your backend is running. If deployed, check your Vercel logs to ensure your `Axios` base URL is pointing to your Render `https://...` address, not `localhost`.

**Q: Render server goes to sleep after 15 minutes.**
* **A:** This is a limitation of the Render Free Tier. The server will automatically wake up when a user visits the site, but the initial load may take 50 seconds.

**Q: Images/PDFs are not uploading.**
* **A:** Verify that your Cloudinary `.env` variables are completely accurate and have no hidden spaces at the end of the strings.

---
