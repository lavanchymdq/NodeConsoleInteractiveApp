
import inquirer from 'inquirer';
import colors from 'colors';

const menuOpt = [
    {
        type: 'list',
        name: 'option',
        message: 'What do you want to do?'.yellow,
        loop: false,
        choices: [
            {
                value: '1',
                name: `${'1.'.green} Create a task`,
            },
            {
                value: '2',
                name: `${'2.'.green} List tasks`,
            },
            {
                value: '3',
                name: `${'3.'.green} List completed tasks`,
            },
            {
                value: '4',
                name: `${'4.'.green} List pending tasks`,
            },
            {
                value: '5',
                name: `${'5.'.green} Complete task(s)`,
            },
            {
                value: '6',
                name: `${'6.'.green} Delete task`,
            },
            {
                value: '0',
                name: `${'0.'.green} Exit \n`,
            }

        ]
    }
];

const inquirerMenu = async () => {
    console.clear();
    console.log('==================================='.green);
    console.log('Select an option'.white);
    console.log('===================================\n'.green);

    const { option } = await inquirer.prompt(menuOpt);
    return option;
}

const pause = async () => {

    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Press ${'ENTER'.blue} to continue... `,
        }
    ];

    await inquirer.prompt(question);

}

const readInput = async (message) => {

    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value) {
                if (value.length === 0) {
                    return 'Please enter a value';
                }
                return true;
            }
        }
    ];

    const { desc } = await inquirer.prompt(question);
    return desc;

}

const listTaskToDelete = async (tasks = []) => {
    const choices = tasks.map((task, i) => {
        return {
            value: task.id,
            name: `${((i + 1) + '.').green} ${task.desc}`,
        };
    });
    choices.unshift({
        value: 0,
        name: '0.'.green + ' Cancel'
    });
    const menuOpt = [
        {
            type: 'list',
            name: 'option',
            message: 'Which task do you want to delete?'.yellow,
            loop: false,
            choices
        }
    ];

    console.clear();
    console.log('==================================='.green);
    console.log('Choose the task to delete'.white);
    console.log('===================================\n'.green);

    const { option } = await inquirer.prompt(menuOpt);
    return option;
}

const confirm = async (message) => {
    const menuOpt = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];
    const { ok } = await inquirer.prompt(menuOpt);
    return ok;
}

const markAsComplete = async (tasks) => {
    const choices = tasks.map((task, i) => {
        return {
            value: task.id,
            name: `${((i + 1) + '.').green} ${task.desc}`,
            checked: task.completedAt !== null
        };
    });
    const menuOpt = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Select the tasks to complete'.yellow,
            loop: false,
            choices
        }
    ];

    console.clear();
    console.log('==================================='.green);
    console.log('Choose the task to complete'.white);
    console.log('===================================\n'.green);

    const { ids } = await inquirer.prompt(menuOpt);
    return ids;
}

// utilizo export en vez de module.export debido a que configure "  "type": "module"" en package.json
// module.exports = {
//     inquirerMenu
// }
export { inquirerMenu, pause, readInput, listTaskToDelete, confirm, markAsComplete };