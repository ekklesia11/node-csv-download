const db = [
  { id: 1, first: "Daniel", last: "Park", age: 31 },
  { id: 2, first: "David", last: "Kim", age: 29 },
  { id: 3, first: "Peter", last: "Shin", age: 30 },
  { id: 4, first: "Sun", last: "Kim", age: 30 },
  { id: 5, first: "Young", last: "Kim", age: 45 },
  { id: 6, first: "Andrew", last: "Park", age: 57 },
  { id: 7, first: "Grace", last: "Lee", age: 18 },
  { id: 8, first: "James", last: "Ko", age: 38 },
  { id: 9, first: "Joseph", last: "Lim", age: 22 }
];

const bigData = [];

for (let i = 0; i < 1000; i++) {
  db.forEach(data => bigData.push(data));
}

const btn = document.querySelector("button");

const download = data => {
  const blob = new Blob([data], { type: "text/csv" });

  console.log(blob);
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.setAttribute("hidden", "");
  a.setAttribute("href", url);
  a.setAttribute("download", "download.csv");
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

const objectToCsv = data => {
  const csvRows = [];

  // get the headers

  const headers = Object.keys(data[0]);
  csvRows.push(headers.join(","));

  // loop over the rows

  for (const row of data) {
    const value = headers.map(header => {
      const escaped = row[header].toString().replace(/"/g, '\\"');
      return `"${escaped}"`;
    });

    csvRows.push(value.join(","));
  }

  return csvRows.join("\n");
};

const click = () => {
  // dummy data called db
  const data = bigData.map(row => ({
    id: row.id,
    firstName: row.first,
    lastName: row.last,
    age: row.age
  }));

  const csvData = objectToCsv(data);
  download(csvData);
};

btn.addEventListener("click", click);
