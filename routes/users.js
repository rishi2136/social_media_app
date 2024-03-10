const express = require("express");
const users = require("../controllers/users.js");
const { viewProfile, renderEditUser, editUser  } = require("../controllers/users.js");
const router = express.Router();

router.route("/profile")
.get(users.renderAddForm);

router.route("/profile/new")
.post(users.addUser)

router.route("/profile/:id/view")
.get(users.viewProfile);


router.route("/profile/:id")
.get(users.renderEditUser)
.put(users.editUser)
.delete(users.deleteUser)


module.exports = router;
