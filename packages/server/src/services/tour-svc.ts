import { Schema, model } from "mongoose";
import { Tour } from "../models/tour";

const TourSchema = new Schema<Tour>(
  {
    id: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    nickname: { type: String, trim: true },
    home: { type: String, trim: true },
    airports: [String],
    avatar: String,
    color: String,
  },
  { collection: "user_tours" },
);

const TourModel = model<Tour>("Tour", TourSchema);

function index(): Promise<Tour[]> {
  return TourModel.find();
}

function get(id: String): Promise<Tour> {
  return TourModel.find({ id })
    .then((list) => list[0])
    .catch((err) => {
      throw `${id} Not Found`;
    });
}

function create(tour: Tour): Promise<Tour> {
  const p = new TourModel(tour);
  return p.save();
}

function update(tourid: String, tour: Tour): Promise<Tour> {
  return TourModel.findOne({ id: tourid })
    .then((found) => {
      if (!found) throw `${tourid} Not Found`;
      else
        return TourModel.findByIdAndUpdate(found._id, tour, {
          new: true,
        });
    })
    .then((updated) => {
      if (!updated) throw `${tourid} not updated`;
      else return updated as Tour;
    });
}

export default { index, get, create, update };
