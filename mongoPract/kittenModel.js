const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
    await (mongoose.connect('mongodb://127.0.0.1/test'));
    console.log("MongoDB server connected");


    const kittySchema = new mongoose.Schema({
        name: String
    },
    {timestamps: true});

    kittySchema.methods.speak = function speak() {
        const greeting = this.name ? 'Meow name is ' + this.name : 
                            "I dont have a name";

        console.log(greeting);
    };
    
    
    const Kitten = mongoose.model('Kitten', kittySchema);
    
    const silence = new Kitten({name: 'Silence'});
    
    const fluffy = new Kitten({name: 'fluffy'});
    
    await silence.save();
    await fluffy.save()

    fluffy.speak();


    console.log(silence.name);
}

