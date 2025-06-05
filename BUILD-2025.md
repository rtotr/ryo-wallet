# Ryo Build Notes 2025

The following notes are for setting up the development environment and may not be completely up to date.

The latest versions of build scripts are always in the [.github/workflows/](.github/workflows/) folder.

## Ryo Wallet - Ubuntu

Install NVM: <https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating>.

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
```

Install pyenv and python 3.10 (there is a bug in 3.11+ that produce an error during npm install):

```bash
curl -fsSL https://pyenv.run | bash
# do not forget to modify ~/.bashrc as described in the output of the above command
```

Restart ssh/terminal.

```bash
pyenv install 3.10
pyenv global 3.10
python --version
sudo apt install build-essential zlib1g-dev libffi-dev libssl-dev libbz2-dev libreadline-dev libsqlite3-dev liblzma-dev libncurses-dev tk-dev
nvm install 12.22.12
# npm install -g @quasar/cli # This command installs the latest version, but the windows instruction uses quasar-cli. After all, it doesn't need to be installed globally at all, a dev dependency is enough.
git config --global url.https://github.com/.insteadOf git://github.com/
cd ~ && git clone --branch dev-github-actions https://github.com/rtotr/ryo-wallet
# change the path to the ryo core binaries in the following two commands as needed
cp ~/ryo-currency/build/release/bin/ryo-wallet-rpc ~/ryo-wallet/bin
cp ~/ryo-currency/build/release/bin/ryod ~/ryo-wallet/bin
cd ryo-wallet
nvm use 12.22.12
pyenv local 3.10
# npm config set unsafe-perm true
npm install
# npm run rebuild is important, without it there is nasty error about better-sqlite3 during electron packaging
npm run rebuild
npm run build
```

## Ryo Wallet - Windows

- Clean Windows 11 installation
- Launch PowerShell as admin and execute

  ```powershell
  Set-ExecutionPolicy RemoteSigned
  mkdir C:\dev
  Add-MpPreference -ExclusionPath "C:\dev"
  exit
  ```

- Install Visual Studio 2017 Build Tools
  <https://aka.ms/vs/15/release/vs_buildtools.exe>

  ```powershell
  vs_buildtools.exe --passive --wait --norestart --add Microsoft.VisualStudio.Workload.MSBuildTools;includeRecommended --add Microsoft.VisualStudio.Workload.VCTools;includeRecommended --add Microsoft.VisualStudio.Component.VC.140
  ```

  **Note:** You can proceed with the rest of the steps while installing the Visual Studio build tools.

- Install git

  ```powershell
  winget install --id Git.Git -e --source winget
  exit
  ```

  Reopen terminal.

  ```powershell
  cd C:\dev
  git config --global url.https://github.com/.insteadOf git://github.com/
  git clone --branch dev-github-actions https://github.com/rtotr/ryo-wallet.git
  ```

- Install latest nvm-windows
  <https://github.com/coreybutler/nvm-windows/releases>
  Run following commands in cmd, not in PowerShell:

  ```cmd
  nvm install v12.22.12
  nvm use 12.22.12
  ```

  **Note:** nvm-windows 1.2.2 has a bug when installing older nodejs. Issue <https://github.com/coreybutler/nvm-windows/issues/1209#issuecomment-2744137285>
  My workaround:
  - Uninstall nvm-windows
  - Install old node <https://nodejs.org/dist/v12.22.12/node-v12.22.12-x64.msi>
  - Copy installed files to temp folder
  - Uninstall old node
  - Install nvm-windows
  - Copy temp folder files to `C:\Users\<user>\AppData\Local\nvm\v12.22.12`
  - `nvm list`
  - `nvm use 12.22.12`

- Install pyenv-win
  <https://github.com/pyenv-win/pyenv-win>

  ```powershell
  Invoke-WebRequest -UseBasicParsing -Uri "https://raw.githubusercontent.com/pyenv-win/pyenv-win/master/pyenv-win/install-pyenv-win.ps1" -OutFile "./install-pyenv-win.ps1"; &"./install-pyenv-win.ps1"
  ```

  Reopen PowerShell

  ```powershell
  pyenv install 2.7.8
  cd C:\dev\ryo-wallet
  pyenv local 2.7.8
  ```

- Download latest ryo windows binaries from
  <https://github.com/ryo-currency/ryo-currency/releases>
  Copy **ryod.exe** and **ryo-wallet-rpc.exe** into C:\dev\ryo-wallet\bin
  **Note:** You may need to explicitly allow these files in Windows virus & threat protection.

- Install dependencies and build project

  ```powershell
  npm install
  npm run rebuild
  npm run build
  ```
