import { Task } from "./task.js";
import colors from 'colors';

export class Tasks {

    _list = {};

    get listArray() {
        const list = [];
        Object.keys(this._list).forEach(key => {
            list.push(this._list[key]);
        })
        return list;
    }

    construct() {
        this._list = {};
    }

    deleteTask(id = '') {
        if (this._list[id]) {
            delete this._list[id];
        }
    }

    loadTasksFromArray(tasks_arr = []) {
        tasks_arr.forEach(task => {
            this._list[task.id] = task;
        });
    }

    createTask(desc = '') {
        const task = new Task(desc);
        this._list[task.id] = task;
    }

    writeTasks() {
        console.log('\n');
        this.listArray.forEach((task, i) => {
            console.log(`${(i + 1 + '').blue}. ${task.desc} :: ${task.completedAt != null && task.completedAt ? 'Completed'.green : 'Pending'.red}`);
        });
    }

    writePendingCompletedTasks(completed = false) {
        console.log('\n');
        this.listArray.filter((task) => {
            const isComplete = task.completedAt != null && task.completedAt;
            return (isComplete && completed) || (!completed && !isComplete);
        }).forEach((task, i) => {
            console.log(`${(i + 1 + '').blue}. ${task.desc} :: ${task.completedAt != null && task.completedAt ? ('Completed at ' + task.completedAt).green : 'Pending'.red}`);
        });
    }

    toggleTasksAsCompleted(ids = []) {
        ids.forEach((id) => {
            const task = this._list[id];
            const completed = task.completedAt !== null;
            if (!completed) {
                task.completedAt = new Date().toISOString();
            }
        });
        this.listArray.forEach((task) => {
            if (!ids.includes(task.id)) {
                this._list[task.id].completedAt = null;
            }
        });
    }





}
