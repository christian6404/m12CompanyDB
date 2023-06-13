const mysql = require('mysql2/promise');
const inquirer = require('inquirer');

async function viewAllEmployees(connection) {
  try {
    const [rows] = await connection.execute('SELECT * FROM employee');
    console.log('All employees:');
    rows.forEach(row => {
      console.log(`${row.id}: ${row.first_name} ${row.last_name} || MANAGER ID = ${row.manager_id} || ROLE ID = ${row.role_id}`);
    });
  } catch (error) {
    console.error(error);
  }
}
async function viewAllDepartments(connection) {
  try{
    const [rows] = await connection.execute('SELECT * FROM department')
    console.log('All Departments:')
    rows.forEach(row => {
      console.log(`DEPARTMENT ID: ${row.id}, ${row.d_name}`)
    });
  } catch(error) {
    console.log(error)
  }
}
async function viewAllRoles(connection) {
  try {
    const [rows] = await connection.execute('SELECT * FROM roles');
    console.log('All roles:');
    rows.forEach(row => {
      console.log(`ID = ${row.id}: ${row.title} $${row.salary} DEPARTMENT ID = ${row.department_id}`);
    });
  } catch (error) {
    console.error(error);
  }
}

async function addARole(connection) {
  try{
    const [row] = await connection.execute('SELECT * FROM roles')
    const roles = row.map(row =>({
      name:row.title,
      value:row.id
      
    }));
  } catch (error) {
    console.log(error)
  }
}

async function updateEmployeeRole(connection) {
  try {
    const [employeeRows] = await connection.execute('SELECT * FROM employee');
    const employees = employeeRows.map(row => ({
      name: `${row.first_name} ${row.last_name}`,
      value: row.id
    }));
    const [roleRows] = await connection.execute('SELECT * FROM roles');
    const roles = roleRows.map(row => ({
      name: row.title,
      value: row.id
    }));

    const { employeeId, roleId } = await inquirer.prompt([
      {
        type: 'list',
        name: 'employeeId',
        message: 'Select an employee:',
        choices: employees
      },
      {
        type: 'list',
        name: 'roleId',
        message: 'Select a new role:',
        choices: roles
      }
    ]);

    const query = 'UPDATE employee SET role_id = ? WHERE id = ?';
    const [result] = await connection.execute(query, [roleId, employeeId]);

    console.log('Employee role updated successfully!');
  } catch (error) {
    console.error('Error:', error);
  }
}

async function addEmployee(connection) {
  try {
    const { id, first_name, last_name, role_id, manager_id } = await inquirer.prompt([
      {
        type: 'input',
        name: 'id',
        message: "Enter the employee's ID:"
      },
      {
        type: 'input',
        name: 'first_name',
        message: "Enter the employee's first name:"
      },
      {
        type: 'input',
        name: 'last_name',
        message: "Enter the employee's last name:"
      },
      {
        type: 'input',
        name: 'role_id',
        message: "Enter the employee's role ID:"
      },
      {
        type: 'input',
        name: 'manager_id',
        message: "Enter the employee's manager ID:"
      }
    ]);

    const query = 'INSERT INTO employee (id, first_name, last_name, role_id, manager_id)';
    const [result] = await connection.execute(query, [id, first_name, last_name, role_id, manager_id]);

    console.log('Employee added successfully!');
  } catch (error) {
    console.error('Error:', error);
  }
}


async function main() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '6404',
    database: 'employee_db'
  });

  try {
    const { action } = await inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
          'View all employees',
          'Add an employee',
          'Update employee roles',
          'View all roles',
          'Add a role',
          'View all departments',
          'Quit'
        ]
      }
    ]);

    switch (action) {
      case 'View all employees':
        await viewAllEmployees(connection);
        break;
      case 'View all roles':
        await viewAllRoles(connection)
        break;
      case 'Add an employee':
        await addEmployee(connection)
        break;
      case 'Update employee roles':
        await updateEmployeeRole(connection)
        break;
      case 'Add a role':
        await addARole(connection)
        break;
      case 'View all departments':
        viewAllDepartments(connection)
        break;
      case 'Quit':
        console.log('Quitting...');
        return;
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    connection.end();
  }


  main();
}


main();