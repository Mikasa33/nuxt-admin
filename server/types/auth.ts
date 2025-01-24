declare module '#auth-utils' {
  interface User {
    id: number
    username: string
    nickname?: string
    avatar?: string
    routers?: string[]
    permissions?: string[]
  }

  interface UserSession {
    loggedInAt?: Date
  }

  interface SecureSessionData {

  }
}

export {}
