// Initialize Firebase
// Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyDoGT4z0Ct6fAWlChT4yFc7zVCTrEZapM4",
    authDomain: "login-register-382a3.firebaseapp.com",
    projectId: "login-register-382a3",
    storageBucket: "login-register-382a3.firebasestorage.app",
    messagingSenderId: "170573646296",
    appId: "1:170573646296:web:e6c9d786f47f9ece700aad"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  // DOM Content Loaded
  document.addEventListener('DOMContentLoaded', function() {
    // Initialize password toggles
    const passwordToggles = document.querySelectorAll('.password-toggle');
    
    passwordToggles.forEach(toggle => {
      toggle.addEventListener('click', function() {
        const input = this.parentElement.querySelector('input');
        const icon = this.querySelector('i');
        
        if (input.type === 'password') {
          input.type = 'text';
          icon.classList.remove('ph-eye');
          icon.classList.add('ph-eye-closed');
        } else {
          input.type = 'password';
          icon.classList.remove('ph-eye-closed');
          icon.classList.add('ph-eye');
        }
      });
    });
    
    // Form input animations
    const inputs = document.querySelectorAll('.glass-input');
    
    inputs.forEach(input => {
      input.addEventListener('focus', function() {
        this.parentElement.querySelector('.input-border').style.width = '100%';
      });
      
      input.addEventListener('blur', function() {
        if (!this.value) {
          this.parentElement.querySelector('.input-border').style.width = '0';
        }
      });
    });
    
    // Login form submission
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
      loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        const submitBtn = this.querySelector('button[type="submit"]');
        
        // Add loading state
        submitBtn.innerHTML = '<i class="ph ph-circle-notch spin"></i>';
        submitBtn.disabled = true;
        
        try {
          await firebase.auth().signInWithEmailAndPassword(email, password);
          window.location.href = 'index.html';
        } catch (error) {
          // Show error message
          const errorElement = document.createElement('div');
          errorElement.className = 'error-message mt-2';
          errorElement.textContent = error.message;
          
          const existingError = this.querySelector('.error-message');
          if (existingError) {
            existingError.replaceWith(errorElement);
          } else {
            this.insertBefore(errorElement, submitBtn);
          }
        } finally {
          submitBtn.innerHTML = '<span>Sign In</span><i class="ph ph-arrow-right"></i>';
          submitBtn.disabled = false;
        }
      });
    }
  });
  
  // Add spin animation for loading states
  const style = document.createElement('style');
  style.textContent = `
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    .spin {
      animation: spin 1s linear infinite;
    }
  `;
  document.head.appendChild(style);

// Password strength indicator
function updatePasswordStrength(password) {
    const strengthMeter = document.querySelector('.strength-meter');
    if (!strengthMeter) return;
  
    let strength = 0;
    if (password.length > 0) strength += 10;
    if (password.length >= 8) strength += 30;
    if (/[A-Z]/.test(password)) strength += 20;
    if (/[0-9]/.test(password)) strength += 20;
    if (/[^A-Za-z0-9]/.test(password)) strength += 20;
    
    strength = Math.min(strength, 100);
    
    let color;
    if (strength < 30) color = '#ff4444';
    else if (strength < 70) color = '#ffbb33';
    else color = '#00C851';
    
    strengthMeter.style.width = strength + '%';
    strengthMeter.style.background = color;
  }
  
  // Register form submission
  const registerForm = document.getElementById('register-form');
  if (registerForm) {
    const passwordInput = document.getElementById('register-password');
    
    passwordInput.addEventListener('input', function() {
      updatePasswordStrength(this.value);
    });
    
    registerForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const name = document.getElementById('register-name').value;
      const email = document.getElementById('register-email').value;
      const password = document.getElementById('register-password').value;
      const confirmPassword = document.getElementById('register-confirm-password').value;
      const submitBtn = this.querySelector('button[type="submit"]');
      
      if (password !== confirmPassword) {
        showError(this, "Passwords don't match");
        return;
      }
      
      // Add loading state
      submitBtn.innerHTML = '<i class="ph ph-circle-notch spin"></i>';
      submitBtn.disabled = true;
      
      try {
        const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
        await userCredential.user.updateProfile({
          displayName: name
        });
        window.location.href = 'index.html';
      } catch (error) {
        showError(this, error.message);
      } finally {
        submitBtn.innerHTML = '<span>Create Account</span><i class="ph ph-user-plus"></i>';
        submitBtn.disabled = false;
      }
    });
  }
  
  // Forgot password form
  const forgotPasswordForm = document.getElementById('forgot-password-form');
  if (forgotPasswordForm) {
    forgotPasswordForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const email = document.getElementById('reset-email').value;
      const submitBtn = this.querySelector('button[type="submit"]');
      const messageElement = document.getElementById('reset-message');
      
      // Add loading state
      submitBtn.innerHTML = '<i class="ph ph-circle-notch spin"></i>';
      submitBtn.disabled = true;
      messageElement.textContent = '';
      messageElement.className = 'message mt-3';
      
      try {
        await firebase.auth().sendPasswordResetEmail(email);
        messageElement.textContent = 'Password reset email sent. Please check your inbox.';
        messageElement.classList.add('success-message');
      } catch (error) {
        messageElement.textContent = error.message;
        messageElement.classList.add('error-message');
      } finally {
        submitBtn.innerHTML = '<span>Send Reset Link</span><i class="ph ph-paper-plane-tilt"></i>';
        submitBtn.disabled = false;
      }
    });
  }
  
  // Dashboard logout
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function() {
      firebase.auth().signOut().then(() => {
        window.location.href = 'login.html';
      });
    });
  }
  
  // Helper function to show errors
  function showError(form, message) {
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message mt-2';
    errorElement.textContent = message;
    
    const existingError = form.querySelector('.error-message');
    if (existingError) {
      existingError.replaceWith(errorElement);
    } else {
      const submitBtn = form.querySelector('button[type="submit"]');
      form.insertBefore(errorElement, submitBtn);
    }
  }
  
  // Initialize user name in dashboard
  auth.onAuthStateChanged(user => {
    if (user && document.getElementById('user-name')) {
      document.getElementById('user-name').textContent = user.displayName || user.email.split('@')[0];
    }
  });