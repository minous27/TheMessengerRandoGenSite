import { advancedLocations, basicLocations, notesList, randoItemList } from "./config/rando-config";

let randomizedLocations;
let randomizedItems;
let coinResults;
let locationToItemMapping;

//Used to represent all the required items to complete this seed, along with what they currently block. This is to prevent self locks.
let requiredItems;


let rand;

let REQUIRED_ITEM_PLACEMENT_ATTEMPT_LIMIT = 50;

export function GenerateSeed() {
    let today = Date.now();

    return (today & 0x0000BEEF);
}

export function GenerateRandomizedMappings(seed)
{
    console.log("Beginning mapping generation for seed '" + seed.seedNum + "'.");

    //Initialize needed things
    randomizedLocations = [].concat(basicLocations); //Did this because things were weird with references in pointers
    randomizedItems = [].concat(randoItemList);
    coinResults = new Map();
    locationToItemMapping = new Map();
    requiredItems = new Map();
    

    //Let's initialize whatever else we need.

    if(seed.difficulty === "Advanced")
    {
        randomizedLocations = randomizedLocations.concat(advancedLocations);
        
        let difference = randomizedLocations.length - randomizedItems.length - notesList.length;

        for(let i = 0; i < difference; i++)
        {
            randomizedItems.push("Time_Shard");
        }
    }

    
    //Log item and location info for debugging purposes
    console.log("Printing out list of locations we will be working with.");
    for(let location of randomizedLocations)
    {
        console.log(location.prettyLocationName);
    }
    console.log("Printing out list of items we will be working with.");
    for(let item of randomizedItems)
    {
        console.log(item);
    }
    for(let note of notesList)
    {
        console.log(note);
    }
    console.log(`Size of lists are:\nLocations: '${randomizedLocations.length}'\nItems: '${randomizedItems.length + notesList.length}'`);

    //Set up random number generator. Don' worry about the details, just know I have to do this before calling randomNumberGenerator()
    rand = (sfc32(0x9E3779B9, 0x243F6A88, 0xB7E15162, seed.seedNum));

   
    //advance the generator beforehand a few times (12-20 iterations) to mix the initial state thoroughly.
    for (var i = 0; i < 15; i++) console.log(randomNumberGenerator(randomizedItems.length));

    //Set up coin flips
    for (let location of randomizedLocations)
    {
        if(location.IsEitherWingsuitOrRopeDart)
        {
            coinResults.set(location, randomNumberGenerator(2));
        }
    }

    //let the mapping begin!!!
    if(!seed.isLogicalSeed)
    {
        //No logic needed, will just do fast mappings
        fastMapping(randomizedItems);

        locationToItemMapping.forEach((value, key) => {
            console.log("Item '" + value + "' mapped to '" + key.prettyLocationName + "'");
        })
    }
    else
    {
        console.log("Logical mapping start!");
        //Start by placing the notes then do the logic things!
        fastMapping(notesList);

        let logicalMappingAttempts = 1;
        let isLogicalMappingComplete = false;

        do
        {
            //creating a breakout to help prevent infinite loops during generation.
            if(logicalMappingAttempts > REQUIRED_ITEM_PLACEMENT_ATTEMPT_LIMIT)
            {
                let error = new Error(`Item placement attempts exceeded. The seed ${seed.seedNum} was not able to generate a beatable seed. Please try to generate again with a different seed.`);
                throw error;
            }

                //Now that the notes have a home, lets get all the items we are going to need to collect them. We will do this potentially a few times to ensure that all required items are accounted for.
                let hasValidItemToMap = false;

                while(!hasValidItemToMap)
                {
                    GetRequiredItemsFromMappings();

                    let randomItemToMap;
                    let isAllRequiredItemsMapped = true;

                    for(const[randoItem, blockerItems] of requiredItems)
                    {
                        if(!findInMap(locationToItemMapping, randoItem))
                        {
                            //We have found an item that has not been mapped yet
                            randomItemToMap = randoItem;
                            isAllRequiredItemsMapped = false;
                            break;
                        }
                    }

                    if (isAllRequiredItemsMapped)
                    {
                        //We are done!
                        isLogicalMappingComplete = true;
                        break;
                    }

                    let isNote = false;
                    //Note check
                    for(let note in notesList)
                    {
                        if (note === randomItemToMap)
                        {
                            //Tis a note, try again
                            isNote = true;
                            break;
                        }
                    }

                    hasValidItemToMap = !isNote;

                    if(!hasValidItemToMap)
                    {
                        continue;
                    }

                    //Looks like a valid item to map, let's start the process.
                    //Send these items through the logical mapper and get them a home.
                    logicalMapping(randomItemToMap);
                }
                ++logicalMappingAttempts;
        
        }
        while(!isLogicalMappingComplete);
        

        //At this point we should be done with logical mapping. Let's cleanup the remaining items.
        fastMapping(randomizedItems);
        console.log("Basic logic mapping completed.");
    }

    //The mappings should be created now.
    return locationToItemMapping;
}

/* Thanks to bryc for this function and some details on it.

    "You may wonder what the | 0 and >>>= 0 are for. These are essentially 32-bit integer casts, used 
    for performance optimizations. Number in JS are basically floats, but during bitwise operations, 
    they switch into a 32-bit integer mode. This mode is processed faster by JS interpreters, but any 
    multiplication or addition will cause it to switch back to a float, resulting in a performance hit."

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

function fastMapping(items)
{

    //Setting up local list to make sure of what I am messing with.
    let localItems = [].concat(items);
    let localMappings = new Map();
    

    //randomly place passed items into available locations without checking logic requirements
    for(let itemIndex = randomNumberGenerator(localItems.length); localItems.length > 0; itemIndex = randomNumberGenerator(localItems.length)){
        
        let locationIndex = randomNumberGenerator(randomizedLocations.length);
        console.log("Item Index '" + itemIndex +"' generated for item list with size '" + localItems.length + "'. Locations index '" + locationIndex + "' generated for location list with size '" + randomizedLocations.length + "'");
        localMappings.set(randomizedLocations[locationIndex], localItems[itemIndex]);
        console.log("Fast mapping occurred! Added item'" + localItems[itemIndex] + "' at index '" + itemIndex + "' to location '" + randomizedLocations[locationIndex].prettyLocationName + "' at index '" + locationIndex + "'");

        //Removing mapped items and locations
        randomizedLocations.splice(locationIndex, 1);
        localItems.splice(itemIndex, 1);
    }
    
    //Once loop is done add the mappings
    for(const[location, item] of localMappings)
    {
        locationToItemMapping.set(location, item);
    }
}


function GetRequiredItemsFromMappings(){
    
    let keyItems = new Set();
    
    for(const [location, item] of locationToItemMapping){
        //Lets start interrofating the location object to see what items it has marked as required.
        
        //Key Items
        if(location.IsWingsuitRequired)
        {
            addRequiredItem("Wingsuit", location);
            keyItems.add("Wingsuit");
        }
        if (location.IsRopeDartRequired)
        {
                addRequiredItem("Rope_Dart", location);
                keyItems.add("Rope_Dart");
        }
        if (location.IsNinjaTabiRequired)
        {
                addRequiredItem("Ninja_Tabis", location);
                keyItems.add("Ninja_Tabis");
        }
        
        //Checking if either Wingsuit OR Rope Dart is required is a separate check.
        if (location.IsEitherWingsuitOrRopeDart)
        {
            //In this case, let's randomly pick one to be placed somewhere
            let coin;
            if(coinResults.has(location))
            {
                coin = coinResults.get(location);
                console.log(`Coin previously flipped for location '${location.prettyLocationName}'. Result was '${coin}'`);
            }
            else 
            {
                coin = randomNumberGenerator(2);
                console.log(`Coin flipped! Result is '${coin}' for location '${location.prettyLocationName}'`);
                coinResults.set(location, coin);
            }

            switch(coin)
            {
                case 0://Wingsuit
                    addRequiredItem("Wingsuit", location);
                    keyItems.add("Wingsuit");
                    break;
                case 1://Rope Dart
                    addRequiredItem("Rope_Dart", location);
                    keyItems.add("Rope_Dart");
                    break;
                default: //Something weird happened...just do wingsuit :P
                    addRequiredItem("Wingsuit", location);
                    keyItems.add("Wingsuit");
                    break;
            }
        }

        //Next lets look through the other items.
        location.additionalRequiredItemsForCheck.forEach((requiredItem) => {
            randomizedItems.forEach((randoItem) =>{
                if(randoItem === requiredItem)
                {
                    addRequiredItem(randoItem, location);
                    return;
                }
            });
        });
    }

    //In case a key item get slated as a required item but it's already mapped, we should remove it from out collections
    let duplicateKeyItems = [];

    keyItems.forEach((keyItem) => {
        if(!randomizedItems.includes(keyItem))
        {
            //This means that this key item was already mapped, we do not need to map it again
            duplicateKeyItems.push(keyItem);
        }
    });
    
    //Duplicate cleanup
    duplicateKeyItems.forEach((dupKeyItem) => {
        //Cleanup
        keyItems.delete(dupKeyItem);
    });

    /*I was having a problem with some seeds setting all the key items at the beginning and not considering 
    each other. I think how I will handle this is by only allowing one of them set each run through and
    throwing the rest out. I expect them to get picked up on subsequent runs.
    */
   if(keyItems.length > 1)
   {
    //This means I have more than 1 key item to process. Let's pick random ones to remove from the required items list until none remain.
    for (let i = randomNumberGenerator(keyItems.length); keyItems.length > 1; randomNumberGenerator(keyItems.length))
    {
        let itemToRemove = Array.from(keyItems)[i];
        console.log(`Found multiple key items during required item mapping. Tossing '${itemToRemove}' from this run.`);
        keyItems.delete(itemToRemove);
    }
   }

    //Should I do a final round of checking required items in case a key item received an imbedded dependancy?
    for(const [requiredItem, blockerItems] of requiredItems)
    {
        let updatedBlockerItems = new Set();

        recursiveBlockedItemCheck(blockerItems, updatedBlockerItems);

        requiredItems.set(requiredItem, updatedBlockerItems);

    }

   //Logging
   console.log("For the provided checks:");
   locationToItemMapping.forEach((item, location) => {
    console.log(location.prettyLocationName);
   });
   console.log("Found these items to require for seed:");
   
   requiredItems.forEach((blockedItems, item)=>{
    if(findInMap(locationToItemMapping, item))
    {
        console.log(`${item} (Mapped)`);
    }
    else
    {
        console.log(item);
    }

    //I need to look through blocked items until there are no more for this item
    blockedItems.forEach((blockedItem) => {
        console.log(`\tWhich in turn blocks '${blockedItem}'`);
    });

   });

   if (requiredItems.length === 0)
   {
    console.log("No required items found, returning an empty set!");
   }
   console.log("Required item determination complete!");

   //All done!
   return requiredItems;
}

/*
This utility function will help manage the temporary required item dictionary for me.
*/
function addRequiredItem(itemName, location)
{
    console.log(`Attempting to add item '${itemName}' to location '${location.prettyLocationName}'.` );
    
    //Check to see if the item is already a key in the previous required items.
    if(!requiredItems.has(itemName))
    {
        let blockerItems = new Set();
        console.log(`item '${itemName}' has not been added to required items before. Adding it along with blocker list ${blockerItems}.`);
        requiredItems.set(itemName, blockerItems);
    }

    requiredItems.get(itemName).add(locationToItemMapping.get(location));

    let blockerItems = new Set();

    //Let's go through all the item blockers for the items our item blocks
    requiredItems.get(itemName).forEach((blockedItem) => {
        if(requiredItems.has(blockedItem))
        {

            //This means that the item our item blocks appears to block other items itself.
            let recursiveBlockedItems = requiredItems.get(blockedItem);

            //Let the recursion begin!
            recursiveBlockedItemCheck(recursiveBlockedItems, blockerItems);            
        }
    })

    //Now that we're done with that nonsense, let's add what we've found.
    blockerItems.forEach((blockerItem) => {
        requiredItems.get(itemName).add(blockerItem);
    });
}

/*
    This function is my attempt to recursively call for blocked items for however many layers of 
    blocked items there are for a particular item.

    Remember that we do this so that when an item is being placed in a location later it knows not to block
    itself in a location requiring an item it blocks.
*/
function recursiveBlockedItemCheck(recursiveBlockedItems, blockerItems){

    recursiveBlockedItems.forEach((recursiveBlockedItem) => {
        //There are situations where a few items might block each other. I'm putting something here 
        //to protect against an infinite loop for now.

        if(blockerItems.has(recursiveBlockedItem))
        {
            //This means we already handled this item before so move on.
            return;
        }

        blockerItems.add(recursiveBlockedItem);

        //This is to recursively capture blocked items we caught on previous iterations so we can keep 
        //track of ALL blocked items.
        if(requiredItems.has(recursiveBlockedItem))
        {
            let evenMoreRecursiveBlockedItems = requiredItems.get(recursiveBlockedItem);
            recursiveBlockedItemCheck(evenMoreRecursiveBlockedItems, blockerItems);
        }
    })
}

//Will complete the mappings per item received.
//This mappings takes in to account the required items for each location it tries to place an item into to avoid basic lockouts.
function logicalMapping(item){
    console.log("|||Using logical mapping flow|||");
    let hasAHome = false;

    //create a new list based off the randomized locations list that has a randomized order. This will be used for placing things.
    let tempRandoLocations = [].concat(randomizedLocations);
    let randoSortedLocations = [];

    for(let locationIndex = randomNumberGenerator(tempRandoLocations.length); tempRandoLocations.length > 0; locationIndex = randomNumberGenerator(tempRandoLocations.length))
    {
        randoSortedLocations.push(tempRandoLocations[locationIndex]);
        tempRandoLocations.splice(locationIndex, 1);
    }

    //Find a home
    for(let i = 0; i < randoSortedLocations.length; i++)
    {
        hasAHome = isLocationSafeForItem(randoSortedLocations[i], item);

        //Check the item itself
        if(hasAHome)
        {
            //Next we need to check the location for each and every item this item blocks. 
            //We need to catch the moment an item proves it cannot be here and mark it so we can move on.
            let blockedItems = Array.from(requiredItems.get(item));
            for(let blockedItem of blockedItems)
            {
                hasAHome = isLocationSafeForItem(randoSortedLocations[i], blockedItem);

                if(!hasAHome)
                {
                    break;
                }
            }
        }

        if(hasAHome)
        {
            console.log("Found a home for item '" + item + "' at location '" + randoSortedLocations[i].prettyLocationName + "'");
            locationToItemMapping.set(randoSortedLocations[i], item);
            randomizedLocations.splice(randomizedLocations.findIndex((location) => {return location === randoSortedLocations[i]}) , 1);
            randomizedItems.splice(randomizedItems.findIndex((randoItem) => {return randoItem === item}), 1);
            break;
        }
    }
    if(!hasAHome)
    {
        //Getting here means that we must have checked through all the remaining locations and that none of them could house an item we needed to place. For now let's throw an exception.
        console.log("This seed was not completeable due to running out of locations to place things.");
        return;
    }
}

//Checks to see if location is safe for item to be there
function isLocationSafeForItem(location, item)
{
    let isSafe = false;

    switch(item)
    {
        case "Wingsuit": //Try to find a home for wingsuit
            if(!location.IsWingsuitRequired)
            {
                //if the location is not a RDorWS check we are good
                //If it IS a RDorWS check, check to see if it is locked based on coin flip.
                isSafe = !(location.IsEitherWingsuitOrRopeDart && coinResults.get(location) !== 1);
            }
            break;
        case "Rope_Dart": //same for rope dart
            if (!location.IsRopeDartRequired)
            {   
                //if the location is not a RDorWS check we are good
                //If it IS a RDorWS check, check to see if it is locked based coin flip. 
                isSafe = !(location.IsEitherWingsuitOrRopeDart && coinResults.get(location) === 1);
            }
            break;
        case "Ninja_Tabis": //Tabis, the check is more simple
 
            isSafe = !location.IsNinjaTabiRequired;
            break;
        default: //All other required items
            isSafe = !location.additionalRequiredItemsForCheck.includes(item);
            break;
    }
    console.log("Item '" + item + "' is safe at location '" + location.prettyLocationName + "' --- " + isSafe);
    return isSafe;
}


const findInMap = (map, randoItem) => {
   
        for(let [k,v] of map)
        {
            if(v === randoItem)
            {
                return true;
            }
        }
        return false;
    
}

