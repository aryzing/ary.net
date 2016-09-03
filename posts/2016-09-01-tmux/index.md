# tmux - Terminal Multiplexer

A great tool for your terminal is `tmux`. It allows you to graphically organize and split your shells, run programs in the background, and even share your shell session with another user.

To get it on Ubuntu use

```sh
sudo apt-get install tmux
```

## Commands and shortcuts

The most common command you will be using is `ctrl-b`. This tells tmux that the next command you are going to type is for tmux, not the shell.

For example, `ctrl-b c` **creates a new window**. You can see the new window at the bottom of your screen.

All your windows are given default names. To **change the default window name**, use `ctrl-b ,`. A prompt asking for a new name will appear. Pressing enter assigns the new name.

To **move between windows**, we can use `ctrl-b n` and `ctrl-b p` for next and previous, respectively.

If you want to see a **list** of all your windows, you can use `ctrl-b w`. You can then use the arrows to select which window you want to switch to, or type the number of the corresponding window.

Each window can be **split into panes** vertically or horizontally. Use `ctrl-b "` and `ctrl-b %` to split horizontally and vertically. Once split, the panes can be resized by **holding down** `ctrl-b` and using the arrows. To move between the panes, use `ctrl-b <arrow>`.



## Resources and links

[YouTube1][1].

[YouTube2][2].

[1]:https://youtu.be/BHhA_ZKjyxo
[2]:https://youtu.be/norO25P7xHg
