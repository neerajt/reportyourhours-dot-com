(function(){

  function initialize(){
    var logItem = document.querySelector('#volunteer-items .row');
    var logContainer = document.getElementById('volunteer-items');
    var addButton = document.getElementById('add');
    var thankYouMessage = document.getElementById('thank-you');
    var form = document.querySelector('form');
    var submitButton = form.querySelector('[type=submit]');

    createLogItem(logContainer, true);

    addButton.addEventListener('click', function(clickEvent){
      clickEvent.preventDefault();

      createLogItem(logContainer);
    });

    form.addEventListener('submit', function(submitEvent){
      submitEvent.preventDefault();
      submitButton.value = 'Submitting...';
      submitButton.disabled = true;

      var data = {
        name: form.querySelector('input[name=name]').value,
        email: form.querySelector('input[name=email]').value
      };

      var logElements = form.querySelectorAll('#volunteer-items .row');
      var logItems = Array.prototype.map.call(logElements, function(logElement){
        return {
          location: logElement.querySelector('input[name=location]').value,
          hours: parseFloat(logElement.querySelector('input[name=hours]').value),
          date: logElement.querySelector('input[name=date]').value,
          details: logElement.querySelector('[name=details]').value
        };
      });

      data.log = logItems;

      axios
        .post('./api/v1/volunteers', data)
        .then(function(){
          submitButton.value = 'Submitted!';
          submitButton.disabled = false;
          resetLogs(logElements);
          thankYouMessage.className = 'show';
        });
    });
  }

  function resetLogs(logRows) {
    Array.prototype.forEach.call(logRows, function(logRow){
      var items = logRow.querySelectorAll('input, textarea');
      Array.prototype.forEach.call(items, function(item){
        item.value = '';
      });
    });
  }

  function createLogItem(container, isRequired) {
    var isRequired = isRequired || false;
    var newLogItem = document.createElement('div');
    newLogItem.className = 'row';

    var itemCount = container.querySelectorAll('.row').length;

    var logItemHTML = '\
<div class="four columns">\
  <label for="volunteer-location-' + itemCount + '">Location</label>\
  <input class="u-full-width" ' + (isRequired && 'require' || '') + ' type="text" placeholder="e.g. George R. Brown" id="volunteer-location-' + itemCount + '" name="location">\
</div>\
<div class="two columns">\
  <label for="volunteer-hours-' + itemCount + '">Hours</label>\
  <input class="u-full-width" ' + (isRequired && 'require' || '') + ' type="number" min="0" id="volunteer-hours-' + itemCount + '" name="hours">\
</div>\
<div class="two columns">\
  <label for="volunteer-date-' + itemCount + '">Date</label>\
  <input class="u-full-width" ' + (isRequired && 'require' || '') + ' type="text" id="volunteer-date-' + itemCount + '" name="date">\
</div>\
<div class="four columns">\
  <label for="volunteer-details-' + itemCount + '">Duties performed (optional)</label>\
  <textarea class="u-full-width" id="volunteer-details-' + itemCount + '" name="details"></textarea>\
</div>\
    ';
    newLogItem.innerHTML = logItemHTML;
    container.appendChild(newLogItem);

    var picker = new Pikaday({
      field: newLogItem.querySelector('[name="date"]'),
      format: 'M/D/YYYY',
      toString(date, format) {
          // you should do formatting based on the passed format,
          // but we will just return 'D/M/YYYY' for simplicity
          var day = date.getDate();
          var month = date.getMonth() + 1;
          var year = date.getFullYear();
          return `${month}/${day}/${year}`;
      },
      parse(dateString, format) {
          return moment(dateString, 'M/D/YYYY');
      }
    });

  }


  initialize();
}());