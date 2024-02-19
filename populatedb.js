#! /usr/bin/env node

console.log(
    'This script populates some items and categories to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
  );
  
  // Get arguments passed on command line
  const userArgs = process.argv.slice(2);
  
  const Items = require("./models/items");
  const Category = require("./models/category");
  
 const items = [];
 const categories = [];
  
  const mongoose = require("mongoose");
  mongoose.set("strictQuery", false);
  
  const mongoDB = userArgs[0];
  
  main().catch((err) => console.log(err));
  
  async function main() {
    console.log("Debug: About to connect");
    await mongoose.connect(mongoDB);
    console.log("Debug: Should be connected?");
    await createCategories();
    await createItems();
    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
  }
  async function categoryCreate(index, name, desc) {
    const category = new Category({ name: name, desc:desc });
    await category.save();
    categories[index] = category;
    console.log(`Added category: ${name}`);
  }
  
  async function itemsCreate(index, name, desc, price, stock, genre) {
        const itemdetail = { name: name, desc: desc, price:price, stock: stock };
        if (genre != false) itemdetail.genre = genre;
        const item = new Items(itemdetail);
        await item.save();
    items[index] = item;
    console.log(`Added items: ${name} ${price}`);
  }
  
  async function createCategories() {
    console.log("Adding categories");
    await Promise.all([
      categoryCreate(0, "Casual","Casual games do exactly what they say on the tin. These are titles that can be played quickly and aren’t too taxing for players. They’re sometimes referred to as pick-up-and-play games, and their popularity skyrocketed in the 2010s thanks to the rise of the mobile gaming sector."),
      categoryCreate(1, "Shooters", "We don’t recommend guns in real life but, in the gaming world, anything goes. Shooting games are any titles that involve guns. These include first-person shooters or third-person shooters. They put players at the center of intense combat scenarios. Think you can handle the epic action?"),
      categoryCreate(2, "Adventure", "Are you a player in search of video game genres with narrative-driven experiences? If so, the adventure genre is the way to go. Players have the chance to do a range of things in immersive worlds, from solving puzzles to making choices."),
      categoryCreate(3, "Survival", "Games that give players a chance to gather resources and survive against hostile enemies are referred to as survival games. They are highly immersive, and players get a sense of accomplishment when they manage to overcome adversity."),
      categoryCreate(4, "Action", "Action is one of the all-time great video game genres, and it has reigned supreme since the dawn of gaming. If you want fast-paced gaming that combines combat and exploration, these games are for you."),
      categoryCreate(5, "RPG", "RPGs have been around for decades, and the genre was made famous by franchises like Final Fantasy. Players can embody characters within fantasy worlds and make decisions that affect the outcome of the story."),
      categoryCreate(6, "Battle Royale", "The battle royale genre blew up recently with the success of games like Fortnite and PUBG. Players compete in an ever-shrinking play area to see who will be the last one standing."),
      categoryCreate(7, "Strategy", "Strategy games are any titles that require players to plan and outmaneuver their opponents. The board game Risk is a classic example of this, and it inspired many digital games with similar themes."),
    ]);
  }
  
  async function createItems() {
    console.log("Adding Items");
    await Promise.all([
      itemsCreate(0,
        "The Witcher 3: Wild Hunt",
        "You are Geralt of Rivia, mercenary monster slayer. Before you stands a war-torn, monster-infested continent you can explore at will. Your current contract? Tracking down Ciri — the Child of Prophecy, a living weapon that can alter the shape of the world.",
        7.49,
        3,
        
        [categories[5], categories[2]]
      ),
      itemsCreate(1,
        "Palworld",
        "Fight, farm, build and work alongside mysterious creatures called Pals in this completely new multiplayer, open world survival and crafting game!",
        28.99,
        5,
        
        [categories[2], categories[5]]
      ),
      itemsCreate(2,
        "Counter-Strike 2",
        "For over two decades, Counter-Strike has offered an elite competitive experience, one shaped by millions of players from across the globe. And now the next chapter in the CS story is about to begin. This is Counter-Strike 2.",
        0,
        1000,
        
        [categories[1], categories[4]]
      ),
      itemsCreate(3,
        "Grand Theft Auto V",
        "Grand Theft Auto V for PC offers players the option to explore the award-winning world of Los Santos and Blaine County in resolutions of up to 4k and beyond, as well as the chance to experience the game running at 60 frames per second.",
        14.98,
        0,
        
        [categories[4]]
      ),
      itemsCreate(4,
        "Yu-Gi-Oh! Master Duel",
        "Yu-Gi-Oh! MASTER DUEL is the ultimate free-to-play cross-platform strategy card game with fast-paced Duels, stunning HD graphics and a new, dynamic soundtrack! Get ready to challenge Duelists around the world!",
        0,
        15,
        
        [categories[7]]
      ),
    
    ]);
  }