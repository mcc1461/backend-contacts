const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    name: {
        type: String,
        required: [true, 'Please provide a name'],
    },
    surname: {
        type: String,
        required: [true, 'Please provide a surname'],
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
    },
    phone: {
        type: String,
        required: [true, 'Please provide a phone number'],
    },
    country: {
        type: String,
        required: [true, 'Please provide a city'],
    },
    city: {
        type: String,
        required: [true, 'Please provide a city'],
    },
    }, 
    {
        timestamps: true,
    }   
    );


// Pre-save hook to increase createdAt and updatedAt by 3 hours
contactSchema.pre("save", function (next) {
  const date = new Date();
  const adjustedDate = new Date(date.getTime() + 3 * 60 * 60 * 1000);

  if (this.isNew) {
    // Only adjust the createdAt for new documents
    this.createdAt = adjustedDate;
  }
  this.updatedAt = adjustedDate;
  next();
});

// Pre-update hook to increase updatedAt by 3 hours
contactSchema.pre("findOneAndUpdate", function (next) {
  const date = new Date();
  const adjustedDate = new Date(date.getTime() + 3 * 60 * 60 * 1000);
  this.set({ updatedAt: adjustedDate });
  next();
});


module.exports = mongoose.model("Contact", contactSchema);
