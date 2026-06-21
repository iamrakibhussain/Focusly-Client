import {
  registerUserService,
  loginUserService,
  getUserByIdService,
} from "../services/auth.service.js";

function getAuthCookieOptions() {
  const isProduction = process.env.NODE_ENV === "production";

  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    path: "/",
  };
}

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
    const loggedInUser = await loginUserService({ email, password });

    res.cookie("token", loggedInUser.token, {
      ...getAuthCookieOptions(),
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "User login successfully!",
      loggedInUser: {
        id: loggedInUser.id,
        name: loggedInUser.name,
        email: loggedInUser.email,
      },
    });
  }
  catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }

}

export async function getMe(req, res) {
  try {
    const user = await getUserByIdService(req.user.userId);

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
}

export async function logoutUser(req, res) {
  res.clearCookie("token", getAuthCookieOptions());

  return res.status(200).json({
    success: true,
    message: "Logged out successfully",
  })
}
