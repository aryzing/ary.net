# Custom shell scripts

## Know where to write your scripts

Before creating shell scrits, it is important to know where they are going to be written. It is important because different shells read different files.

The two types of shells are *login* shells and *interactive* shells. A login shell just means that you had to type your credentails to gain access to it. An interactive shell is one where you can write commands to and typically displays a prompt.

These two types are not mutually exclusive. For example, pressing `ctrl-alt-<F1 ... F7>` in Ubuntu takes you to a virtual login, interactive shell. However, the Gnome Terminal in Ubuntu accessed through its icon or with `ctrl-alt-t` is a non-login, interactive shell.

The Gnome Terminal, when invoked as a non-login, interactive shell, reads `~/.bashrc` before startup. The interactive consoles read `~/.profile`.

## Custom commands

Custom commands are useful to navigate quicker or execute long and hard to type commands. Two examples of such commands are

```sh
alias notes='cd ~/workspace/notes'
```

and

```sh
mkcdir() {
  mkdir -p -- "$1" && cd -P -- "$1"
}
```

The first one takes me straight to my notes directory no matter where I am. The second creates a directory (including missing parent directories) and `cd`s into it.

## Conclusion

Know where to write your scripts, and start saving time and keystrokes!

## Resources and links

[StackOverflow][1].

[1]: http://stackoverflow.com/questions/415403/whats-the-difference-between-bashrc-bash-profile-and-environment
