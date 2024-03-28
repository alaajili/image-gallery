# Image Gallery App
Welcome to the Image Gallery App! This project showcases a simple yet elegant image gallery where users can browse through various images, like their favorite ones, and even scroll through an endless feed of captivating visuals.

## Features

### Authentication
- Users can sign in using their username and password.
- Upon successful authentication, users are redirected to the image gallery.

### Image Gallery
- The image gallery displays a collection of images fetched from an external API (unsplash api).
- Users can scroll infinitely through the gallery, loading more images as they reach the bottom of the page.

### Like Functionality
- Users can like/unlike images by clicking on the heart icon.
- Liked images are distinguished by a filled heart icon, while unliked images display an outline heart icon.
- Liked images are stored locally for each user using LevelDB.

### Responsive Design
- The app is designed to be responsive, providing an optimal viewing experience across various devices and screen sizes.

## Usage

To run the application locally, follow these steps:
1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Install dependencies using npm install.
4. art the development server with npm run dev.
5. Open your web browser and visit http://localhost:3000 to view the application.

