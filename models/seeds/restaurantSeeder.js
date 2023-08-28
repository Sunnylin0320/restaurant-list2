const bcrypt = require("bcryptjs");
const Restaurant = require("../restaurant"); // 載入 restaurant model
const User = require("../user");
const restaurantList = require("./restaurant.json").results;
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const db = require("../../config/mongoose");
const SEED_USER_01 = {
  name: "user1",
  email: "user1@example.com",
  password: "12345678",
  restaurantOwns: [0, 1, 2],
};
const SEED_USER_02 = {
  name: "user2",
  email: "user2@example.com",
  password: "12345678",
  restaurantOwns: [3, 4, 5],
};
db.once("open", () => {
  bcrypt
    .genSalt(10)
    .then((salt) => bcrypt.hash(SEED_USER_01.password, salt))
    .then((hash) =>
      User.create([
        {
          name: SEED_USER_01.name,
          email: SEED_USER_01.email,
          password: hash,
        },
        {
          name: SEED_USER_02.name,
          email: SEED_USER_02.email,
          password: hash,
        },
      ])
    )
    .then((user) => {
      const restaurantUser1 = [];
      for (let i = 0; i < 3; i++) {
        const userId = user[0]._id;
        restaurantList[i].userId = userId;
        restaurantUser1.push(restaurantList[i]);
      }
      const restaurantUser2 = [];
      for (let i = 3; i < 6; i++) {
        const userId = user[1]._id;
        restaurantList[i].userId = userId;
        restaurantUser2.push(restaurantList[i]);
      }
      const restaurant = restaurantUser1.concat(restaurantUser2);

      return Restaurant.create(restaurant);
    })

    .then(() => {
      console.log("done.");
      process.exit();
    });
});