# Change Log - @fluentui-contrib/react-virtualizer

This log was last generated on Thu, 25 Sep 2025 17:20:48 GMT and should not be manually modified.

<!-- Start content -->

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
