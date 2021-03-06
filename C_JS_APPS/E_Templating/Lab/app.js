$(() => {
    const templates = {};

    const context = {
        contacts: []
    };

    const listContent = $('#list').find('.content');
    const detailsContent = $('#details').find('.content');

    loadData();
    loadTemplates();

    async function loadData() {
        context.contacts = (await $.get('data.json')).map(c => {
            c.active = false;
            return c
        });
    }

    async function loadTemplates() {
        const [contactSource,listSource,detailsSource] =
            await Promise.all([
                $.get('./templates/contact.html'),
                $.get('./templates/contactsList.html'),
                $.get('./templates/details.html')
            ]);
        Handlebars.registerPartial('contact',contactSource);
        templates.listTemplate = Handlebars.compile(listSource);
        templates.detailsTemp = Handlebars.compile(detailsSource);

        renderList();
    }

    function renderList() {
       listContent.html(templates.listTemplate(context));
       attachClickEvents();
    }

    function renderDetails(index) {
        detailsContent.html(templates.detailsTemp(context.contacts[index]));
    }

    function attachClickEvents() {
        $('.contact').click((e) => {
            let index = $(e.target)
                .closest('.contact')
                .attr('data-index');
            context.contacts.forEach(c => c.active = false);
            context.contacts[index].active = true;
            renderDetails(index);
            renderList();
        })
    }
});