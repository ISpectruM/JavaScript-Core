$(() => {
    loadTemplates();

    const container = $('#allCats');
    const context = {
        cats:window.cats
    };
    const source = document.getElementById('cat-template').innerHTML;

    async function loadTemplates(){
        let partialTemplate = await $.get('./templates/cats.html');

        Handlebars.registerPartial('cat',partialTemplate);
        let template = Handlebars.compile(source);

        renderCatTemplate(template);
    }

    function renderCatTemplate(template) {
        container.html(template(context));
        attachBtnEvents();
    }

    function attachBtnEvents() {
        let btn = $('.btn');
        btn.click((e)=>{
            let id = $(e.target).next().attr('id');
            showDetails(id);
        });
        function showDetails(id) {
            let info = $(`#${id}`).toggle();
            if (info.css('display') === 'block'){
                // info.css('display','block');
                info.prev().text('Hide status code')
            } else {
                // info.css('display','none');
                info.prev().text('Show status code')
            }
        }
    }
})
