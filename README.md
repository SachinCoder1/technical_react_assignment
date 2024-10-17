# Resource Management App

![License](https://img.shields.io/badge/license-MIT-green) 
![Version](https://img.shields.io/badge/version-1.0.0-blue)

A comprehensive resource management app that leverages modern technologies such as **React**, **Mantine UI**, **React Query**, and **Zustand** to fetch, display, and interact with resources from the **Star Wars API (SWAPI)**. The app includes authentication, data enrichment, deep linking, pagination, searching, sorting, and more!

## Features ✨

### ✔️ **Authentication**
- Secure login/logout functionality with Zustand state management.
- User-friendly navigation with dynamic login/logout button in the navbar.
- Access restricted content based on authentication state.

### ✔️ **Resource List Page**
- Displays a list of resources (Star Wars characters) in a tabular format using Mantine’s Table component.
- Features **searching**, **sorting**, and **pagination** to enhance the user experience.
- Date of creation is formatted and displayed, with fallback for missing data.
- Paginated data fetched from the API, dynamically loading each page.

### ✔️ **Resource Detail Page**
- Detailed view for each resource (character) with enriched data.
- Subsequent API calls using React Query to fetch related data like films and homeworld.
- Efficient error handling and loading states for a smooth user experience.

### ✔️ **Data Enrichment**
- Fetch additional information such as related films and homeworld details using `Promise.all` and `axios` inside `useQuery`.
- Display enriched data in an aesthetically pleasing manner using Mantine components like `List`, `Badge`, and `Card`.

### ✔️ **Deep Linking**
- Expandable URLs using query parameters (`search`, `sort`, `page`) to allow sharing links to specific search results or pagination states.
- Dynamic updates to URL query parameters without refreshing the page, ensuring smooth navigation and deep linking.

### ✔️ **Pagination**
- Efficient pagination based on the SWAPI API's response for total count, `next`, and `previous` URLs.
- Mantine’s `Pagination` component dynamically controls the current page and fetches the corresponding data.

## Technologies Used 🛠️

- **React**: A powerful JavaScript library for building user interfaces.
- **React Query**: For efficient data fetching, caching, and updating the resource list.
- **Zustand**: A minimalistic state management solution for handling authentication and global states.
- **Mantine UI**: A modern React component library for the user interface, including tables, grids, pagination, buttons, and more.
- **Axios**: For making HTTP requests to the Star Wars API.
- **SWAPI (Star Wars API)**: The public API used to fetch character and related data.
- **React Router**: For managing routes, deep linking, and query parameters.
