
## এখনই করতে হবে
এগুলো না করলে auth flow incomplete বা risky থাকবে:

1. **Logout**
   - cookie clear করতে হবে
   - user safely বের হতে পারবে

2. **Server-side validation**
   - register/login-এ backend validation থাকতে হবে
   - frontend validation একা যথেষ্ট না

3. **Basic security hardening**
   - `httpOnly` cookie
   - `secure` production-এ
   - `sameSite` ঠিক রাখা

4. **Sensitive data না পাঠানো**
   - password কখনো return না
   - `/me` এ safe user data দাও

5. **Protected routes**
   - login ছাড়া dashboard access বন্ধ

6. **Clean error handling**
   - consistent error message
   - unauthorized / invalid token আলাদা handle

## পরে আস্তে আস্তে improve করলে চলবে
এগুলো এখন না করলেও project চলবে:

1. **Rate limiting**
2. **Refresh token system**
3. **Email verification**
4. **Forgot/reset password**
5. **Role-based access**
6. **Tests**
7. **Audit logs**
8. **Advanced auth context/store**
9. **Better loading UX**
10. **Extra performance polish**

## শর্ট rule
- **core auth/security-related** = এখন
- **advanced improvement** = পরে