export interface UserData {
  name: string
  email: string
}

export interface UserDataFetcher {
  fetchUser(name: string): Promise<UserData | null>
  fetchAllUsers(): Promise<UserData[]>
}
