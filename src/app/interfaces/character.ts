export interface Character {
  id: number // The unique ID of the character resource.
  name: string // The name of the character.
  description: string // A short bio or description of the character.
  modified: Date //	The date the resource was most recently modified.
  resourceURI: string // The canonical URL identifier for this resource.
  urls: string[] // set of public web site URLs for the resource.
  //  thumbnail:	Image	      // The representative image for this character.
  comics: ResourceList // A resource list containing comics which feature this character.
  stories: ResourceList // A resource list of stories in which this character appears.
  events: ResourceList // A resource list of events in which this character appears.
  series: ResourceList // A resource list of series in which this character appears.
}

interface ResourceList {
  available: number // The number of total available resources in this list
  returned: number // The number of resources returned in this resource list (up to 20).
  collectionURI: string // The path to the list of full view representations of the items in this resource list.
  items: any[] // A list of summary views of the items in this resource list.
}
