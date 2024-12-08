const loadDataButton = document.getElementById('loadData');
const form = document.getElementById('studentForm');
const classDropdown = document.getElementById('class');
const nameDropdown = document.getElementById('name');
const gradeContainer = document.getElementById('gradeContainer');
const addGradeButton = document.getElementById('addGrade');
const tableBody = document.querySelector('#studentTable tbody');
const downloadButton = document.getElementById('downloadExcel');
const resetButton = document.getElementById('resetData'); // Tombol Reset Nilai

let studentData = [];
let loadedData = {}; // Data dari file Excel
let gradeCount = 1; // Counter untuk jumlah nilai

// Fungsi untuk membaca file Excel
function loadStudentData() {
  fetch('student.xlsx') // Nama file Excel
    .then((response) => response.arrayBuffer())
    .then((data) => {
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const rows = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

      // Struktur data untuk dropdown
      loadedData = rows.reduce((acc, row) => {
        if (!acc[row.Kelas]) acc[row.Kelas] = [];
        acc[row.Kelas].push(row.Nama);
        return acc;
      }, {});

      populateClassDropdown();
      form.style.display = 'block';
      downloadButton.style.display = 'block';
    })
    .catch((error) => {
      console.error('Gagal memuat data:', error);
    });
}

// Isi dropdown kelas
function populateClassDropdown() {
  Object.keys(loadedData).forEach((className) => {
    const option = document.createElement('option');
    option.value = className;
    option.textContent = className;
    classDropdown.appendChild(option);
  });
}

// Isi dropdown nama berdasarkan kelas
classDropdown.addEventListener('change', () => {
  nameDropdown.disabled = !classDropdown.value;
  nameDropdown.innerHTML = '<option value="">Pilih Nama</option>';
  if (classDropdown.value) {
    loadedData[classDropdown.value].forEach((studentName) => {
      const option = document.createElement('option');
      option.value = studentName;
      option.textContent = studentName;
      nameDropdown.appendChild(option);
    });
  }
});

// Tambahkan input nilai baru
addGradeButton.addEventListener('click', () => {
  gradeCount++;
  const gradeGroup = document.createElement('div');
  gradeGroup.className = 'form-group grade-group';
  gradeGroup.innerHTML = `
    <label for="grade">Nilai ${gradeCount}:</label>
    <input type="number" class="grade" required>
  `;
  gradeContainer.appendChild(gradeGroup);
});

// Tambahkan data ke tabel
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const selectedClass = classDropdown.value;
  const selectedName = nameDropdown.value;
  const subject = document.querySelector('.subject').value;
  const grades = Array.from(document.querySelectorAll('.grade')).map((input) =>
    parseFloat(input.value)
  );
  const averageGrade =
    grades.reduce((sum, grade) => sum + grade, 0) / grades.length;

  if (selectedClass && selectedName && subject && grades.length) {
    studentData.push({
      No: studentData.length + 1,
      Kelas: selectedClass,
      Nama: selectedName,
      MataPelajaran: subject,
      Nilai: grades.join(', '),
      RataRata: averageGrade.toFixed(2),
    });
    updateTable();
    form.reset();
    nameDropdown.disabled = true;
    gradeContainer.innerHTML = `
      <div class="form-group grade-group">
        <label for="grade">Nilai 1:</label>
        <input type="number" class="grade" required>
      </div>`;
    gradeCount = 1;
  }
});

// Perbarui tabel
function updateTable() {
  tableBody.innerHTML = '';
  studentData.forEach((item, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${item.Kelas}</td>
      <td>${item.Nama}</td>
      <td>${item.MataPelajaran}</td>
      <td>${item.Nilai}</td>
      <td>${item.RataRata}</td>
    `;
    tableBody.appendChild(row);
  });

  // Simpan data tabel ke localStorage
  saveToLocalStorage();
}

// Simpan data tabel ke localStorage
function saveToLocalStorage() {
  localStorage.setItem('studentData', JSON.stringify(studentData));
}

// Muat data tabel dari localStorage
function loadFromLocalStorage() {
  const storedData = localStorage.getItem('studentData');
  if (storedData) {
    studentData = JSON.parse(storedData);
    updateTable(); // Tampilkan kembali data di tabel
  }
}

// Unduh Excel
downloadButton.addEventListener('click', () => {
  const worksheet = XLSX.utils.json_to_sheet(studentData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Nilai Siswa');
  XLSX.writeFile(workbook, 'Data_Nilai_Siswa.xlsx');
});

// Reset data tabel dan localStorage
function resetData() {
  // Hapus data dari localStorage
  localStorage.removeItem('studentData');

  // Kosongkan data tabel
  studentData = [];
  updateTable(); // Perbarui tabel untuk menampilkan data kosong
}

// Event listener untuk tombol Reset Nilai
resetButton.addEventListener('click', resetData);

// Muat data dari localStorage saat halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
  loadFromLocalStorage();
});

// Muat data saat tombol diklik
loadDataButton.addEventListener('click', loadStudentData);
