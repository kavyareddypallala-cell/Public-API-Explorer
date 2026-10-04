const apiContainer = document.getElementById("apiContainer");

const searchInput = document.getElementById("searchInput");

const categoryFilter =
    document.getElementById("categoryFilter");


let allApis = [];


// FETCH API DATA

async function loadAPIs() {

    try {

        const response =
            await fetch(
                "https://api.publicapis.org/entries"
            );

        const data =
            await response.json();

        allApis = data.entries;

        displayAPIs(allApis);

    } catch (error) {

        apiContainer.innerHTML = `
            <div class="no-results">
                Unable to load APIs.
                Please check your internet connection.
            </div>
        `;

        console.error(error);

    }

}


// DISPLAY APIs

function displayAPIs(apis) {

    apiContainer.innerHTML = "";

    if (apis.length === 0) {

        apiContainer.innerHTML = `
            <div class="no-results">
                No APIs found.
            </div>
        `;

        return;
    }


    apis.forEach(api => {

        const card =
            document.createElement("div");

        card.className = "api-card";


        card.innerHTML = `

            <span class="category">
                ${api.Category}
            </span>

            <h3>
                ${api.API}
            </h3>

            <p>
                ${api.Description}
            </p>

            <a
                class="api-link"
                href="${api.Link}"
                target="_blank"
            >
                Visit API →
            </a>

        `;


        apiContainer.appendChild(card);

    });

}


// FILTER APIs

function filterAPIs() {

    const searchValue =
        searchInput.value
        .toLowerCase()
        .trim();


    const categoryValue =
        categoryFilter.value;


    const filtered =
        allApis.filter(api => {

            const matchesSearch =
                api.API
                .toLowerCase()
                .includes(searchValue)
                ||
                api.Description
                .toLowerCase()
                .includes(searchValue);


            const matchesCategory =
                categoryValue === "all"
                ||
                api.Category === categoryValue;


            return matchesSearch && matchesCategory;

        });


    displayAPIs(filtered);

}


// SEARCH EVENT

searchInput.addEventListener(
    "input",
    filterAPIs
);


// CATEGORY EVENT

categoryFilter.addEventListener(
    "change",
    filterAPIs
);


// SCROLL BUTTON

function scrollToExplorer() {

    document
        .getElementById("explore")
        .scrollIntoView({
            behavior: "smooth"
        });

}


// LOAD APIs WHEN PAGE OPENS

loadAPIs();