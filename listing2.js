var xmlhttp = new XMLHttpRequest();

xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var jsonData = JSON.parse(this.responseText);
         // Get the container element where the table will be inserted
         let container = document.getElementById("id01");
         
         // Create the table element
         let table = document.createElement("table");
         table.classList.add("table");
         table.classList.add("table-striped");
         
         // Get the keys (column names) of the first object in the JSON data
         let cols = Object.keys(jsonData[0]);
         
         // Create the header element
         let thead = document.createElement("thead");
         thead.classList.add("thead-dark");
         let tr = document.createElement("tr");
         
         // Loop through the column names and create header cells
         cols.forEach((item) => {
            let th = document.createElement("th");
            th.classList.add("col");
            th.innerText = item; // Set the column name as the text of the header cell
            tr.appendChild(th); // Append the header cell to the header row
         });
         thead.appendChild(tr); // Append the header row to the header
         table.append(tr) // Append the header to the table
         
         // Loop through the JSON data and create table rows
         jsonData.forEach((item) => {
            let tr = document.createElement("tr");
            
            // Get the values of the current object in the JSON data
            let vals = Object.values(item);
            
            // Loop through the values and create table cells
            vals.forEach((elem) => {
               let td = document.createElement("td");
               td.innerText = elem; // Set the value as the text of the table cell
               tr.appendChild(td); // Append the table cell to the table row
            });
            table.appendChild(tr); // Append the table row to the table
         });
         container.appendChild(table) // Append the table to the container element
      
    }
};
xmlhttp.open("GET", "/lists", true);
xmlhttp.send();

   
    