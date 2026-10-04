import xss from 'xss';

const sanitize = (obj) => {
  if (typeof obj === 'string') {
    return xss(obj); // Strip dangerous HTML tags
  }
  if (Array.isArray(obj)) {
    return obj.map((v) => sanitize(v));
  }
  if (typeof obj === 'object' && obj !== null) {
    Object.keys(obj).forEach((key) => {
      obj[key] = sanitize(obj[key]);
    });
  }
  return obj;
};

export const xssSanitizer = (req, res, next) => {
  if (req.body) sanitize(req.body);
  if (req.query) sanitize(req.query);
  if (req.params) sanitize(req.params);
  next();
};
