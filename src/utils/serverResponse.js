export const successResponse = (res, data, code = 200) =>
  res.status(code).json({
    data: data || 'OK',
    success: true,
  });

export const errorResponse = (res, error, code = 500) =>
  res.status(code).json({
    error: error?.message ? error?.message : error,
    success: false,
  });
