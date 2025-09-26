// Temporary storage for demo purposes (replace with backend later)
export function login(email, password) {
  // Dummy users
  const users = [
    { email: "user@example.com", password: "123456", role: "user" },
    { email: "driver@example.com", password: "driver123", role: "driver" },
    { email: "admin@example.com", password: "admin123", role: "admin" },
  ];

  const foundUser = users.find(u => u.email === email && u.password === password);
  if (foundUser) {
    localStorage.setItem("role", foundUser.role);
    localStorage.setItem("email", foundUser.email);
    return foundUser.role;
  }
  return null;
}

export function logout() {
  localStorage.removeItem("role");
  localStorage.removeItem("email");
}

export function getRole() {
  return localStorage.getItem("role");
}
