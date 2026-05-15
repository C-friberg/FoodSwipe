const API_URL = "http://localhost:5143/api/account";

export type RegisterRequest = {
  username: string;
  email: string;
  password: string;
};

export type LoginRequest = {
  username: string;
  password: string;
};

export async function registerUser(data: RegisterRequest) {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.log(errorText);

    throw new Error(errorText);
  }

  return response.text();
}

export async function loginUser(data: LoginRequest) {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Fel användarnamn eller lösenord.");
  }

  return response.json() as Promise<{ token: string }>;
}