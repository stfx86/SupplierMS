const multer = require("multer");
const upload = multer({ dest: "src/uploads/" });

module.exports = upload.fields([
  { name: "logoFile", maxCount: 1 },
  { name: "bioFile", maxCount: 1 },
]);
