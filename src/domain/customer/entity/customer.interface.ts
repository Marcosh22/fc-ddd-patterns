import Address from "../value-object/address";

export default interface CustomerInterface {
  get id(): string;
  get name(): string;
  get rewardPoints(): number;
  get Address(): Address;
  isActive(): boolean
}