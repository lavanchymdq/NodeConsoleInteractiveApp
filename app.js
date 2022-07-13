// const { showMenu, pause } = require('./helpers/messages');
// utilizo import en vez de require debido a que configure "  "type": "module"" en package.json
import { inquirerMenu, listTaskToDelete, pause, readInput, confirm, markAsComplete } from './helpers/inquirer.js';
import colors from 'colors';
import { Tasks } from './models/tasks.js';
import { readDB, saveDB } from './helpers/saveFile.js';
// npm init -y: inicia proyecto, -y crea proyecto por defecto, si -y creamos paso a paso
// npm install inquirer: A collection of common interactive command line user interfaces.

const main = async () => {
    console.clear();
    console.log('Hello world!!'.red);

    const tasks = new Tasks();
    let opt = '';
    const tasksDB = readDB();
    const preloadedTasks = tasksDB ? tasksDB : null;
    tasks.loadTasksFromArray(preloadedTasks);

    do {
        // opt = await showMenu();
        opt = await inquirerMenu();
        switch (opt) {
            case '1':
                const desc = await readInput('Description:');
                tasks.createTask(desc);
                break;
            case '2':
                tasks.writeTasks();
                break;
            case '3':
                tasks.writePendingCompletedTasks(true);
                break;
            case '4':
                tasks.writePendingCompletedTasks();
                break;
            case '5':
                const ids = await markAsComplete(tasks.listArray);
                tasks.toggleTasksAsCompleted(ids);
                break;
            case '6':
                const id = await listTaskToDelete(tasks.listArray);
                if (id !== 0) {
                    const ok = await confirm('Are you sure?');
                    if (ok) tasks.deleteTask(id);
                }
                break;
        }
        // console.log({opt} );
        console.log('\n');
        if (opt !== '0') await pause();
    } while (opt !== '0');

    saveDB(tasks.listArray);
    console.clear();
    // pause();
}

main();