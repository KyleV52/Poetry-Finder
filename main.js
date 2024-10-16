const getAuthors = () => {
  axios
    .get("https://poetrydb.org/author")
    .then((response) => {
      if (response.status !== 200) {
        throw new Error(
          `Error fetching authors: ${response.status} ${response.statusText}`
        );
      }
      return response.data; // Use response.data
    })
    .then((data) => {
      const authorsData = data.authors;
      const authorsList = document.querySelector(".authors-list"); // Get the list element

      // Clear the list before adding new authors
      authorsList.innerHTML = "";

      // Populate the list with buttons for authors
      authorsData.forEach((author) => {
        const button = document.createElement("button"); // Create a button
        button.textContent = author; // Set the text to the author's name
        button.addEventListener("click", () => fetchTitles(author)); // Add click event to fetch titles
        authorsList.appendChild(button); // Append the button to the list
      });
    })
    .catch((error) => console.error("Error fetching authors:", error));
};

const fetchTitles = (author) => {
  axios
    .get(`https://poetrydb.org/author/${encodeURIComponent(author)}/title`)
    .then((response) => {
      if (response.status !== 200) {
        throw new Error(
          `Error fetching titles: ${response.status} ${response.statusText}`
        );
      }
      return response.data; // Use response.data
    })
    .then((data) => {
      // Extract titles from the response data
      const titles = data.map((poem) => poem.title); // Create an array of titles
      displayTitles(author, titles); // Call function to display titles
    })
    .catch((error) => console.error("Error fetching titles:", error));
};

const displayTitles = (author, titles) => {
  // Select the titles list container
  const titlesContainer = document.querySelector(".titles-list");

  // Clear existing content in the titles container
  titlesContainer.innerHTML = ""; // Clear previous titles if any

  // Create and append the author heading
  const authorHeading = document.createElement("h3");
  authorHeading.textContent = `Titles by ${author}`; // Set the heading to the author's name
  titlesContainer.appendChild(authorHeading); // Append heading to the titles container

  // Create a new list for titles
  const titlesList = document.createElement("ul");

  titles.forEach((title) => {
    const listItem = document.createElement("li"); // Create a list item
    listItem.textContent = title; // Set the title as text content
    titlesList.appendChild(listItem); // Append to the titles list
  });

  // Append the new titles list to the titles container
  titlesContainer.appendChild(titlesList); // Append titles list to titles-container
};

// Add an event listener to the button once the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  const button = document.querySelector(".get-btn");
  button.addEventListener("click", getAuthors);
});
