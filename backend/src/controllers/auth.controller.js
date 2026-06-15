import { registerUserService, loginUserService } from "../services/auth.service.js";

export async function registerUser(req, res) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please provide name, email and password",
    });
  }

  try {
    const user = await registerUserService({ name, email, password });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
}

export async function loginUser(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Provide email & password!"
    })
  }

  try {
    const loggedInUser = await loginUserService({ email, password })
    return res.status(200).json({
      success: true,
      message: "User login successfully!",
      loggedInUser
    })
  }
  catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message
    })
  }

}
