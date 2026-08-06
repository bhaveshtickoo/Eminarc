// Supabase Auth Service Interface Abstraction

export interface UserSession {
  user: {
    id: string;
    email: string;
    user_metadata: {
      full_name?: string;
      avatar_url?: string;
      workspace_id?: string;
    };
  };
  accessToken: string;
  expiresAt: number;
}

export interface AuthService {
  signInWithPassword: (
    email: string,
    password: string,
  ) => Promise<{ session: UserSession | null; error: Error | null }>;
  signUp: (
    email: string,
    password: string,
    fullName: string,
  ) => Promise<{ session: UserSession | null; error: Error | null }>;
  signOut: () => Promise<{ error: Error | null }>;
  getSession: () => Promise<UserSession | null>;
  resetPassword: (email: string) => Promise<{ success: boolean; error: Error | null }>;
}

export const mockAuthService: AuthService = {
  async signInWithPassword(email: string) {
    return {
      session: {
        user: {
          id: "usr_mock_123",
          email,
          user_metadata: { full_name: "Pratyush", workspace_id: "ws-eminarc-01" },
        },
        accessToken: "mock_jwt_token",
        expiresAt: Date.now() + 3600 * 1000,
      },
      error: null,
    };
  },
  async signUp(email: string, _pass: string, fullName: string) {
    return {
      session: {
        user: {
          id: `usr_${Date.now()}`,
          email,
          user_metadata: { full_name: fullName, workspace_id: "ws-eminarc-01" },
        },
        accessToken: "mock_jwt_token",
        expiresAt: Date.now() + 3600 * 1000,
      },
      error: null,
    };
  },
  async signOut() {
    return { error: null };
  },
  async getSession() {
    return {
      user: {
        id: "usr_mock_123",
        email: "founder@eminarc.com",
        user_metadata: { full_name: "Pratyush", workspace_id: "ws-eminarc-01" },
      },
      accessToken: "mock_jwt_token",
      expiresAt: Date.now() + 3600 * 1000,
    };
  },
  async resetPassword() {
    return { success: true, error: null };
  },
};
