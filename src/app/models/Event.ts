import { Performer } from "./Performer";
import { Venue } from "./Venue";

export class Event{
    id ? : number;
    username ? : string;
    title ? : string;
    type ? : string;
    venue ? : Venue;
    performers ? : Performer[]=[];
}