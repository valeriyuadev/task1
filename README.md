# valeriyuadev-NODEJS2021Q2
Private repository for @valeriyuadev

Cli tool - Caesar cipher
------------------------

This is a command line tool. It encript/decript a text with cipher of Carsar.
Application can encript/decript only letters of the latin alphabet, an
example:
* letters from A to Z
* letters from a to z
* together A-Z and a-z
All other character ramain unchanged.

## Installation - how to
You should perform the followong steps:
1 - Download source from repository
2 - Go to application folder
3 - In application folder, run the command line
4 - Enter the command "npm i" or "npm install" 
5 - Wait for dependency installation finish

## Use - how to
To start the application, in the folder of application, enter into command line:
node caesar-code [options]
Where [options] are command line parameters(aliases) for settings, operations 
of the application an example:
```
--------------------------------------------
-a, --action    : an action encode or decode
-s, --shift     : a shift integer
-i, --input     : an input file name
-o, --output    : an output file name
--------------------------------------------
```

**action** - can take values of **encode** or **decode**, the source text will be: **encript** or **decript**.

**shift** - option must be positive or negative integer.

**action** and **shift** options are require, if one of them absent, then will be an error.

Options **input**, **output** can be absent, hten reading or/and writing will be carried out from/to **command line**.
To interrup this process, press **CTRL + c**.

## Example of usage

### Encryption with shorthands of the options

```
?> node caesar-code -a encode -s -11 -i="in.txt" -o="out.txt"
```

Before
>in.txt
>`Hello, World!`
>out.txt
>"empty"

### Decription with full name of options
```
node caesar-code --action decode --shift -11 --input "out.txt" --output "in.txt"
```

Before
>in.txt
>`Hello, World!`
>out.txt
>"wTaad, LdgaS!"

After
>in.txt
>`Hello, World!Hello, World!`
>out.txt
>"wTaad, LdgaS!"