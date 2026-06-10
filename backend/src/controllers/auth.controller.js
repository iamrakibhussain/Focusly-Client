import registerUserService from "../services/auth.service.js"
export default function registerUser(req, res) {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "Please provide name, email and password"
        })
    }
    registerUserService(name, email, password)
    res.status(201).json({
        success: true,
        message: "User Registered Successfully",
    });
}; 