const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const { registerSupplier } = require("../controllers/supplierController");

router.post("/register", upload, registerSupplier);

module.exports = router;
