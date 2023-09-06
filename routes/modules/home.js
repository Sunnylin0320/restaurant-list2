const express = require("express");
const router = express.Router();
const Restaurant = require("../../models/restaurant");


router.get("/", (req, res) => {
  const userId = req.user._id;
  Restaurant.find({ userId })
    .lean()
    .sort({ _id: "asc" }) // desc
    .then((restaurants) => res.render("index", { restaurants }))
    .catch((error) => console.error(error));
});


router.get("/search", (req, res) => {
  const userId = req.user._id;
  const keyword = req.query.keyword.trim().toLowerCase(); // 將關鍵字轉換為小寫

  Restaurant.find({ userId, name: { $regex: keyword, $options: "i" } }) // 使用 $options: "i" 進行不區分大小寫搜尋
    .lean()
    .sort({ _id: "asc" })
    .then((restaurants) => res.render("index", { restaurants, keyword }))
    .catch((error) => console.error(error));
});



module.exports = router;
