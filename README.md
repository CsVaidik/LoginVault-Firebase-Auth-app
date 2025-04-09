# 🔐 Firebase Authentication Web App

A modern, responsive web application with Firebase Authentication. Designed with a sleek dark theme, glassmorphism UI, and complete authentication flow.

## 🖼️ Glimpse of Login-Vault \_Authentication 

*Add your app screenshot here (optional).*

---

## ✨ Features

- 🌑 **Modern Dark Theme**
- 🎨 **Vibrant Accent Colors**
- 🧣 **Glassmorphism UI Elements**
- 🎞️ **Smooth Animations & Transitions**
- 📱 **Fully Responsive Design**
- 🔐 **Complete Authentication Flow**:
  - User Registration
  - Email/Password Login
  - Password Reset
  - Protected Routes

---

## 💪 Technologies Used

### Frontend

- HTML5, CSS3, JavaScript
- [Firebase Authentication](https://firebase.google.com/docs/auth)
- [Phosphor Icons](https://phosphoricons.com)

### Styling

- CSS Custom Properties
- Glassmorphism Effects
- CSS Animations
- Responsive Layout Design

---

## 📁 File Structure

```
src/
├── index.html              # Dashboard for authenticated users
├── login.html              # Login page
├── register.html           # Registration page
├── forgot-password.html    # Password reset page
├── styles.css              # Main stylesheet
├── app.js                  # Firebase auth logic
└── README.md

ScreenShot/

```





---

## ⚙️ Setup Instructions

### 1. Create a Firebase Project

- Go to the [Firebase Console](https://console.firebase.google.com/)
- Create a new project
- Enable **Email/Password** authentication under *Authentication > Sign-in method*

### 2. Configure Firebase

- Get your Firebase config object from your project settings.
- Replace the placeholder in `app.js`:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

### 3. Run the App Locally

You can use any local development server:

- VS Code Live Server extension
- Python (built-in server):
  ```bash
  python -m http.server
  ```
- Serve with npm:
  ```bash
  npx serve
  ```

---

## 🎨 Customization

### Accent Colors

Edit the CSS variables in `styles.css`:

```css
:root {
  --bg-dark: #0f0f13;
  --primary: #6c5ce7;
  --accent: #00cec9;
  /* ... */
}
```

### Background Image

To customize the background:

```css
body {
  background:
    linear-gradient(rgba(15, 15, 19, 0.9), rgba(15, 15, 19, 0.9)),
    url('your-image-url.jpg') no-repeat center center fixed;
  background-size: cover;
}
```

---

## ✅ Best Practices Implemented

- Secure authentication with Firebase
- Responsive design for all screen sizes
- Accessible and semantic HTML
- Performance-optimized animations
- Clean and modular file structure

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

