const postMedia = async (req, res, next) => {
  if (!req.file) {
    const error = new Error('Invalid or missing file');
    error.status = 400;
    return next(error);
  }
  try {
    const { title, description } = req.body;
    const { filename, mimetype, size } = req.file;
    const user_id = req.user.user_id;
    const newMedia = { title, description, user_id, filename, mimetype, size };
    const result = await addMedia(newMedia);
    if (result.error) {
      const error = new Error(result.error);
      error.status = 400;
      return next(error);
    }
    res.status(201).json({ message: 'New media item added.', ...result });
  } catch (err) {
    next(err);
  }
};

export { postMedia };
