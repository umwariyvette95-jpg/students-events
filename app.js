// Default events
let events = [
  { id: 1, title: "AI Bootcamp", category: "Technology", seats: 30, registered: 12 },
  { id: 2, title: "Football Trials", category: "Sports", seats: 20, registered: 5 },
  { id: 3, title: "Science Fair", category: "Science", seats: 25, registered: 10 }
];


// get element from html
let container       = document.getElementById("events-container");
let totalEvents     = document.getElementById("stat-total");
let totalRegistered = document.getElementById("stat-registered");
let seatsLeft       = document.getElementById("stat-seats");
let form            = document.getElementById("add-event-form");
let searchInput     = document.getElementById("search-input");


// Save to localStorage
function saveToLocalStorage() {
  localStorage.setItem("events", JSON.stringify(events));
}


// Display events
function showEvents(list = events) {

  container.innerHTML = "";

  for (let i = 0; i < list.length; i++) {

    let event = list[i];

    let remaining = event.seats - event.registered;
    let percent = Math.round((event.registered / event.seats) * 100);

    let card = document.createElement("div");
    card.className = "bg-white rounded-2xl shadow p-5 hover:-translate-y-1 hover:shadow-lg transition-all duration-200";

    card.innerHTML = `
      <div class="mb-3">
        <span class="bg-blue-100 text-blue-600 text-xs font-bold px-3 py-1 rounded-full">
          ${event.category}
        </span>
      </div>

      <h2 class="text-xl font-extrabold mb-3">${event.title}</h2>

      <div class="w-full bg-gray-100 rounded-full h-2 mb-1 overflow-hidden">
        <div class="h-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"
             style="width: ${percent}%"></div>
      </div>

      <p class="text-xs text-gray-400 font-semibold mb-4">${percent}% full</p>

      <div class="flex gap-2 mb-4">
        <div class="flex-1 bg-gray-50 rounded-xl p-2 text-center">
          <span class="block text-lg font-extrabold">${event.seats}</span>
          <span class="block text-xs text-gray-400">Total</span>
        </div>

        <div class="flex-1 bg-gray-50 rounded-xl p-2 text-center">
          <span class="block text-lg font-extrabold">${event.registered}</span>
          <span class="block text-xs text-gray-400">Registered</span>
        </div>

        <div class="flex-1 bg-green-50 rounded-xl p-2 text-center">
          <span class="block text-lg font-extrabold text-green-500">${remaining}</span>
          <span class="block text-xs text-gray-400">Left</span>
        </div>
      </div>

      <div class="flex gap-2">
        <button onclick="register(${event.id})"
          class="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-xl">
          Register
        </button>

        <button onclick="cancelRegistration(${event.id})"
          class="flex-1 bg-red-50 hover:bg-red-100 text-red-500 font-bold py-2 rounded-xl">
          Cancel
        </button>
      </div>
    `;

    container.appendChild(card);
  }

  updateStats();
}


// Register event
function register(id) {
  for (let i = 0; i < events.length; i++) {
    if (events[i].id === id) {

      if (events[i].registered < events[i].seats) {
        events[i].registered++;
        alert("Registered successfully!");
      } else {
        alert("No seats left!");
      }
    }
  }

  saveToLocalStorage();
  showEvents();
}


// Cancel registration
function cancelRegistration(id) {
  for (let i = 0; i < events.length; i++) {
    if (events[i].id === id) {

      if (events[i].registered > 0) {
        events[i].registered--;
        alert("Registration cancelled!");
      }
    }
  }

  saveToLocalStorage();
  showEvents();
}


// Update stats
function updateStats() {

  let registered = 0;
  let remaining = 0;

  for (let i = 0; i < events.length; i++) {
    registered += events[i].registered;
    remaining += (events[i].seats - events[i].registered);
  }

  totalEvents.innerText = events.length;
  totalRegistered.innerText = registered;
  seatsLeft.innerText = remaining;
}


// Add new event
form.addEventListener("submit", function(e) {
  e.preventDefault();

  let title    = document.getElementById("event-title").value;
  let category = document.getElementById("event-category").value;
  let seats    = document.getElementById("event-seats").value;

  if (title === "" || category === "" || seats === "") {
    alert("Please fill all fields");
    return;
  }

  let newEvent = {
    id: events.length + 1,
    title: title,
    category: category,
    seats: Number(seats),
    registered: 0
  };

  events.push(newEvent);

  saveToLocalStorage();
  showEvents();

  form.reset();
  alert("Event added!");
});


// Search
searchInput.addEventListener("input", function() {

  let searchText = searchInput.value.toLowerCase();

  let filteredEvents = events.filter(function(event) {
    return (
      event.title.toLowerCase().includes(searchText) ||
      event.category.toLowerCase().includes(searchText)
    );
  });

  showEvents(filteredEvents);
});


// initial load
showEvents();