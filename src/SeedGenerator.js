import { advancedLocations, basicLocations, notesList, randoItemList } from "./config/rando-config";

let rand;

export function GenerateSeed() {
    let today = Date.now();

    return (today & 0x0000BEEF);
}

export function GenerateRandomizedMappings(seed)
{
    console.log("Beginning mapping generation for seed '" + seed.seedNum + "'.");

    //Initialize needed things
    let randomizedLocations = [].concat(basicLocations); //Did this because things were weird with references in pointers
    let randomizedItems = notesList.concat(randoItemList);
    let coinResults = new Map();
    let locationToItemMapping = new Map();
    let requiredItems = new Map();

    //We now have a seed. Let's initialize whatever else we need.

    if(seed.difficulty === "advanced")
    {
        randomizedLocations = randomizedLocations.concat(advancedLocations);
        
        let difference = randomizedLocations.length - randomizedItems.length;

        for(let i = 0; i < difference; i++)
        {
            randomizedItems.push("Time_Shard");
        }
    }
    
    //Set up random number generator. Don' worry about the details, just know I have to do this before calling randomNumberGenerator()
    rand = (sfc32(0x9E3779B9, 0x243F6A88, 0xB7E15162, seed.seedNum));

   
    //advance the generator beforehand a few times (12-20 iterations) to mix the initial state thoroughly.
    for (var i = 0; i < 15; i++) console.log(randomNumberGenerator(randomizedItems.length));

    //let the mapping begin!!!
    if(!seed.isLogicalSeed)
    {
        //No logic needed, will just do fast mappings
        locationToItemMapping = fastMapping(randomizedLocations, randomizedItems)

        locationToItemMapping.forEach((value, key) => {
            console.log("Item '" + value + "' mapped to '" + key.prettyLocationName + "'");
        })
    }
    else
    {
        //TODO Do the logical stuff
    }

    return locationToItemMapping;
}

/* Thanks to bryc for this function and some details on it.

    You may wonder what the | 0 and >>>= 0 are for. These are essentially 32-bit integer casts, used 
    for performance optimizations. Number in JS are basically floats, but during bitwise operations, 
    they switch into a 32-bit integer mode. This mode is processed faster by JS interpreters, but any 
    multiplication or addition will cause it to switch back to a float, resulting in a performance hit.

    https://github.com/bryc/code/blob/master/jshash/PRNGs.md
*/
function sfc32(a, b, c, d) {
    return function() {
      a >>>= 0; b >>>= 0; c >>>= 0; d >>>= 0; 
      var t = (a + b) | 0;
      a = b ^ b >>> 9;
      b = c + (c << 3) | 0;
      c = (c << 21 | c >>> 11);
      d = d + 1 | 0;
      t = t + d | 0;
      c = c + t | 0;
      return (t >>> 0) / 4294967296;
    }
}

function randomNumberGenerator(maxRandValue)
{
    console.log("Working with a max value of: " + maxRandValue);

    let minRandValue = 0;
    //this will return a random value between the max(exclusive) and min(inclusive)
    return Math.trunc(rand() * (maxRandValue - minRandValue) + minRandValue);
}

function fastMapping(randomizedLocations, randomizedItems)
{

    //Setting up local list to make sure of what I am messing with.
    let localLocations = randomizedLocations;
    let localItems = randomizedItems;
    let localMappings = new Map();
    

    //randomly place passed items into available locations without checking logic requirements
    for(let itemIndex = randomNumberGenerator(localItems.length); localItems.length > 0; itemIndex = randomNumberGenerator(localItems.length)){
        
        let locationIndex = randomNumberGenerator(localLocations.length);
        console.log("Item Index '" + itemIndex +"' generated for item list with size '" + localItems.length + "'. Locations index '" + locationIndex + "' generated for location list with size '" + localLocations.length + "'");
        localMappings.set(localLocations[locationIndex], localItems[itemIndex]);
        console.log("Fast mapping occurred! Added item'" + localItems[itemIndex] + "' at index '" + itemIndex + "' to location '" + localLocations[locationIndex] + "' at index '" + locationIndex + "'");

        //Removing mapped items and locations
        localLocations.splice(locationIndex, 1);
        localItems.splice(itemIndex, 1);
    }
    
    //Once loop is done return the mappings
    return localMappings;


}


