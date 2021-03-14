export class user {
    id:any;
    name: string;
    username: string;
    email: string;
    address:Address;
    phone: any;
    website:string;
   
    company:Company
  }
  export class Address  {
    street:string;
    suite:string;
    city: string;
    zipcode: any;
    geo:Geo;
   
  }
  export class Company {
    name: string;
    catchPhrase: string;
    bs: string;
  }
  export class Geo {
    lat: any;
    lng: any;
  }