// Authentication and authorization utilities for FormatGenius

export interface User {
  id: string
  email: string
  name: string
  role: 'user' | 'admin' | 'premium'
  subscription: 'basic' | 'professional' | 'enterprise'
  createdAt: string
  lastLogin: string
  isActive: boolean
}

export interface AuthToken {
  token: string
  expiresAt: string
  userId: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  email: string
  password: string
  name: string
  confirmPassword: string
}

// Mock user database - in a real app, this would be a database
const mockUsers: Record<string, User> = {
  'user_1': {
    id: 'user_1',
    email: 'john.doe@example.com',
    name: 'John Doe',
    role: 'user',
    subscription: 'professional',
    createdAt: '2024-01-01T00:00:00Z',
    lastLogin: '2024-01-15T10:30:00Z',
    isActive: true
  },
  'user_2': {
    id: 'user_2',
    email: 'jane.smith@example.com',
    name: 'Jane Smith',
    role: 'admin',
    subscription: 'enterprise',
    createdAt: '2024-01-01T00:00:00Z',
    lastLogin: '2024-01-15T14:20:00Z',
    isActive: true
  }
}

// Mock tokens - in a real app, these would be JWT tokens stored securely
const mockTokens: Record<string, AuthToken> = {}

export class AuthService {
  /**
   * Authenticate user with email and password
   */
  static async login(credentials: LoginCredentials): Promise<{ user: User; token: string } | null> {
    try {
      // In a real app, you would:
      // 1. Hash the password and compare with stored hash
      // 2. Use bcrypt or similar for password verification
      // 3. Generate JWT token
      // 4. Store token securely

      const user = Object.values(mockUsers).find(u => u.email === credentials.email)
      
      if (!user) {
        return null
      }

      // Mock password verification (always succeeds for demo)
      if (credentials.password !== 'password123') {
        return null
      }

      // Generate mock token
      const token = `token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours

      const authToken: AuthToken = {
        token,
        expiresAt,
        userId: user.id
      }

      mockTokens[token] = authToken

      // Update last login
      user.lastLogin = new Date().toISOString()

      return { user, token }
    } catch (error) {
      console.error('Login error:', error)
      return null
    }
  }

  /**
   * Register a new user
   */
  static async register(data: RegisterData): Promise<{ user: User; token: string } | null> {
    try {
      // Validate input
      if (data.password !== data.confirmPassword) {
        throw new Error('Passwords do not match')
      }

      if (data.password.length < 8) {
        throw new Error('Password must be at least 8 characters long')
      }

      // Check if user already exists
      const existingUser = Object.values(mockUsers).find(u => u.email === data.email)
      if (existingUser) {
        throw new Error('User already exists')
      }

      // Create new user
      const userId = `user_${Date.now()}`
      const newUser: User = {
        id: userId,
        email: data.email,
        name: data.name,
        role: 'user',
        subscription: 'basic',
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        isActive: true
      }

      mockUsers[userId] = newUser

      // Generate token for new user
      const token = `token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()

      const authToken: AuthToken = {
        token,
        expiresAt,
        userId: newUser.id
      }

      mockTokens[token] = authToken

      return { user: newUser, token }
    } catch (error) {
      console.error('Registration error:', error)
      return null
    }
  }

  /**
   * Verify authentication token
   */
  static async verifyToken(token: string): Promise<User | null> {
    try {
      const authToken = mockTokens[token]
      
      if (!authToken) {
        return null
      }

      // Check if token is expired
      if (new Date(authToken.expiresAt) < new Date()) {
        delete mockTokens[token]
        return null
      }

      const user = mockUsers[authToken.userId]
      return user || null
    } catch (error) {
      console.error('Token verification error:', error)
      return null
    }
  }

  /**
   * Logout user by invalidating token
   */
  static async logout(token: string): Promise<boolean> {
    try {
      if (mockTokens[token]) {
        delete mockTokens[token]
        return true
      }
      return false
    } catch (error) {
      console.error('Logout error:', error)
      return false
    }
  }

  /**
   * Get current user from request headers
   */
  static async getCurrentUser(request: Request): Promise<User | null> {
    try {
      const authHeader = request.headers.get('authorization')
      
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return null
      }

      const token = authHeader.substring(7)
      return await this.verifyToken(token)
    } catch (error) {
      console.error('Get current user error:', error)
      return null
    }
  }

  /**
   * Check if user has required role
   */
  static hasRole(user: User, requiredRole: string | string[]): boolean {
    const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole]
    return roles.includes(user.role)
  }

  /**
   * Check if user has required subscription level
   */
  static hasSubscription(user: User, requiredLevel: string): boolean {
    const levels = ['basic', 'professional', 'enterprise']
    const userLevel = levels.indexOf(user.subscription)
    const requiredLevelIndex = levels.indexOf(requiredLevel)
    
    return userLevel >= requiredLevelIndex
  }

  /**
   * Refresh authentication token
   */
  static async refreshToken(token: string): Promise<string | null> {
    try {
      const authToken = mockTokens[token]
      
      if (!authToken) {
        return null
      }

      // Generate new token
      const newToken = `token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()

      const newAuthToken: AuthToken = {
        token: newToken,
        expiresAt,
        userId: authToken.userId
      }

      // Replace old token with new one
      delete mockTokens[token]
      mockTokens[newToken] = newAuthToken

      return newToken
    } catch (error) {
      console.error('Token refresh error:', error)
      return null
    }
  }
}

// Middleware function for protecting routes
export function requireAuth(handler: Function) {
  return async (request: Request) => {
    const user = await AuthService.getCurrentUser(request)
    
    if (!user) {
      return new Response(JSON.stringify({ error: 'Authentication required' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    // Add user to request context
    (request as any).user = user
    
    return handler(request)
  }
}

// Middleware function for role-based access control
export function requireRole(requiredRole: string | string[]) {
  return (handler: Function) => {
    return requireAuth(async (request: Request) => {
      const user = (request as any).user
      
      if (!AuthService.hasRole(user, requiredRole)) {
        return new Response(JSON.stringify({ error: 'Insufficient permissions' }), {
          status: 403,
          headers: { 'Content-Type': 'application/json' }
        })
      }
      
      return handler(request)
    })
  }
}
