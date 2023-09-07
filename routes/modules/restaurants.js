const express = require("express");
const router = express.Router();
const Restaurant = require("../../models/restaurant");



router.get("/new", (req, res) => {
  return res.render("new");
});

router.post("/", (req, res) => {
  const userId = req.user._id;
  const name = req.body.name; // 從 req.body 拿出表單裡的 name 資料
  return Restaurant.create({ name, userId })
    .then(() => res.redirect("/")) // 新增完成後導回首頁
    .catch((error) => console.log(error));
});

router.get("/:id", (req, res) => {
  const userId = req.user._id;
  const _id = req.params.id;
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then((restaurant) => res.render("show", { restaurant }))
    .catch((error) => console.log(error));
});

router.get("/:id/edit", (req, res) => {
  const userId = req.user._id;
  const _id = req.params.id;
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then((restaurant) => res.render("edit", { restaurant }))
    .catch((error) => console.log(error));
});

router.put("/:id", (req, res) => {
  const userId = req.user._id;
  const _id = req.params.id;
  const { name, category, rating, phone, location, description, image, google_map } = req.body;
  return Restaurant.findOne({ _id, userId })
    .then((restaurant) => {
      Object.assign(restaurant, {
        name,
        category,
        rating,
        phone,
        location,
        description,
        image,
        google_map,
      }); // 使用對項屬性動態賦值
      return restaurant.save();
    })
    .then(() => res.redirect(`/restaurants/${_id}`))
    .catch((error) => console.log(error));
});



router.delete("/:id", (req, res) => {
  const userId = req.user._id;
  const _id = req.params.id;
  return Restaurant.findOne({ _id, userId })
    .then((restaurant) => restaurant.remove())
    .then(() => res.redirect("/"))
    .catch((error) => console.log(error));
});

module.exports = router;