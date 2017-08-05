function attachEvents() {
    const url = 'https://baas.kinvey.com/appdata/kid_HkfpTpZwZ';
    const authorize = 'Basic ' + btoa('ivo:i');

    $('#aside').find('.load').click(loadCatches);
    $('#addForm').find('.add').click(addCatch);

    function request(endPart,method,data) {
        return $.ajax({
            url: url + endPart,
            method: method,
            headers: {'Authorization': authorize,
                'Content-Type': 'application/json'},
            data:JSON.stringify(data)
        })
    }

    //Load available catches
    function loadCatches() {
        $('#catches').empty();
        request('/biggestCatches',"GET")
            .then(displayResults)
            .catch(displayError)
    }

    function addCatch() {
        let addContainer = $(`#addForm`);
        let angler = addContainer.find('.angler');
        let weight = addContainer.find('.weight');
        let species = addContainer.find('.species');
        let location = addContainer.find('.location');
        let bait = addContainer.find('.bait');
        let captureTime = addContainer.find('.captureTime');

        let data = {
            "angler": angler.val(),
            "weight": Number(weight.val()),
            "species": species.val(),
            "location": location.val(),
            "bait": bait.val(),
            "captureTime": Number(captureTime.val())
        };

        angler.val('');
        weight.val('');
        species.val('');
        location.val('');
        bait.val('');
        captureTime.val('');

        request('/biggestCatches',"POST",data)
            .then(loadCatches)
            .catch(displayError)
    }

    function updateCatch(event) {
        let catchId = $(event.currentTarget).parent().attr('data-id');
        let catchContainer = $(event.currentTarget).parent();
        let angler = catchContainer.find('.angler').val();
        let weight = catchContainer.find('.weight').val();
        let species = catchContainer.find('.species').val();
        let location = catchContainer.find('.location').val();
        let bait = catchContainer.find('.bait').val();
        let captureTime = catchContainer.find('.captureTime').val();

        let data = {
            "angler": angler,
            "weight": Number(weight),
            "species": species,
            "location": location,
            "bait": bait,
            "captureTime": Number(captureTime)
        };

        request('/biggestCatches/' + catchId,"PUT",data)
            .then(loadCatches)
            .catch(displayError)
    }

    function deleteCatch(event) {
        let catchId = $(event.currentTarget).parent().attr('data-id');
        request('/biggestCatches/' + catchId,"DELETE")
            .then(loadCatches)
            .catch(displayError)
    }

    //Display the catches in the DOM
    function displayResults(data) {
        let catches = $('#catches');

        for (let currCatch of data) {
            let singleCatch = $('<div>').addClass('catch').attr('data-id', `${currCatch._id}`);
            singleCatch
                .append($('<label>Angler</label>'))
                .append($(`<input type="text" class="angler"/>`).val(currCatch.angler))
                .append($('<label>Weight</label>'))
                .append($(`<input type="number" class="weight"/>`).val(currCatch.weight))
                .append($('<label>Species</label>'))
                .append($(`<input type="text" class="species"/>`).val(currCatch.species))
                .append($('<label>Location</label>'))
                .append($(`<input type="text" class="location"/>`).val(currCatch.location))
                .append($('<label>Bait</label>'))
                .append($(`<input type="text" class="bait"/>`).val(currCatch.bait))
                .append($('<label>Capture Time</label>'))
                .append($(`<input type="number" class="captureTime"/>`).val(currCatch.captureTime))
                .append($('<button class="update">Update</button>')
                    .on('click', (event) => updateCatch(event)))
                .append($('<button class="delete">Delete</button>')
                    .on('click', (event) => deleteCatch(event)));
            catches.append(singleCatch);
        }
    }

    function displayError(err) {
        console.log(err);
    }
}
