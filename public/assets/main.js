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
      var logElements = form.querySelectorAll('#volunteer-items .log-item');

      submitEvent.preventDefault();

      submitButton.value = 'Submitting...';
      submitButton.disabled = true;

      var data = {
        name:   form.querySelector('input[name=name]').value,
        email:  form.querySelector('input[name=email]').value,
        log:    Array.prototype.map.call(logElements, getLogData)
      };

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

  function getLogData(logElement) {
    var inputs = logElement.querySelectorAll('input, textarea');
    var dateInput = logElement.querySelector('[name=date]');
    var startTimeInput = logElement.querySelector('[name=start]');
    var endTimeInput = logElement.querySelector('[name=end]');

    var itemData = {};
    Array.prototype.forEach.call(inputs, function(input){
      if (input.type === 'checkbox') {
        itemData[input.name] = input.checked;
        return;
      }
      itemData[input.name] = input.value;
    });
    itemData.hours = getTimeDifference(dateInput.value, startTimeInput.value, endTimeInput.value);
    return itemData;
  }

  function getTimeDifference(date, timeStart, timeEnd) {
    var format = 'M/D/YYYY HH:mm A';
    return moment(date + ' ' + timeEnd, format).diff(moment(date + ' ' + timeStart, format), 'hours', true);
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
    newLogItem.className = 'log-item';

    var itemCount = container.querySelectorAll('.log-item').length;

    var logItemHTML = '\
<div class="row">\
  <div class="four columns">\
    <label for="volunteer-location-' + itemCount + '">Location</label>\
    <input class="u-full-width" ' + (isRequired && 'required' || '') + ' type="text" placeholder="e.g. George R. Brown" id="volunteer-location-' + itemCount + '" name="location">\
  </div>\
  <div class="eight columns">\
    <label for="volunteer-location-address-' + itemCount + '">Address (optional)</label>\
    <input class="u-full-width"  type="text" placeholder="" id="volunteer-location-address-' + itemCount + '" name="address">\
  </div>\
</div>\
<div class="row">\
  <div class="four columns">\
    <label for="volunteer-date-' + itemCount + '">Date</label>\
    <input class="u-full-width" ' + (isRequired && 'required' || '') + ' type="text" id="volunteer-date-' + itemCount + '" name="date">\
  </div>\
  <div class="four columns">\
    <label for="volunteer-start-time-' + itemCount + '">Start Time</label>\
    <input class="u-full-width timepicker" ' + (isRequired && 'required' || '') + ' type="text" id="volunteer-start-time-' + itemCount + '" name="start">\
  </div>\
  <div class="four columns">\
    <label for="volunteer-end-time-' + itemCount + '">End Time</label>\
    <input class="u-full-width timepicker" ' + (isRequired && 'required' || '') + ' type="text" id="volunteer-end-time-' + itemCount + '" name="end">\
  </div>\
</div>\
<div class="row">\
  <div class="twelve columns">\
    <label for="volunteer-details-' + itemCount + '">Activities Performed</label>\
    <textarea class="u-full-width" ' + (isRequired && 'required' || '') + ' id="volunteer-details-' + itemCount + '" name="details"></textarea>\
  </div>\
</div>\
<div class="row"\
  <div class="twelve columns">\
    <label for="other-org-' + itemCount + '">If you listed these hours on another organization\'s form, please list the organization name here</label>\
    <textarea class="u-full-width"  id="other-org-' + itemCount + '" name="otherorg" placeholder="e.g. Salvation Army"></textarea>\
  </div>\
</div>\
<div class="row">\
  <div class="six columns">\
    <label>\
      <input type="checkbox" name="isMedical">\
      I performed medical work at this location.\
    </label>\
  </div>\
</div>\
<div class="row">\
  <div class="six columns">\
    <label for="volunteer-specialized-' + itemCount + '">Other specialized work?</label>\
    <input class="u-full-width" type="text" placeholder="e.g. Translator, legal" id="volunteer-specialized-' + itemCount + '" name="specialized">\
  </div>\
</div>\
<div class="row">\
  <div class="six columns">\
    <label for="volunteer-equipment-' + itemCount + '">Equipment Used (Leave blank if you did not use any)</label>\
    <input class="u-full-width" type="text" placeholder="e.g. Fork lift" id="volunteer-equipment-' + itemCount + '" name="equiment">\
  </div>\
</div>\
    ';
    newLogItem.innerHTML = logItemHTML;
    container.appendChild(newLogItem);

    var picker = new Pikaday({
      field: newLogItem.querySelector('[name="date"]'),
      format: 'M/D/YYYY',
      toString: function (date, format) {
        // you should do formatting based on the passed format,
        // but we will just return 'D/M/YYYY' for simplicity
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        return month + '/' + day + '/' + year;
      },
      parse: function (dateString, format) {
        return moment(dateString, 'M/D/YYYY');

      }
    });

    $('input.timepicker').timepicker({dynamic:false, interval:60});
}

  function initAnalytics(){

    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

    ga('create', 'UA-105727042-9', 'auto');
    ga('send', 'pageview');

  }


  initialize();
  initAnalytics();
}());
