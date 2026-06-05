goal:
```txt
Frontend Register Form
        ↓
POST Request
        ↓
Backend Register API
        ↓
Validation
        ↓
Hash Password
        ↓
Database Save
        ↓
Success Response
```

--- Done-----

DONE # Phase 1: Database প্রস্তুত করো

প্রথমে User table লাগবে।

DONE ## Prisma Schema

`prisma/schema.prisma`

```prisma
model User {
  id        String   @id @default(uuid())
  name      String
  email     String   @unique
  password  String
}
```

---

DONE ## Migration Run

```bash
npx prisma migrate dev --name create_user_table
```

---

DONE ## Check Database

```bash
npx prisma studio
```

তুমি User table দেখতে পাবে।

এখনও data থাকবে না।

---

# Phase 2: Register Route তৈরি

Route file:

```txt
src/routes/auth.routes.js
```

Route:

```js
router.post("/register", registerUser);
```

---

DONE # Phase 3: Controller তৈরি

File:

```txt
src/controllers/auth.controller.js
```

Responsibility:

```txt
Request receive করবে
Service call করবে
Response return করবে
```

Flow:

```txt
Frontend
   ↓
Controller
   ↓
Service
```

---

# Phase 4: Service তৈরি

File:

```txt
src/services/auth.service.js
```

এখানে main logic থাকবে।

---

# Register Logic

Step 1:

```txt
name আছে?
email আছে?
password আছে?
```

না থাকলে:

```txt
400 Bad Request
```

---

Step 2:

Email already exists?

```txt
SELECT User WHERE email = ?
```

যদি থাকে:

```txt
409 Conflict
Email already exists
```

---

Step 3:

Password Hash

```txt
plain password
      ↓
bcrypt hash
      ↓
database save
```

Never save:

```txt
12345678
```

Save:

```txt
$2b$10$.....
```

---

Step 4:

Create User

Database:

```txt
name
email
hashedPassword
```

Save.

---

Step 5:

Response

```json
{
  "success": true,
  "message": "User registered successfully"
}
```

এখন token return করার দরকার নেই।

JWT পরে।

---

# Phase 5: Postman Test

Endpoint:

```http
POST /api/auth/register
```

Body:

```json
{
  "name": "Rakib",
  "email": "rakib@gmail.com",
  "password": "12345678"
}
```

Expected:

```json
{
  "success": true,
  "message": "User registered successfully"
}
```

---

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
