import sharp from 'sharp';

const createThumbnail = async (req, res, next) => {
  if (!req.file) {
    next();
    return;
  }
  const filePath = req.file.path;
  const thumbnailPath = `${filePath}_thumb`;
  await sharp(filePath)
    .resize(160, 160)
    .toFile(thumbnailPath);
  next();
};

export { createThumbnail };
