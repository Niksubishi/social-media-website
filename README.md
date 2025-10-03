# **Social Media Application - Nikolas Bishop**

### **Table of Contents 📚**

1. [Project Overview](#project-overview-🌍)
2. [Key Features](#key-features-✨)
3. [Installation](#installation-⚙️)
4. [Usage](#usage-🛠️)
5. [Technologies Used](#technologies-used-💻)

---

## **Project Overview 🌍**

This is a modern **social media application**. The application provides a complete social networking experience where users can create accounts, share posts with media, interact through comments and reactions, and follow other users.

Built with modern web technologies including **Tailwind CSS** for a responsive and professional design, the app integrates seamlessly with the **Noroff Social Media API** to deliver robust functionality with excellent error handling and user experience.

Developed by [**Nikolas Bishop**](https://github.com/Niksubishi).

---

## **Key Features ✨**

1. **User Authentication & Security**:

   - Secure user registration and login with email/password
   - JWT-based authentication for protected routes and actions
   - Automatic session management and logout functionality

2. **Complete Post Management**:

   - Create, edit, delete, and view posts with rich media support
   - Posts include title, body content, tags, images, and comment threads
   - Real-time post updates and seamless content management

3. **Social Networking Features**:

   - Follow and unfollow users to build personalized feeds
   - React to posts with emoji reactions
   - Comment system for meaningful user engagement
   - User profiles with follower/following counts

4. **Modern User Interface**:

   - Beautiful Tailwind CSS design with gradient headings and smooth animations
   - Fully responsive layout that works on all device sizes
   - Intuitive navigation and professional visual design
   - Consistent styling and user experience across all pages

5. **Search & Discovery**:

   - Search posts by title to find specific content
   - Browse user profiles and discover new content

6. **Robust Error Handling**:
   - Comprehensive error management with user-friendly messages
   - Network error handling and graceful fallbacks
   - Form validation and input error feedback

---

## **Installation ⚙️**

### Steps to Set Up the Project Locally:

1. Clone the repository:

   ```bash
   git clone [repository-url]
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

---

## **Usage 🛠️**

The application includes the following main routes and features:

- **Home Page**: `/` - View all posts and search functionality
- **User Registration**: `/auth/register` - Create a new account
- **User Login**: `/auth/login` - Sign in to existing account
- **User Profile**: `/profile/` - View and edit your profile, see your posts
- **Create Post**: `/post/create/` - Share new content with media
- **Edit Post**: `/post/edit/` - Modify existing posts
- **View Post**: `/post/` - Read individual posts with comments
- **Logout**: Available in navigation - Secure session termination

---

## **Technologies Used 💻**

- **HTML5**: Semantic markup and structure
- **CSS3**: Custom styling and animations
- **JavaScript (ES6+)**: Core application logic and API interactions
- **Tailwind CSS**: Modern utility-first CSS framework for responsive design
- **Noroff Social Media API**: RESTful API for all backend functionality
- **Local Storage**: Client-side storage for authentication tokens and user data
- **Vite**: Fast development environment and build tool
- **PostCSS**: CSS processing and optimization
- **Autoprefixer**: Automatic vendor prefix handling

---
