# Fix: Vite cannot find native Rolldown binding on Windows

This project has been switched to the standard Vite 6 toolchain (without Rolldown) to avoid the native binding that Windows Application Control blocked.

## Clean reinstall (PowerShell)

1. Stop the running dev server with `Ctrl + C`.
2. Open PowerShell in the folder that contains `package.json`.
3. Run these commands one at a time:

```powershell
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item -Force package-lock.json -ErrorAction SilentlyContinue
npm cache verify
npm install
npm run dev
```

Open the local URL printed by Vite (normally `http://localhost:5173`).

## If Windows still blocks a native file

The original error specifically says Application Control blocked a `.node` file. The updated Vite setup avoids Rolldown, but if your organization/device policy blocks other native dependencies, do not try to bypass that policy. Ask your IT administrator to approve the required development tools, or run the project in an approved development environment.

## Production build

After dependencies install successfully, run:

```powershell
npm run build
npm run preview
```
