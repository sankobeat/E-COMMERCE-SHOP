import express from "express";
import multer from "multer";
import path from "path";

const router = express.Router();

// const storage = multer.diskStorage({
//   destination(req, file, cb) {
//     cb(null, "uploads/");
//   },
//   filename(req, file, cb) {
//     cb(
//       null,
//       `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
//     );
//   },
// });

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

// function checkFileType(file, cb) {
//   const filetypes = /jpeg|png|jpg/;
//   const extname = filetypes.test(
//     path.extname(file.originalname).toLocaleLowerCase()
//   );
//   const mimetype = filetypes.test(file.mimetype);
//   if (extname && mimetype) {
//     return cb(null, true);
//   } else {
//     cb("Images only!");
//   }
// }

function checkFileType(file, cb) {
  const filetype = /jpeg|png|jpg/;
  const extname = filetype.test(
    path.extname(file.originalname).toLocaleLowerCase()
  );
  const mimetype = filetype.test(file.mimetype);
  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb("Images only");
  }
}

// const upload = multer({
//   storage,
//   fileFilter: function (req, file, cb) {
//     checkFileType(file, cb);
//   },
// });

// router.post("/", upload.single("image"), (req, res) => {
//   res.send(`/${req.file.path}`);
// });

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

router.post("/", upload.single("image"), (req, res) => {
  console.log(req.file.path);
  res.send(`/${req.file.path}`);
});

export default router;
