
# Test Cases

### Test 1

Valid data

```txt
Expected: Success
```

---

### Test 2

Duplicate email

```txt
Expected:
Email already exists
```

---

### Test 3

Missing password

```txt
Expected:
Password is required
```

---

# Phase 6: Frontend Connect

Register Page:

Fields:

```txt
Name
Email
Password
Confirm Password
```

Submit:

```txt
React Form
    ↓
Axios POST
    ↓
/api/auth/register
```

---

# Register Feature Done হলে Checklist

```txt
✓ User table created

✓ Prisma connected

✓ Register API created

✓ Validation added

✓ Email uniqueness check

✓ Password hashing

✓ User saved in database

✓ Postman tested

✓ Frontend connected
```

---

# এরপর কী?

Register complete হওয়ার পর:

```txt
Login Feature
```

কারণ flow হবে:

```txt
Register
    ↓
Login
    ↓
JWT
    ↓
Protected Routes
```

তাই এখন শুধু একটা target:

🎯 **Database → User Model → Register API → Frontend Register Form Integration**

এটা complete না হওয়া পর্যন্ত Login বা JWT-তে যেও না। এতে focus থাকবে এবং debugging অনেক সহজ হবে।
