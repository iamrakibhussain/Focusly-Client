import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../src/app.js';
import prisma from '../src/lib/prisma.js';

describe('Auth Endpoints', () => {
  const testUser = {
    name: 'Test User',
    email: `test${Date.now()}@example.com`,
    password: 'Password123!',
  };

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send(testUser);
    
    console.log("Register response:", res.body);
    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.user).toHaveProperty('id');
    expect(res.body.user.email).toBe(testUser.email.toLowerCase());
  });

  it('should login the user', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: testUser.email,
        password: testUser.password,
      });

    console.log("Login response:", res.body);
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.loggedInUser).toHaveProperty('id');
    expect(res.body.loggedInUser.email).toBe(testUser.email.toLowerCase());
  });

  it('should fail with weak password', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Weak Pass',
        email: `weak${Date.now()}@example.com`,
        password: 'weak',
      });
    
    console.log("Weak password response:", res.body);
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });
});
