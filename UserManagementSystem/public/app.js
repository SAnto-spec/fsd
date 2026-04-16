const apiBase = "/api/users";

const userForm = document.getElementById("userForm");
const usersList = document.getElementById("usersList");
const messageBox = document.getElementById("message");
const resetBtn = document.getElementById("resetBtn");
const submitBtn = document.getElementById("submitBtn");
const formTitle = document.getElementById("formTitle");
const statusText = document.getElementById("statusText");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const loadAllBtn = document.getElementById("loadAllBtn");

const docId = document.getElementById("docId");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const ageInput = document.getElementById("age");
const hobbiesInput = document.getElementById("hobbies");
const bioInput = document.getElementById("bio");
const userIdInput = document.getElementById("userId");

const setMessage = (text, isError = false) => {
  messageBox.textContent = text;
  messageBox.style.color = isError ? "#fda4af" : "#38bdf8";
};

const clearForm = () => {
  docId.value = "";
  userForm.reset();
  formTitle.textContent = "Add New User";
  submitBtn.textContent = "Save User";
};

const readFormData = () => ({
  name: nameInput.value.trim(),
  email: emailInput.value.trim(),
  age: ageInput.value ? Number(ageInput.value) : undefined,
  hobbies: hobbiesInput.value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean),
  bio: bioInput.value.trim(),
  userId: userIdInput.value.trim()
});

const renderUsers = (users) => {
  if (!users.length) {
    usersList.innerHTML = `<div class="user-card"><p>No users found.</p></div>`;
    return;
  }

  usersList.innerHTML = users
    .map(
      (user) => `
        <article class="user-card">
          <h3>${user.name}</h3>
          <div class="user-meta">
            <div><strong>Email:</strong> ${user.email}</div>
            <div><strong>Age:</strong> ${user.age ?? "-"}</div>
            <div><strong>User ID:</strong> ${user.userId}</div>
            <div><strong>Hobbies:</strong> ${(user.hobbies || []).join(", ") || "-"}</div>
            <div><strong>Bio:</strong> ${user.bio || "-"}</div>
            <div><strong>Created:</strong> ${user.createdAt ? new Date(user.createdAt).toLocaleString() : "-"}</div>
          </div>
          <div class="user-actions">
            <button class="ghost edit" type="button" data-edit='${JSON.stringify(user).replaceAll("'", "&apos;")}'>Edit</button>
            <button class="ghost danger" type="button" data-delete="${user._id}">Delete</button>
          </div>
        </article>
      `
    )
    .join("");

  document.querySelectorAll("[data-edit]").forEach((button) => {
    button.addEventListener("click", () => {
      const user = JSON.parse(button.getAttribute("data-edit").replaceAll("&apos;", "'"));
      docId.value = user._id;
      nameInput.value = user.name || "";
      emailInput.value = user.email || "";
      ageInput.value = user.age ?? "";
      hobbiesInput.value = Array.isArray(user.hobbies) ? user.hobbies.join(", ") : "";
      bioInput.value = user.bio || "";
      userIdInput.value = user.userId || "";
      formTitle.textContent = "Update User";
      submitBtn.textContent = "Update User";
      setMessage("Editing user. Update the fields and save.");
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });

  document.querySelectorAll("[data-delete]").forEach((button) => {
    button.addEventListener("click", async () => {
      const id = button.getAttribute("data-delete");
      if (!confirm("Delete this user?")) return;

      try {
        const response = await fetch(`${apiBase}/${id}`, { method: "DELETE" });
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Delete failed");
        }

        setMessage(result.message || "User deleted successfully");
        loadUsers();
      } catch (error) {
        setMessage(error.message, true);
      }
    });
  });
};

const loadUsers = async () => {
  try {
    const response = await fetch(apiBase);
    const result = await response.json();
    renderUsers(result.data || []);
    setMessage(`Loaded ${result.count || 0} user(s).`);
  } catch (error) {
    setMessage(error.message, true);
  }
};

const searchUsers = async () => {
  const q = searchInput.value.trim();
  if (!q) {
    loadUsers();
    return;
  }

  try {
    const response = await fetch(`/api/users/search?q=${encodeURIComponent(q)}`);
    const result = await response.json();
    renderUsers(result.data || []);
    setMessage(`Found ${result.count || 0} result(s) for "${q}".`);
  } catch (error) {
    setMessage(error.message, true);
  }
};

userForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const payload = readFormData();
  const isEdit = Boolean(docId.value);
  const url = isEdit ? `${apiBase}/${docId.value}` : apiBase;
  const method = isEdit ? "PUT" : "POST";

  try {
    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || result.message || "Request failed");
    }

    setMessage(result.message || (isEdit ? "User updated" : "User created"));
    clearForm();
    loadUsers();
  } catch (error) {
    setMessage(error.message, true);
  }
});

resetBtn.addEventListener("click", clearForm);
searchBtn.addEventListener("click", searchUsers);
loadAllBtn.addEventListener("click", loadUsers);
searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    searchUsers();
  }
});

fetch("/api/health")
  .then((response) => response.json())
  .then((data) => {
    statusText.textContent = data.message;
  })
  .catch(() => {
    statusText.textContent = "API unavailable";
  });

loadUsers();