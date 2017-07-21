class MailBox{
    constructor(){
        this.mailbox = [];
    }

    addMessage(subject, text){
        let message = {
            "subject":subject,
            "text":text
        };
        this.mailbox.push(message);
        return this
    }

    deleteAllMessages(){
        this.mailbox = [];
    }

    findBySubject(substr){
        let results = this.mailbox.filter(m => (m.subject).includes(substr));
        return results.length > 0 ? results : [];
    }

    toString(){
        if (this.mailbox.length === 0){
            return ' * (empty mailbox)';
        } else {
            return this.mailbox.map(m => ` * [${m.subject}] ${m.text}`).join('\n');
        }
    }

    get messageCount(){
        return this.mailbox.length;
    }
}

let mb = new MailBox();
console.log("Msg count: " + mb.messageCount);
console.log('Messages:\n' + mb);
mb.addMessage("meeting", "Let's meet at 17/11");
mb.addMessage("beer", "Wanna drink beer tomorrow?");
mb.addMessage("question", "How to solve this problem?");
mb.addMessage("Sofia next week", "I am in Sofia next week.");
console.log("Msg count: " + mb.messageCount);
console.log('Messages:\n' + mb);
console.log("Messages holding 'rakiya': " +
    JSON.stringify(mb.findBySubject('rakiya')));
console.log("Messages holding 'ee': " +
    JSON.stringify(mb.findBySubject('ee')));

mb.deleteAllMessages();
console.log("Msg count: " + mb.messageCount);
console.log('Messages:\n' + mb);

console.log("New mailbox:\n" +
    new MailBox()
        .addMessage("Subj 1", "Msg 1")
        .addMessage("Subj 2", "Msg 2")
        .addMessage("Subj 3", "Msg 3")
        .toString());
