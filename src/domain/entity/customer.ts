import Address from "./address";

export default class Customer {

  private _id: string;
  private _name: string;
  private _address!: Address;
  private _active: boolean = false;
  private _rewardPoints: number = 0; 

  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;
    this.validate();
  }

  public get id() : string {
    return this._id;
  }
  
  public get name() : string {
    return this._name;
  }
  
  public get rewardPoints() : number {
    return this._rewardPoints;
  }

  public get Address() : Address {
    return this._address;
  }

  public isActive() : boolean {
    return this._active;
  }
  
  validate() {
    if(this._id.length === 0) {
      throw new Error("Id is required");
    }
    if(this._name.length === 0) {
      throw new Error("Name is required");
    }
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  activate() {
    if(this._address === undefined) {
      throw new Error("Address is mandatory to activate a customer");
    }
    this._active = true;
  }

  deactivate() {
    this._active = false;
  }

  addRewardPoints(points: number) {
    this._rewardPoints += points;
  }

  set Address(address: Address) {
    this._address = address;
  }
}