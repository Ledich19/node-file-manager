# Node.js file manager

>`path_to_destination` directory can be relative or absolute
>
>`path_to_directory` can be relative or absolute
>
>`path_to_file` can be relative or absolute

### Navigation & working directory

`up` Go upper from current directory

`cd path_to_directory` Go to dedicated folder from current directory

### Basic operations with files

`cat path_to_file` Read file and print it's content in console :
`add new_file_name` Create empty file in current working directory:
`rn path_to_file new_filename` Rename file :
`cp path_to_file path_to_new_directory` Copy file:
`mv path_to_file path_to_new_directory` Move file:
`rm path_to_file` Delete file:

### Operating system info (prints following information in console)

`os --EOL` Get EOL and print it to console:
`os --cpus` Get host machine CPUs info and print it to console:
`os --homedir` Get home directory and print it to console:
`os --username` Get current system user name and print it to console:
`os --architecture` Get CPU architecture for which Node.js binary has compiled and print it to console:

### Hash calculation

`hash path_to_file`Calculate hash for file and print it into console

### Compress and decompress operations

`compress path_to_file path_to_destination` Compress file (using Brotli algorithm)
`decompress path_to_file path_to_destination` Decompress file (using Brotli algorithm)

<details>
<summary>## Commands for test</summary>

cd C:\Users\Aleksandr\forTests
cd C:\Users\Aleksandr
cd .\forTests

cat ./test-folder/test-file.txt
add test-file-new.txt
rn ./test-file-new.txt test-file-rename.txt
cp ./test-file-rename.txt ./test-folder
mv ./test-file-rename.txt ./test-folder
rm ./test-folder/test-file-rename.txt

os --EOL
os --cpus
os --homedir
os --username
os --architecture

hash .test-folder/test-file.txt

compress ./test-folder/test-file.txt ./test-folder
decompress ./test-folder/test-file.txt.br ./test-folder

</details>
