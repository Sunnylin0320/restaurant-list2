const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const restaurantSchema = new Schema({
  name: {
    type: String, // 資料型別是字串
    required: true, // 這是個必填欄位
  },
  category: {
    type: String,
  },
  image: {
    type: String,
  },
  location: {
    type: String,
  },
  phone: {
    type: String,
  },
  google_map: {
    type: String,
  },
  rating: {
    type: Number,
  },
  description: {
    type: String,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    index: true,
    required: true
  }
});
module.exports = mongoose.model("Restaurant", restaurantSchema);
