// Fetching all the Elements

const username = document.querySelector("[data-username]");
const searchBtn = document.querySelector("[data-searchBtn]");
const profilePic = document.querySelector(".profile-pic");
const fullName = document.querySelector("[data-fullName]");
const joinDate = document.querySelector(".join-date");

const displayUsername = document.querySelector("[data-displayUsername]");
const bio = document.querySelector("[data-displayBio]");
const displayRepo = document.querySelector("[data-displayRepo]");
const displayfollowers = document.querySelector("[data-displayFollowers]");
const displayFollowing = document.querySelector("[data-displayFollowing]");

const displayLocation = document.querySelector("[data-displayCity]");
const displayWebsite = document.querySelector("[data-displayWebsite]");
const displayTwitter = document.querySelector("[data-displayTwitter]");
const displayAddress = document.querySelector("[data-displayAddress]");

const displaySection = document.querySelector(".display-section");

const addressSection = document.querySelector(".address-section");
const invalidMsg = document.querySelector(".invalid");
const invalidAPI = document.querySelector(".APILimit");

// Event listener on Submit Button

// Logic


searchBtn.addEventListener("submit", (e) => {
    e.preventDefault();

    let usernameToSearch = username.value;
    if (usernameToSearch === "") {
        return;
    }

    else {
        fetchUserInfo(usernameToSearch);
    }
});

// Function To Fetch user info from API
async function fetchUserInfo(usernameToSearch) {
    const URL = `https://api.github.com/users/${usernameToSearch}`;

    console.log(URL);
    try {
        console.log("before response");
        const response = await fetch(URL);

        console.log("after response")
        const data = await response.json();

        console.log("after data json");
        renderUserInfo(data);

        console.log("before render");
    }
    catch (err) {
        alert("Error Fetching User Info");

    }
};


// Function to Render user information 
function renderUserInfo(userInfo) {
    console.log("render")
    if (userInfo.message === "Not Found") {
        invalidMsg.classList.add("active");


        addressSection.classList.remove("active");

        displaySection.classList.remove("active");
        return;
    }

    // Checking if API rate limit exceed
    if (userInfo.message === "API rate limit exceeded for 103.106.200.60. (But here's the good news: Authenticated requests get a higher rate limit. Check out the documentation for more details.)") {

        invalidAPI.classList.add("active");


        addressSection.classList.remove("active");

        displaySection.classList.remove("active");
        return;
    }

    // Displaying the data

    addressSection.classList.add("active");
    invalidMsg.classList.remove("active");
    invalidAPI.classList.remove("active");
    displaySection.classList.add("active");

    profilePic.src = (userInfo.avatar_url) ? userInfo.avatar_url : "";

    fullName.textContent = (userInfo.name) ? userInfo.name : "";

    displayUsername.textContent = `@${userInfo.login}`;

    bio.textContent = (userInfo.bio) ? userInfo.bio : "";

    joinDate.textContent = (userInfo.created_at) ? `Joined at ${userInfo.created_at}` : "";

    displayRepo.textContent = userInfo.public_repos;

    displayfollowers.textContent = userInfo.followers;

    displayFollowing.textContent = userInfo.following;

    displayLocation.textContent = (userInfo.location) ? userInfo.location : "";

    displayWebsite.href = userInfo.html_url;

    displayWebsite.textContent = userInfo.html_url;

    displayTwitter.href = `https://twitter.com/${userInfo?.twitter_username}`;

    displayTwitter.textContent = (userInfo?.twitter_username) ? userInfo?.twitter_username : "";

    displayAddress.textContent = (userInfo?.company) ? userInfo?.company : "";
}