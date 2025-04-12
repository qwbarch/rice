from script.scoop import *
from script.symlink import *
import ctypes

if __name__ == "__main__":
    if ctypes.windll.shell32.IsUserAnAdmin() == 0:
        print("This script requires administrator privileges to run.")
        exit(-1)
    install_scoop()
    symlink_files()