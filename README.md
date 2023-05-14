# varvar

[![MIT license][license-badge]][license-url]
[![Maintenance status][status-badge]][status-url]
[![Code coverage][coverage-badge]][coverage-url]

## About

**varvar** is vanilla Node.js server for `JSON` push and fetch with primitive authentication - in other words just for storing without 100% persistence garantie.

## Motivation

Initially [warp] needs backend for (at least) one feature. Also it's suitable time and place to gain a bit experience in vanilla Node.

After that I realized that in fact this server could be used in any similar cases.

You can take a look at [list of questions and problems](./QA.md) that I faced during development.

## Requirements

Developed and tested on `Ubuntu 20.04.4 LTS`: `Node.js v16.20.0`.

## Usage

Push data:

```
curl -X POST localhost:8080/somekey1 -i -H "Authorization: p@sw0rd" -d '{"number": 1234}'
```

Pull data:

```
curl -X GET localhost:8080/somekey1 -i
```

Update data:

```
curl -X PUT localhost:8080/somekey1 -i -H "Authorization: p@sw0rd" -d '{"number": 1234}'
```

Delete data:

```
curl -X DELETE localhost:8080/somekey1 -i -H "Authorization: p@sw0rd"
```

[status-url]: https://github.com/vikian050194/varvar/pulse
[status-badge]: https://img.shields.io/github/last-commit/vikian050194/varvar.svg

[license-url]: https://github.com/vikian050194/varvar/blob/master/LICENSE
[license-badge]: https://img.shields.io/github/license/vikian050194/varvar.svg

[coverage-url]: https://codecov.io/gh/vikian050194/varvar
[coverage-badge]: https://img.shields.io/codecov/c/github/vikian050194/varvar

[warp]: https://github.com/vikian050194/warp
