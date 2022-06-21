import { LocationRO } from "../RO/LocationRO";

    export let notesList = [
        "Key_Of_Hope",
        "Key_Of_Chaos",
        "Key_Of_Courage",
        "Key_Of_Love",
        "Key_Of_Strength",
        "Key_Of_Symbiosis"
    ];

    export let randoItemList= [
        "Windmill_Shuriken",
        "Wingsuit",
        "Rope_Dart",
        "Ninja_Tabis",
        "Candle",
        "Seashell",
        "Power_Thistle",
        "Demon_King_Crown",
        "Ruxxtin_Amulet",
        "Fairy_Bottle",
        "Sun_Crest",
        "Moon_Crest",
        "Necro",
        "Pyro",
        "Claustro",
        "Acro"
    ];


    export let basicLocations = [
        
         //Phase 1 section, no key items required
        new LocationRO("Seashell"),
        new LocationRO("Ninja_Tabis"),
        new LocationRO("Rope_Dart"),
        new LocationRO("Wingsuit"),
        new LocationRO("Key_Of_Love", "Key Of Love", ["Sun_Crest", "Moon_Crest"]),
        new LocationRO("Key_Of_Courage", "Key Of Courage", ["Demon_King_Crown", "Fairy_Bottle"]),
        //Tabi locked section
        new LocationRO("Key_Of_Chaos", "Key_Of_Chaos", [], false, false, true),
        new LocationRO("Sun_Crest", "Sun_Crest", [], false, false, true),
        new LocationRO("Moon_Crest", "Moon_Crest", [], false, false, true),
        new LocationRO("Pyro", "Pyro", [], false, false, true),
        //Wingsuit locked section
        new LocationRO("Acro", "Acro", ["Ruxxtin_Amulet"], true),
        new LocationRO("Necro", "Necro", [], true),
        new LocationRO("Ruxxtin_Amulet", "Ruxxtin_Amulet",[], true),
        new LocationRO("Candle", "Candle",[], true),
        new LocationRO("Claustro", "Claustro",[], true),
        new LocationRO("Climbing_Claws", "Climbing_Claws",[], true),
        new LocationRO("Demon_King_Crown", "Demon_King_Crown",["Necro", "Claustro", "Pyro", "Acro"], true),
        //Rope Dart locked section
        new LocationRO("Key_Of_Symbiosis", "Key_Of_Symbiosis",["Fairy_Bottle"], false, true),
        //This section needs either the Wingsuit OR the Ropedart (plus other items). If you have one you are good.
        new LocationRO("Key_Of_Strength", "Key_Of_Strength",["Power_Thistle"], false, false, false, true),
        new LocationRO("Power_Thistle", "Power_Thistle",[], false, false, false, true),
        new LocationRO("Fairy_Bottle", "Fairy_Bottle",[], false, false, false, true),
        //Wingsuit AND Ropedart locked
        new LocationRO("Key_Of_Hope", "Key_Of_Hope",[], true, true)
    ];

    export let advancedLocations = [

        //Ninja Village
        new LocationRO("-436-404-44-28", "Ninja Village Seal - Tree House", [], true, true), //Tree House
        //Autumn Hills
        new LocationRO("-52-20-60-44", "Autumn Hills Seal - Trip Saws", [] , true, false, false), //Trip Saws
        new LocationRO("556588-44-28", "Autumn Hills Seal - Double Swing Saws", [] , true, false, false), //Double Swing Saws
        new LocationRO("748780-76-60", "Autumn Hills Seal - Spike Ball Swing", [] , true, false, false), //Spike Ball Swing
        new LocationRO("748780-108-76", "Autumn Hills Seal - Spike Ball Darts", [] , true, false, false), //Spike Ball Darts - also requires Acrobatic Warrior upgrade
        //Catacombs
        new LocationRO("236268-44-28", "Catacombs Seal - Triple Spike Crushers", [] , true, false, false), //Triple Spike Crushers
        new LocationRO("492524-44-28", "Catacombs Seal - Crusher Gauntlet", [] , true, false, false), //Crusher Gauntlet
        new LocationRO("556588-60-44", "Catacombs Seal - Dirty Pond", [] , true, false, false), //Dirty Pond
        new LocationRO("-84-52-28-12", "Bamboo Creek Seal - Spike crushers and Doors", [] , true, false, false), //Spike crushers and Doors
        new LocationRO("172236-44-28", "Bamboo Creek Seal - Spike ball pits", [] , true, false, false), //Spike ball pits
        new LocationRO("300332-1236", "Bamboo Creek Seal - Spike crushers and Doors v2", [] , true, false, false), //Spike crushers and doors v2
        //Howling Grotto
        new LocationRO("108140-28-12", "Howling Grotto Seal - Windy Saws and Balls", [] , false, false, false), //Windy Saws and Balls
        new LocationRO("300332-92-76", "Howling Grotto Seal - Crushing Pits", [] , false, false, false), //Crushing Pits
        new LocationRO("460492-172-156", "Howling Grotto Seal - Breezy Crushers", [] , false, false, false), //Breezy Crushers
        //Quillshroom Marsh
        new LocationRO("204236-28-12", "Quillshroom Marsh Seal - Spikey Window", [] , false, false, false), //Spikey Window
        new LocationRO("652684-60-28", "Quillshroom Marsh Seal - Sand Trap", [] , false, false, false), //Sand Trap
        new LocationRO("940972-28-12", "Quillshroom Marsh Seal - Do the Spike Wave", [] , false, false, false), //Do the Spike Wave
        //Searing Crags
        new LocationRO("761085268", "Searing Crags Seal - Triple Ball Spinner", [] , false, false, false, true), //Triple Ball Spinner
        new LocationRO("300332196212", "Searing Crags Seal - Raining Rocks", [] , false, false, false, true), //Raining Rocks
        new LocationRO("364396292308", "Searing Crags Seal - Rythym Rocks", [] , false, false, false, true), //Rythym Rocks
        //Glacial Peak
        new LocationRO("140172-492-476", "Glacial Peak Seal - Ice Climbers", [] , false, true, false), //Ice Climbers
        new LocationRO("236268-396-380", "Glacial Peak Seal - Projectile Spike Pit", [] , false, false, false, true), //Projectile Spike Pit
        new LocationRO("236268-156-140", "Glacial Peak Seal - Glacial Air Swag", [] , false, false, false, true), //Glacial Air Swag
        //TowerOfTime
        new LocationRO("-84-522036", "TowerOfTime Seal - Time Waster Seal", [] , false, true, false), //Time Waster Seal
        new LocationRO("7610852116", "TowerOfTime Seal - Lantern Climb", [] , true, false, false), //Lantern Climb
        new LocationRO("-52-20116132", "TowerOfTime Seal - Arcane Orbs", [] , true, true, false), //Arcane Orbs
        //Cloud Ruins
        new LocationRO("-148-116420", "Cloud Ruins Seal - Ghost Pit", [ "Ruxxtin_Amulet"], true, false, false), //Ghost Pit
        new LocationRO("108140-44-28", "Cloud Ruins Seal - Toothbrush Alley", [ "Ruxxtin_Amulet" ], true, false, false), //Toothbrush Alley
        new LocationRO("748780-44-28", "Cloud Ruins Seal - Saw Pit", ["Ruxxtin_Amulet"], true, false, false), //Saw Pit
        new LocationRO("11321164-124", "Cloud Ruins Seal - Money Farm Room", ["Ruxxtin_Amulet"], true, false, false), //Money Farm Room
        //Underworld
        new LocationRO("-276-244-444", "Underworld Seal - Sharp and Windy Climb", [] , true, false, true), //Sharp and Windy Climb
        new LocationRO("-180-148-44-28", "Underworld Seal - Spike Wall", [] , false, false, true), //Spike Wall
        new LocationRO("-180-148-60-44", "Underworld Seal - Fireball Wave", [] , true, false, true), //Fireball Wave - also requires Acrobatic Warrior upgrade
        new LocationRO("-2012-124", "Underworld Seal - Rising Fanta", [] , false, true, true), //Rising Fanta
        //Forlorn Temple
        new LocationRO("172268-284", "Forlorn Temple Seal - Rocket Maze", ["Necro", "Claustro", "Pyro", "Acro"], true, false, false), //Rocket Maze
        new LocationRO("140172100164", "Forlorn Temple Seal - Rocket Sunset", [ "Necro", "Claustro", "Pyro", "Acro"], true, false, false), //Rocket Sunset
        //Sunken Shrine
        new LocationRO("204236-124", "Sunken Shrine Seal - Ultra Lifeguard", [] , false, false, false), //Ultra Lifeguard
        new LocationRO("172268-188-172", "Sunken Shrine Seal - Waterfall Paradise", [] , false, false, true), //Waterfall Paradise
        new LocationRO("-148-116-124-60", "Sunken Shrine Seal - Tabi Gauntlet", [] , false, false, true), //Tabi Gauntlet
        //Reviere Turquoise
        new LocationRO("844876-284", "Reviere Turquoise Seal - Bounces and Balls", [] , false, false, false), //Bounces and Balls
        new LocationRO("460492-124-108", "Reviere Turquoise Seal - Launch of Faith", [] , false, false, false), //Launch of Faith
        new LocationRO("-180-1483668", "Reviere Turquoise Seal - Flower Power", [] , false, false, false, true), //Flower Power
        //Elemental Skylands
        new LocationRO("-52-20420436", "Elemental Skylands Seal - Air Seal", [ "Fairy_Bottle"], true, false, false), //Air Seal
        new LocationRO("18361868372388", "Elemental Skylands Seal - Water Seal", [ "Fairy_Bottle"], false, true, false), //Water Seal - Needs water dash
        new LocationRO("28602892356388", "Elemental Skylands Seal - Fire Seal", [ "Fairy_Bottle"], false, true, false) //Fire Seal
    ]

