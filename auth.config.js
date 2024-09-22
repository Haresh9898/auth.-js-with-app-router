
export default {
  providers: [],
  callbacks: {
    // I have updated my session in this file as we are protecting role based routes using auth method imported from this file in next js middleware
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
        session.user.role = token.role;
      }
      return session;
    },
    
  },
  session: {
    strategy: "jwt",
  },
};
