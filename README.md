# Movie list app

### How to run
1. ensure postgres url is correct at `.env` file. You can configure with your own postgres server with correct database name.
2. install dependencies - `npm ci`
3. Run migrations - `npx run prisma dev`. This ensures the databse and tables are created with correct attributes.
3. start on local port 8080 - `npm run dev`

### Testing via postman
[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/2189281-822dbade-a6a3-41fe-b04f-55180f19a292?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D2189281-822dbade-a6a3-41fe-b04f-55180f19a292%26entityType%3Dcollection%26workspaceId%3D0f941ae8-bd83-4cbe-9e00-4df5d37b272f)

### Run local UI
Head on to `http://localhost:8080` and try it out.