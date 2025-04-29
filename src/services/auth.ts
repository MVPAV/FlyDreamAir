'use client';

export interface AuthResponse {
    message: string;
    token?: string;
}

const BASE_URL = '/api/auth';

export async function signUp(email: string, password: string): Promise<AuthResponse> {
    const res = await fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });
    return res.json();
}

export async function login(email: string, password: string): Promise<AuthResponse> {
    const res = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });
    return res.json();
}
