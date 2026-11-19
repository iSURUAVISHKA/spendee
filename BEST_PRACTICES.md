# Best Practices

How spendee's code is organized, and the rules to follow when you add to it. If you're not sure where something belongs, see [Where does new code go?](#where-does-new-code-go)

## Stack

| Tool | Version | Notes |
| --- | --- | --- |
| Node | 22.22+ (24 LTS recommended) | React Router 8 needs Node 22.22 or newer. With nvm: `nvm install 24`. |
| React | 19 | |
| TypeScript | 6 | Compiler rules are listed under [TypeScript](#typescript). |
| Vite | 8 | |
| React Router | 8 | The package is `react-router`. `react-router-dom` stopped at v7, so don't install it. |
| Redux Toolkit + RTK Query | 2 | Packages: `@reduxjs/toolkit` and `react-redux`. RTK Query handles all server data. |
| Base UI | 1 | `@base-ui/react`: unstyled, accessible primitives. The components in `shared/components/` wrap them with Tailwind. Don't add shadcn/ui or another component library. |

## Folder structure

```text
src/
├── main.tsx              # entry: <Provider store> around <BrowserRouter>
├── app/
│   ├── store.ts          # Redux store
│   ├── hooks.ts          # typed useAppSelector / useAppDispatch
│   ├── router.tsx        # AppRoutes: <Routes> and <Route> elements
│   └── index.css         # global styles
├── pages/                # thin page files, one PascalCase folder per area
│   ├── Auth/
│   │   └── LoginPage.tsx
│   ├── Dashboard/
│   │   └── DashboardPage.tsx
│   ├── Transactions/
│   │   └── TransactionsPage.tsx
│   └── Budgets/
│       └── BudgetsPage.tsx
├── modules/              # one per page area, plus domains without a page
│   ├── auth/
│   ├── dashboard/
│   ├── transactions/
│   ├── categories/
│   └── budgets/
└── shared/
    ├── api/
    │   └── baseApi.ts    # the one RTK Query createApi()
    ├── components/       # one folder each, built on Base UI: Button/Button.tsx
    │   └── AppLayout/    # app shell: <Sidebar /> + <Outlet />
    ├── widgets/          # larger blocks built from components: Sidebar/Sidebar.tsx
    ├── hooks/
    └── utils/            # cn, formatCurrency, date helpers
```

### Where does new code go?

1. Wiring for the whole app (store, router, providers): `app/`
2. A route: a thin page file in its area folder, `pages/<Area>/<Name>Page.tsx`
3. The components, types and assets of a page area, and anything that knows about transactions, categories or budgets: the matching folder in `modules/`
4. Anything generic and reusable: `shared/`

## Module structure

Every module has the same shape:

```text
src/modules/transactions/
├── components/
│   ├── TransactionList/
│   │   └── TransactionList.tsx
│   └── TransactionForm/
│       └── TransactionForm.tsx
├── hooks/                     # only hooks RTK Query doesn't generate
├── state/
│   ├── transactionsApi.ts     # RTK Query endpoints
│   └── transactionsSlice.ts   # browser-only state, if the module needs any
├── assets/                    # images and icons used only by this module
├── types.ts
├── utils.ts
├── constants.ts
└── index.ts                   # public exports: the only file other code imports
```

## Page structure

Pages are grouped in PascalCase area folders. Each area has a module with the same name in camelCase, and that module holds the area's components, types and assets:

```text
src/pages/Auth/LoginPage.tsx                  →  src/modules/auth/
src/pages/Transactions/TransactionsPage.tsx   →  src/modules/transactions/
```

- A page file stays thin. It lays out components from its module and calls module hooks, all imported through the module's `index.ts`. It may use other modules the same way.
- Nothing else goes in `pages/`: no components, types or assets.
- More pages for the same area go in the same folder (`pages/Auth/RegisterPage.tsx`) and share the area's module.
- Page folders never import from each other. The router imports each page file directly, so pages can be lazy-loaded one by one.

## Import rules

Imports only point down this chain:

```text
app → pages → modules → shared
```

- `shared/` never imports from `modules/`, `pages/` or `app/`.
- Code outside a module imports only from that module's `index.ts`, never from its internal files:

  ```ts
  // In src/modules/budgets/hooks/useBudgetProgress.ts

  // ✅ Through the module's public index.ts
  import { useGetTransactionsQuery } from '../../transactions'

  // ❌ Reaching into another module's internal files
  import { useGetTransactionsQuery } from '../../transactions/state/transactionsApi'
  ```

- One exception: any code may import `useAppSelector` and `useAppDispatch` from `app/hooks.ts`, because the store's types live in `app/`.

## Data and state (RTK Query)

### One API for the whole app

All server requests go through a single `createApi`, in `shared/api/baseApi.ts`. It sets the base URL and defines no endpoints:

```ts
// src/shared/api/baseApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  endpoints: () => ({}),
})
```

- Set `VITE_API_URL` in a `.env` file at the project root.
- When the API needs auth headers, add them here with `prepareHeaders`.
- Don't add a second `createApi`. Each one needs its own reducer and middleware in the store, and cache tags can't refresh data across them.

### Each module adds its own endpoints

```ts
// src/modules/transactions/state/transactionsApi.ts
import { baseApi } from '../../../shared/api/baseApi'
import type { NewTransaction, Transaction } from '../types'

export const transactionsApi = baseApi
  .enhanceEndpoints({ addTagTypes: ['Transaction'] })
  .injectEndpoints({
    endpoints: (build) => ({
      getTransactions: build.query<Transaction[], void>({
        query: () => '/transactions',
        providesTags: ['Transaction'],
      }),
      addTransaction: build.mutation<Transaction, NewTransaction>({
        query: (body) => ({ url: '/transactions', method: 'POST', body }),
        invalidatesTags: ['Transaction'],
      }),
    }),
  })

export const { useGetTransactionsQuery, useAddTransactionMutation } = transactionsApi
```

- `injectEndpoints` adds the module's endpoints to the shared API.
- `enhanceEndpoints({ addTagTypes })` declares the module's cache tags inside the module, so `shared/` never names a domain.
- Queries list the tags they provide, and mutations list the tags they invalidate. Adding a transaction refetches every active query that provides `'Transaction'`.

### Server data vs. browser state

- **Server data** (transactions, categories, budgets) lives only in the RTK Query cache. Never copy it into a slice.
- **Browser-only state** (filters, search text, which dialog is open) goes in a slice, but only when more than one component needs it. State that only one component uses stays in `useState`.

```ts
// src/modules/transactions/state/transactionsSlice.ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

type TransactionsState = { search: string }

const initialState: TransactionsState = { search: '' }

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    searchChanged(state, action: PayloadAction<string>) {
      state.search = action.payload
    },
  },
  selectors: {
    selectSearch: (state) => state.search,
  },
})

export const { searchChanged } = transactionsSlice.actions
export const { selectSearch } = transactionsSlice.selectors
export const transactionsReducer = transactionsSlice.reducer
```

### Export through `index.ts`

Export only what other code needs:

```ts
// src/modules/transactions/index.ts
export { TransactionList } from './components/TransactionList/TransactionList'
export { TransactionForm } from './components/TransactionForm/TransactionForm'
export { useGetTransactionsQuery, useAddTransactionMutation } from './state/transactionsApi'
export { searchChanged, selectSearch, transactionsReducer } from './state/transactionsSlice'
export type { NewTransaction, Transaction } from './types'
```

### Wire it up in `app/`

```ts
// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit'
import { baseApi } from '../shared/api/baseApi'
import { transactionsReducer } from '../modules/transactions'

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    transactions: transactionsReducer, // key must match the slice's name
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
```

```ts
// src/app/hooks.ts
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from './store'

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
```

In components, use `useAppSelector` and `useAppDispatch`, never plain `useSelector` and `useDispatch`.

## Routing (React Router 8)

- Import everything from `react-router`.
- Use React Router's "declarative mode". `main.tsx` wraps the app in `<BrowserRouter>`, and `app/router.tsx` exports an `AppRoutes` component that renders `<Routes>` with nested `<Route>` elements. Don't use `createBrowserRouter` or `RouterProvider` (data mode).
- `AppLayout` (`shared/components/AppLayout/`) is the root `<Route>`'s element. It renders the `Sidebar` widget and an `<Outlet />`, where the current page appears.
- Pages are lazy-loaded with `React.lazy`. Put a `<Suspense>` boundary around the `<Outlet />` in `AppLayout`, so the shell stays on screen while a page loads.
- Pages arrange module components and call module hooks. Business logic stays in modules. See [Page structure](#page-structure).
- Data-mode APIs don't work here: route `loader`s and `action`s, `useFetcher`, `useNavigation`, `useBlocker` and `<ScrollRestoration>`. RTK Query is the only data layer.

```tsx
// src/app/router.tsx
import { Route, Routes } from 'react-router'
import { DashboardPage } from '../pages/Dashboard/DashboardPage'
import { TransactionsPage } from '../pages/Transactions/TransactionsPage'
import { BudgetsPage } from '../pages/Budgets/BudgetsPage'
import { AppLayout } from '../shared/components/AppLayout/AppLayout'

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<AppLayout />}>
      <Route index element={<DashboardPage />} />
      <Route path="transactions" element={<TransactionsPage />} />
      <Route path="budgets" element={<BudgetsPage />} />
    </Route>
  </Routes>
)
```

```tsx
// src/main.tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router'
import { store } from './app/store'
import { AppRoutes } from './app/router'
import './app/index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
```

## Naming

| What | Convention | Example |
| --- | --- | --- |
| Component | PascalCase folder and file | `components/TransactionList/TransactionList.tsx` |
| Page area folder | PascalCase, matching its camelCase module | `pages/Auth/` and `modules/auth/` |
| Page | `<Name>Page.tsx` in its area folder | `pages/Auth/LoginPage.tsx` |
| Hook | `use<Name>.ts` | `hooks/useMonthlyTotals.ts` |
| API file | `<module>Api.ts` in `state/` | `state/transactionsApi.ts` |
| Endpoint | `get`, `add`, `update` or `delete` + name | `getTransactions` becomes `useGetTransactionsQuery` |
| Slice file | `<module>Slice.ts` in `state/` | `state/transactionsSlice.ts` |
| Slice action | Past-tense event, not a setter | `searchChanged`, not `setSearch` |

Use named exports (`export function TransactionList`), not default exports, so each thing has the same name everywhere it's imported.

## TypeScript

`tsconfig.app.json` enforces these rules, and `npm run build` fails if code breaks them:

- **Type-only imports use `import type`** (`verbatimModuleSyntax`), for example `import type { Transaction } from '../types'`.
- **No `enum` or `namespace`** (`erasableSyntaxOnly`). Use a union type instead, for example `type TransactionKind = 'expense' | 'income'`.
- **No unused variables or parameters** (`noUnusedLocals`, `noUnusedParameters`).

Each module's types go in its `types.ts`, including the shapes the API returns.
