from os import listdir, mkdir
from os.path import isfile, join

mypath = "/home/andres/Downloads/GitClones/wb-andrade-rodas-canchas/canchas/src"
list_contents = listdir(mypath)
onlyfiles = [f for f in list_contents if isfile(join(mypath, f))]
for file_item in onlyfiles:
    list_contents.remove(file_item)

for directory in list_contents:
    full_path = join(mypath, directory)
    list_new_files = [
        join(full_path, directory + ".entity.ts"),
        join(full_path, directory + ".module.ts"),
        join(full_path, directory + ".service.ts"),
    ]
    for create_file in list_new_files:
        with open(create_file, "w+") as new_file:
            new_file.write("")
    # mkdir(join(full_path, "dto"))
    sub_files = [
        join(full_path, "dto", directory) + ".create.ts",
        join(full_path, "dto", directory) + ".update.ts",
    ]

    for create_sub_file in sub_files:
        with open(create_sub_file, "w+") as new_file:
            new_file.write("")
