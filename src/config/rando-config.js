import { LocationRO } from "../RO/LocationRO";

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

