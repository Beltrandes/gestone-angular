export interface MasterRegisterDTO {
  name: string,
  email: string,
  password: string,
  phone: string,
  marbleshop: {
    name: string,
    email: string,
    phone: string
  }
}
