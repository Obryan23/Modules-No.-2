let employees = [];

// Fetch employees from employees.json
async function fetchEmployees() {
  try {
    const response = await fetch('employees.json');

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    employees = data;

    // Organizer: Sort employees by age (ascending)
    employees.sort((a, b) => a.age - b.age);

    // Run all array manipulation tasks
    runArrayTasks(employees);

    // Render sorted employees
    renderEmployees(employees);

  } catch (error) {
    console.error('Error fetching employees:', error);
    document.getElementById('demo').textContent = 'Failed to load employees.';
  }
}

// Render employees in #demo
function renderEmployees(list) {
  const demoDiv = document.getElementById('demo');
  demoDiv.innerHTML = '';

  const ul = document.createElement('ul');

  list.forEach(emp => {
    const li = document.createElement('li');
    li.textContent = `${emp.firstName} ${emp.lastName} - Age: ${emp.age}, Salary: $${emp.salary}`;
    ul.appendChild(li);
  });

  demoDiv.appendChild(ul);
}

// Q1(b) — Array Manipulation Tasks
function runArrayTasks(data) {

  // Mapper: Full names using map() + destructuring
  const fullNames = data.map(({ firstName, lastName }) => `${firstName} ${lastName}`);
  console.log("Full Names:", fullNames);

  // Accountant: Total salary using reduce()
  const totalSalary = data.reduce((sum, emp) => sum + emp.salary, 0);
  document.getElementById('total-salary').textContent = `Total Salary: $${totalSalary}`;

  // Recruiter: Employees earning more than 55,000
  const highEarners = data.filter(emp => emp.salary > 55000);
  console.log("Employees earning more than $55,000:", highEarners);
}

document.addEventListener('DOMContentLoaded', fetchEmployees);



// Q1(c) — Local Persistence
function handleLocalStorage(sortedData) {

  // Convert sorted data to JSON
  const jsonData = JSON.stringify(sortedData);

  // Store in localStorage
  localStorage.setItem('employeesData', jsonData);
  console.log("Data saved to localStorage.");

  // Demonstrate getItem()
  const stored = localStorage.getItem('employeesData');
  console.log("Retrieved from localStorage:", JSON.parse(stored));

  // Demonstrate removeItem()
  localStorage.setItem('tempKey', 'temporary value');
  console.log("tempKey before removal:", localStorage.getItem('tempKey'));

  localStorage.removeItem('tempKey');
  console.log("tempKey after removal:", localStorage.getItem('tempKey')); // should be null

  // Demonstrate clear()
  console.log("To clear ALL localStorage, call: localStorage.clear()");
}

document.addEventListener('DOMContentLoaded', fetchEmployees);
