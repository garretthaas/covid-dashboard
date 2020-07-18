import { getDataByState } from './blockStateDataPoint'
import { visTrendLine } from './visTrendLine'

export default function blockState() {
    getDataByState("California");
    getDataByState("Ohio");
    getDataByState("New York");
    getDataByState("Florida");
    
}