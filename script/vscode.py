import subprocess

def install_extension(extension_id):
    command = [
        "code",
        "--install-extension",
        extension_id,
        "--force"
    ]
    subprocess.run(command)

def install_vscode_extensions():
    extensions = [
        "ms-python.python"
    ]
    command = [
        "code",
        "--install-extension",
        " ".join(extensions),
        "--force"
    ]
    subprocess.run(command)
