# Change Log
All notable changes to this project will be documented in this file.

## [0.2.0] - 2017-02-27
### Added
- `/src/lib.es6.js` library file that handles the twitch api data. _(h/t @kernelcurry for the lib helper & refactor)_
- Added the stream preview thumbnail if streamer is live
- Added new screenshot
- Official CHANGELOG.md

### Changed
- This now runs as native Javascript, no more need for a framework (jquery)
- Loop that will check the stream info ever 30sec
- Channel data will show in console whether or not streamer is live

### Removed
- jquery include
- twitch api js include
- old screenshots

## [0.1.0] - 2017-02-23
### Changed
- Remove exclusionary mentions of "open source" since this project can benefit
both "open" and "closed" source projects equally.
