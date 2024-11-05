## CS 5520 Mobile Apps -- Fall 2024

### Goals List App

Firestore security rules
```
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    
    // any document, access as long as user 
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
    // for goals, read if owner
    match /goals/{goal}{
      allow read, update, delete: if request.auth != null && request.auth.uid == resource.data.owner;
      allow create: if request.auth != null;
    }
  }
}
```
