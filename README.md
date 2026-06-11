# 📖 StudyHub

A modern, full-stack web platform for campus communities to seamlessly upload, organize, and interact with academic study materials. Built with live search filtering, secure CRUD operations, and cloud media hosting.

**Live Demo:** [Click Here](https://your-vercel-link.vercel.app)  
**Backend API:** [Click Here](https://studyhub-tzcr.onrender.com)

---

## ✨ Features

**Core Features**
* **Resource Management** — Upload academic files (PDFs, docs) with granular metadata including Course Name, Department, and Material Type.
* **Cloud Storage** — Direct, optimized file uploads stored securely on Cloudinary.
* **Live Search & Filtering** — Real-time search bar that instantly filters the resource library by file name, course tag, or department without page reloads.

**UI / UX**
* **Premium Glassmorphism Design** — A bright, human-centric interface built with Tailwind CSS, featuring floating cards, subtle gradients, and animated hover states.
* **Intelligent Tagging** — Files automatically generate color-coded badges based on their department and course for quick visual scanning.

**Security & Data**
* **Authorized Deletion** — Secure CRUD architecture where users can only delete the specific files they personally uploaded.
* **RESTful Architecture** — Clean separation of concerns between the React frontend and the Express/MongoDB backend.

---

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React.js, Vite, React Router, Tailwind CSS, Lucide React |
| **Backend** | Node.js, Express.js, Cors, Multer |
| **Database** | MongoDB, Mongoose ODM |
| **File Storage** | Cloudinary |
| **Deployment** | Vercel (Frontend), Render (Backend) |

---

## 🗄️ Database Schema

Data is managed via **MongoDB** using Mongoose schemas:

**Resource Collection**
* `_id` — ObjectId, auto-generated
* `fileName` — String, original name of the uploaded file
* `fileUrl` — String, secure URL returned from Cloudinary
* `cloudinaryId` — String, used for secure file deletion
* `courseName` — String, optional academic tag
* `department` — String, optional academic tag
* `materialType` — String, optional categorization (e.g., "Notes", "Assignment")
* `uploadedBy` — String, tracked via local session/auth state
* `createdAt` — Timestamp, auto-generated

---

## 🏗️ Architecture

```text
Browser (React on Vercel)
        ↓  REST API
Express API (Render)
    ├── MongoDB (Data persistence & schemas)
    └── Cloudinary (Cloud file storage & CDN delivery)
