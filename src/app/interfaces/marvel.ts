export interface Thumbnail {
  path: string
  extension: string
}

export interface Results {
  id: number
  name: string
  description: string
  modified: Date
  resourceURI: string
  urls: [
    {
      type: string
      url: string
    }
  ]
  thumbnail: Thumbnail
  comics: {
    available: number
    returned: number
    collectionURI: string
    items: [
      {
        resourceURI: string
        name: string
      }
    ]
  }
  stories: {
    available: number
    returned: number
    collectionURI: string
    items: [
      {
        resourceURI: string
        name: string
        type: string
      }
    ]
  }
  events: {
    available: number
    returned: number
    collectionURI: string
    items: [
      {
        resourceURI: string
        name: string
      }
    ]
  }
  series: {
    available: number
    returned: number
    collectionURI: string
    items: [
      {
        resourceURI: string
        name: string
      }
    ]
  }
}

export interface Marvel {
  code: string
  status: string
  copyright: string
  attributionText: string
  attributionHTML: string
  data: {
    offset: number
    limit: number
    total: number
    count: number
    results: [Results]
  }
  etag: string
}
