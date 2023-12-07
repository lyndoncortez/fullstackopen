sequenceDiagram
    participant User
    participant Browser
    participant Server

    User->>Browser: Open https://studies.cs.helsinki.fi/exampleapp/notes
    Browser->>Server: Request page
    Server-->>Browser: Respond with page HTML

    User->>Browser: Write something in text field
    User->>Browser: Click Save button
    Browser->>Server: Save note request

    alt Validation and Saving
        Server-->>Browser: Validate and save note
        Browser-->>User: Display success message
    else Error Handling
        Server-->>Browser: Handle validation error
        Browser-->>User: Display error message
    end
