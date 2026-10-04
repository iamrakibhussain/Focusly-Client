import {
  registerUserService,
  loginUserService,
  refreshAccessTokenService,
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

export async function registerUser(req, res, next) {
  const { name, email, password } = req.body;
  try {
    const user = await registerUserService({ name, email, password });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    next(error);
  }
}

export async function loginUser(req, res, next) {
  const { email, password } = req.body;
  try {
    const loggedInUser = await loginUserService({ email, password });

    // Set Access Token Cookie (15 mins)
    res.cookie("token", loggedInUser.token, {
      ...getAuthCookieOptions(),
      maxAge: 15 * 60 * 1000, 
    });

    // Set Refresh Token Cookie (7 days)
    res.cookie("refreshToken", loggedInUser.refreshToken, {
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
  } catch (error) {
    next(error);
  }
}

export async function refreshAccessToken(req, res, next) {
  const refreshToken = req.cookies.refreshToken;
  try {
    const tokens = await refreshAccessTokenService(refreshToken);

    // Set new Access Token
    res.cookie("token", tokens.accessToken, {
      ...getAuthCookieOptions(),
      maxAge: 15 * 60 * 1000, 
    });

    // Set new Refresh Token
    res.cookie("refreshToken", tokens.refreshToken, {
      ...getAuthCookieOptions(),
      maxAge: 7 * 24 * 60 * 60 * 1000, 
    });

    return res.status(200).json({
      success: true,
      message: "Token refreshed successfully",
    });
  } catch (error) {
    // Clear cookies if refresh token is invalid
    res.clearCookie("token", getAuthCookieOptions());
    res.clearCookie("refreshToken", getAuthCookieOptions());
    next(error);
  }
}

export async function getMe(req, res, next) {
  try {
    const user = await getUserByIdService(req.user.userId);

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
}

export async function logoutUser(req, res, next) {
  res.clearCookie("token", getAuthCookieOptions());
  res.clearCookie("refreshToken", getAuthCookieOptions());

  return res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
}
