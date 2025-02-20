declare module '#auth-utils' {
  interface User {
    id: number
    username: string
    nickname?: string
    avatar?: string
  }

  interface UserSession {
    loggedInAt?: Date
  }

  interface SecureSessionData {
    routes: string[]
    permissions: string[]
  }
}

export {}
