// Check if user is logged in
const authSection = document.getElementById("auth-section");
const journalSection = document.getElementById("journal-section");
const displayUsername = document.getElementById("display-username");

function login() {
  const username = document.getElementById("username").value;
  if (username) {
    localStorage.setItem("journalUser", username);
    showJournalSection(username);
  }
}

function logout() {
  localStorage.removeItem("journalUser");
  authSection.classList.remove("hidden");
  journalSection.classList.add("hidden");
}

// Show journal section if user is logged in
function showJournalSection(username) {
  authSection.classList.add("hidden");
  journalSection.classList.remove("hidden");
  displayUsername.innerText = username;
}

// Load saved username and entries on page load
window.onload = function () {
  const savedUser = localStorage.getItem("journalUser");
  if (savedUser) {
    showJournalSection(savedUser);
  }
  loadEntries();
};

// Add a journal entry
function addEntry() {
  const title = document.getElementById("entry-title").value;
  const content = document.getElementById("text-editor").innerHTML;

  if (title && content) {
    const entry = { title, content, date: new Date().toLocaleString() };
    saveEntry(entry);
    document.getElementById("entry-title").value = "";
    document.getElementById("text-editor").innerHTML = "";
  }
}

// Save entry to localStorage
function saveEntry(entry) {
  const entries = JSON.parse(localStorage.getItem("journalEntries")) || [];
  entries.push(entry);
  localStorage.setItem("journalEntries", JSON.stringify(entries));
  loadEntries();
}

// Load entries from localStorage
function loadEntries() {
  const entryList = document.getElementById("entry-list");
  entryList.innerHTML = ""; // Clear existing entries
  const entries = JSON.parse(localStorage.getItem("journalEntries")) || [];

  entries.forEach((entry) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
      <h4>${entry.title}</h4>
      <small>${entry.date}</small>
      <div class="content">${entry.content}</div>
    `;
    entryList.appendChild(listItem);
  });
}
