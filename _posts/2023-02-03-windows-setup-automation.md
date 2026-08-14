---
layout: post
title: "How to automate Windows setup and configuration"
date: 2023-02-03 10:00:00 -0500
categories: productivity automation
tags: [productivity, automation, powershell, windows, chocolatey]
author: Shaun Smith
excerpt: "Save time and effort by automating your Windows environment setup with PowerShell and Chocolatey."
---

## What type of user are you?

You knew this day would come eventually. Your last laptop or computer finally gave up the ghost.
Maybe that old hard disk drive span it's last spin. Maybe ~~you spilled coffee over it~~ you'd rather not tell.

It matters not. Now you have the mammoth task of setting up a new environment.

Do you type a few CLI commands and relax, with a coffee, across the room? Or do you spend the next 3 hours racking your brain and scouring the web for downloads, only then to be frantically clicking through installers?

## Why automate setup/configuration?

As software developers, programmers and/or power users, we like our environments setup in a particular way. Setting up a new computer for example, can be a tedious and time-consuming task, but automating the process can be incredibly beneficial for efficiency. Some of those benefits include:

1. Saves time by automating software installation
2. Ensures a consistent environment
3. Reduces disruptions and downtime
4. Scalable when adding multiple machines or adding new packages to the roster

This post aims to explore that problem and potential solutions.

## How to automate

I'm a Microsoft Windows user, so this guide will focus there. These ideas and general concepts can be applied to other systems though, i.e. bash script on linux?
PowerShell is a pre-installed and very useful tool on Windows and that's the tool we'll mostly be using here.

### 1. Chocolatey for software installation

Big love for [Chocolatey.org](https://chocolatey.org/)! This project simplifies a big chunk of the setup process.

Chocolatey is a package manager manager for Windows that allows you to automate the installation of a lot of software packages.

Firstly, we need to install Chocolatey using an Administrator PowerShell:

```bash
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
```

Installing applications is then a trivial task of calling the `choco install` function.

```bash
choco install 'Application.Package.Name' -y
```

(The `-y` is to select default for all installation questions / i.e. silent install).

I created a simple pipeline function so I could install multiple packages from a JSON config file.

#### PowerShell
```bash
function Install-ChocoPackage {
    [CmdletBinding()]
    param (
        [Parameter(ValueFromPipeline)]
    	[string] $pkgName
    )
    process {
        Write-Verbose "Installing $pkgName"
        choco install $pkgName -y
    }
}
```

#### JSON
```json
"Packages": [
    "googlechrome",
    "notepadplusplus.install",
    "git.install",
]
```

#### Usage
```
# Get configuration
$configContent = Get-Content $fullPathToConfigFile
$configObj = $configContent | ConvertFrom-Json

# Install packages
$configObj.Packages | Install-ChocoPackage
```

### 2. Settings and preferences

After that, configure various OS preferences, this avoids hunting through settings menus and clicking around.

**Power Settings**

```bash
## set some values on the power plan
Write-Verbose 'Setting AC Options..'
powercfg /Change monitor-timeout-ac 10
powercfg /Change hibernate-timeout-ac 30
powercfg /Change standby-timeout-ac 30

Write-Verbose 'Setting DC Options..'
powercfg /Change monitor-timeout-dc 10
powercfg /Change hibernate-timeout-dc 30
powercfg /Change standby-timeout-dc 30
```

And of course the most important, **Dark Mode**

```bash
# enable dark mode
Set-ItemProperty -Path HKCU:\SOFTWARE\Microsoft\Windows\CurrentVersion\Themes\Personalize -Name AppsUseLightTheme -Value 0
```

<!-- **Taskbar and Start Menu**

I'm still looking into configuring the start menu. There's an export method but importing seems to require group policy which is unfortunate! Grumbles. -->

### 3. Development Folders

I also like to shift my development code to a secondary hard drive and giving it a cute icon.
This means creating several folders and that's where I'll store all my Git repos, test code when messing around and third party Git repos I might download.

To achieve this, we can use the standard `New-Item` in PowerShell, but to create a custom icon, we need to manually update the desktop.ini file

```bash
New-Item -ItemType Directory -Force -Path "D:\Source"
New-Item -ItemType Directory -Force -Path "D:\TestSource"
New-Item -ItemType Directory -Force -Path "D:\ThirdPartySource"

$DesktopIni = @"
[.ShellClassInfo]
IconResource=C:\AutoInstallAssets\CODE.ico
"@

#Create/Add content to the desktop.ini file
Add-Content "D:\Source\desktop.ini" -Value $DesktopIni
#Set the attributes for $DesktopIni
(Get-Item "D:\Source\desktop.ini" -Force).Attributes = 'Hidden, System, Archive'
#Finally, set the folder's attributes
(Get-Item "D:\Source" -Force).Attributes = 'ReadOnly, Directory'

```

One thing to bear in mind; wherever you store the icon file (.ICO) it must stay there forever, if you delete or move it, the folder will revert back to a folder image.

## Conclusion


Automating the setup processes will save you time and effort and provide a consistent experience.
A little maintenance is a smart investment for these infrequent tasks; if only to avoid the "oh damn! I forgot to install that!" several months into new kit.

Now... back to that coffee.
