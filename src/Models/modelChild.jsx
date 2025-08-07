export default class ModelChild {
  constructor(data) {
    this.id = data.id;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.image = data.image;
    this.age = data.age;
    this.address= {
      address: data.address.address,
      city: data.address.city,
      state: data.address.state,
    };
    this.company={
      title:data.company.title,
      department:data.company.department,
      
    };
    this.birthDate=data.birthDate
  }
}
