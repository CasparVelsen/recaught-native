import mongoose from 'mongoose';

const schema = new mongoose.Schema(
  [
    {
      catches: [
        {
          species: { type: String },
          time: { type: String },
          length: { type: Number },
          weight: { type: Number },
          bait: { type: String },
          location: { type: String },
          taken: { type: Boolean },
          notes: { type: String },
          _id: { type: Number },
        },
      ],

      water: { type: String },
      date: { type: String },
      target: { type: String },

      stretch: { type: String },
      watertemp: { type: Number },
      watercolor: { type: String },
      waterlevel: { type: String },

      weather: { type: String },
      temperature: { type: Number },
      airpressure: { type: Number },
      moon: { type: String },
      wind: { type: String },
      windspeed: { type: Number },

      bites: { type: Number },
      lost: { type: Number },

      author: { type: String },
    },
  ],
  {
    versionKey: false,
  }
);

export default mongoose.model('Card', schema);
