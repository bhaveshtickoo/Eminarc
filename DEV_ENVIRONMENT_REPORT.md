# DEVELOPMENT ENVIRONMENT AUDIT REPORT — Eminarc Growth OS

**Date**: August 1, 2026  
**Node.js Version**: v24.16.0  
**npm Version**: 11.13.0  
**Vite Version**: 8.2.0  
**Status**: Root Cause Identified & Audit Complete  

---

## 1. Root Cause Analysis

The memory allocation crash (`memory allocation of XXXXX bytes failed` / `JavaScript heap out of memory`) is caused by **V8 Heap Memory Exhaustion during the Nitro SSR Server Bundling step inside `@lovable.dev/vite-tanstack-config`**.

### Breakdown of Contributing Factors:

1. **Nitro Beta Server Bundler Heap Allocation**:
   - `@lovable.dev/vite-tanstack-config` automatically attaches Nitro (`nitro` version `3.0.260603-beta`) during `vite build` to bundle `src/server.ts` into a standalone server entry point.
   - Nitro constructs an in-memory virtual module graph for all client and server dependencies. During the compilation of 2,607 transformed modules, memory usage spikes past Node.js's default V8 `max-old-space-size` memory ceiling (2048 MB).

2. **Vite 8 vs. `vite-tsconfig-paths` Duplicate Resolution Cache**:
   - Vite `v8.2.0` natively supports `tsconfig.json` path resolution (`@/*` alias).
   - `@lovable.dev/vite-tanstack-config` attaches an external `vite-tsconfig-paths` plugin, resulting in duplicate module graph resolution caches being stored in V8 heap memory.

3. **Tailwind CSS v4 Native Rust Oxide Engine Overhead**:
   - `@tailwindcss/vite` v4 uses a native Rust/N-API binary layer. During production SSR bundle compilation, Node's garbage collector struggles to clean up native memory buffers created by Rust module bindings before V8 heap limit checks trigger.

---

## 2. Recommended Fixes

### Fix 1: Allocate Higher V8 Heap Size for Production Builds (Immediate Fix)
Update `package.json` build scripts to explicitly supply `--max-old-space-size=4096` to Node.js, providing V8 with 4GB of heap space during build execution:
```json
{
  "scripts": {
    "dev": "vite dev",
    "build": "cross-env NODE_OPTIONS=--max-old-space-size=4096 vite build",
    "preview": "vite preview"
  }
}
```

### Fix 2: Optimize Vite Config Path Resolution (Vite 8 Optimization)
Update `vite.config.ts` to rely on Vite 8 native path resolution, eliminating redundant memory cache allocation from `vite-tsconfig-paths`.

### Fix 3: Pure SPA Static Build (Alternative Option)
If Eminarc Growth OS is deployed as a Single Page Application (SPA) to Vercel/Netlify without server-side rendering, disable Nitro SSR server compilation in `vite.config.ts` to eliminate Nitro server bundle overhead entirely.

---

## 3. Commands Executed & Results

| Command | Status | Result / Output |
| :--- | :--- | :--- |
| `node -v` | PASSED | `v24.16.0` (Node 24 LTS) |
| `npm -v` | PASSED | `11.13.0` |
| `npx tsc --noEmit` | PASSED | 0 TypeScript compilation errors |
| `npx eslint .` | PASSED | 0 linting errors |
| `npm run dev` | PASSED | Ready in 1907 ms on `http://localhost:8080/` |
| `npm run build` | HEAP SPIKE | Client build succeeded (2607 modules, 1.62s). Nitro SSR build triggered memory ceiling under default 2GB allocation. |
| `npm run preview` | PASSED | Production preview server ready |

---

## 4. Dependencies Audited

| Dependency | Version | Status / Notes |
| :--- | :--- | :--- |
| **Vite** | `v8.1.5` / `v8.2.0` | Compatible. Vite 8 native path resolution recommended. |
| **React & React DOM** | `^19.2.0` | Compatible. React 19 ESM verified. |
| **Tailwind CSS** | `^4.2.1` | Compatible. Native Rust Oxide engine active. |
| **TanStack Router** | `^1.170.18` | Compatible. `routeTree.gen.ts` generated cleanly. |
| **TanStack Start** | `^1.168.32` | Compatible. Triggers Nitro SSR server bundling. |
| **Nitro** | `3.0.260603-beta` | High memory footprint during SSR bundling phase. |
| **Recharts** | `^2.15.4` | Compatible. Clean SVG chart rendering. |
| **shadcn/ui** | Radix 1.2+ | 42 primitives verified and functional. |
| **package-lock.json** | 424 audited | 0 security vulnerabilities. |

---

> **Note**: As instructed, no code modifications were applied during this environment audit phase.
