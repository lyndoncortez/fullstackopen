sequenceDiagram
    participant User
    participant Browser
    participant SPA

    User->>Browser: Open https://studies.cs.helsinki.fi/exampleapp/spa
    Browser->>SPA: Load SPA application
    SPA->>SPA: Initialize SPA components
