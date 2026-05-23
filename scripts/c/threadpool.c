// threadpool - a concurrent work queue

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <pthread.h>

typedef struct task_node {
    char task[1024];
    struct task_node *next;
} task_node_t;

typedef struct {
    task_node_t *head;
    task_node_t *tail;
    int done;
    pthread_mutex_t mutex;
    pthread_cond_t cond;
} task_queue_t;

task_queue_t queue = { .head = NULL, .tail = NULL, .done = 0 };

// This hash function takes a string and returns a long unsigned integer
unsigned long djb2_hash(const char *str) {
    unsigned long hash = 5381;
    int c;
    while ((c = *str++))
    hash = ((hash << 5) + hash) + c;
    return hash;
}

// This function takes a task, sleeps to stimulate work, computes a hash, then prints the result.
void process_task(const char *task) {
    usleep(100000);
    unsigned long hash = djb2_hash(task);
    printf("%lu %s\n", hash, task);
    fflush(stdout);
}

// This function creates a new task node and adds it to the tail of the linked list of all the task nodes.
void push_task(task_queue_t *q, const char *task) {
    task_node_t *node = malloc(sizeof(task_node_t));
    strcpy(node->task, task);
    node->next = NULL;

    if (q->tail) {
        q->tail->next = node;
        q->tail = node;
    } else {
        q->head = node;
        q->tail = node;
    }
}

// This function takes the task node at the head of the linked list of all the task nodes.
int pop_task(task_queue_t *q, char *buf) {
    if (q->head == NULL) return 0;
    task_node_t *node = q->head;
    strcpy(buf, node->task);
    q->head = node->next;
    if (q->head == NULL) q->tail = NULL;
    free(node);
    return 1;
}

// This function takes a void* argument and returns void*.
void *worker(void *arg) {
    char buffer[1024];
    while(1) {
        pthread_mutex_lock(&queue.mutex);

        while(queue.head == NULL && !queue.done) {
            pthread_cond_wait(&queue.cond, &queue.mutex);
        }

        int got_task = pop_task(&queue, buffer);
        int is_done = queue.done;
        pthread_mutex_unlock(&queue.mutex);

        if(got_task == 1) {
            process_task(buffer);
        } else if(is_done == 1) {
            return NULL;
        }
    }
}

// This main function is where the code for the tasks exists.
int main(int argc, char *argv[]) {
    if(argc < 2 || argv[1] == NULL) { return 1; }

    int thread_count = atoi(argv[1]);
    char buffer[1024];

    pthread_t thread_handles[thread_count];
    int worker_ids[thread_count];

    pthread_mutex_init(&queue.mutex, NULL);
    pthread_cond_init(&queue.cond, NULL);

    for(size_t i = 0; i < thread_count; i++) {
        pthread_create(&thread_handles[i], NULL, worker, &worker_ids[i]);
    }

    // This while loop takes the string input and makes a task out of each line in the string.
    while (fgets(buffer, sizeof(buffer), stdin) != NULL) {
        char *newline = strchr(buffer, '\n');
        if(newline) { *newline = '\0'; }
        if(buffer[0] == '\0') { continue; }

        push_task(&queue, buffer);
        pthread_cond_signal(&queue.cond);
    }
    
    pthread_mutex_lock(&queue.mutex);
    queue.done = 1;
    pthread_cond_broadcast(&queue.cond);
    pthread_mutex_unlock(&queue.mutex);

    for(size_t i = 0; i < thread_count; i++) {
        pthread_join(thread_handles[i], NULL);
    }
    return 0;
}