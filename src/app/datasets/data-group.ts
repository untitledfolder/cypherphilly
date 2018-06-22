import { Dataset } from './dataset';

export interface DataGroup {
  name: string
  label: string
  key: string
  datasets: Dataset[]
}
