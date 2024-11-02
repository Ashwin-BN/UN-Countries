/********************************************************************************
*  WEB422 – Assignment 2
* 
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
* 
*  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
* 
*  Name: Ashwin B N      Student ID: 112763222       Date: 01-10-2024
*
********************************************************************************/

let page = 1;
const perPage = 10;
let searchName = null;

const API_URL = 'https://web-am5m77tj4-ashwin-bns-projects.vercel.app/api/countries';

// Function to load country data and populate the table
function loadCountryData() {
  let url = searchName 
      ? `${API_URL}?page=${page}&perPage=${perPage}&name=${searchName}` 
      : `${API_URL}?page=${page}&perPage=${perPage}`;

  fetch(url)
      .then(res => res.ok ? res.json() : Promise.reject(res.status))
      .then(data => {
          const countriesTableBody = document.getElementById('countriesTable').getElementsByTagName('tbody')[0];

          if (data.length) {
              countriesTableBody.innerHTML = data.map(country => `
                  <tr data-id="${country._id}">
                      <td>${country.name}</td>
                      <td><img src="${country.flag}" alt="Flag of ${country.name}" style="width:50px;"></td>
                      <td>${country.nativeName || 'N/A'}</td>
                      <td><img src="${country.coatOfArms}" alt="Coat of Arms of ${country.name}" style="width:50px;"></td>
                      <td><b>𝛼2:</b>${country.a2code || 'N/A'}<br><b>𝛼3:</b>${country.a3code || 'N/A'}</td>
                      <td>${country.capital || 'N/A'}</td>
                      <td>${country.languages || 'N/A'}</td>
                      <td>${country.population.toLocaleString()}</td>
                      <td>${country.area ? country.area.toLocaleString() : 'N/A'}</td>
                      <td>${Array.isArray(country.currencies) 
                          ? country.currencies.map(currency => `${currency.name} (${currency.symbol})`).join(', ') 
                          : 'N/A'}</td>
                      <td>${country.region || 'N/A'}</td>
                      <td>${country.subregion || 'N/A'}</td>
                      <td>${country.continents || 'N/A'}</td>
                  </tr>
              `).join('');
              
              // Add click event listener to each row for displaying the modal
              document.querySelectorAll('#countriesTable tbody tr').forEach((row) => {
                  row.addEventListener('click', () => {
                      let countryId = row.getAttribute('data-id');
                      fetchCountryById(countryId);
                  });
              });
          } else {
              // If no countries available
              countriesTableBody.innerHTML = `<tr><td colspan="13"><strong>No data available</strong></td></tr>`;
              if (page > 1) page--; 
          }

          // Updating current page
          document.getElementById('current-page').textContent = page;

          // Disable previous button on first page
          document.getElementById('previous-page').disabled = (page === 1);
      })
      .catch(error => {
          console.error('Error fetching countries:', error);
      });
}


// Function to fetch country details and show the modal
function fetchCountryById(countryId) {
  fetch(`${API_URL}/${countryId}`)
      .then(res => res.ok ? res.json() : Promise.reject(res.status))
      .then(data => {
          displayCountryDetails(data);
      })
      .catch(error => {
          console.error('Error fetching country details:', error);
      });
}

// Function to display country details in the modal
function displayCountryDetails(country) {
  const modalTitle = document.querySelector('.modal-title');
  const modalBody = document.querySelector('.modal-body');

  // Populate modal with formatted country details
  modalTitle.innerHTML = `
      <div style="display: flex; align-items: center;">
          <h5>${country.name}&nbsp;</h5>
          <img src="${country.coatOfArms || 'https://placehold.co/100x100?text=No+Coat+of+Arms'}" style="width: 25px; height: auto;" alt="Coat of Arms">
      </div>
  `;

  modalBody.innerHTML = `
      <div class="text-center mb-3">
          <img src="${country.flag || 'https://placehold.co/600x400?text=No+Flag'}" class="img-fluid mb-3" alt="Flag of ${country.name}" style="width: 100%; max-height: 250px; object-fit: contain;">
      </div>
      <div class="country-info" style="font-size: 0.9rem;">
          <p><strong>Native Name:</strong> ${country.nativeName || 'N/A'}</p>
          <p><strong>𝛼2/𝛼3 Code:</strong> ${country.a2code || 'N/A'} / ${country.a3code || 'N/A'}</p>
          <p><strong>Capital:</strong> ${country.capital || 'N/A'}</p>
          <p><strong>Area:</strong> ${country.area ? country.area.toLocaleString() : 'N/A'}</p>
          <p><strong>Population:</strong> ${country.population.toLocaleString() || 'N/A'}</p>
          <p><strong>Languages:</strong> ${country.languages || 'N/A'}</p>
          <p><strong>Top-Level Domain:</strong></p>
          <ul>${country.tld ? `<li>${country.tld.join(', ')}</li>` : '<li>N/A</li>'}</ul>
          <p><strong>Currencies:</strong></p>
          <ul>${Array.isArray(country.currencies) 
              ? country.currencies.map(currency => `<li>${currency.name} (${currency.symbol})</li>`).join('') 
              : '<li>N/A</li>'}</ul>
          <p><strong>Continents:</strong> ${country.continents || 'N/A'}</p>
          <p><strong>Region/Subregion:</strong> ${country.region || 'N/A'} / ${country.subregion || 'N/A'}</p>
          <p><strong>Map on Google:</strong> <a href="${country.googleMaps}" target="_blank">${country.googleMaps}</a></p>
      </div>
  `;

  const detailsModal = new bootstrap.Modal(document.getElementById('detailsModal'));
  detailsModal.show();
}

// Previous page button
document.getElementById('previous-page').addEventListener('click', function () {
  if (page > 1) {
      page--;
      loadCountryData();
  }
});

// Next page button
document.getElementById('next-page').addEventListener('click', function () {
  page++;
  loadCountryData();
});

// Searching countries by Name
document.getElementById('searchForm').addEventListener('submit', function (event) {
   event.preventDefault();
  searchName = document.getElementById('searchName').value.trim();
  page = 1;
  loadCountryData();
});

// Clear button to reset search
document.getElementById('clearForm').addEventListener('click', function () {
  document.getElementById('searchName').value = '';
  searchName = null;
  page = 1;
  loadCountryData();
});


// Initially load the countries for page 1
document.addEventListener('DOMContentLoaded', function () {
  loadCountryData();
});