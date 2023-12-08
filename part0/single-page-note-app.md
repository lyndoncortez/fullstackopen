sequenceDiagram
    participant User
    participant Browser
    participant SPA

    User->>Browser: Open https://studies.cs.helsinki.fi/exampleapp/spa
    Browser->>SPA: Load SPA application
    SPA->>SPA: Initialize SPA components

    User->>SPA: Interact with SPA interface

    alt Viewing Notes
        User->>SPA: Navigate to Notes section
        SPA->>SPA: Fetch notes data
        SPA-->>User: Display notes
    else Creating New Note
        User->>SPA: Click on "New Note" button
        SPA-->>User: Display note creation form
        User->>SPA: Enter note details
        User->>SPA: Click Save button
        SPA->>SPA: Validate and save note
        SPA-->>User: Display success message
    end