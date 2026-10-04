export const validateRequest = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    const errorMsg = result.error.issues ? result.error.issues[0].message : "Validation failed";
    return res.status(400).json({
      success: false,
      message: errorMsg,
    });
  }
  next();
};
