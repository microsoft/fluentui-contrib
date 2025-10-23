# Change Log - @fluentui-contrib/react-virtualizer

This log was last generated on Thu, 23 Oct 2025 15:06:11 GMT and should not be manually modified.

<!-- Start content -->

## 0.5.3

Thu, 23 Oct 2025 15:06:11 GMT

### Patches

- fix: fix errors when the items order changes (dmytrokirpa@microsoft.com)

## 0.5.2

Thu, 02 Oct 2025 17:49:04 GMT

### Patches

- fix: add missing react-jsx-runtime dependency (dmytrokirpa@microsoft.com)

## 0.5.1

Wed, 01 Oct 2025 08:00:02 GMT

### Patches

- fix: Ensure IO buffer is ignored in the correct direction (remove, don't add) (mifraser@microsoft.com)
- fix: Ensure base virtualizer hooks recalc index if numItems changes (mifraser@microsoft.com)
- chore: update peer dependencies for React and @types/react to support versions <20.0.0 (dmytrokirpa@microsoft.com)

## 0.5.0

Mon, 29 Sep 2025 16:08:33 GMT

### Minor changes

- fix: Ensure RO fires on correct indexes and sizing is up to date, prevent remounts and massive layout changes from dynamic content (mifraser@microsoft.com)

## 0.4.0

Thu, 25 Sep 2025 17:20:48 GMT

### Minor changes

- feat: Enable complex dynamic scenarios with add and remove items, reduce remounting (mifraser@microsoft.com)

### Patches

- fix: Ensure scrollTo uses the correct item size (mifraser@microsoft.com)

## 0.3.0

Mon, 22 Sep 2025 16:45:21 GMT

### Minor changes

- feat: Enable external size tracking of resizes post-render (seperate from intenral virtualizers rendered sizes) for complex scroll behavior, added scrollToPosition for x,y coord scrolling and removed unnessecary renders from pagination (should be handled externally if complex) (mifraser@microsoft.com)

## 0.2.0

Mon, 22 Sep 2025 16:02:24 GMT

### Minor changes

- feat: enforce explicit module boundary types (dmytrokirpa@microsoft.com)

### Patches

- fix: Remove jsx automatic runtime from render functions, import react instead (mifraser@microsoft.com)
- feat: add react 19 support (dmytrokirpa@microsoft.com)
- fix: Ensure dynamic virtualizer doesn't get stuck at end (mifraser@microsoft.com)

## 0.1.0

Fri, 01 Aug 2025 18:07:48 GMT

### Minor changes

- feat: Release react-virtualizer in initial stable state (mifraser@microsoft.com)
