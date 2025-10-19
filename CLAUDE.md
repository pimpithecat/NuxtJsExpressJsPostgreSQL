## 🧩 Architecture — 3-Layer Clean Pattern

### Layer Responsibilities

```
Presentation ← UI, pages, client-side state
Business     ← API handlers, domain logic, validation
Data         ← Database, external APIs, repositories
```

**Presentation Layer**

* ✅ Handles rendering, user interactions, and UI state
* ❌ No database calls or business logic

**Business Layer**

* ✅ Contains core logic, validation, authorization, orchestration
* ❌ No UI rendering or direct SQL queries

**Data Layer**

* ✅ Handles CRUD operations, caching, and external API integrations
* ❌ No business rules or HTTP logic

---

## 📂 Recommended Project Structure (Generic)

```
src/
├── app/                   # Presentation (routes, pages, or views)
│   ├── ui/                # UI components
│   └── routes/            # HTTP routes / API handlers (business layer)
├── core/                  # Business logic, validation, use cases
├── data/                  # Database + external APIs
│   ├── db/                # ORM / SQL / data sources
│   ├── repositories/      # Data access logic
│   └── services/          # External integrations (e.g., S3, Stripe)
├── types/                 # Global/shared types
└── middleware/            # Security, authentication, rate limiters
```

> ⚙️ Adjust folder naming to match your framework, but **keep the layer separation intact.**

---

## ⚡ Performance Best Practices

### Assets & Static Files

* ✅ Use optimized formats (WebP/AVIF) and CDN
* ✅ Enable compression (gzip, brotli)
* ✅ Optimize font loading (preconnect, preload)
* ❌ Avoid inline large assets or uncompressed images

### Code Splitting

* ✅ Lazy-load heavy modules or components
* ✅ Split code per page or route
* ❌ Don’t import entire libraries for one small utility

### Data Fetching

* ✅ Fetch initial data server-side when possible
* ✅ Use parallel requests (`Promise.all` / async batching)
* ✅ Cache with ETag, TTL, or server cache
* ❌ Avoid redundant client-side fetches

---

## 🔒 Security Principles

### Environment & API Safety

* ✅ Validate all environment variables at startup
* ✅ Apply rate limiting and strict CORS
* ✅ Use schema validation (Zod, Joi, Pydantic)
* ✅ Add security headers (CSP, XSS protection)
* ❌ Never expose secrets in client code
* ❌ Never trust unvalidated user input

### Authentication & Authorization

* ✅ Use proven libraries (Auth.js, Passport, JWT, OAuth, etc.)
* ✅ Use httpOnly + Secure cookies for sessions
* ✅ Implement RBAC or ABAC for access control
* ❌ Don’t store tokens in localStorage
* ❌ Don’t allow weak password policies

### Data Protection

* ✅ Use parameterized queries
* ✅ Sanitize and escape user input
* ✅ Enforce HTTPS in production
* ❌ Don’t use string interpolation in SQL
* ❌ Don’t expose stack traces to users

---

## 🧠 Types & Schema Management

**Global Types (`/types`)**

* ✅ Shared interfaces used across multiple features
* ❌ No feature-specific types here

**Feature-Specific Types (`/core/{feature}/types`)**

* ✅ Zod/Pydantic schemas, DTOs, validators
* ❌ Don’t re-export unrelated global types

---

## 🗄️ Database & External Services

**Database**

* ✅ Use connection pooling
* ✅ Wrap related operations in transactions
* ✅ Avoid `SELECT *`
* ❌ No DB queries in controllers or UI code

**External APIs**

* ✅ Use timeouts and retries with exponential backoff
* ✅ Validate responses from third-party services
* ✅ Keep API keys safe (env vars, vault)
* ❌ Don’t make external calls without error handling

---

## 🧪 Code Quality & Testing

**Static Typing / TypeScript**

* ✅ Enable strict mode
* ✅ Avoid `any` unless absolutely necessary
* ❌ Don’t ignore compiler warnings

**Testing**

* ✅ Unit test all business logic
* ✅ Integration test API and DB interactions
* ✅ Maintain 80%+ coverage for critical code
* ❌ Don’t test private/internal implementation details

**Error Handling**

* ✅ Use global error handlers or middleware
* ✅ Log contextual errors
* ✅ Provide user-friendly error messages
* ❌ Don’t silently fail
* ❌ Don’t expose stack traces to clients

---

## ⚙️ Background Jobs & Monitoring

**Jobs / Workers**

* ✅ Use proper job queues (BullMQ, Celery, etc.)
* ✅ Retry failed jobs with backoff
* ✅ Monitor queue health and failures
* ❌ Don’t run long tasks directly in request handlers

**Monitoring**

* ✅ Integrate error tracking (Sentry, etc.)
* ✅ Monitor performance (APM, metrics)
* ✅ Track API latency & uptime
* ❌ Never deploy without active monitoring

---

## 🚀 Production Checklist

**Before Deployment**

* ✅ Security audit completed
* ✅ All tests pass
* ✅ Environment variables validated
* ✅ Performance benchmarks met
* ❌ No console logs in production
* ❌ Don’t skip migration tests

**Must Have**

* ✅ Verified database backups
* ✅ Health checks enabled
* ✅ Rollback procedures documented
* ✅ Monitoring and alerting configured
* ❌ Don’t deploy without backups
* ❌ Don’t deploy without observability

---

## 🧭 Workflow & Collaboration

**Git & Code Practices**

* ✅ Use feature branches
* ✅ Follow conventional commit messages
* ✅ Require code reviews
* ✅ Enforce ESLint/Prettier rules
* ❌ No direct commits to `main`
* ❌ No vague commit messages like “fix” or “update”

**Anti-Patterns (Avoid at All Costs)**

* ❌ Business logic inside UI components
* ❌ Direct database queries inside controllers
* ❌ Trusting client-side data blindly
* ❌ Blocking synchronous operations in request handlers
* ❌ Missing error boundaries
* ❌ Deploying without monitoring

---

### ✅ Core Principle:

> **Separate layers. Secure data. Test logic. Monitor everything. Deploy responsibly.**
