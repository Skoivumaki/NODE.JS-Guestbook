
const isValidElement = element => {
  return element.name && element.value;
};


const isValidValue = element => {
  return (!['checkbox', 'radio'].includes(element.type) || element.checked);
};


const isCheckbox = element => element.type === 'checkbox';


const isMultiSelect = element => element.options && element.multiple;


const getSelectValues = options => [].reduce.call(options, (values, option) => {
  return option.selected ? values.concat(option.value) : values;
}, []);





const formToJSON = elements => [].reduce.call(elements, (data, element) => {

  // Make sure the element has the required properties and should be added.
  if (isValidElement(element) && isValidValue(element)) {

    
    if (isCheckbox(element)) {
      data[element.name] = (data[element.name] || []).concat(element.value);
    } else if (isMultiSelect(element)) {
      data[element.name] = getSelectValues(element);
    } else {
      data[element.name] = element.value;
    }
  }

  return data;
}, {});


const handleFormSubmit = event => {
  
  // Stop the form from submitting since we’re handling that with AJAX.
  event.preventDefault();
  
  // Call our function to get the form data.
  const data = formToJSON(form.elements);

  // Demo only: print the form data onscreen as a formatted JSON object.
  const dataContainer = document.getElementsByClassName('results__display')[0];
  
  // Use `JSON.stringify()` to make the output valid, human-readable JSON.
  dataContainer.textContent = JSON.stringify(data, null, "  ");
  
  // ...this is where we’d actually do something with the form data...

};


const form = document.getElementsByClassName('contact-form')[0];

//AJAX
form.onsubmit = function(event){
    var xhr = new XMLHttpRequest();
    var formData = new FormData(form);
    //formData.append("Date", Date());
    xhr.open('POST','/datat')
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(Object.fromEntries(formData)));
    setTimeout(siirto, 5000)
    xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            form.reset();
        }
    }
    return false; 
}

function siirto(){
  window.location.href = "/guestbook";
}