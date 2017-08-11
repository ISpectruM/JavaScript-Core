$(() => {

    const main = $('#main');
    getTemplate();

    let contacts = [
        {firstName: "Ivan", lastName: "Ivanov", phone: "080849584", email: "ilkj@kj.bg"},
        {firstName: "Pencho", lastName: "Ivanov", phone: "646546", email: "pen@kj.bg"}
    ];

    async function getTemplate() {
        let template = await $.get('contactPartial.html');
        for (let contact of contacts) {
            main[0].innerHTML += parse(template, contact);
        }
    }

    function parse(htmlAsString, context) {
        return htmlAsString.replace(/{{\s*(\w+)\s*}}/g, (m,g1)=>{
            if (context.hasOwnProperty(g1)){
                return context[g1];
            } else {
                return '';
            }
        })
    }
});

