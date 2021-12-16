const router = require("express").Router()
const searchController = require("../controllers/search")

router.post("/user", searchController.searchUser);
router.post("/recentchats", searchController.searchRecentChats);
router.post("/usersbyids", searchController.searchUsersByIDs);

module.exports = router;