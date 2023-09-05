const express = require("express");
const router = express.Router();
const restaurantList = require("../../models/seeds/restaurant.json")
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
  const keyword = req.query.keyword;
  const restaurants = restaurantList.results.filter((restaurant) => {
    return restaurant.name.toLowerCase().includes(keyword.toLowerCase());
  });
  res.render("index", { restaurants: restaurants, keyword: keyword });
});

module.exports = router;
