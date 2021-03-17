const mongoose = require('mongoose');
require("dotenv").config();
//Connecting to the Server of my Database
mongoose.connect(MONGO_URI='mongodb://127.0.0.1:27017/DB', { useNewUrlParser: true, useUnifiedTopology: true });
// Creating a Collection of a Person
let personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: Number,
    favoriteFoods: [String]
});

// Model creation

const Person = mongoose.model('person', personSchema);

// Create first record in a Person Model

const firstPerson = new Person({
    name: 'Slim',
    age: 35,
    favoriteFoods: ['pomme']
})

firstPerson.save((err, data) => {
    err ? console.error(err) : console.log(`${firstPerson.name} data  saved`)
})

// Create Many record in a Person Model

Person.create([
    {
        name: 'Zakarya',
        age: 6,
        favoriteFoods: ["pizza","pomme"]
    },

    {
        name: 'joud',
        age: 4,
        favoriteFoods: ["pizza","banane"]
    },

    {
        name: 'henda',
        age: 35,
        favoriteFoods: ['pomme']
    }
], err => {
    err ? console.error(err) : console.log('Your Records are Added Successfuly')
}
)
// Find all the people having a given name

Person.find({ name: 'joud' }, (err, data) => {
    err ? console.error(err) : console.log(`There are ${data.length} person having name joud`)
})

//FindOne operation by favorite food

Person.findOne({ favoriteFoods: 'pizza' }, (err, data) => {
    err ? console.error(err) : console.log(`${data.name} like pizza`)
})

// Find a Model by ID

Person.findById("6a0a24eaa2f4560dcc5562ce", (err, data) => {
    err ? console.error(err) : console.log("we find the person with ID:" + data._id)
})

// Find and update a Model

Person.findByIdAndUpdate("6a0a24eaa2f4560dcc5562ce", { $push: { favoriteFoods: "banane" } }, (err, data) => {
    if (err) { console.error(err); }
    else {
        data.save((err, doc) => {
            err ? console.error(err) : console.log('Your Data was Updated' + doc.favoriteFoods);
        })
    }
})

// Find One and Update 

Person.findOneAndUpdate( { name: 'zakarya' }, { new: true }, (err, data) => {
    err ? console.error(err) : console.log('Your data updated ' + data.name + ' ' + data.age + ' years')
})

// Find by Id and Delete the document

Person.findByIdAndRemove("604ea6a0a25625a2f45dccce", (err, data) => {
    err ? console.error(err) : console.log(data._id + ' Document removed')
})

//Delete Many Documents with model.remove()

Person.remove({ name: "joud" }, (err) => {
    err ? console.error(err) : console.log('All document with name joud are remved')
})

//Find people who like pizza

Person.find({ favoriteFoods: "pizza" }).sort({ name: 1 }).limit(2).select({ age: 0 }).exec((err, data) => {
    err ? console.error(err) : console.log(data)
});