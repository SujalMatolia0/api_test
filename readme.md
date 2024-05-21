## Sign in

**Endpoint:** /api/v1/auth/signin

json
// Body
{
   "email": "mohitxskull@gmail.com",
   "password": "sujal"
}


```json
// Response Body
{
   "token": "" // Opaque token
}


## Sign up

*Endpoint:* /api/v1/auth/signup

json
// Body
{
   "email": "mohitxskull@gmail.com",
   "password": "sujal",
   "name": "Mohit"
}


json
// Response Body
{
   "message": "Logged in"
}


## Sign out

*Endpoint:* /api/v1/auth/signout

json
// Response Body
{
   "message": "Logged out"
}


## Get user info

*Endpoint:* /api/v1/app/user

json
// Response Body
{
   "email": "mohitxskull@gmail.com",
   "name": "Mohit",
}


## Update user password

*Endpoint:* /api/v1/app/password/update

json
// Body
{
   "old": "sujal",
   "new": "sujal123"
}


json
// Response Body
{
   "message": "Password updated"
}


## List all files and folder

*Endpoint:* /api/v1/app/list

json
// Response Body
{
   "files": [
      {
         "id": "fil_a3dj8293",
         "name": "file1.txt",
         "size": 1024,
         "updatedAt": "2021-09-01T12:00:00Z",
         "createdAt": "2021-09-01T12:00:00Z",
      },
      {
         "id": "fil_3j2j3j2",
         "name": "file2.txt",
         "size": 2048,
         "updatedAt": "2021-09-01T12:00:00Z",
         "createdAt": "2021-09-01T12:00:00Z",
      }
   ],
   "folders": [
      {
         "id": "fol_3j2j3j2",
         "name": "Goat Kingdom",
         "path": "goat-kingdom",
         "updatedAt": "2021-09-01T12:00:00Z",
         "createdAt": "2021-09-01T12:00:00Z",
      },
      {
         "id": "fol_3j2j3j2",
         "name": "Goat Kingdom",
         "path": "goat-kingdom",
         "updatedAt": "2021-09-01T12:00:00Z",
         "createdAt": "2021-09-01T12:00:00Z",
      }
   ]
}


### List all files and folder in a particular folder

*Endpoint:* /api/v1/app/list/[folder id]

json
// Response Body
// Same as above


## Open a particular file

*Endpoint:* /api/v1/app/file/[file id]

json
// Response Body
{
   "id": "fil_a3dj8293",
   "name": "file1.txt",
   "size": 1024,
   "updatedAt": "2021-09-01T12:00:00Z",
   "createdAt": "2021-09-01T12:00:00Z",
   "content": "Hello World"
}


## Update a particular file

*Endpoint:* /api/v1/app/file/[file id]/update

json
// Body
// Any one is required
{
   "name": "file1.txt", // optional
   "content": "Hello World" // optional
}


json
// Response Body
{
   "message": "File updated"
}


## Delete a particular file

*Endpoint:* /api/v1/app/file/[file id]/delete

json
// Response Body
{
   "message": "File deleted"
}


## Create a new file

*Endpoint:* /api/v1/app/file/create

json
// Body
{
   "name": "file1.txt",
   "content": "Hello World"
}


json
// Response Body
{
   "message": "File created"
}


## Create a new folder

*Endpoint:* /api/v1/app/folder/create

json
// Body
{
   "name": "Goat Kingdom"
}


json
// Response Body
{
   "message": "Folder created"
}


## Delete a particular folder

*Endpoint:* /api/v1/app/folder/[folder id]/delete

json
// Response Body
{
   "message": "Folder deleted"
}


## Update a particular folder

*Endpoint:* /api/v1/app/folder/[folder id]/update

json
// Body
{
   "name": "Goat Kingdom"
}


json
// Response Body
{
   "message": "Folder updated"
}


## Move a particular file

*Endpoint:* /api/v1/app/file/[file id]/move

json
// Body
{
   "folderId": "fol_3j2j3j2" // Empty string for root
}


json
// Response Body
{
   "message": "File moved"
}


## Move a particular folder

*Endpoint:* /api/v1/app/folder/[folder id]/move

json
// Body
{
   "folderId": "fol_3j2j3j2" // Empty string for root
}


json
// Response Body
{
   "message": "Folder moved"
}


## Search for files and folders

*Endpoint:* /api/v1/app/search

json
// Body
{
   "query": "file1"
}


json
// Response Body
{
   "files": [
      {
         "id": "fil_a3dj8293",
         "name": "file1.txt",
         "size": 1024,
         "updatedAt": "2021-09-01T12:00:00Z",
         "createdAt": "2021-09-01T12:00:00Z",
      }
   ],
   "folders": []
}

```