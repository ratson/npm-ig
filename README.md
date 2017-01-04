# npm-ig

Install global dependencies from `package.json`

## Features

* Install many global packages at once.
* Install exact version of packages.

## Installation

```sh
npm install -g npm-ig
```

## Usage

Create `package.json`,

```json
{
  "private": true,
  "preferGlobal": true,
  "dependencies": {
    "add-dependency": "1.1.0",
    "npm": "4.1.1"
  }
}
```

Then run in the same directory,

```sh
npm-ig
```
