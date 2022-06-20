export class LocationRO {

    constructor(locationName, prettyLocationName = locationName, additionalRequiredItemsForCheck = [], IsWingsuitRequired = false, IsRopeDartRequired = false, IsNinjaTabiRequired = false, IsEitherWingsuitOrRopeDart = false)
    {
        this.locationName = locationName;
        this.prettyLocationName = prettyLocationName;
        this.additionalRequiredItemsForCheck = additionalRequiredItemsForCheck;
        this.IsWingsuitRequired = IsWingsuitRequired;
        this.IsRopeDartRequired = IsRopeDartRequired;
        this.IsNinjaTabiRequired = IsNinjaTabiRequired;
        this.IsEitherWingsuitOrRopeDart = IsEitherWingsuitOrRopeDart;
    }

    ToString() 
    {
        return ("Location Name: '" + this.locationName + "' Pretty Name: '" + this.prettyLocationName + "' Additional Needed Items: '" + this.additionalRequiredItemsForCheck + "' Is Wingsuit Req: '" + this.IsWingsuitRequired + "' Is Rope Dart Req: '" + this.IsRopeDartRequired + "' Is Either Wing or Rope Req: '" + this.IsEitherWingsuitOrRopeDart + "' Is Tabi Req: '" + this.IsNinjaTabiRequired + "'");
    }
}