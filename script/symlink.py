import os

def symlink_file(source, destination):
    print(f"Symlinking ${source} to ${destination}")
    if os.path.exists(destination):
        os.remove(destination)
    os.symlink(source, destination)

def symlink_files():
    links = [
        ("glazewm/config.yaml", f"{os.path.expanduser("~")}/.glzr/glazewm/config.yaml")
    ]
    for source, destination in links:
        symlink_file(f"{os.getcwd()}/config/{source}", destination)