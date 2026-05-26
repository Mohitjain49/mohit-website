// mysh - a simple Unix shell

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <sys/types.h>
#include <sys/wait.h>
#include <fcntl.h>
#include <signal.h>
#include <stdbool.h>

int main(void) {
    char line[1024];
    char *result;

    char *args[64];
    int arg_count;

    while(true) {
        printf("mysh> ");
        fflush(stdout);
        result = fgets(line, sizeof(line), stdin);

        if(result == NULL) {
            printf("\n");
            break;
        } else {
            // This section records and parses the user input command.
            char *newline = strchr(line, '\n');
            if(newline) { *newline = '\0'; }

            arg_count = 0;
            args[arg_count] = strtok(line, " ");

            while (args[arg_count] != NULL) {
                arg_count++;
                args[arg_count] = strtok(NULL, " ");
            }

            if(arg_count == 0) { continue; }
            for(int i = 0; i < arg_count; i++) {
                printf("Token %d: %s\n", i, args[i]);
            }

            // This section handles the Built-In "cd" command.
            if(strcmp(args[0], "cd") == 0) {
                if(args[1] == NULL) {
                    chdir(getenv("HOME"));
                } else {
                    int cd_result = chdir(args[1]);
                    if(cd_result == -1) { perror("cd failed"); }
                }
                continue;
            }

            // This section handles the Built-In "ext" command.
            if(strcmp(args[0], "exit") == 0) { exit(0); }

            // This section checks for input redirection, output redirection, or piping.
            char *filename;
            int redirect_cmd = 0;

            char **pipe_left = NULL;
            char **pipe_right = NULL;

            for(int i = 0; i < arg_count; i++) {
                if(strcmp(args[i], ">") == 0) {
                    filename = args[i + 1];
                    redirect_cmd = 1;
                    args[i] = NULL;
                    break;
                } else if (strcmp(args[i], "<") == 0) {
                    filename = args[i + 1];
                    redirect_cmd = 2;
                    args[i] = NULL;
                    break;
                } else if (strcmp(args[i], "|") == 0) {
                    redirect_cmd = 3;
                    args[i] = NULL;

                    pipe_left = args;
                    pipe_right = &args[i + 1];
                    break;
                }
            }

            // This section runs if a pipe is detected.
            if(redirect_cmd == 3) {
                int pipefd[2];
                pid_t pid1, pid2;

                if (pipe(pipefd) == -1) {
                    perror("pipe");
                    exit(1);
                }

                // Fork Firct child.
                pid1 = fork();
                if (pid1 == 0) {
                    dup2(pipefd[1], STDOUT_FILENO);
                    close(pipefd[0]);
                    close(pipefd[1]);

                    execvp(pipe_left[0], pipe_left);
                    perror("execvp left");
                    exit(1);
                } else if(pid1 < 0) {
                    perror("fork failed");
                }

                // Fork Second child.
                pid2 = fork();
                if (pid2 == 0) {
                    dup2(pipefd[0], STDIN_FILENO);
                    close(pipefd[0]);
                    close(pipefd[1]);

                    execvp(pipe_right[0], pipe_right);
                    perror("execvp right");
                    exit(1);
                } else if(pid2 < 0) {
                    perror("fork failed");
                }

                // This is the parent cleanup section in the pipe process.
                close(pipefd[0]);
                close(pipefd[1]);

                waitpid(pid1, NULL, 0);
                waitpid(pid2, NULL, 0);
                continue; // Continues here to prevent the normal fork from running.
            }

            // This normal fork here is ran if a pipe is not detected. It accounts for input redirection and output redirection.
            pid_t pid = fork();
            if(pid == 0) {
                if(redirect_cmd == 1) {
                    int fd = open(filename, O_WRONLY | O_CREAT | O_TRUNC, 0644);
                    if(fd == -1) {
                        perror("execvp failed");
                        exit(1);
                    }

                    dup2(fd, STDOUT_FILENO);
                    close(fd);
                } else if(redirect_cmd == 2) {
                    int fd = open(filename, O_RDONLY);
                    if(fd == -1) {
                        perror("execvp failed");
                        exit(1);
                    }

                    dup2(fd, STDIN_FILENO);
                    close(fd);
                }

                execvp(args[0], args);
                perror("execvp failed");
                exit(1);
            } else if(pid > 0) {
                waitpid(pid, NULL, 0);
            } else {
                perror("fork failed");
            }
        }
    }
    return 0;
}