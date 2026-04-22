# Member Application Schema Alignment (Frontend)

## Goal

Align FE data handling with the new backend aggregate model:

- MemberApplication with aggregate `state`
- nested `cvReview`
- nested `departmentInterviews`
- nested `finalReview`

## 1) Types and Contracts

- [ ] Update TS interfaces/types for new response shape
- [ ] Remove legacy flat fields that moved to nested objects
- [ ] Add enum type for `MemberApplicationState`
- [ ] Add null-safe types for nullable reviewer fields

### Suggested aggregate DTO from API

- `id, fullname, email, ...`
- `state`
- `cvReview | null`
- `departmentInterviews[]`
- `finalReview | null`

## 2) API Layer

- [ ] Update API clients to consume aggregate detail endpoint
- [ ] Update list query params to use `state`
- [ ] Add methods for review actions if exposed as separate endpoints:
  - [ ] submit CV review
  - [ ] submit department interview result
  - [ ] submit final review result
  - [ ] withdraw application
- [ ] Standardize error handling for invalid state transitions

## 3) State Management

- [ ] Normalize cached data by application id
- [ ] Keep `state` as primary badge/filter source in list screens
- [ ] Derive sub-step UI from nested review objects (not from guessed logic)
- [ ] Invalidate/refetch application detail after any review action

## 4) UI Screens

- [ ] Application list screen:
  - [ ] filter by `state`
  - [ ] show state badge and timestamps
- [ ] Application detail screen:
  - [ ] section: candidate profile
  - [ ] section: CV review
  - [ ] section: department interviews
  - [ ] section: final review
- [ ] Action buttons rendered by allowed transitions and user role
- [ ] Add withdrawn view/label if workflow supports withdraw

## 5) UX Rules

- [ ] Show disabled actions when transition is invalid
- [ ] Confirm destructive actions (reject/withdraw)
- [ ] Show timeline/history style progression for clarity
- [ ] Keep status copy consistent with backend enum names

## 6) Compatibility and Migration

- [ ] If backend still sends old fields temporarily, keep adapter mapper in one place
- [ ] Remove adapter after backend deprecation window closes
- [ ] Avoid spreading legacy field access in UI components

## 7) Tests (Frontend)

- [ ] Unit tests for DTO mapping and enum rendering
- [ ] Component tests for list/detail states
- [ ] E2E scenario checks:
  - [ ] submit -> cv pass -> interview -> final pass
  - [ ] submit -> cv fail
  - [ ] submit -> withdraw
- [ ] Error UI tests for forbidden transitions

## 8) Done Criteria

- [ ] No component relies on removed legacy flat fields
- [ ] List and detail screens render correctly from aggregate payload
- [ ] Actions update UI state correctly after API responses
- [ ] FE tests pass for new workflow
