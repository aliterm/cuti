export interface Admin {
  id: number
  firstName: string
  lastName: string
  email: string
  birthDate: string
  gender: string
}

export interface AdminWithToken extends Admin {
  token: string
}
