# CodePath - Interview Preparation Platform

## Overview

CodePath is a comprehensive coding interview preparation platform built with a full-stack TypeScript architecture. The application combines modern web technologies to provide an interactive learning experience with AI-powered features, company-specific interview preparation, and comprehensive coding practice tools.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: TanStack Query (React Query) for server state
- **Build Tool**: Vite for development and production builds
- **UI Components**: Radix UI primitives with custom styling

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL (configured for Neon serverless)
- **Authentication**: Replit Auth with OpenID Connect
- **Session Management**: Express sessions with PostgreSQL storage

### Development Environment
- **Monorepo Structure**: Shared code between client and server
- **Development Server**: Vite dev server with HMR
- **TypeScript**: Strict mode with path aliases
- **Code Quality**: ESLint integration

## Key Components

### Authentication System
- **Provider**: Replit Auth with OpenID Connect
- **Session Storage**: PostgreSQL-backed sessions using connect-pg-simple
- **User Management**: Automatic user creation and profile management
- **Security**: HTTP-only cookies with secure flags

### Database Schema
- **Users**: Profile management with Replit integration
- **Companies**: Tech companies for interview preparation
- **Programming Languages**: Language-specific tutorials and content
- **Topics**: Data structures and algorithms categories
- **Questions**: Coding interview questions with difficulty levels
- **Solutions**: User-submitted solutions with language support
- **User Progress**: Learning progress tracking
- **Language Tutorials**: Step-by-step programming tutorials

### AI Integration
- **Provider**: OpenAI GPT-4o
- **Features**: 
  - Code explanation with complexity analysis
  - Algorithm visualization generation
  - Problem hint generation
- **API Structure**: Dedicated service layer for AI operations

### UI Component System
- **Base**: shadcn/ui components built on Radix UI
- **Theming**: CSS variables with light/dark mode support
- **Custom Components**: Company badges, difficulty indicators, code editor
- **Responsive Design**: Mobile-first approach with breakpoint utilities

## Data Flow

### Authentication Flow
1. User accesses protected route
2. Middleware checks session validity
3. Redirect to Replit Auth if unauthenticated
4. Profile creation/update on successful auth
5. Session establishment with PostgreSQL storage

### Learning Flow
1. User selects language or company focus
2. System fetches relevant questions and tutorials
3. Progress tracking updates in real-time
4. AI features provide contextual assistance
5. Solutions saved with progress metrics

### API Request Flow
1. Frontend makes authenticated requests
2. Express middleware validates sessions
3. Drizzle ORM handles database operations
4. Structured JSON responses with error handling
5. TanStack Query manages client-side caching

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL serverless connection
- **drizzle-orm**: Type-safe database operations
- **openai**: AI-powered code assistance
- **@tanstack/react-query**: Server state management
- **wouter**: Lightweight routing
- **express**: Web server framework

### UI Dependencies
- **@radix-ui/***: Accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Component variant management
- **lucide-react**: Icon library

### Development Dependencies
- **vite**: Build tool and dev server
- **typescript**: Static type checking
- **@replit/vite-plugin-***: Replit-specific tooling

## Deployment Strategy

### Production Build
- **Client**: Vite builds React app to static assets
- **Server**: esbuild bundles Node.js application
- **Assets**: Served from dist/public directory
- **Environment**: NODE_ENV=production optimization

### Database Management
- **Migrations**: Drizzle Kit for schema management
- **Connection**: Serverless PostgreSQL via Neon
- **Session Storage**: Dedicated sessions table for auth

### Environment Configuration
- **DATABASE_URL**: PostgreSQL connection string
- **SESSION_SECRET**: Session encryption key
- **OPENAI_API_KEY**: AI service authentication
- **REPLIT_DOMAINS**: Auth provider configuration

### Scalability Considerations
- **Database**: Serverless PostgreSQL scales automatically
- **Caching**: TanStack Query provides client-side optimization
- **CDN Ready**: Static assets can be served from CDN
- **Stateless Server**: Session storage in database enables horizontal scaling

The application follows modern full-stack patterns with type safety throughout the entire stack, making it maintainable and scalable for a coding education platform.