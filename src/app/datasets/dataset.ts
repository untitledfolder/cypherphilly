export interface DatasetField {
  title: string
  key: string
}

export interface Dataset {
  name: string
  label: string
  key: string
  id: string
  keys: DatasetField[]
}
