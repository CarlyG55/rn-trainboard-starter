export type TrainInfo = {
  outboundJourneys: Journey[];
};
export type Journey = {
  originStation: Location;
  destinationStation: Location;
  departureTime: string;
  arrivalTime: string;
  journeyDurationInMinutes: number;
  tickets: Ticket[];
  legs: Leg[];
  status: string;
  journeyId: string;
};
export type Ticket = {
  priceInPennies: number;
  name: string;
};
export type Leg = {
  origin: Location;
  destination: Location;
  mode: string;
  departureDateTime: string;
  arrivalDateTime: string;
  durationInMinutes: number;
  trainOperator: Operator;
};
export type Location = {
  displayName: string;
  crs: string;
};
export type Operator = {
  name: string;
  code: string;
};
export type Station = {
  name: string;
  crs: string;
};
