export class Employee {
  id: string;
  name: string;
  email: string;
  image?: string;

  constructor(id: string, name: string, email: string, image?: string) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.image = image;
  }
}
