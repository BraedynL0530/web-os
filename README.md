# NebulaOS 

(NebulaOS)[https://web-os-hh4f.vercel.app/boot] is a web-based operating system designed to mimic a customized ("riced") Linux environment. It features draggable applications, a notification menu, a local media player, and a system settings flyout/dropdown.

## Core Features

* **Linux-Inspired UI**: A minimalist aesthetic modeled after custom Linux desktop configurations.
* **Window Management**: Draggable and floating web application windows.
* **Desktop Widgets**: Integrated system clock and live weather modules.
* **Notification Center**: A drop-down panel displaying mock system notifications.
* **Media Player**: An internal audio stream application for user-provided music.
* **Application Launcher**: A bottom-docked search bar used to find and initialize system applications.
* **System Settings**: A configuration panel for changing desktop background wallpapers and managing user profiles.

## Technical Limitations & Known Issues

### Media Server Latency
* **Symptom**: Music files or streaming media assets exhibit high load times before playback begins.
* **Cause**: High file sizes or response delays from the host media server.

### Weather Data Failures
* **Symptom**: The weather widget fails to render or displays missing data fields.
* **Cause**: Upstream API rate limits or client-side privacy tools (such as script blockers and tracking protection) preventing data retrieval.
