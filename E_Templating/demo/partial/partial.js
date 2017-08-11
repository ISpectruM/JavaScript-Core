$(()=>{
    let main = $('#main');
    let context = {
        contacts:[{name: "Ivan", lastName: "Ivanov", phone: "080849584", email: "ilkj@kj.bg"},
        {name: "Pencho", lastName: "Ivanov", phone: "646546", email: "pen@kj.bg"}]
    };

    loadTemplates();

    async function loadTemplates() {
       const [contactSource, listSource] =
           await Promise.all([$.get('contactPartial.html'),$.get('contactsList.html')]);

       Handlebars.registerPartial('contactPartial', contactSource);
       let listTemplate = Handlebars.compile(listSource);
       main.html(listTemplate(context));
    }
});
