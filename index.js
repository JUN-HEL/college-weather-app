// Function to fetch city weather data
async function fetchCity(p_city) {
    const response = await fetch(`/weather?q=${p_city}`);  // Your API endpoint
    return response.json(); // Return the JSON data from the API
}

// Function to display error message if the city is not found
function displayError() {
    document.getElementById("weather-result").innerHTML = `<p style="color: red;">Please enter a valid city name.</p>`;
}

// Function to clear the fields in the result display
function clearFields() {
    document.getElementById("temp").innerText = "--";
    document.getElementById("humidity").innerText = "--";
    document.getElementById("wind_speed").innerText = "--";
}

// Function to display the weather data
function displayWeatherData(data) {
    // Check if the data is available and contains the necessary weather information
    if (data.main && data.wind) {
        // Display the temperature
        document.getElementById("temp").innerText = `${data.main.temp} °C`;
        
        // Display the humidity
        document.getElementById("humidity").innerText = `${data.main.humidity} %`;

        // Display the wind speed
        document.getElementById("wind_speed").innerText = `${data.wind.speed} km/h`;
    } else {
        // If data is not valid, display an error
        displayError();
    }
}

// Adding event listener when the document is loaded
document.addEventListener("DOMContentLoaded", () => {
    // When the user clicks the submit button
    document.getElementById("submit").addEventListener("click", (event) => {
        event.preventDefault(); // Prevent form submission

        const city = document.getElementById("city").value.trim();  // Get the city name from input

        // If the city is provided, fetch data and display it
        if (city) {
            fetchCity(city)  // Call fetchCity function to get weather data
                .then((data) => displayWeatherData(data))  // Display weather data
                .catch(() => displayError());  // If there's an error, display an error message
        } else {
            displayError();  // If no city is entered, show error message
        }
    });

    // Dark mode toggle functionality
    document.getElementById("dark-mode-toggle").addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");  // Toggle dark mode on and off
    });
});
