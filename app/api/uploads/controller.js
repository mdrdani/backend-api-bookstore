const uploadImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(403).json({ message: 'Please upload a file' });
    }
    res.status(200).json({
      message: 'File uploaded successfully',
      data: { src: `/uploads/${req.file.filename}` },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  uploadImage,
};
