$(document).ready(function () {
  $('#employeeTable').DataTable({
    ajax: {
      url: 'MOCK_DATA.json',
      dataSrc: ''
    },
    columns: [
      { data: 'id' },
      { data: 'first_name' },
      { data: 'last_name' },
      { data: 'email' },
      { data: 'department' },
      { data: 'salary' }
    ],
    pageLength: 10,
    responsive: true
  });
});