# MeowSitters platform
I've started this project around 2019/2020, but since I've faced some 'difficulties' to publish it formally and to avoid privacy concerns, I will turn into a portfolio project. 
The main idea here was a platform for people who works with Cat Sitting market since they don't have a specific app for manage their clients, schedules, etc (there are generic apps for Sitting, but not for Cats :))

# Some screens
![Architecture](imgs/screen1.png?raw=true "screen1") ![Architecture](imgs/screen2.png?raw=true "screen2")
![Architecture](imgs/screen3.png?raw=true "screen3") ![Architecture](imgs/screen4.png?raw=true "screen4")
![Architecture](imgs/screen5.png?raw=true "screen5")

# Features
- Backend used Firebase (storage and authentication);
- Allow to sign up/sign in the platform;
- Sitter and Client roles have different tabs/menus;
- Clients can schedule their dates for the cat sitting through a calendar, register their cats and more;
- Sitters can manage those schedules according to states, create employees if they desire and more;

# Considerations
- This project doesn't use any 'fancy' architecture or even other principles of clean code (don't judge!);
- There are a minimal folder organization separating each app concern;
- Originally there was an infrastructure for IAP/AdMobo but they were removed from this repo;
- I've also removed the firebase.service implementation because it was too ugly and it wasn't in the final version;

# Other stuff
- Some icons were generated using the old cordova-res tool;
- The graphics and arts were not made by me and they are not under this git repo;
- There are several bugs regarding the platform and since I'll not publish it, they won't be fixed so this is not working 100%;