'use strict';

window.addEventListener('load', function () {
    
    async function getCountry(country) {
        return await fetch('https://restcountries.eu/rest/v2/name/' + country)
    }

    function createCardElement(country) {
        if(country === undefined) {
            return 'serching country not found, try again';
        }
        let card = document.createElement('div');
        card.style = 'width: 18rem';
        card.classList.add('card');
        card.innerHTML = 
                    '<img class="card-img-top" src="' + country.flag + '"' + 'alt="' + country.name + '">' +
                   ' <div class="card-body">' +
                      '<h5 class="card-title">' + country.name + '</h5>' +
                    '</div>' +
                    '<ul class="list-group list-group-flush">' +
                    '<li class="list-group-item">Capital: ' + country.capital + '</li>' +
                    '<li class="list-group-item">Region: ' + country.region + '</li>' +
                    '<li class="list-group-item">Currency: ' + country.currencies[0].name + '</li>' +
                    '</ul>' +
                    '<div class="card-footer btn-group">' +
                        '<a class="btn btn-light btn-outline-info" href="https://www.google.com/search?q=' + country.name + '" target="_blank">Google</a>' +
                        '<a class="btn btn-light btn-outline-info" href="https://ru.m.wikipedia.org/wiki/' + country.name + '" target="_blank">Wikipedia</a>' +
                    '</div>';
        return card;
    }

    function addCardToPage(cardElement) {
        document.getElementById('card').firstChild.replaceWith(cardElement);
    }

    function addCardsList(cardElement) {
        document.getElementById('card').prepend(cardElement);
    }


    const form = document.getElementById('country-form');
    form.addEventListener('submit', searchAndAddCountry);

    function searchAndAddCountry(e) {
        e.preventDefault();
        const form = e.target;
        const country = new FormData(form).get('country-name');
        if(country === '' && country.length < 2) {
            window.alert('Input valid country');
            return false;
        } else {
            getCountry(country).then(res => {
                if(res.ok) {
                    res.json().then(data => addCardToPage(createCardElement(data[0])));
                    return true;
                } else {
                    window.alert(country + ' not found');
                    return false;
                }
            });
        }
    }
})




