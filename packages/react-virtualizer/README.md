# react-virtualizer

This library was generated with [Nx](https://nx.dev).

## Building

Run `nx build react-virtualizer` to build the library.

## Running unit tests

Run `nx test react-virtualizer` to execute the unit tests via [Jest](https://jestjs.io).

## Description

React-virtualizer is a new approach to virtualization that uses IntersectionObserver to enable scroll detection.

The core benefit of this method, is that the virtualization itself is disconnected from both a scroll container, and any JS loop detection, to increase flexibility and react performance.

This enables virtualization in the top level HTML page body, as well as multiple virtualized lists in a single scroll view.

## Usage

It is recommended to use the ScrollView versions of this virtualizer for simple virtualization scenarios, as it simplifies the encapsulation of virtualizer hooks and provides access to internal variables via context.

If more complex virtualization is needed, a variety of static/dynamic hooks has been provided to configure virtualizer variants, be sure to take a look at the base virtualizer stories to see core implementation, or implement the hooks similar to the internal usage of VirtualizerScrollView/VirtualizerScrollViewDynamic.
