import shutil
import subprocess

def install_scoop():
    if shutil.which("scoop") is None:
        print("Installing scoop...")
        command = """
        Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
        Invoke-RestMethod -Uri https://get.scoop.sh | Invoke-Expression
        """
        subprocess.run(["powershell", "-NoProfile", "-ExecutionPolicy", "Bypass", "-Command", command], check=True)
    else:
        print("Found scoop, skipping installation.")