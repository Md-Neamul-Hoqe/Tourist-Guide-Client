# [Tourist Guide](https://tourist-guides-mnh.web.app)

"Dream Place" is your ultimate destination guide, designed to transform your travel aspirations into unforgettable experiences. This innovative platform offers a curated selection of dreamy destinations worldwide, catering to every traveler's desires and preferences. With immersive descriptions, captivating images, and insightful recommendations, Dream Place provides detailed insights into each location's unique charm, local culture, must-see attractions, and hidden gems. Whether you seek tranquil retreats, bustling city scapes, or adventure-filled landscapes, Dream Place helps you plan your ideal itinerary, ensuring that every moment of your journey is filled with wonder and discovery. Explore, dream, and plan your next adventure with confidence, guided by Dream Place's expert recommendations and comprehensive travel insights.

## Project Structure

- `src/`: Contains the source code for the project.
- `public/`: Some assets [Logo and Welcome Modal].

## Key Features

### Visitors (No Sign-in Required)
- **View and Save to Wish List**: Visitors can browse packages and save them to their wish list without signing in.

### Signed-in Tourist Users
- **Commenting**: Tourist users can leave comments on packages.
- **Booking**: They have the ability to book packages for their travels.

### Signed-in Guide Users
- **Booking Management**: Guides can view requests for booked packages and accept or reject them.
- **Interaction with Bookings**: They can communicate with tourists who've booked packages with them.

### Signed-in Admin Users
- **User Role Management**: Admins can manage user roles within the platform.
- **Package Management**: They have the privilege to add new packages to the platform.

### General Features
- **Warning Prompts**: Users receive warnings about the potential impact of their actions before confirming.
- **Story Sharing**: Signed-in users can share tour stories on Facebook or write their own stories within the platform.


## Installation

1. Clone the repository:

for front end:

```bash
git clone https://github.com/programming-hero-web-course1/b8a12-client-side-Md-Neamul-Hoqe.git
```

for backend:

```bash
git clone https://github.com/programming-hero-web-course1/b8a12-server-side-Md-Neamul-Hoqe.git
```

2. Install dependencies: [before installation please check the folder name like "b8a12-server-side-Md-Neamul-Hoqe" (may suffix with main)]

For frontend:

```bash
cd b8a12-client-side-Md-Neamul-Hoqe
npm install
```

For backend:

```bash
cd b8a12-server-side-Md-Neamul-Hoqe
npm install
```

For security keys I used dotenv file. you need add yours own to backend as named `URI`, `DB_NAME`, `ACCESS_TOKEN_SECRET`, `Payment_SECRET` and for front end as named `VITE_apiKey`, `VITE_authDomain`, `VITE_projectId`, `VITE_storageBucket`, `VITE_messagingSenderId`, `VITE_appId`, `VITE_image_upload_key`, `VITE_payment_gateway`,

## Packages Used

The following npm packages were utilized in this project:
a brief description of the packages used in the "Dream Place" tourist guide site:

- **@smastrom/react-rating:** This package provides a React component for star ratings, allowing users to rate and review destinations or places on the platform.

- **@tanstack/react-query:** It's a library for managing server state in React applications, enabling efficient data fetching and caching from the server.

- **animate.css:** Offers a collection of CSS animations to add visual effects and transitions, enhancing the user interface and experience of the website.

- **axios:** A popular JavaScript library used for making HTTP requests, likely utilized for fetching data from APIs or external sources.

- **firebase:** Firebase is a platform offering various services such as authentication, database, and hosting. It might be used for backend functionalities or user authentication.

- **framer-motion:** This library facilitates creating smooth and interactive animations in React applications, enhancing the visual appeal of the website.

- **react-awesome-slider:** Offers a customizable image carousel/slider component for showcasing images of different travel destinations or attractions.

- **react-datepicker:** Provides a date picker component for selecting dates, useful for travel itinerary planning or booking.

- **react-helmet-async:** Enables managing document head tags like title, meta, etc., asynchronously in React applications.

- **react-hook-form:** A library for managing forms in React with ease, possibly used for handling user input in various sections of the site.

- **react-icons:** A collection of SVG icons packaged as React components, likely used for displaying icons across the site.

- **react-share:** Provides social media share buttons or components, allowing users to easily share content related to specific destinations or experiences.

- **react-simple-captcha:** Possibly used to implement a simple captcha system for user verification or security purposes.

- **react-tabs:** Offers tab-based navigation components, useful for organizing and presenting content in different sections.

- **react-youtube:** Provides a React component for embedding YouTube videos, allowing the site to showcase video content related to destinations or travel tips.

- **sweetalert2:** A library for displaying attractive modal dialogs or pop-up messages, enhancing user interaction and experience on the site.

- **typewriter-effect:** Offers an effect to simulate typing text, possibly used for adding engaging textual animations on the website.

- **react-dom:** Works in conjunction with React to manipulate the DOM and render React components.

- **react-router-dom:** Essential for handling routing and navigation within a React application.

- **sort-by:** A simple utility for sorting arrays based on given criteria, helpful in sorting and organizing destination data or lists.

- **localforage:** Provides a simple localStorage-like API but uses asynchronous storage (IndexedDB or WebSQL), suitable for storing data offline.

- **match-sorter:** A package used for sorting and filtering arrays or collections based on a provided search query or sorting criteria.

- **react:** The fundamental library for building user interfaces in React applications.

## Usage

To start the development server:

For front end:

```bash
npm run dev
```

This will run the application in development mode. Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

For backend:

```bash
npm start
```

## Build

To create a production build:

```bash
npm run build
```

This will generate optimized production-ready files in the `dist/` directory.

## Deployment

You can deploy this project to your hosting platform of choice. Ensure to configure your deployment settings based on the chosen hosting service. Here I deployed my front end to firebase and backend to vercel.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## License

This project is licensed under the [MIT License](LICENSE).

---

Feel free to tailor this README to include specific instructions, guidelines, or additional details about your project.
