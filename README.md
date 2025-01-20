# Social-Network-API
MongoDB based API for a social network like site.

The API utilizes express and MongoDB to create the back-end of a social networking site complete with POST, PUT, and DELETE routes for users and thoughts(posts). All users can be connected with other users as friends and can send reactions to thoughts(posts).

### Database Schema


| **Model**       | **Field**         | **Data Type**     | **Constraints/Details**                                                      | 
|------------------|-------------------|-------------------|------------------------------------------------------------------------------|
| **User**         | `username`       | String            | Unique, Required, Trimmed                                                   |
|                  | `email`          | String            | Required, Unique, Must match a valid email address (use matching validation)|
|                  | `thoughts`       | Array of `_id`    | References the `Thought` model                                              |
|                  | `friends`        | Array of `_id`    | Self-reference to the `User` model                                          |
| *Schema Setting* | `friendCount`   | Virtual           | Retrieves the length of the `friends` array on query                        | 
| **Thought**      | `thoughtText`    | String            | Required, Must be between 1 and 280 characters                              |
|                  | `createdAt`      | Date              | Default value: current timestamp, Getter to format timestamp on query       |
|                  | `username`       | String            | Required (The user who created this thought)                                |
|                  | `reactions`      | Array of documents| Nested documents created using `reactionSchema`                             |
| *Schema Setting* | `reactionCount` | Virtual           | Retrieves the length of the `reactions` array on query                      | 
| **Reaction**     | `reactionId`     | ObjectId          | Default value: new ObjectId                                                 | 
|                  | `reactionBody`   | String            | Required, Maximum of 280 characters                                         |
|                  | `username`       | String            | Required                                                                    |
|                  | `createdAt`      | Date              | Default value: current timestamp, Getter to format timestamp on query       |
| *Schema Setting* | `reaction`     | Subdocument Schema| Used as the `reaction` field’s subdocument schema in the `Thought` model    |
