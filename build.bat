echo off;
npm init
cd NodeJs;
node.exe $ npm install glup;
node.exe %~dp0build.js;
pause