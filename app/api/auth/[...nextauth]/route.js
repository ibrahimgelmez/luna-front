import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Email & Password",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // ÖRNEK: Kullanıcıyı manuel olarak kontrol et
        if (credentials.email === "test@example.com" && credentials.password === "123456") {
          return { id: "1", name: "Test User", email: "test@example.com" };
        }
        return null; // Giriş başarısız
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
