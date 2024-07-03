export const defaultSession = {
  jwt: "",
  user: {},
  isLoggedIn: false,
}

export const sessionOptions = {
  password: process.env.NEXT_PUBLIC_IRON_SECRET,
  cookieName: "accessToken",
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  },
}
