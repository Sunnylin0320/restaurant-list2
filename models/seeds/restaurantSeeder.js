const Restaurant = require("../restaurant"); // 載入 restaurant model
const restaurantList = require("../../restaurant.json").results;
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const db = require("../../config/mongoose");
db.once("open", () => {
  for (let i = 0; i < restaurantList.length; i++) {
    Restaurant.create({
      name: `${restaurantList[i].name}`,
      category: `${restaurantList[i].category}`,
      image: `${restaurantList[i].image}`,
      location: `${restaurantList[i].location}`,
      phone: `${restaurantList[i].phone}`,
      google_map: `${restaurantList[i].google_map}`,
      rating: `${restaurantList[i].rating}`,
      description: `${restaurantList[i].description}`,
    });
  }
  console.log("done");
});
