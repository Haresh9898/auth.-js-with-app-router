
export default {
  providers: [],
  callbacks: {
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
