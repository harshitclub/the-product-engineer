# HTML Media: Audio & Video

HTML5 introduced native `<video>` and `<audio>` elements, allowing web browsers to play multimedia streams natively without requiring third-party plugins (like Flash or Silverlight).

## 1. The `<video>` Element

The `<video>` element embeds video media directly into the webpage with hardware-accelerated playback.

```html
<video 
  controls 
  width="800" 
  height="450" 
  poster="/images/keynote-thumbnail.webp" 
  preload="metadata"
>
  <!-- Modern high-compression format -->
  <source src="/videos/keynote-2026.webm" type="video/webm">

  <!-- Fallback standard format -->
  <source src="/videos/keynote-2026.mp4" type="video/mp4">

  <!-- Accessibility subtitles track -->
  <track 
    kind="subtitles" 
    src="/captions/en-subtitles.vtt" 
    srclang="en" 
    label="English Subtitles"
    default
  >

  <p>Your browser does not support HTML5 video streaming.</p>
</video>
```

### Essential `<video>` Attributes
* **`controls`**: Renders the browser's native playback controls (Play, Pause, Volume, Fullscreen, Scrubber).
* **`poster`**: Path to a static thumbnail image displayed before playback begins.
* **`autoplay`**: Starts playing automatically upon page load.
  > **Browser Policy Note**: Modern browsers (Chrome, Safari, Firefox) will block autoplay with sound. Autoplay video **must** be paired with the `muted` attribute (`autoplay muted playsinline`).
* **`loop`**: Automatically restarts video from the beginning upon completion.
* **`preload`**:
  * `"none"`: Does not download video data until user clicks play (conserves server bandwidth).
  * `"metadata"`: Downloads only duration, dimensions, and first frame (recommended default).
  * `"auto"`: Downloads entire video stream immediately upon page load.
* **`playsinline`**: Required on mobile iOS devices to play videos inline on the page rather than forcing fullscreen.

## 2. The `<audio>` Element

The `<audio>` element streams sound files, music tracks, and podcast episodes.

```html
<audio controls preload="metadata">
  <source src="/podcasts/episode-42.mp3" type="audio/mpeg">
  <source src="/podcasts/episode-42.ogg" type="audio/ogg">
  <p>Your browser does not support HTML5 audio playback.</p>
</audio>
```

## 3. Subtitles & Captions: The `<track>` Element

Accessibility and internationalization require subtitles and closed captions for audio and video content. The `<track>` void tag loads a **WebVTT** (`.vtt`) file:

```html
<track 
  kind="captions" 
  src="/captions/en-captions.vtt" 
  srclang="en" 
  label="English Captions"
>
```

### `kind` Attribute Options:
* `"subtitles"`: Translations of dialogue for viewers who understand another language.
* `"captions"`: Transcription of dialogue, sound effects, and musical cues for deaf/hard-of-hearing users.
* `"descriptions"`: Audio descriptions of visual video scenes.
* `"chapters"`: Chapter markers allowing users to skip to specific timestamps.

## WebVTT File Format Anatomy (`.vtt`)

```text
WEBVTT

00:00:00.000 --> 00:00:03.500
Welcome to The Product Engineer Architecture series.

00:00:03.500 --> 00:00:07.200
Today we examine distributed caching using Redis.
```
