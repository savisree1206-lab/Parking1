@echo off
echo Setting up Git for Parking Management System...
echo.

echo Step 1: Adding the new guide to Git...
git add GIT_SETUP_GUIDE.md
git add setup_git.bat

echo Step 2: Committing all changes...
git commit -m "Complete parking management system with professional UI"

echo Step 3: Checking current status...
git status

echo.
echo ========================================
echo Git setup completed successfully!
echo ========================================
echo.
echo Next steps:
echo 1. Go to https://github.com and create a new repository
echo 2. Name it: parking-management-system
echo 3. Don't initialize with README
echo 4. Copy the remote URL and run:
echo    git remote add origin YOUR_GITHUB_URL
echo    git push -u origin main
echo.
echo For detailed instructions, see GIT_SETUP_GUIDE.md
echo.
pause
